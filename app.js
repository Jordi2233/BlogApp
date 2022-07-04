// Require section
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const _ = require("lodash");
const mongoose = require("mongoose");
const {
    stringify
} = require("querystring");

const homeStartingContent = "I'm baby yuccie gluten-free vice, meditation swag kickstarter kogi pug fanny pack DIY. Slow-carb snackwave tacos kale chips bicycle rights squid. IPhone leggings venmo meggings snackwave four loko bushwick. PBR&B hammock gluten-free selvage, copper mug kickstarter quinoa af sartorial trust fund banjo banh mi actually. Photo booth beard microdosing flannel portland. Kogi keffiyeh crucifix messenger bag af readymade poke food truck, tumeric raw denim typewriter kinfolk prism subway tile.";
const aboutContent = "Bushwick migas actually meditation tote bag direct trade. Ethical ramps hashtag sartorial taiyaki keytar adaptogen everyday carry la croix raclette. Poke shaman chartreuse cardigan tote bag fam. Glossier hammock fanny pack selvage, truffaut four loko godard flexitarian brooklyn artisan. Cred blue bottle pour-over YOLO drinking vinegar health goth keffiyeh fashion axe schlitz you probably haven't heard of them hexagon. Trust fund gochujang hammock, fixie sriracha hashtag banjo green juice +1.";
const contactContent = "Air plant twee hammock whatever beard, pok pok tbh literally trust fund aesthetic cray mixtape jean shorts tote bag. Plaid messenger bag schlitz af, bushwick polaroid asymmetrical hashtag umami narwhal. Lumbersexual disrupt enamel pin, VHS everyday carry dreamcatcher jean shorts etsy kitsch food truck man braid chartreuse. Dreamcatcher migas shaman pickled sriracha DIY leggings squid kitsch microdosing. Subway tile chillwave squid, pabst bespoke farm-to-table pop-up yuccie wayfarers man bun beard organic. Shoreditch try-hard fanny pack kitsch readymade blue bottle. Twee sriracha thundercats, iceland flannel franzen listicle copper mug unicorn fanny pack vinyl.";

const app = express();


// *****************************************************************************

// connect to db via uri
const mongoConnect = async () => {
    mongoose.connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log("Connected correctly to server");
    });
}

const postSchema = {
    title: String,
    content: String
}

const Post = mongoose.model("Post", postSchema);


// *****************************************************************************
// use and set section

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

// *****************************************************************************
// Get section

const run = async () => {
    try {
        await mongoConnect();
app.get("/", (req, res) => {

    Post.find({}, (err, foundPosts) => {
        res.render("home", {
            homeStartingContent: homeStartingContent,
            posts: foundPosts
        });
    })


});

app.get("/about", (req, res) => {
    res.render("about", {
        aboutContent: aboutContent
    });
});

app.get("/contact", (req, res) => {
    res.render("contact", {
        contactContent: contactContent
    });
});

app.get("/compose", (req, res) => {
    res.render("compose");
});

app.get("/delete", (req, res) => {
    Post.find({}, (err, foundPosts) => {
        res.render("delete", {
            homeStartingContent: homeStartingContent,
            posts: foundPosts
        });
    })
})

app.get("/posts/:postName", (req, res) => {

    const reqTitle = req.params.postName;

    Post.findOne({
        title: reqTitle
    }, (err, foundPosts) => {
        if (err) {
            console.log(err);
        } else {
            res.render("post", {
                postTitle: foundPosts.title,
                postContent: foundPosts.content
            });
        }
    });

});

// *****************************************************************************
// Post section

app.post("/compose", (req, res) => {
    const postTitle = req.body.newTitle;
    const postContent = req.body.newText;

    const post = new Post({
        title: req.body.newTitle,
        content: postContent
    })

    post.save();

    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const postId = req.body.checkbox;
    // console.log(typeof postId);

    if (typeof postId === "string") {
        Post.findByIdAndRemove(postId, (err) => {
            if (!err) {
                console.log("Successfully deleted checked item.");
                res.redirect("/");
            }
        });
    } else {
        Post.deleteMany({_id: {$in: postId}}, (err) => {
            if (!err) {
                console.log("Successfully deleted checked item.");
                res.redirect("/");
            }
        });
    }

});



// *****************************************************************************
// Listen section


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, () => {
  console.log("Server started successfully");
});
    }
    catch (err) {
        console.log(err)
    }

}

run().catch(console.dir);