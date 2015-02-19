var mongoose = require('mongoose');
var http = require('http');
var server = http.createServer();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var SongModel = require('./song-model');

mongoose.connect('mongodb://localhost/music-app');

mongoose.connection.once('open', function () {
    server.listen(1337, function () {
        console.log('Server started on port 1337');
    });
});

server.on('request', app);

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile('./index.html');
});

app.get('/songs', function (req, res) {
    SongModel.find({}, function (err, data) {
        res.send(data);
    });
});

app.post('/song', function (req, res) {
    var song = req.body.song;
    SongModel.create(song).then(function () {
        res.status(200).end();
    });
});
