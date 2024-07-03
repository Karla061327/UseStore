


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

productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc,ret, options){
        delete ret._id;
        delete ret.password;
    }
});

export const ProductModel = mongoose.model('Product', productSchema)