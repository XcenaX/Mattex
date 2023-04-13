const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MattressCaseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imgSrc: String
})

const MattressLayerSchema = new Schema({
    title: String,
    description: String,
    thickness: Number,
    price: Number,
    imgSrc: String
});

const MattressBaseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imgSrc: String
});

const SizeSchema = new Schema({
    width: Number,
    price: Number
});

const MattressSchema = new Schema({
    measurerRequired: Boolean,
    form: String,
    size: String,
    case: MattressCaseSchema,
    side1: [MattressLayerSchema],
    side2: [MattressLayerSchema],
    base: MattressBaseSchema,
});

const CatalogMattressSchema = new Schema({
    name: String,
    cloth: String,
    height: Number,
    load: Number,
    price: Number,
    image: String,
    sizes: [SizeSchema],
    rigidity: String,
    description: String
});

const UserSchema = new Schema({
    login: String,
    password: String,
    fullName: String,
    phone: String,
    coefficient: Number,
    role: Number
});

const OrderSchema = new Schema({
    mattress: MattressSchema,
    catalogMattress: CatalogMattressSchema,
    user: UserSchema,
    loggedIn: Boolean,
    size: String,
    phone: String,
    date: Date,
    totalSum: Number
});

module.exports = {
    MattressCaseSchema,
    MattressLayerSchema,
    MattressBaseSchema,
    MattressSchema,
    CatalogMattressSchema,
    UserSchema,
    OrderSchema,
    SizeSchema
}
