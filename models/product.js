import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    discountPercentage: {
        type: Number,
        required: [true, 'Discount percentage is required'],
        min: [0, 'Discount percentage cannot be less than 0'],
        max: [100, 'Discount percentage cannot be more than 100']
    },
    stock: {
        type: Number,
        default:0
    },
    rating: {
        type: Number,
        min: [0, 'Rating should not be less than 0'],
        max: [5, 'Rating should not be greater than 5'],
        default:1
    },
    brand: {
        type: String,
        required: [true, 'Brand is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    thumbnail: {
        type: String,
        default: ''
    },
    images: {
        type: [String],
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    },
    
},{timestamps:true});

const virtual = productSchema.virtual('id')
virtual.get(function(){
    return this._id
})
productSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
        transform:function(doc,ret){delete ret._id}
    }
)
const Product = mongoose.model('Product', productSchema);

export default Product

