const mongoose=require('mongoose');
mongoose.set('strictQuery', true);

const scoreSchema=new mongoose.Schema({
    score: {
        type: Number,
        required: true
    },
    student: {
        type: String,
        ref: 'Student'
    },
    subject: {
        type: String,
        ref: 'Subject'
    }
})

const Score=mongoose.model('Score',scoreSchema);
module.exports=Score;