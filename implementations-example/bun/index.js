const server = Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response("Hello from Bun!");
  },
});

console.log("Server running on port 3000");
