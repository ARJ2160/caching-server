import express from "express";
import NodeCaching from "./cache";

export const proxyServerStart = (
  port: number,
  origin: string,
  cachingClient: NodeCaching
) => {
  const app = express();

  // Middleware to forward requests and cache responses
  app.use(async (req, res) => {
    const url = origin + req.url; // Construct the URL to the origin server

    if (cachingClient.has(url)) {
      console.log(`Cache hit: ${url}`);
      res.set("X-Cache", "HIT");
      res.send(cachingClient.get(url)); // Return cached response if it exists
    } else {
      console.log(`Cache miss: ${url}`);
      try {
        const response = await fetch(url);
        const data = await response.text();

        cachingClient.set(url, data); // Cache the response
        res.set("X-Cache", "MISS");
        res.send(data);
      } catch (error: any) {
        res.status(500).send(`Error fetching from origin: ${error.message}`);
      }
    }
  });

  app.listen(port, () => {
    console.log(`Caching proxy server running on port ${port}`);
  });
};
