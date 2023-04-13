const mongoose = require("mongoose");
const schemas = require("./Schemas");

let MattressCase = mongoose.model("MattressCase", schemas.MattressCaseSchema);
let MattressLayer = mongoose.model("MattressLayer", schemas.MattressLayerSchema);
let MattressBase = mongoose.model("MattressBase", schemas.MattressBaseSchema);
let Mattress = mongoose.model("Mattress", schemas.MattressSchema);
let CatalogMattress = mongoose.model("CatalogMattress", schemas.CatalogMattressSchema);
let Order = mongoose.model("Order", schemas.OrderSchema);
let User = mongoose.model("User", schemas.UserSchema);
let Size = mongoose.model("Size", schemas.SizeSchema);

module.exports = {
    MattressCase,
    MattressLayer,
    MattressBase,
    Mattress,
    CatalogMattress,
    Order,
    User,
    Size
}
