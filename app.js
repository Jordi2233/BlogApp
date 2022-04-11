// variables section

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const _ = require("lodash");

const homeStartingContent = "I'm baby yuccie gluten-free vice, meditation swag kickstarter kogi pug fanny pack DIY. Slow-carb snackwave tacos kale chips bicycle rights squid. IPhone leggings venmo meggings snackwave four loko bushwick. PBR&B hammock gluten-free selvage, copper mug kickstarter quinoa af sartorial trust fund banjo banh mi actually. Photo booth beard microdosing flannel portland. Kogi keffiyeh crucifix messenger bag af readymade poke food truck, tumeric raw denim typewriter kinfolk prism subway tile.";
const aboutContent = "Bushwick migas actually meditation tote bag direct trade. Ethical ramps hashtag sartorial taiyaki keytar adaptogen everyday carry la croix raclette. Poke shaman chartreuse cardigan tote bag fam. Glossier hammock fanny pack selvage, truffaut four loko godard flexitarian brooklyn artisan. Cred blue bottle pour-over YOLO drinking vinegar health goth keffiyeh fashion axe schlitz you probably haven't heard of them hexagon. Trust fund gochujang hammock, fixie sriracha hashtag banjo green juice +1.";
const contactContent = "Air plant twee hammock whatever beard, pok pok tbh literally trust fund aesthetic cray mixtape jean shorts tote bag. Plaid messenger bag schlitz af, bushwick polaroid asymmetrical hashtag umami narwhal. Lumbersexual disrupt enamel pin, VHS everyday carry dreamcatcher jean shorts etsy kitsch food truck man braid chartreuse. Dreamcatcher migas shaman pickled sriracha DIY leggings squid kitsch microdosing. Subway tile chillwave squid, pabst bespoke farm-to-table pop-up yuccie wayfarers man bun beard organic. Shoreditch try-hard fanny pack kitsch readymade blue bottle. Twee sriracha thundercats, iceland flannel franzen listicle copper mug unicorn fanny pack vinyl.";

const app = express();

let posts = [];

// *****************************************************************************
// use and set section

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

// *****************************************************************************
// Get section

app.get("/", function (req, res) {
    res.render("home", {
        homeStartingContent: homeStartingContent,
        posts: posts
    });
});

app.get("/about", function (req, res) {
    res.render("about", {
        aboutContent: aboutContent
    });
});

app.get("/contact", function (req, res) {
    res.render("contact", {
        contactContent: contactContent
    });
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.get("/posts/:postName", function (req, res) {

    const reqTitle = _.lowerCase(req.params.postName);

    posts.forEach(function (post) {
        const storedTitle = _.lowerCase(post.title);

        if (reqTitle === storedTitle) {
            res.render("post", {
                postTitle: post.title,
                postContent: post.content
            });
        }
    })
});

// *****************************************************************************
// Post section

app.post("/compose", function (req, res) {
    const newPost = {
        title: req.body.newTitle,
        content: req.body.newText
    }
    posts.push(newPost);

    res.redirect("/");
});



// *****************************************************************************
// Listen section

app.listen(3000, function () {
    console.log("Server started on port 3000");
});