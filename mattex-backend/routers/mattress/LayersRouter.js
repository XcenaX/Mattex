const express = require("express");
const models = require("../../Models");
let layersRouter = express.Router();

const jsonParser = express.json();

layersRouter.get("/", function(req, res){
    models.MattressLayer.find({}, function(err, results){
        if(err) return console.log(err);
        res.send(results)
    });
});

layersRouter.get("/:id", function(req, res){

    const id = req.params.id;
    models.MattressLayer.findOne({_id: id}, function(err, result){
        if(err) return console.log(err);
        res.send(result);
    });
});

layersRouter.post("/", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const title = req.body.title;
    const description = req.body.description;
    const thickness = req.body.thickness;
    const price = req.body.price;
    const imgSrc = req.body.imgSrc;

    const mattressLayer = new models.MattressLayer({title, description, thickness, price, imgSrc});

    mattressLayer.save(function(err){
        if(err) return console.log(err);
        res.send(mattressLayer);
    });
});

layersRouter.delete("/:id", function(req, res){
    const id = req.params.id;

    models.MattressLayer.findByIdAndDelete(id, function(err, result){
        if(err) return console.log(err);
        res.send(result);
    });
});

layersRouter.put("/", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const thickness = req.body.thickness;
    const price = req.body.price;
    const imgSrc = req.body.imgSrc;

    const newMattressLayer = {title, description, thickness, price, imgSrc};

    models.MattressLayer.findOneAndUpdate({_id: id}, newMattressLayer, {new: true}, function(err, result){
        if(err) return console.log(err);
        res.send(result);
    });
});

module.exports = layersRouter;