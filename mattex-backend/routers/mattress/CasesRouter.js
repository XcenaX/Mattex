const express = require("express");
const models = require("../../Models");
let casesRouter = express.Router();

const jsonParser = express.json();

casesRouter.get("/", function(req, res){
    models.MattressCase.find({}, function(err, results){
        if(err) return console.log(err);
        res.send(results)
    });
});

casesRouter.get("/:id", function(req, res){

    const id = req.params.id;
    models.MattressCase.findOne({_id: id}, function(err, result){

        if(err) return console.log(err);
        res.send(result);
    });
});

casesRouter.post("/", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imgSrc = req.body.imgSrc;

    const mattressCase = new models.MattressCase({title, description, price, imgSrc});

    mattressCase.save(function(err){
        if(err) return console.log(err);
        res.send(mattressCase);
    });
});

casesRouter.delete("/:id", function(req, res){
    const id = req.params.id;

    models.MattressCase.findByIdAndDelete(id, function(err, result){
        if(err) return console.log(err);
        res.send(result);
    });
});

casesRouter.put("/", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imgSrc = req.body.imgSrc;

    const newMattressCase = {title, description, price, imgSrc};

    models.MattressCase.findOneAndUpdate({_id: id}, newMattressCase, {new: true}, function(err, result){
        if(err) return console.log(err);
        res.send(result);
    });
});

module.exports = casesRouter;