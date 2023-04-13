const express = require("express");
const models = require("../../Models");

const usersRouter = express.Router();
const jsonParser = express.json();

usersRouter.get("/", function(req, res){
    models.User.find({}, function(err, results){
        if(err) return console.log(err);
        res.send(results)
    });
});

usersRouter.get("/:id", function(req, res){
    const id = req.params.id;
    models.User.findOne({_id: id}, function(err, result){

        if(err) return console.log(err);
        res.send(result);
    });
});

usersRouter.get("/:id/coefficient", function(req, res){
    const id = req.params.id;
    models.User.findOne({_id: id}, function(err, result){

        if(err) return console.log(err);
        res.json(result.coefficient);
    });
});

usersRouter.post("/", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const login = req.body.login;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const phone = req.body.phone;

    const user = new models.User({login, password, fullName, phone, coefficient: 1, role: 2});

    user.save(function(err){
        if(err) return console.log(err);
        res.send(user);
    });
});

usersRouter.post("/login", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const login = req.body.login;
    const password = req.body.password;

    models.User.findOne({login, password},function(err, doc){
        if(err) return console.log(err);

        if(doc !== null){
            res.send(doc);
        }else{
            res.send(false);
        }
    });
});

usersRouter.put("/", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const id = req.body.id;
    const coefficient = req.body.coefficient;

    const newUser = {coefficient};

    models.User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, result){
        if(err) return console.log(err);
        res.send(result);
    });
});

usersRouter.put("/edit", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const id = req.body.id;
    const fullName = req.body.fullName;
    const phone = req.body.phone;

    let newInfo = {
        fullName,
        phone
    }

    models.User.findOneAndUpdate({_id: id}, newInfo, {new: true}, function(err, result){
        if(err) return console.log(err);
        res.send(result);
    });
});

module.exports = usersRouter;
