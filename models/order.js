
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    items: {
        type: [mongoose.Schema.Types.Mixed,],
        required: [true, 'item is required'],
    },
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required'],
    },
    totalItems: {
        type: Number,
        required: [true, 'Total item is required'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required'],
    },
    selectedAddress: {
        type: [mongoose.Schema.Types.Mixed],
        required: [true, 'Shipping address is required'],
    },
    status: {
        type: String,
        default:"Pending"
    },
    user: {
        type: mongoose.ObjectId,
        required: [true, 'User is required'],
        ref:"User"
    },
    
  
    
    
},{timestamps:true});

const virtual = orderSchema.virtual('id')
virtual.get(function(){
    return this._id
})
orderSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
        transform:function(doc,ret){delete ret._id}
    }
)
const Order = mongoose.model('Order', orderSchema);

export default Order

