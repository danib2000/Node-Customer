
const mongoose = require("mongoose");
const Scheme = mongoose.Schema;
const notificationScheme = new Scheme({
    usersToNotify : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    notificationUser : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    type : {type: String},
    info : {type: String}
});
module.exports = mongoose.model("notification", notificationScheme);
