const Students = require('../models/students');
const PDFDocument = require('pdfkit');
const fs = require('fs');
var path = require('path');

module.exports = (req,res)=>{
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
}