var express = require('express')
var app = express()

// 设置静态资源目录
app.use('/static', express.static('static'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/' + 'index.html')
})
app.listen(3000)
console.log('Server is running at port： 3000')
