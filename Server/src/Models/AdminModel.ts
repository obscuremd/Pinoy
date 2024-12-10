import mongoose, { models } from "mongoose";

const adminSchema = new mongoose.Schema({
    companyName: {type:String},
    admins:{type:[String]},
    drivers: {type:[String]}
});

const Admin = models.adminData || mongoose.model('adminData', adminSchema);
export default Admin;
