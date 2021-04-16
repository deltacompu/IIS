
const Students = require('../models/students');
const PDFDocument = require('pdfkit');
const fs = require('fs');
var path = require('path');

module.exports = (req,res)=>{
    const variable = req.body.docIdentidad;
    
    Students.findOne({docIdentidad : variable},(error, student1)=>{
        if (student1){
        
                var file = path.join(variable+'.pdf');
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
}