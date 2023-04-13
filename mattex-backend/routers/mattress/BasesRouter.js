const express = require("express");
const models = require("../../Models");
let basesRouter = express.Router();

const jsonParser = express.json();

basesRouter.get("/", function(req, res){
    models.MattressBase.find({}, function(err, results){
        if(err) return console.log(err);
        res.send(results)
    });
});

basesRouter.get("/:id", function(req, res){
    const id = req.params.id;
    models.MattressBase.findOne({_id: id}, function(err, result){

        if(err) return console.log(err);
        res.send(result);
    });
});

basesRouter.post("/", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imgSrc = req.body.imgSrc;

    const mattressBase = new models.MattressBase({title, description, price, imgSrc});

    mattressBase.save(function(err){
        if(err) return console.log(err);
        res.send(mattressBase);
    });
});

basesRouter.delete("/:id", function(req, res){
    const id = req.params.id;

    models.MattressBase.findByIdAndDelete(id, function(err, result){
        if(err) return console.log(err);
        res.send(result);
    });
});

basesRouter.put("/", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imgSrc = req.body.imgSrc;

    const newMattressBase = {title, description, price, imgSrc};

    models.MattressBase.findOneAndUpdate({_id: id}, newMattressBase, {new: true}, function(err, result){
        if(err) return console.log(err);
        res.send(result);
    });
});

module.exports = basesRouter;