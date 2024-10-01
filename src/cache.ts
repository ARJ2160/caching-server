const cache: any = {};

export const set = (key: string, value: any) => {
  return (cache[key] = value);
};

export const get = (key: any) => {
  return cache[key];
};

export const clear = () => {
  return Object.keys(cache).forEach((key) => delete cache[key]);
};
export const has = (key: any) => {
  return cache.hasOwnProperty(key);
};

export default cache;
