const http = require("http");
const expressApp = require("./app");
const server = http.createServer(expressApp.app);
const startServer = async function () {
    await server.listen(4000);
};

startServer();
