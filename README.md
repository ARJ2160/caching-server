# PROXY CACHING SERVER

This is 

## 🛠 Installation & Set Up

1. 🛠 Install dependencies using pnpm

```sh
pnpm i
```

2. 🚀 Start the development server

```sh
caching-proxy --port <number> --origin <url>
```

3. Example - 

```sh
caching-proxy --port 3000 --origin http://dummyjson.com
```

4. Hitting this URL "http://dummyjson.com/products" in postman will cache the response on the first time and then return the cached response on the second time, hence reducing response time significantly.
