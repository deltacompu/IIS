const express = require ('express');
const app = new express();
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const Students = require('./models/students');
const PDFDocument = require('pdfkit');
const fs = require('fs');
var path = require('path');


app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


mongoose.connect('mongodb://localhost/students',{useNewUrlParser:true});

app.listen(3000, ()=>{
    console.log('Server running on port 3000')
})

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/online',(req,res)=>{
    res.render('online')
})

app.get('/document',(req,res)=>{
    res.render('document')
})

app.get('/studentFound',(req,res)=>{
    res.render('studentFound')
})

app.get('/notFound',(req,res)=>{
    res.render('notFound')
})

app.post('/posts/verificar', async(req,res)=>{
    const variable = req.body.docIdentidad;
    Students.findOne({docIdentidad : variable},(error, student1)=>{
        if (student1){
            console.log(error,student1)
            res.render('studentFound',{
                student1
            });
            console.log(student1.docIdentidad)
            let pdfDoc = new PDFDocument;
            pdfDoc.pipe(fs.createWriteStream(variable+'.pdf'));
            pdfDoc.text("El estudiante con numero de identificacion "+req.body.docIdentidad+' estudio en el ano '+student1.ano);
            pdfDoc.end();    
        }
        else{
            res.render('notFound');
        } 
    })
})

app.post('/posts/descargarPDF', async(req,res)=>{
    const variable = req.body.docIdentidad;
    
    Students.findOne({docIdentidad : variable},(error, student1)=>{
        if (student1){
        
                var file = path.join(__dirname, variable+'.pdf');
                res.download(file, function (err) {
                    if (err) {
                        console.log("Error");
                        console.log(err);
                    } else {
                        console.log("Success");
                    }
                });
            
        }
        else{
            res.render('notFound');
        }
    })
})

