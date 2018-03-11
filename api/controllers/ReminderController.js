const smsHelpers = require('../helpers/SmsHelpers.js');
const prescription = require('../models/Prescription.js');
const user = require('../models/User.js');

exports.addPrescription = (req, res) => {
   const { token, presName, startDate, endDate, frequency, reminder } = req.body;
   const prescription = new Prescription({ token, presName,
                                   startDate, endDate, frequency, reminder });
   user.prescriptionList.push(prescription);
   User.updateOne({ email: user.email },
                  { prescriptionList: user.prescriptionList },
                  (err, user) => {
                    if (err || !user) {
                       return res.send(resHelpers.error("Could not add prescription to list!"));
                    }
   });
   res.send(resHelpers.ok("Prescription created succesfully! ID:  " + prescription._id));


  // smsHelpers.sendMessage(,);
}
