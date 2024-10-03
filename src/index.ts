#!/usr/bin/env node
import { Command } from "commander";
import { proxyServerStart } from "./proxyServer";

import figlet from "figlet";
import NodeCaching from "./cache";

console.log(figlet.textSync("Caching Server"));

const program = new Command();
const nodeCacheClient = new NodeCaching();
program.version("1.0.0").description("Caching Proxy CLI Tool");

// Start command to run the caching server
program
  .option("--port <number>", "Port to run the proxy server on", "3000")
  .option("--origin <url>", "Origin server URL to forward requests to")
  .action((options) => {
    const port = options.port;
    const origin = options.origin;

    if (!origin) {
      console.error("Error: --origin is required to start the proxy server.");
      process.exit(1);
    }

    proxyServerStart(port, origin, nodeCacheClient);
  });

// Clear-cache command to clear cache
program
  .command("clear-cache")
  .description("Clear the cache")
  .action(() => {
    nodeCacheClient.clearCache();
    console.log("Cache cleared.");
  });

program.parse(process.argv);
