import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: [true, 'Label is required'],
    },
    product: {
        type: mongoose.ObjectId,
        required: [true, 'Product is required'],
        ref:"Product"
    },
    user: {
        type: mongoose.ObjectId,
        required: [true, 'User is required'],
        ref:"User"
    },
    
  
    
    
},{timestamps:true});

const virtual = cartSchema.virtual('id')
virtual.get(function(){
    return this._id
})
cartSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
        transform:function(doc,ret){delete ret._id}
    }
)
const Cart = mongoose.model('Cart', cartSchema);

export default Cart

