import {model, models, Schema } from 'mongoose';
import { type } from 'os';

const OrderSchema = new Schema({
    userEmail :String,
    phone: Number,
    streetAddress: String,
    postalCode: String,
    city:String,
    cartProducts: Object,
    paid: {type: Boolean, default: true}
});

export const Order = models?.Order || model('Order', OrderSchema)