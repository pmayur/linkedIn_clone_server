// env configuration
global.deployConfig = require('./utils/env.config');

const express = require("express");
let redis = require("redis");
let cookieParser = require("cookie-parser");
let cors = require("cors");
const morgan = require("morgan");

//Initialize mongo db
require('./utils/db.config');

/********* Initialize express app *******************************/
let app = express();

// body parser config setup
let bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: process.env.MAX_REQUEST_SIZE })); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: false, limit: process.env.MAX_REQUEST_SIZE }));
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

// cookie parser
app.use(cookieParser());

// cors configs
app.use(cors({
  origin: true,
  credentials: true
}));

/********* Initialize Session Storage Module *******************************/
let sessionStorageType = process.env.SESSION_STORAGE_TYPE;
let session = require('express-session');
let store = null;
if (sessionStorageType == 'file') {
  let FileStore = require('session-file-store')(session);
  store = new FileStore({
    path: process.env.session_file_directory,  //directory where session files will be stored
    useAsync: true,
    reapInterval: 5000,
    maxAge: 24 * 60 * 60 * 1000
  });
} else if (sessionStorageType == 'redis') {
  let redisStore = require('connect-redis')(session);
  let client = redis.createClient({
    'host': deployConfig.get('session_redis_host'),
    'port': deployConfig.get('session_redis_port'),
    'password': deployConfig.get('session_redis_password')
  });
  client.on('error', error => {
    console.error('Failed to initialize redis for session storage.', error);
  });
  store = new redisStore({
    host: deployConfig.get('session_redis_host'),
    port: deployConfig.get('session_redis_port'),
    client: client,
    ttl: 86400
  })
} else {
  throw new Error('Unsupported session store type ' + sessionStorageType);
  return;
}

// use morgan to log requests to the console
app.use(morgan('dev'));


app.use(session({
  secret: 'session_secret',
  resave: false,
  store: store,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: false,
    secure: false
  }
}));

/********* Add authorization middleware *******************************/
let config = require('./utils/config'); // get our config file
app.set('superSecret', config.secret); // secret letiable
const { authorizeRequest } = require('./modules/authMiddleware');
app.use(authorizeRequest(app));

/********* Add Routes *******************************/
require('./routes')(app);

/********* Start Server *******************************/

//Read configured port
let serverPort = null;
if (process.env.PORT) {
  serverPort = process.env.PORT
}

app.listen(serverPort, function () {
  console.info(`App listening on environment "${process.env.NODE_ENV}" on port ${process.env.PORT}`);
});
