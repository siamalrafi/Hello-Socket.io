const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
   res.send(`Hello World! and Server is running with Socket.io`);
});

app.listen(port, () => {
   console.log(`Example app listening on http://localhost:${port}`);
});
