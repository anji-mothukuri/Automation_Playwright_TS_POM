// utils/logger.ts
import pino from 'pino';
import fs from 'fs';
import path from 'path';

export interface TestLogger {
  info: (message: string, meta?: Record<string, unknown>) => void;
  warn: (message: string, meta?: Record<string, unknown>) => void;
  error: (message: string, meta?: Record<string, unknown>) => void;
  debug: (message: string, meta?: Record<string, unknown>) => void;
  getLogs: () => string;
}

// Ensure log directory exists before creating file streams
const logDir = path.join('test-results', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Cache one root Pino instance per worker to avoid opening duplicate file descriptors
const workerLoggers = new Map<number, pino.Logger>();

function getWorkerRootLogger(workerIndex: number): pino.Logger {
  if (!workerLoggers.has(workerIndex)) {
    const logFilePath = path.join(logDir, `worker-${workerIndex}.log`);

    const transport = pino.transport({
      targets: [
        // 1. Pretty console output for local terminal readability
        {
          target: 'pino-pretty',
          level: process.env.LOG_LEVEL || 'info',
          options: {
            colorize: true,
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname',
          },
        },
        // 2. Raw structured JSON file output per worker for CI/log aggregators
        {
          target: 'pino/file',
          level: process.env.LOG_LEVEL || 'info',
          options: { destination: logFilePath, mkdir: true },
        },
      ],
    });

    const rootLogger = pino(
      {
        level: process.env.LOG_LEVEL || 'info',
        timestamp: pino.stdTimeFunctions.isoTime,
      },
      transport
    );

    workerLoggers.set(workerIndex, rootLogger);
  }

  return workerLoggers.get(workerIndex)!;
}

export function createTestLogger(testTitle: string, workerIndex: number): TestLogger {
  const memoryLogs: string[] = [];
  const rootLogger = getWorkerRootLogger(workerIndex);

  // Create a lightweight child logger bound to the specific test context
  const childLogger = rootLogger.child({
    worker: `W-${workerIndex}`,
    test: testTitle,
  });

  const recordAndLog = (
    level: 'info' | 'warn' | 'error' | 'debug',
    message: string,
    meta?: Record<string, unknown>
  ) => {
    const timestamp = new Date().toISOString();
    const metaStr = meta && Object.keys(meta).length ? ` | ${JSON.stringify(meta)}` : '';
    memoryLogs.push(`[${timestamp}] [W-${workerIndex}] [${level.toUpperCase()}] [${testTitle}]: ${message}${metaStr}`);

    if (meta && Object.keys(meta).length > 0) {
      childLogger[level](meta, message);
    } else {
      childLogger[level](message);
    }
  };

  return {
    info: (msg, meta) => recordAndLog('info', msg, meta),
    warn: (msg, meta) => recordAndLog('warn', msg, meta),
    error: (msg, meta) => recordAndLog('error', msg, meta),
    debug: (msg, meta) => recordAndLog('debug', msg, meta),
    getLogs: () => memoryLogs.join('\n'),
  };
}
