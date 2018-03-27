const request = require('request');
const bodyParser = require('body-parser');
const express = require('express');

const port = process.env.PORT || 3000;
var app = express();

const apiKey = '9cR7DBJuiQXgRf8CR846FRraQSmdMh';

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
  res.render('index');
})

app.get('/standings', function (req, res) {
  res.render('standings', {Stnd: null, error: null});
})

app.get('/fixures', function (req, res) {
  res.render('fixures', {fix: null, error: null});
})

app.get('/magic', function (req, res) {
  res.render('magic');
})

app.post('/standings', function (req, res) {
  let league = req.body.leagueI;
  let year = req.body.yearI;
  let url = `https://www.magayogoal.com/api/standings.php?api_key=${apiKey}&league=${league}&season=${year}`

  request(url, function (err, response, body) {
    if(err){
      res.render('standings', {Stnd: null, error: 'Error, please try again'});
    } else {
      let Standing = JSON.parse(body)
      if(Standing.Response==false){
        res.render('standings', {Stnd: null, error: 'Error, please try again'});
      } else {
        res.render('standings', {Stnd: Standing, error: null});
      }
    }
  });
})

app.post('/fixures', function (req, res) {
  let league = req.body.leagueI;
  let year = req.body.yearI;
  let date = req.body.dateI;
  let url = `https://www.magayogoal.com/api/fixtures.php?api_key=${apiKey}&league=${league}&season=${year}&date=${date}`

  request(url, function (err, response, body) {
    if(err){
      res.render('fixures', {fix: null, error: 'Error, please try again'});
    } else {
      let fixure = JSON.parse(body)
      if(fixure.Response==false){
        res.render('fixures', {fix: null, error: 'Error, please try again'});
      } else {
        res.render('fixures', {fix: fixure, error: null});
      }
    }
  });
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
