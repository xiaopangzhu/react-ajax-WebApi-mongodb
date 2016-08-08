const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/todoItems';

exports.save = function (req, res) {

  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    const item = req.body;
    insertItem(db, item, function () {
      db.close();
    });
    res.send('我是后台数据');
  });

};

exports.findAll = function (req, res) {

  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    findItems(db, function (result) {
      db.close();
      res.json(result).end();
    });
  });

};

exports.Update = function (req, res) {

  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    const items = req.body
    updateItems(db, items, function () {
      db.close();
    });
    res.send('我是后台数据');
  });

};

// Use connect method to connect to the Server
exports.remove = function (req, res) {

  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    const items = req.body;
    deleteItems(db, items, function () {
      db.close();
    });
    res.send('我是后台数据');
  });

};

const insertItem = function (db, item, callback) {
  const collection = db.collection('items');
  collection.insert([item], function (err, result) {
    assert.equal(null, err);
    callback(result);
  });
};

const updateItems = function (db, callback) {
  const collection = db.collection('items');
  collection.update({a: 2}, {$set: {b: 2}}, function (err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    callback(result);
  });
};

const deleteItems = function (db, callback) {  
  const collection = db.collection('items');
  collection.deleteOne({a: 1}, function (err, result) {
    callback(result);
  });
};

const findItems = function (db, callback) {
  const collection = db.collection('items');
  collection.find({}).toArray(function (err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
};

// exports.remove = remove;
