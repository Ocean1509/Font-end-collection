var express = require('express')
var app = express();
var db = require('./mongo.js')
var bodyParser = require('body-parser')
var queryString = require("querystring")

// 表名
var databaseName = 'student'

// 程序中请求可以通过postman 模拟

db.connect()

// 程序关闭时，关闭数据库
process.on('exit', function (code) {
    db.close()
});

app.use(bodyParser.json())

app.get('/', (req, res) => {
    process.exit(1)
})

app.get('/student', (req, res) => {
    let query = req.query.key;
    console.log(query)
    let data = {}
    if(query) {
        data = {
            $or: [{name: { $regex: query }}, {age: { $regex: query }}]
        }
    }
    // let query = {
    //     'name': 'dd'
    // }
    db.find(databaseName, data).then((resp) => {
        console.log(resp)
        res.send(resp)
    })
})

app.post('/student', (req, res) => {
    let query = req.body;
    if (Array.isArray(query)) {
        console.log('--')
        db.insertMany(databaseName, query).then(() => {
            console.log(resp)
            res.send('插入多组数据成功')
        })
    } else {
        db.insertOne(databaseName, query).then((err, resp) => {
            res.send('插入数据成功')
        })
    }
})

app.delete('/student', (req, res) => {
    let query = req.body;
    db.deleteOne(databaseName, query).then(() => {
        res.send("删除数据成功")
    })
})

app.delete('/student/all', (req, res) => {
    let query = req.body;
    db.deleteMany(databaseName, query).then(() => {
        res.send("删除多个数据成功")
    })
})

app.put('/student', (req, res) => {
    console.log(req.body)
    let data = req.body;
    let query = {
        age: 31
    }
    db.updateOne(databaseName, query, data).then(() => {
        res.send("更新数据成功")
    })
})

app.listen(3004, () => {
    console.log('服务启动')
})