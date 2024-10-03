import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 100 });

class NodeCaching {
  set(url: string, data: any) {
    cache.set(url, data);
  }
  get(key: string) {
    return cache.get(key);
  }
  getAll() {
    return cache.keys();
  }
  clearCache() {
    return cache.close();
  }
  has(key: any) {
    return cache.has(key);
  }
}

export default NodeCaching;
