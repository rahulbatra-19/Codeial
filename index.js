const express = require('express');
const app = express();
const port = 8000;

// use express routes
app.use('/', require('./routes'));    // by default it fecthes routes/index.js
app.listen(port, function(err, data)
{
    if(err){
    console.log(`Error in running a server: ${err}`);

    }
    console.log(`Server is running on port: ${port}`);
});