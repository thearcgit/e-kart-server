import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    name: {
        type: String,
    },
    role: {
        type: String,
        default:"user"
    },
    addresses: {
        type: [mongoose.Schema.Types.Mixed],
        default:[]
    },
    
    
  
    
    
},{timestamps:true});

const virtual = userSchema.virtual('id')
virtual.get(function(){
    return this._id
})
userSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
        transform:function(doc,ret){delete ret._id}
    }
)
const User = mongoose.model('User', userSchema);

export default User

