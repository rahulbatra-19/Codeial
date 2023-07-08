

const development = {
    name : 'development',
    asset_path: './assets',
    session_cookie_key : 'T2tKimD2ygHWHzr8RVvBDDVCe3UTFbxx',
    db: 'codeial_development',
    smtp :  {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port:  587,
        secure: false,
        auth: {
            user: 'hoyt9936@gmail.com',
            pass: 'dqdccrmrottusqfr'
        }
    },
    google_client_id: "703066150242-ukka1igh2qlrnimikco1vc4t22d7det7.apps.googleusercontent.com",
    google_client_Secret: "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",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'ceTE8IQTD1emKz1qaDG0Hl5zS8Gr3oVop'
}

const production = {
    name : 'production' ,
    asset_path: process.env.CODEIAL_ASSET_PATH ,
    session_cookie_key : process.env.CODEIAL_SESSION_COOKIE_KEY ,
    db: process.env.CODEIAL_DB ,
    smtp :  {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port:  587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME ,
            pass: process.env.CODEIAL_GMAIL_PASSWORD ,
        }
    },
    google_client_id:  process.env.CODEIAL_GOOGLE_CLIENT_ID ,
    google_client_Secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL  ,
    jwt_secret :  process.env.CODEIAL_JWT_SECRET
}


module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);