var path = require('path');
var express = require('express');
var apiRouter = require('./routes');

const app = express();

let p = path.join(__dirname, '../public');

app.use(express.static(p));
app.use(express.json());
app.use(apiRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
})