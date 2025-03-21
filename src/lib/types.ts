import type { BrowserWorker } from "@cloudflare/puppeteer";
import type {
	D1Database,
	ExecutionContext,
	KVNamespace,
	Queue,
	R2Bucket,
} from "@cloudflare/workers-types";

export type WaitUntilFunction = ExecutionContext["waitUntil"];

export interface Environment extends Cloudflare.Env {
	// Cloudflare Bindings
	DB: D1Database;
	FS: R2Bucket;
	KV: KVNamespace;
	QUEUE: Queue;
	BROWSER: BrowserWorker;
	// Environment variables
	VERIFIER_API_KEY?: string;
}

export interface DatabaseSchema extends Record<string, unknown> {}
