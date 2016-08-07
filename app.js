const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = new express();

app.use(bodyParser.json()); // 解析 application/json 类型数据
app.use(express.static('./views'));
app.use(express.static(path.join(__dirname,'public')));

app.listen(3000);

console.log("web server started on port 3000");

const dbControl = require('./routes/db.js');

app.get('/db',dbControl.remove);

app.get('/items', dbControl.findAll);

app.post('/items', dbControl.save)

app.delete('/items');