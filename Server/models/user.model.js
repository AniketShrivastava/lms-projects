import mongoose,{Schema,model} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new Schema(
    {

        fullName: {
            type: String,
            required: [true, 'Name is required'],
            minlength: [5, 'Name must be at least 5 characters'],
            lowercase: true ,
            trim: true, // Removes unnecessary spaces
          },
          email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            match: [
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              'Please fill in a valid email address',
            ], // Matches email against regex
          },
          password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters'],
            select: false, // Will not select password upon looking up a document
          },
          role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER',
          },
          avatar:{
            type:String
          },
          secure_url:{
            type:String
          },

          forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    },
    {
        timestamps:true
    }
)

userSchema.pre('save',async function (){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
})
userSchema.method ={
    comparePassword: async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password)
    },
    generateJWTToken: async function(){
        return jwt.sign(
            {id:this._id,role:this.role,email:this.email,subscription:this.subscription},
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRY
            }
        )
    }
}


const User = model('User', userSchema);

export default User;