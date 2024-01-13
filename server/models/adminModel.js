const mongoose=require('mongoose');

const adminTemplate=new mongoose.Schema({
    adminName:{type:String},
    adminId:{type:String,required:true,unique:true},
    adminPwd:{type:String}
});

adminData=mongoose.model('admin',adminTemplate);
module.exports=adminData;