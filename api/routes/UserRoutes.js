require('dotenv/config');
const bodyParser = require('body-parser');
const authenticationController = require('../controllers/User/AuthenticationController');
const userDataController = require('../controllers/User/UserDataController');
const smsHelpers = require('./api/helpers/SmsHelpers.js');
module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ extended: false }));

  app.get('/', (req, res) => {
    res.send("hello hackmed");
  });

  app.post('/salt', authenticationController.getSalt);

  app.post('/login', authenticationController.login);

  app.post('/logout', authenticationController.authenticate,
    authenticationController.logout);

  app.post('/register', authenticationController.register);

  app.post('/testLogin', authenticationController.authenticate,
    authenticationController.testLogin);

  app.get('/testNexmo', (req, res) => {
    smsHelpers.sendMessage('447468898220', "Nexmo works yay");
  });
};
