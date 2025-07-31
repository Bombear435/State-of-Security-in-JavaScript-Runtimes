
const librariesToTest = [
  {
    domain: "deno.land",
    url: "https://deno.land/std@0.224.0/fs/mod.ts",
    test: () => import("https://deno.land/std@0.224.0/fs/mod.ts"),
  },
  {
    domain: "esm.sh",
    url: "https://esm.sh/react",
    test: () => import("https://esm.sh/react"),
  },
  {
    domain: "cdn.skypack.dev",
    url: "https://cdn.skypack.dev/react",
    test: () => import("https://cdn.skypack.dev/react"),
  },
  {
    domain: "cdn.jsdelivr.net",
    url: "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.js",
    test: () => import("https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.js"),
  },
  {
    domain: "raw.githubusercontent.com",
    url: "https://raw.githubusercontent.com/mayankchoubey/deno-random-id/main/mod.ts",
    test: () => import("https://raw.githubusercontent.com/mayankchoubey/deno-random-id/main/mod.ts"),
  },
  {
    domain: "jspm.dev",
    url: "https://jspm.dev/react",
    test: () => import("https://jspm.dev/react"),
  },
  {
  //  Error code: 503 Service Unavailable
    domain: "x.nest.land",
    url: "https://x.nest.land/ramda@0.27.0/mod.ts",
    test: () => import("https://x.nest.land/ramda@0.27.0/mod.ts"),
  },
  {
    domain: "unpkg.com",
    url: "https://unpkg.com/lodash-es@4.17.21/lodash.js",
    test: () => import("https://unpkg.com/lodash-es@4.17.21/lodash.js"),
  },
  {
    domain: "dev.jspm.io",
    url: "https://dev.jspm.io/react",
    test: () => import("https://dev.jspm.io/react"),
  },
  {
    domain: "denopkg.com",
    url: "https://denopkg.com/oakserver/oak/mod.ts",
    test: () => import("https://denopkg.com/oakserver/oak/mod.ts"),
  },
  {
    domain: "ghuc.cc",
    url: "https://ghuc.cc/worker-tools/router/index.ts",
    test: () => import("https://ghuc.cc/worker-tools/router/index.ts"),
  },
  {
    domain: "cdn.esm.sh",
    url: "https://cdn.esm.sh/react",
    test: () => import("https://cdn.esm.sh/react"),
  },
  {
    domain: "gist.githubusercontent.com",
    url: "https://gist.githubusercontent.com/czottmann/971402a89775b261176c2fd217e82110/raw/b134dd4a17fcd2c8747929c3bc88fafef31dd3d1/.%2520%25CC%25B8stores%2520%25CC%25B8whatever_store.ts",
    test: () => import("https://gist.githubusercontent.com/czottmann/971402a89775b261176c2fd217e82110/raw/b134dd4a17fcd2c8747929c3bc88fafef31dd3d1/.%2520%25CC%25B8stores%2520%25CC%25B8whatever_store.ts"),
  },
  {
    domain: "cdn.pika.dev",
    url: "https://cdn.pika.dev/react",
    test: () => import("https://cdn.pika.dev/react"),
  },
  {
    domain: "lib.deno.dev",
    url: "https://lib.deno.dev/x/oak@v11.1.0/mod.ts",
    test: () => import("https://lib.deno.dev/x/oak@v11.1.0/mod.ts"),
  },
  {
  //  error sending request for url (https://cdn.pagic.org/react): client error (Connect): invalid peer certificate: Expired 
    domain: "cdn.pagic.org",
    url: "https://cdn.pagic.org/react",
    test: () => import("https://cdn.pagic.org/react"),
  },
  {
    domain: "crux.land",
    url: "https://crux.land/nanossr@0.0.4",
    test: () => import("https://crux.land/nanossr@0.0.4"),
  },
  {
    domain: "cdn.shopstic.com",
    url: "https://cdn.shopstic.com/react",
    test: () => import("https://cdn.shopstic.com/react"),
  },
  {
    domain: "x.lcas.dev",
    url: "https://x.lcas.dev/preact@10.5.4/ssr.js",
    test: () => import("https://x.lcas.dev/preact@10.5.4/ssr.js"),
  },
  {
    domain: "ghc.deno.dev",
    url: "https://ghc.deno.dev/oakserver/oak@v12.5.0/mod.ts",
    test: () => import("https://ghc.deno.dev/oakserver/oak@v12.5.0/mod.ts"),
  },
  {
  //  Error code: 503 Service Unavailable
    domain: "cdn.dreg.dev",
    url: "https://cdn.dreg.dev/lodash@4.17.21/index.js",
    test: () => import("https://cdn.dreg.dev/lodash@4.17.21/index.js"),
  }
];


for (const lib of librariesToTest) 
{
    console.log(`\n🔍 Testing ${lib.domain}`);

    // 1. Availability Test
    try 
    {
        const res = await fetch(lib.url, { method: "GET" });
        if (!res.ok) {
            console.error(`NOT OK. ${lib.url} returned status ${res.status}`);
        }
        else
            console.log(`OK. HTTP check passed: ${lib.url}`);
    } catch (err) {
        console.error(`NOT OK. Fetch error: ${err.message}`);
    }

    // 2. Import Test
    try 
    {
        const mod = await lib.test();
        const isObject = mod && typeof mod === "object";
        console.log(`OK. Import successful: ${isObject ? "Module loaded" : "Unexpected result"}`);
    } catch (err) {
        console.error(`NOT OK. ${err.message}`);
    }
}