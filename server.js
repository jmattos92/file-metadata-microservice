require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: './uploads/' })
var cors = require('cors');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  const { originalname: name, mimetype: type, size } = req.file;
  res.json({
    name,
    type,
    size,
  })
});

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
