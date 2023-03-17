const mongoose=require('mongoose');
mongoose.set('strictQuery', true);

const subjectSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subCode: {
        type: String,
        required: true
    }
})

const Subject=mongoose.model('Subject',subjectSchema);
module.exports=Subject;