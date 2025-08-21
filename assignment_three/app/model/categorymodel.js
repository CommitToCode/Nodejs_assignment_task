const mongoose=require('mongoose')
const Schema=mongoose.Schema
const categorySchema=new Schema({
     category_name: {
        type: String,
        required: true,
        trim: true
    },
    slug:{type:String,lower: true },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "ProductModel", 
        required: true
    }
}, { timestamps: true });
const categoryModel=mongoose.model('category',categorySchema)
module.exports=categoryModel