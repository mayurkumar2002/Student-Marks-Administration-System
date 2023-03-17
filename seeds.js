const mongoose=require('mongoose');
mongoose.set('strictQuery', true);

const Student=require('./models/students');

mongoose.connect('mongodb://127.0.0.1:27017/studentData')
    .then(()=>{
        console.log("Connection Open!");
    })
    .catch(err=>{
        console.log("Error",err);
    })

const seedStudents = [
    {
        name: 'Mayur Kumar',
        batch: 'CS',
        semester: 4,
        registrationNo: '2021UGCS065'
    },
    {
        name: 'Krish Kumar',
        batch: 'CS',
        semester: 4,
        registrationNo: '2021UGCS002'
    },
    {
        name: 'Yash Garg',
        batch: 'CS',
        semester: 4,
        registrationNo: '2021UGCS048'
    },
    {
        name: 'Shivam Kumar',
        batch: 'CS',
        semester: 4,
        registrationNo: '2021UGCS072'
    },
    {
        name: 'Ritesh Kumar',
        batch: 'CS',
        semester: 4,
        registrationNo: '2021UGCS061'
    },
]


Student.insertMany(seedStudents)
.then(res=>{
    console.log(res);
})
.catch(e=>{
    console.log(e);
})