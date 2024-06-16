import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
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

const virtual = brandSchema.virtual('id')
virtual.get(function(){
    return this._id
})
brandSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
        transform:function(doc,ret){delete ret._id}
    }
)
const Brand = mongoose.model('Brand', brandSchema);

export default Brand

