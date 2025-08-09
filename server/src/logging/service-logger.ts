import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import path from 'path';

type Event = 'start' | 'done' | 'fail';
type Primitive = string | number | boolean | null | undefined;
type Ctx = Record<string, Primitive>;

interface LogLine {
  // machine + human timestamps
  time: number; // Unix ms (for Promtail)
  ts: string; // ISO-8601 (for humans/Grafana)

  service: string;
  event: Event;
  function: string;
  ctx?: Ctx;
  err?: { type: string; message: string; stack?: string };
}

function normalizeErr(e: unknown) {
  if (e && typeof e === 'object' && 'name' in e && 'message' in e) {
    const err = e as Error;
    return { type: err.name, message: err.message, stack: err.stack };
  }
  return { type: typeof e, message: String(e) };
}

function serviceNameFromFile(file: string) {
  const base = path.basename(file);
  return base
    .replace(/\.service\.[tj]s$/, '')
    .replace(/\.controller\.[tj]s$/, '')
    .replace(/\.[tj]s$/, '');
}

// NOTE: stack depth 4 may vary across TS/Node versions.
// If you see "unknown", bump or lower this index by 1.
function getCallerFunctionName() {
  const stack = new Error().stack?.split('\n') || [];
  const match = stack[4]?.trim().match(/^at\s+([^\s(]+)/);
  return match ? match[1] : 'unknown';
}

@Injectable()
export class ServiceLogger {
  constructor(private readonly pino: PinoLogger) {}

  /** Use in a file: const log = serviceLogger.bindFromFile(__filename) */
  bindFromFile(file: string) {
    const service = serviceNameFromFile(file);

    const line = (event: Event, ctx?: Ctx): LogLine => {
      const fn = getCallerFunctionName();
      const now = Date.now();
      const hasCtx = ctx && Object.keys(ctx).length > 0;

      return {
        // timestamps
        time: now, // Unix ms
        ts: new Date(now).toISOString(), // ISO-8601

        service,
        event,
        function: fn,
        ...(hasCtx ? { ctx } : {}),
      };
    };

    return {
      infoStart: (ctx?: Ctx) => this.pino.info(line('start', ctx)),
      infoDone: (ctx?: Ctx) => this.pino.info(line('done', ctx)),
      alertFail: (err: unknown, ctx?: Ctx) =>
        this.pino.error({ ...line('fail', ctx), err: normalizeErr(err) }),
      // optional plain info (kept as-is)
      info: (ctx?: Ctx) => this.pino.info(line('done', ctx)),
    };
  }
}
