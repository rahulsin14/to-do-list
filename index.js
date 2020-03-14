var express=require('express');
path=require('path');
var port=8000;
const db =require('./config/mongoose');
const Task=require('./models/cont')
var app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));
app.use(express.urlencoded());
app.use(express.static('assets'));
app.get('/',function(req,res){
    Task.find({},function(err,tasks){
        if(err){
            console.log('errorrr');
            return;
        }
        return res.render('home',{
            'title':'To-Do-List',
            Tasks:tasks
        });
    })
    
});
app.post('/delete-item',function(req,res){
    console.log(req.body);
    Object.keys(req.body).forEach(function(key){
        Task.findByIdAndDelete(key,function(err){
            if(err){
                console.log('Error in deleting an list from database',err);
                return;
            }
            console.log('One list is deleted');
        });
    });
    return res.redirect('back');
});

app.post('/to-do',function(req,res){
    Task.create({
        Description:req.body.description,
        Category:req.body.category,
        Date:req.body.date
    },function(err,newContact){
        if(err){console.log('error'); return;};
        console.log('*******',newContact);
        return res.redirect('back');
    });
});
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('running',port);
});