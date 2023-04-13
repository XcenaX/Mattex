const express = require("express");
const models = require("../../Models");

const ordersRouter = express.Router();
const jsonParser = express.json();

ordersRouter.get("/", function(req, res){
    models.Order.find({}, function(err, results){
        if(err) return console.log(err);
        res.send(results)
    });
});

ordersRouter.get("/user/:id", async function(req, res){
    const id = req.params.id;
    let user = await models.User.findById(id);

    models.Order.find({"user._id": id}, function(err, results){
        if(err) return console.log(err);
        res.send(results)
    });
});

ordersRouter.delete("/:id", function(req, res){
    const id = req.params.id;

    models.Order.findByIdAndDelete(id, function(err, result){
        if(err) return console.log(err);
        res.send(result);
    });
});

ordersRouter.get("/:id", function(req, res){
    const id = req.params.id;
    models.Order.findOne({_id: id}, function(err, result){

        if(err) return console.log(err);
        res.send(result);
    });
});

ordersRouter.post("/", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const phone = req.body.password;
    const mattress = req.body.mattress;
    const catalogMattress = req.body.catalogMattress;
    const user = req.body.user;
    const totalSum = req.body.totalSum;
    const size = req.body.size;
    const price = req.body.price;
    const date = new Date();

    const order = new models.Order({phone, mattress, catalogMattress, size, user, totalSum, price, date});

    order.save(function(err){
        if(err) return console.log(err);
        res.status(201).send(order);
    });
});

module.exports = ordersRouter;
