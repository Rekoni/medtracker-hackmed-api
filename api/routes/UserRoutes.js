require('dotenv/config');
const bodyParser = require('body-parser');
const authenticationController = require('../controllers/User/AuthenticationController');
const reminderController = require('../controllers/ReminderController.js');

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

  app.post('/addpres', authenticationController.authenticate,
    reminderController.addPrescription);

};
