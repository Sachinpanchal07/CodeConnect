const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value){ // custom validator functions
        if(!validator.isEmail(value)){
          throw new Error("invalid email address " + value);
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("enter a strong password");
        }
      } 
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum:{
        values:["male", "female", "other"],
        message:`{VALUE} is not valid`
      }
      // validate(value) {
      //   if (!["male", "female", "other"].includes(value)) {
      //     throw new Error("Gender is not valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpY5LtQ47cqncKMYWucFP41NtJvXU06-tnQ&s",
        validate(value){
          if(!validator.isURL(value)){
            throw new Error("invalid photo url address");
          }
        }  
    },
    about: {
      type: String,
      default: "This is the default about of user",
    },
    skills: {
      type: [String],
    },
    isVerified : {
      type: Boolean,
      default: false
    },
    otp:{
      type: String,
    },
    otpExpiry: {
      type: Date
    },
    isPremium: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

// schema methods
userSchema.methods.getJWT =  function () {
    const token =  jwt.sign({_id:this._id}, "mySecretkey", {expiresIn:"1d"});
    // const token =  jwt.sign({_id:this._id}, process.env.JWT_SECRET, {expiresIn:"1d"});
    // console.log(this._id);
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputed){
  const isPasswordValid = await bcrypt.compare(passwordInputed, this.password)
  return isPasswordValid;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
