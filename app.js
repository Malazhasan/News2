//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const requset = require("request");
//const api = require("./private.js").api;
//const link = require("./private.js").url;

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.route("/")
    .get(function (req, res) {
        res.sendFile(__dirname + "/index.html");
    })
    .post(function (req, res) {
        const firstName = req.body.fn;
        const lastName = req.body.ln;
        const email = req.body.email;
        const data = {
            members: [
                {
                    email_address: email,
                    status: "subscribed",
                    merge_fields: {
                        FNAME: firstName,
                        LNAME: lastName,
                    }
                }
            ]
        };
        const jdata = JSON.stringify(data);
        //console.log(jdata);
        const url = process.env.url;
        const options = {
            method: "POST",
            auth: process.env.api
        };
        const request = https.request(url, options, function (response) {
            console.log(response.statusCode);
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            }
            else {
                res.sendFile(__dirname + "/failure.html");
            }
            response.on("data", function (data) {
               //res.send("d:" + data);
                 //  console.log(JSON.parse(data))
                 //  console.log(data)
            });
        });
      
        request.write(jdata);
        request.end();

    });
app.post("/fail", function (req, res) {
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000.");
});


//44b51ea6ceffc0ea1ea4087cbe630066-us10
//f345fb7d22
//https://stark-river-48888.herokuapp.com