const {server} = require("./server/server");
require("./server/websocket");

server.listen(2405, () => {
    console.log(`http://localhost:${2405}`)
});