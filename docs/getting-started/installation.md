---
title: Installation
---

# Installation

## Creating an Edge-first App

### Installing EdgeKit.js

To install EdgeKit.js, run the following command:

```bash
bun install edgekitjs
```

This will install EdgeKit.js in your project.

Next, you need to bootstrap EdgeKit.js in your Cloudflare Worker script. To do this, add the following code to your `worker.js` file:

```javascript
import { bootstrap } from "edgekitjs";

export default bootstrap({
  onRequest(request) {
    // Write your application here
    return new Response("Hello, World!", {
      headers: {
        "content-type": "text/plain",
      },
    });
  },
});
```

### Creating a New Edge-first App

To create a new Edge-first app using EdgeKit.js, run the following command:

```bash
npx degit edgefirst-dev/starter my-app
```

This will give you a new Cloudflare Worker project with EdgeKit.js already set up and React Router v7.

Once the application has been created, you can start it locally by running the following command:

```bash
cd example-app
bun install
bun run dev
```

## Initial Configuration (WIP)

To configure EdgeKit.js, you need to create a `.dev.vars` file in the root of your project. Here is an example configuration:

```env
APP_ENV="development"

CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_DATABASE_ID=""
CLOUDFLARE_API_TOKEN=""

GRAVATAR_API_TOKEN=""

VERIFIER_API_KEY=""
```

This configuration file will be used to set up the necessary environment variables for your application.
