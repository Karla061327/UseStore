

import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'Name is required']
    },
    avaliable: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
categorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc,ret, options){
        delete ret._id;
        delete ret.pasword;
    }
})

export const CategoryModel = mongoose.model('Category', categorySchema)