const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
require('./config/view-helpers')(app);
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// console.log(db);
// user for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');


const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');
// for flash messsages
const flash  = require('connect-flash');
const customMware = require('./config/middleware');

// // setup the chat server to be usd with socket.io

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(4000);
console.log('chat server is listening on port 4000');

const path = require('path');


if(env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path , 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug:true,
        outputStyle: 'expanded',
        prefix: '/css'
    }));
}

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static(env.asset_path));

app.use(expressLayouts);

// make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode , env.morgan.options));

// extract style and scripts from sub pages into the layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up our view engine
app.set('view engine', 'ejs');
app.set('views','./views');


// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // todo hange the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        // mongooseConnection: db, 
        autoRemove: 'disabled'
    },
    function (err) {
        console.log(err || 'connect-mongoDB setup');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);




// use express routes
app.use('/', require('./routes'));    // by default it fecthes routes/index.js


app.listen(port, function(err, data)
{
    if(err){
    console.log(`Error in running a server: ${err}`);

    }
    console.log(`Server is running on port: ${port}`);
});