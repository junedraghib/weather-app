const express = require('express')

//path is a core nodejs module, so no need to install it using npm
const path = require('path')
//hbs is the template or views engine
const hbs = require('hbs')

//getting port value from the evvironment variable OR 3000 on local host
const port = process.env.PORT || 3000
//require local file
const geocode = require("./utils/geocode") 
const forecast = require("./utils/forecast") 
//returns current directory absolute path
// console.log(__dirname)
//returns current file's absolute path
// console.log(__filename)

//path.join() joins the path
// console.log(path.join(__dirname, '../public'))

//using express() to create a server
const app = express()

//setting up public paths
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

//setting up public directory
app.use(express.static(publicDirPath))

//app.com
//app.com/help
//app.com/about

//all the above and many more such url are going to run on a single 
//express server called app(in this case), we have assigned variour routes


//installed hbs which use  handlebars behind the scene for
//loading templates, i.e we can fix header and footer for all the 
//pages in our website

//app.set() allows to set values for settings

//setting up handlebar and views settings
app.set('view engine', 'hbs')
app.set('views', viewPath)
  
//registering the partials:templates like headers and footer 
//which doesn't change through the pages dir with hbs:template engin
hbs.registerPartials(partialPath) 

//app.get() is use to identifies the route that is being requested
//by the client
app.get('', (req, res) => {
    // res.send('Hello Express!!')
    res.render("index", {
        title : "Weather App",
        name : "juned raghib"
    })
})

app.get('/help', (req, res) => {
    // res.send('<h1>help page!!<h1>')
    // console.log(req.query)
    res.render("help",{
        title:"Help Page",
        name: "juned raghib",
        message :"this is the help message being rendered from the dyanamic template engine"
    })
})

app.get('/about', (req, res) => {
    // res.send({
    //     about:"this is the about string",
    //     time:"the time is "
    // })

    res.render("about", {
        title:"About Page", 
        name: "juned raghib",
        content: "this is the about page"
    })
})

app.get('/weather', (req, res) => {
    // res.send('<h1>help page!!<h1>')
    // console.log(req.query)

    if (!req.query.address) {
        return res.send({
            error:"at least send your address "
        })
    }

    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error:error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error:error
                })
            }

            res.send({
                forecast:forecastData,
                location,
                address:address
            })
        })
    })
    
})


//setting up specific 404 page 
app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help Article Not Found",
        name: "juned raghib"
    })
})


//setting up the 404 page 
app.get("*", (req, res) => {
    res.render("404",{
        title:"404",
        errorMessage:"Page Not Found",
        name:"juned raghib"
    })
})

//used to make server listen on port 3000
app.listen(port, () => {
    console.log("server is up on port on port "+port)
})

