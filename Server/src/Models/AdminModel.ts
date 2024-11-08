import mongoose, { models } from "mongoose";

const adminSchema = new mongoose.Schema({
    drivers: {type:[String]}
});

const Admin = models.adminData || mongoose.model('adminData', adminSchema);
export default Admin;
