const express = require("express");
const models = require("../../Models");
let catalogMattresses = express.Router();

const jsonParser = express.json();

catalogMattresses.get("/", function(req, res){
    models.CatalogMattress.find({}, function(err, results){
        if(err) return console.log(err);
        res.send(results)
    });
});

catalogMattresses.get("/:id", function(req, res){
    const id = req.params.id;
    models.CatalogMattress.findOne({_id: id}, function(err, result){

        if(err) return console.log(err);
        res.send(result);
    });
});

catalogMattresses.post("/", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const name = req.body.name;
    const cloth = req.body.cloth;
    const height = req.body.height;
    const load = req.body.load;
    const price = req.body.price;
    const image = req.body.image;
    const sizes = req.body.sizes;
    const rigidity = req.body.rigidity;
    const description = req.body.description;

    const newCatalogMattress = new models.CatalogMattress({name, cloth, height, load, price, image, sizes, rigidity, description});

    newCatalogMattress.save(function(err){
        if(err) return console.log(err);
        res.send(newCatalogMattress);
    });
});

catalogMattresses.delete("/:id", function(req, res){
    const id = req.params.id;

    models.CatalogMattress.findByIdAndDelete(id, function(err, result){
        if(err) return console.log(err);
        res.send(result);
    });
});

catalogMattresses.put("/", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const id = req.body.id;
    const name = req.body.name;
    const cloth = req.body.cloth;
    const height = req.body.height;
    const load = req.body.load;
    const price = req.body.price;

    const newCatalogMattress = {name, cloth, height, load, price};

    models.CatalogMattress.findOneAndUpdate({_id: id}, newCatalogMattress, {new: true}, function(err, result){
        if(err) return console.log(err);
        res.send(result);
    });
});

module.exports = catalogMattresses;
