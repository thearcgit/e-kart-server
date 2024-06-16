import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    label: {
        type: String,
        required: [true, 'Label is required'],
        unique: true
    },
    value: {
        type: String,
        required: [true, 'Value is required'],
        unique: true
    },
    
  
    
    
},{timestamps:true});

const virtual = categorySchema.virtual('id')
virtual.get(function(){
    return this._id
})
categorySchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
        transform:function(doc,ret){delete ret._id}
    }
)
const Category = mongoose.model('Category', categorySchema);

export default Category

