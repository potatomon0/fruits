const express = require("express")
const app = express()
const fruits = require('./models/fruits')
//--------Middleware-----------
app.set("view engine", "jsx");
//need to run command npm i express-react-view to install this dependency
app.engine("jsx", require("express-react-views").createEngine());
// app.engine("jsx",require("jsx-view-engine").createEngine())
app.use(express.urlencoded({extended:false}));
//express.urlencoded is a built in method that sort(?) the data and determine what needsto be done (?)
//in this case express.urlencoded access the data that was posted to fruits
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

//---------Index => All fruits -----------
//each app.get() is a route handler
app.get('/fruits', (req, res) => {
    res.render('Index',{fruits:fruits})
})
//let the code know some data will be posted to fruits(?)
// app.post('/fruits', (req, res) => {
//     res.send('hi');
// });
app.post('/fruits', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    fruits.push(req.body);
    console.log(fruits);
    res.redirect('/fruits')
});
//New makes a form for user to submit data on a new fruit, it is posted to fruits upon submit
app.get('/fruits/new',(req,res)=>{
    res.render('New')
})
//--------Show => EachFruit
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    res.render('Show',{
        fruit: fruits[req.params.indexOfFruitsArray]
    })
})

//Models
    //data (javascript)

app.listen(3000, (req, res) => {
    console.log(`Yerr on 3k`)
})