const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io').listen(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    });
});

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) => {
        if (err) {
            sendStatus(500);
        }

        io.emit('message', req.body);
        res.sendStatus(200);
    });
});

io.on('connection', () => {
    console.log('User connected!');
});

var dbUrl = 'mongodb://Writer:123Writer@ds163226.mlab.com:63226/chatappdb'
const Message = mongoose.model('Message', { name: String, message: String });

mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    }

    console.log('MongoDB connected...')
});

var server = app.listen(3000, () => {
    console.log('Server running on port ', server.address().port, '...');
});
