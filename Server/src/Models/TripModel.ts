import mongoose, { models } from "mongoose";

const tripSchema = new mongoose.Schema({
    driver_id: { type: String},
    passenger_id: { type: String},
    activity: { type: Boolean, default: false },
    start_location: { type: {lng :{type:Number}, lat:{type:Number}}, default: null},
    destination: { type: {lng :{type:Number}, lat:{type:Number}}, default: null},
    price:{type:String},
    total_time: { type: String, default:'--:--'}
}, {timestamps:true});

const Trip = models.tripData || mongoose.model('tripData', tripSchema);
export default Trip;
