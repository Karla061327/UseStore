


import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'Name is required'],
        unique: true,
    },
    avaliable: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        default: 0,
    },
    descrption:{
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

export const productModel = mongoose.model('Product', productSchema)