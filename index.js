const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// console.log(db);
// user for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);



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
    secret: 'blahsomething',
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

// use express routes
app.use('/', require('./routes'));    // by default it fecthes routes/index.js


app.listen(port, function(err, data)
{
    if(err){
    console.log(`Error in running a server: ${err}`);

    }
    console.log(`Server is running on port: ${port}`);
});