require('dotenv/config');
const bodyParser = require('body-parser');
const resHelpers = require('../helpers/ResponseHelpers');
const dbController = require('../controllers/DatabaseController');

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
};
