const express = require('express');

var app = express();

var server = app.listen(3000, () => {
    console.log('Server running on port ', server.address().port);
});
