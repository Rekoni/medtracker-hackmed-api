require('dotenv/config');
const bodyParser = require('body-parser');

const resHelpers = require('../helpers/ResponseHelpers');
const dbController = require('../controllers/DatabaseController');

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));

    app.post('/timetable/offset', dbController.offsetTimetable);


    try {
        const adminController = require('../controllers/AdminController');

        app.post('/exercise', (req, res, next) => {
            if (!adminController) {
                return res.status(403).send(
                    resHelpers.error("This instance of the API does not" +
                        "have permission to use this method!")
                );
            }
            adminController.connectToAdminUser();
            next();
        }, adminController.createExercise);
    
        app.post('/timetable', (req, res, next) => {
            if (!adminController) {
                return res.status(403).send(
                    resHelpers.error("This instance of the API does not" +
                        "have permission to use this method!")
                );
            }
            adminController.connectToAdminUser();
            next();
        }, adminController.createEvent);
    } catch (err) {
        console.log("No admin controller!");
    }
};
