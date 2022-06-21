const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        reuired:true
    },
    contactNo:{
        type:Number,
        reuired:true
    }
})

const Student = mongoose.model("student", studentSchema)
module.exports = Student;