const mongoose = require("mongoose");
const express = require("express");
const mattressRouter = require("./routers/mattress/MattressesRouter");
const usersRouter = require("./routers/user/UsersRouter");
const ordersRouter = require("./routers/order/OrdersRouter");
const fileRouter = require("./routers/file/FileRouter");
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*'
}));
// 17.0.1
//const CONNECTION_STRING = `mongodb+srv://realibi:intersekt01@cluster0.8rc2y.mongodb.net/?retryWrites=true&w=majority`;
//const CONNECTION_STRING = `mongodb://localhost:27017/?tls=false`;
const CONNECTION_STRING = "mongodb+srv://flexgenerator:HDZ7ihDKM0LddZd0@cluster0.rvrlz5e.mongodb.net/?retryWrites=true&w=majority"
// password HDZ7ihDKM0LddZd0
// login flexgenerator

mongoose.connect(CONNECTION_STRING,
    // {
    //     useUnifiedTopology: true,
    //     useNewUrlParser: true
    // },
    function(err){
        if(err) return console.log(err);
        const PORT = process.env.PORT || 3030;
        app.listen(PORT, function(){
            console.log("Сервер ожидает подключения на порту " + PORT);
        });
});

app.use("/api/mattresses", mattressRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/file", fileRouter);
