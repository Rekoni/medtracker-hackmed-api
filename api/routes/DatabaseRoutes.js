require('dotenv/config');
const bodyParser = require('body-parser');
const resHelpers = require('../helpers/ResponseHelpers');

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
};
