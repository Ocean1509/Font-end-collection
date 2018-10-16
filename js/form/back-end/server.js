const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors")
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')

const form = new formidable.IncomingForm();
// 解决跨域
app.use(cors())
// 处理请求 的content-type 为application/json
app.use(bodyParser.json())

//处理请求的content-type 为application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

app.get('/user', (req, res) => {
  console.log(req.query)
  res.send('成功接收')
})


app.post('/user', (req, res) => {
  form.parse(req, function (err, fields, files) {
    console.log(files)
    res.send('成功接收')

  })
})
app.listen(3008, () => {
  console.log('服务启动')
})