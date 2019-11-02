const mongoose = require("mongoose");
const Scheme = mongoose.Schema;
const userScheme = new Scheme({
    _id: mongoose.Schema.Types.ObjectId,
    name : { type: String, required : true} ,
    email : { type : String, required : true },
    phone : { type: String , required : true}
});
module.exports = mongoose.model("User", userScheme);









