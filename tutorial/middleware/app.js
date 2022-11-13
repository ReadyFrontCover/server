const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const MongoStore = require('connect-mongo')

const app = express()
const port = 3000

const dbString = 'mongodb://127.0.0.1:27017';
const dbOptions = { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const conn = mongoose.connect(dbString, dbOptions).then(m => m.connection.getClient());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const sessionStore = MongoStore.create({
    clientPromise: conn,
    dbName: "cookies_tb",
    collectionName: 'sessions'
})

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.get('/', (req, res, next) => {
    if (req.session.viewCount) {
        req.session.viewCount++
    } else {
        req.session.viewCount = 1;
    }
    res.send(`<h1>Hello Bret ${req.session.viewCount}</h1>`)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})