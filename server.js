const http = require("http");
const fs = require("fs");
const path = require("path");
const chatHandler = require("./api/chat.js");

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Handle /api/chat route
  if (pathname === "/api/chat") {
    let bodyData = "";
    req.on("data", chunk => {
      bodyData += chunk;
      if (bodyData.length > 1e6) req.destroy();
    });

    req.on("end", () => {
      try {
        req.body = bodyData ? JSON.parse(bodyData) : {};
      } catch (e) {
        req.body = {};
      }

      // Add express-like helpers for the handler
      res.status = function (code) {
        res.statusCode = code;
        return res;
      };
      res.json = function (obj) {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify(obj));
        return res;
      };

      chatHandler(req, res);
    });
    return;
  }

  // Handle static file serving
  if (pathname === "/" || pathname === "") {
    pathname = "/index.html";
  }

  const filePath = path.join(__dirname, pathname);

  // Security check: ensure path is within workspace root
  if (!filePath.startsWith(__dirname)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("404 Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 Joe's Portfolio & AI Assistant running at: http://localhost:${PORT}`);
  console.log(`💬 Open your browser and ask the AI anything!\n`);
});
