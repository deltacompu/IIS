const express = require ('express');
const app = new express();
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const homeController = require('./controllers/home');
const onlineController = require('./controllers/online');
const studentFoundController = require('./controllers/studentFound');
const notFoundController = require('./controllers/notFound');
const verificarPost = require('./controllers/verificarPost');
const descargarPDFPost = require('./controllers/descargarPDFPost');

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.get('/',homeController);
app.get('/online',onlineController);
app.get('/studentFound',studentFoundController);
app.get('/notFound',notFoundController);
app.post('/posts/verificar',verificarPost);
app.post('/posts/descargarPDF',descargarPDFPost);

mongoose.connect('mongodb://localhost/students',{useNewUrlParser:true});

app.listen(3000, ()=>{
    console.log('Server running on port 3000')
})
