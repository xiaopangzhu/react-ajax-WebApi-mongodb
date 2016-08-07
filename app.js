const express = require('express');
const path = require('path');
const app = new express();

app.use(express.static('./views'));
app.use(express.static(path.join(__dirname,'public')));

app.listen(3000);

console.log("web server started on port 3000");

const dbControl = require('./routes/db.js');

app.get('/db',dbControl.remove);

app.get('/a', function (req,res) {
  res.send("我是后台数据");
});