const smsHelpers = require('../helpers/SmsHelpers.js');

exports.addPrescription = (req, res) => {
   const { user } = req.body.user;
   res.send(resHelpers.ok(user));
  // smsHelpers.sendMessage(,);
}
