//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const _ = require("lodash");
const app = express();

const randomText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const myLogs = [{ title: "hello", date: "2020-07-01", log: "This is log" }];

app.get("/" || "/home", (req, res) => {
    res.render("home", { page_name: 'home', logList: myLogs });
});

app.get("/about", (req, res) => {
    res.render("about", { page_name: 'about', aboutContent: randomText });
});

app.get("/contact", (req, res) => {
    res.render("contact", { page_name: 'contact', contactContent: randomText });
});

app.get("/compose", (req, res) => {
    res.render("compose", { page_name: 'compose', });
});

app.get("/title",(req,res)=>{
    res.render("log",{});
});

app.get("/title/:logTitle", (req, res) => {
    var logToReturn = [];
    myLogs.forEach((log) => {
        if (_.lowerCase(log.title.toString()) === _.lowerCase(req.params.logTitle.toString())) {
            logToReturn.push({ title: log.title, date: log.date, log: log.log });
        }
    });
    res.render("log", {logList:logToReturn});
});

app.get("/date/:logDate", (req, res) => {
    var logToReturn = [];
    var reqDate = new Date(req.params.logDate.toString());
    myLogs.forEach((log) => {
        var postDate = new Date(log.date.toString());
        if (reqDate.getTime() === postDate.getTime()) {
            logToReturn.push({ title: log.title, date: log.date, log: log.log });
        }
    });
    res.render("log", {logList:logToReturn});
});

app.post("/compose", (req, res) => {
    var body = {
        title: req.body.title.toString().toUpperCase(),
        date: (req.body.date), //new Date(req.body.date)
        log: req.body.log
    };
    if (body) {
        myLogs.push(body);
        res.redirect("/");
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started at port http://localhost:3000');
});
