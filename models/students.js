const mongoose=require('mongoose');
mongoose.set('strictQuery', true);

const studentSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    batch: {
        type: String
    },
    semester: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    },
    registrationNo: {
        type: String,
        required: true
    }
})

const Student=mongoose.model('Student',studentSchema);
module.exports=Student;