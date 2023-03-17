const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
mongoose.set('strictQuery', true);

const Student=require('./models/students');
const Subject=require('./models/subjects');
const Score=require('./models/scores');

mongoose.connect('mongodb://127.0.0.1:27017/studentData')
    .then(()=>{
        console.log("Connection Open!");
    })
    .catch(err=>{
        console.log("Error",err);
    })

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')));

app.get('/students',async (req,res)=>{
    const students=await Student.find({});
    res.render('students/index',{students});
})

app.get('/students/new',(req,res)=>{
    res.render('students/new');
})

app.post('/students',async (req,res)=>{
    const newStudent=new Student(req.body);
    await newStudent.save();
    res.redirect(`/students/${newStudent._id}`);
})

app.get('/students/:id',async (req,res)=>{
    const {id}=req.params;
    const student=await Student.findById(id);
    const marks=await Score.find({student:id});
    let filled=true;
    if(!marks.length){
        filled=false;
    }
    res.render('students/show',{student,filled});
})

app.get('/students/:id/edit',async (req,res)=>{
    const {id}=req.params;
    const student=await Student.findById(id);
    res.render('students/edit',{student});
})

app.put('/students/:id',async(req,res)=>{
    const {id} = req.params;
    const student= await Student.findByIdAndUpdate(id,req.body,{runValidators: true, new: true});
    res.redirect(`/students/${student._id}`);
})

app.delete('/students/:id',async(req,res)=>{
    const {id}=req.params;
    const deletedStudent =await Student.findByIdAndDelete(id);
    res.redirect('/students');
})

app.get('/subjects',async (req,res)=>{
    const subjects=await Subject.find({});
    let filled=true;
    const score =await Score.find();
    let x=score.length;
    if(x){
        filled=false;
    }
    res.render('subjects/index',{subjects,filled});
})

app.get('/subjects/new',(req,res)=>{
    res.render('subjects/new');
})

app.post('/subjects',async (req,res)=>{
    const subject=new Subject(req.body);
    await subject.save();
    res.redirect(`/subjects/${subject._id}`);
})

app.get('/subjects/:id',async (req,res)=>{
    const {id}=req.params;
    const subject=await Subject.findById(id);
    res.render('subjects/show',{subject});
})

app.get('/subjects/:id/edit',async (req,res)=>{
    const {id}=req.params;
    const subject=await Subject.findById(id);
    res.render('subjects/edit',{subject});
})

app.put('/subjects/:id',async(req,res)=>{
    const {id} = req.params;
    const subject= await Subject.findByIdAndUpdate(id,req.body,{runValidators: true, new: true});
    res.redirect(`/subjects/${subject._id}`);
})

app.delete('/subjects/:id',async(req,res)=>{
    const {id}=req.params;
    const deletedSubject =await Subject.findByIdAndDelete(id);
    res.redirect('/subjects');
})

//Create new Score
app.get('/scores/:id/new',async(req,res)=>{
    const {id}=req.params;
    const student = await Student.findById(id);
    const subjects = await Subject.find();
    res.render('scores/new',{student,subjects});
})

app.post('/scores/:id',async(req,res)=>{
    const {id}=req.params;
    const data=req.body;
    for(let subject in data){
        const Addscore={};
        Addscore.student=id;
        Addscore.subject=subject;
        Addscore.score=data[subject];
        const dta= new Score(Addscore);
        await dta.save();
        // console.log(dta);
        // console.log(Addscore);
    }
    // console.log(id);
    // console.log(data);
    res.redirect(`/scores/${id}`);
})

//Show Marks
app.get('/scores/:id',async(req,res)=>{
    const {id}=req.params;
    const student = await Student.findById(id);
    const marks= await Score.find({student:id});
    // console.log(marks);
    const subScore={};
    for(let score of marks){
        const subject = await Subject.findById(score.subject);
        // console.log(subject);
        const subName = subject.name;
        subScore[subName]=score.score;
    }
    let totalMarks=0;
    let cnt=0;
    for(let score in subScore){
        totalMarks+=subScore[score];
        cnt++;
    }
    let percentage = (totalMarks/cnt).toFixed(2);

    res.render('scores/index.ejs',{student,subScore,totalMarks,percentage});
    // res.send("Hello");
})

app.listen(3000,()=>{
    console.log("App is listening on port 3000");
})