import cfPuppeteer, { type WorkersLaunchOptions } from "@cloudflare/puppeteer";
import { EdgeConfigError } from "../errors.js";
import { storage } from "./storage.js";

/**
 * Upload, store and serve images, videos, music, documents and other
 * unstructured data in your Edge-first application.
 */
export function fs() {
	return storage.access("fs");
}

/**
 * The `cache` function gives you access to a cache object powered by
 * Cloudflare Worker KV.
 *
 * Every cached key will be prefixed by `cache:` to avoid conflicts with other
 * keys.
 *
 * This function is memoized so the next time you call it, it will return the
 * same instance of the cache object.
 */
export function cache() {
	return storage.access("cache");
}

/**
 * Get a Drizzle ORM instance for your Edge-first application already connected
 * to your D1 database.
 */
export function orm() {
	return storage.access("orm");
}

/**
 * The `env` function gives you access to the environment variables in a
 * type-safe way.
 */
export function env() {
	return storage.access("env");
}

/**
 * Add a global, low-latency key-value data storage to your Edge-first
 * application.
 */
export function kv() {
	return storage.access("kv");
}

/**
 * Access the request object in your Edge-first application.
 */
export function request() {
	return storage.access("request");
}

/**
 * Access the AbortSignal associated with the request in your Edge-first
 * application.
 */
export function signal() {
	return storage.access("signal");
}

/**
 * Access the headers of the request in your Edge-first application.
 */
export function headers() {
	return storage.access("headers");
}

/**
 * Access the geolocation information of the request in your Edge-first
 * application.
 */
export function geo() {
	return storage.access("geo");
}

/**
 * Enqueue for processing later any kind of payload of data.
 */
export function queue() {
	return storage.access("queue");
}

/**
 * Get access to a rate limiter for your Edge-first application.
 *
 * The RateLimit object gives you an `limit` method you can call with any key
 * to identify the thing you want to rate limit.
 *
 * The default limit is set to 10, the default period is set to 60s, this means
 * by default any call to `limit` will allow 10 calls in a limit of 60s
 *
 * There's also a `reset` method that will delete the rate limit for a given
 * key.
 *
 * The `writeHttpMetadata` method will fill a Headers object with the necessary
 * headers to inform the client about the rate limit. If a Headers object is not
 * provided, a new one will be created and returned.
 *
 * @example
 * import { rateLimit } from "edgekitjs";
 *
 * @example
 * let rateLimit = rateLimit();
 *
 * @example
 * let rateLimit = rateLimit({ limit: 10, period: 60 });
 *
 * @example
 * let result = await rateLimit.limit({ key });
 * if (result.success) return json(data);
 * return json(error, { status: 429 });
 *
 * @example
 * let headers = await rateLimit.writeHttpMetadata(key);
 * if (!result.success) return json(error, { status: 429, headers });
 * return json(data, { headers });
 *
 * @example
 * await rateLimit.reset(key);
 */
export function rateLimit() {
	return storage.access("rateLimit");
}

/**
 * When you want to run a async process but don't want to block your application
 * to wait for it to finish, you can use the `defer` function.
 *
 * This let you run the async process as a run and forget, the process will run
 * in the background until it's completed and the Worker will not shutdown in
 * the meantime.
 *
 * In many cases this can solve the problem of a background Job too, but
 * consider that in case of failure the process will not be retried.
 * @param promise The promise to defer
 * @example
 * defer(analytics.track("event", { user }));
 */
export function defer(promise: Promise<unknown>) {
	return storage.access("waitUntil")(promise);
}

export function bindings() {
	return storage.access("bindings");
}

export async function puppeteer(options?: WorkersLaunchOptions) {
	let bindings = storage.access("bindings");
	if (!bindings.BROWSER) throw new EdgeConfigError("BROWSER");
	let browser = await cfPuppeteer.launch(bindings.BROWSER, options);
	let page = await browser.newPage();
	return { page, browser };
}
