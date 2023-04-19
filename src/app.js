const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')
let public_folder_path = path.join(__dirname,'../public');
let views_path = path.join(__dirname,'../templates/views');
let partials_path = path.join(__dirname,'../templates/partials');
const port = process.env.PORT || 3000;

//If we want to work with nodemon & hbs we need to start it like this: nodemon app.js -e js,hbs

app.set('view engine', 'hbs');
//hbs requires a folder named 'views' in src file
app.set('views',views_path);
//this is to be able to change 'views' folder name or location
//now we can name folder 'templates' instead of 'views'
//and we can locate it in the root dir (or anywhere else) instead of inside src
hbs.registerPartials(partials_path);

app.use(express.static(public_folder_path)); 
//it's going to find index.html
//no need to add '/' endpoint

app.get('/',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'Alejandra Perdomo'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send('You must provide location!');
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send(error);
        }else{
            forecast(data.longitude,data.latitude,(error,info)=>{
                if(error){
                    return res.send(error);
                }else{
                    res.send({
                        forecast:info,
                        location:data.location
                    })
                }
            })
        }
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'Alejandra Perdomo'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        help_text:'help hbs page',
        title:'help title',
        name:'Alejandra Perdomo'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        msg:'Help article not found! hbs',
        name:'Alejandra Perdomo'
    });
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term',
        })
    }

    res.send({
        products:[]
    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        msg:'404 page not found! hbs',
        name:'Alejandra Perdomo'
    });
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}...`);
})


