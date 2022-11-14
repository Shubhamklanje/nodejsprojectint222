var express = require('express');
const registerSchema = require('./BACKEND/registersetup')
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
let alert = require('alert');
const blogSchema = require('./BACKEND/blogSechma')

const { Router } = require('express');
const blogSechma = require('./BACKEND/blogSechma');
var app = express();
app.use(bodyParse.urlencoded({ extended: false }))
app.set("view engine", "ejs");
// parse application/json
app.use(bodyParse.json())
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/student', { useNewUrlParser: true })
const db = mongoose.connection;
db.on("error", () => { console.log("error in connection"); })
db.on('open', () => { console.log("Connected to server"); })

var router = express.Router();
app.use('/', router)
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "hp.html");
});
app.get('/login', function (req, res) {
    res.sendFile(__dirname + "/" + 'login.html');
});
app.get('/create', function (req, res) {
    res.sendFile(__dirname + "/" + 'create.html');
});
app.get('/about', function (req, res) {
    res.sendFile(__dirname + "/" + 'about.html');
});
app.get('/blogdone', function (req, res) {
    res.sendFile(__dirname + "/" + 'blogdone.html');
})
app.post('/hpd', async (req, res) => {
    try {
        const {
            user,
            mobile,
            email,
            password,
            cpassword
        } = req.body;

        if (password === cpassword) {
            const userdata = new registerSchema({
                user,
                mobile,
                email,
                password,
            })
            userdata.save(err => {
                if (err) {
                    console.log('error in userdata')
                } else {
                    res.sendFile(__dirname + "/" + 'login.html');
                }
            })
        } else {
            alert("Password and Comfrim not matching plz make sure it matches");
            const myTimeout = setTimeout(myGreeting, 5000);
            function myGreeting() {
                res.sendFile(__dirname + "/" + "hp.html");
            }
        }
    } catch (error) {
        console.log("error aya hai try catch mai");
    }
})

// login
app.post('/log', function (req, res) {

    const {
        email,
        password
    } = req.body;

    registerSchema.findOne({ email: email }, (err, result) => {
        if (email === result.email && password === result.password) {
            res.redirect('homepage');
        } else {
            alert("Invalid email and pass word plz corect it !!!");
            const myTimeout = setTimeout(myGreeting, 5000);
            function myGreeting() {
                res.sendFile(__dirname + "/" + 'login.html');
            }
        }
    })
})

app.post('/card', async(req,res)=>{

    try {
        const{
            title,
            description,
            text
        }= req.body;

        const userblog = new blogSchema({
            title,
            description,
            text,
        })
        userblog.save(err => {
            if (err) {
                console.log('error in userdata')
            } else {
                res.sendFile(__dirname + "/" + 'blogdone.html');
            }
        })

       
        
    } catch (error) {
        console.log("error aya hai try catch mai in cards module");
    }

})
app.get("/homepage", function (req, res) {
    
    blogSchema.find({}, function(err, data) {
        res.render('homepage',{datas : data})
        //console.log(data)
    })
    })
app.post('/:id', async (req, res) => {
  await blogSechma.deleteOne({_id: req.params.id})
  return res.redirect('homepage')
});


app.listen(2000, function (err) {
    if (err) { console.error(err); }
    else { console.log("Server started"); }
});
