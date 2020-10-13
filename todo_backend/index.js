const express=require('express');
var exphbs  = require('express-handlebars');

const app=express();
var cors=require('cors');
app.use(cors());
let mongoose=require('mongoose');
let mongodburi=require('./Config/keys');
mongoose.connect(mongodburi,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("Connected!");
}).catch((err)=>{
    console.log(err);
})
let Handlebars=require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port=8080;
app.listen(port,()=>{
    console.log(port);
})

const task=require('./models/task')
app.get('/', function (req, res) {
    task.find({})
    .then((response)=>{
        res.render('view',{data:response});   
    }).catch((err)=>{
        console.log(err);
    })
})
app.get('/add', function (req, res) {
    res.render('Task');
});

app.post('/save',(req,res)=>{
   /* let id = (mongoose.Types.ObjectId.isValid(req.body.id) ? req.body.id : null);
    task.findOne({_id:id})
    .then(data=>{
        var error1='',error2='',error3='',error4='';
        if(!req.body.name){
            error1 = "Name is required!";
        }
        if(req.body.title == ''){
            error2="Task title is required!"
        }
        if(!req.body.duration){
            error3="Duration is required!";
        }
        if(!req.body.description){
            error4="Description is required!";
        }
        if(error1.length>0 || error2.length>0 || error3.length>0 ||  error4.length>0 ){
            let newTask={
                _id:id,
                name:req.body.name,
                title:req.body.title,
                duration:req.body.duration,
                description:req.body.description,
                error1:error1,
                error2:error2,
                error3:error3,
                error4:error4,
            }
            res.render('Task',{Task:newTask})
        }else{
            if(data == null){
                let saveTask={
                    name:req.body.name,
                    title:req.body.title,
                    duration:req.body.duration,
                    description:req.body.description,
                }
                let task=new Task(saveTask);
               task.save()
                .then(()=>{
                    res.redirect('/view');
                }).catch((err)=>{
                    console.log(err);
                })
            }else{
                data.name=req.body.name;
                data.title=req.body.title;
                data.duration=req.body.duration;
                data.description=req.body.description;
                
                data.save()
                .then(()=>{
                    res.redirect('/view');
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }
    })
    .catch(err=>{
        console.log(err);
    })
    */
   let saveTask={
    name:req.body.name,
    title:req.body.title,
    duration:req.body.duration,
    description:req.body.description,
}
let task=new Task(saveTask);
task.save()
.then(()=>{
   res.status("200").json({msg:"Data Inserted Successfully!"});
}).catch((err)=>{
    console.log(err);
})
})

app.get('/view', function (req, res) {
    task.find({})
    .then((response)=>{
        //res.render('view',{data:response}); 
        if(response.length>0){
            res.status(200).json(response);
        }else{
            res.status(404).json({msg:"No data found"});
        }
    }).catch((err)=>{
        res.status(500).json({msg:"Internal Server Error"});
    })
})

app.get('/delete/:id',(req,res)=>{
    task.deleteOne({_id:req.params.id})
    .then(()=>{
        //res.redirect('/view');
        res.status(200).json({msg:"Data deleted Successfully"});
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/edit/:id',(req,res)=>{
    task.findOne({_id:req.params.id})
    .then(data=>{
        //res.render('Task',{Task:data});
        res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
    })
})

app.post('/update-task/',(req,res)=>{
    Task.findOne({_id:req.body.id})
    .then(data=>{
        data.name=req.body.name,
        data.title=req.body.title;
        data.description=req.body.description;
        data.duration=req.body.duration,
        data.save()
        .then(()=>{
          //  res.redirect('/view-task');
          res.status(200).json({msg:"Data Updated Successfully"});
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })
})