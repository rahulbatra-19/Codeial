const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');


const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);


app.use(express.static('./assets'));

// extract style and scripts from sub pages into the layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express routes
app.use('/', require('./routes'));    // by default it fecthes routes/index.js

// set up our view engine
app.set('view engine', 'ejs');
app.set('views','./views');

app.listen(port, function(err, data)
{
    if(err){
    console.log(`Error in running a server: ${err}`);

    }
    console.log(`Server is running on port: ${port}`);
});