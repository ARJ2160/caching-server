import express from "express";
import cache, { get, has, set } from "./cache";

export const proxyServerStart = (port: number, origin: string) => {
  const app = express();

  // Middleware to forward requests and cache responses
  app.use(async (req, res) => {
    const url = origin + req.url; // Construct the URL to the origin server

    if (has(url)) {
      console.log(`Cache hit: ${url}`);
      res.send(get(url)); // Return cached response if it exists
    } else {
      console.log(`Cache miss: ${url}`);
      try {
        const response = await fetch(url);
        const data = await response.text();

        set(url, data); // Cache the response
        res.send(data); // Forward the response to the client
        console.log(">>> HERE", cache);
      } catch (error: any) {
        res.status(500).send(`Error fetching from origin: ${error.message}`);
      }
    }
  });

  app.listen(port, () => {
    console.log(`Caching proxy server running on port ${port}`);
  });
};
