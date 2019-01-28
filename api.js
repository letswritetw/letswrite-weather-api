// express, http
const express = require('express');
const app = express();

// request
const request = require('request');

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// port
const PORT = process.env.PORT || 8080;
app.listen(PORT);

// cross domain config
app.all('/weather', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.post('/weather', (req, res, next) => {

  // 白名單
  if(!req.get('Origin')) return;

  res.set('Access-Control-Allow-Origin', '這邊填想加入為白名單的網域, 如：https://www.google.com');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

  request('這邊填在氣象局拿到的request URL', function (error, response, body) {
    if(!error && response.statusCode == 200) {
      res.send(body)
    }
  });

});