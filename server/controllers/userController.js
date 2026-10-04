import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { sendOtpEmail, sendWlecomeMail } from "../Utils/sendEmail.js";




export const registerUser = async (req, res) => {
    try {
        const { name, email, phone_no, password } = req.body;

        if (!name || !email || !phone_no || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser.isVerified) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        const otpExpiry = new Date(
            Date.now() + 5 * 60 * 1000
        );

        const hashPassword = await bcrypt.hash(password, 10);

        let userData;

        if (existingUser) {

     
            existingUser.name = name;
            existingUser.phone_no = phone_no;
            existingUser.password = hashPassword;
            existingUser.otp = otp;
            existingUser.otpExpiry = otpExpiry;
            existingUser.isVerified = false;

            userData = await existingUser.save();

        } else {

      
            userData = await User.create({
                name,
                email,
                password: hashPassword,
                phone_no,
                otp,
                otpExpiry,
                isVerified: false
            });
        }

        
        
        await sendOtpEmail(email, otp);

        const token = jwt.sign(
            {
                userId: userData._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        return res.status(200).json({
            message: "User registration successful",
            userData,
            token
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Server error"
        });
    }
};



export const loginUser = async (req,res)=>{

    try{
        const {email,password} = req.body

        if(!email || !password ){
            return res.status(400).json({
                message : "please fill required field"
            })
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message : "user not found"
            })
        }

        const matchPassword = await bcrypt.compare(password,user.password)
        if(!matchPassword){
            return res.status(400).json({
                message : "incorrect password"
            })
        }

        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET,
        {
            expiresIn:'15m'
        })

        return res.status(200).json({
            message : "login successsful",
            user,
            token
        })
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            message:"server errr"
        })

    }
}



export const updateUser = async (req,res)=>{

    try{
        const {email , password} = req.body
        const  id  = req.params.id;
        const hashPassword= await  bcrypt.hash(password,10)

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message : "user not found"
            })
        }

        await User.findByIdAndUpdate({_id:id} ,{email,password:hashPassword})
        
            res.status(201).json({
                message:" update succesful"
            })

    
        } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Server error"
        });


    }

}


export const deleteUser = async(req,res)=>{
  const { id } = req.params;

  
  try{
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const delUser= await User.findByIdAndDelete(id)

    res.status(200).json({
      message : "user delete succesfuly"
    })

  }
  catch(err){
    console.error(err);
    res.status(400).json({
      message : "server error"
    })
    
  }

}


export const getProfile = async(req,res)=>{

    try{
        const user = await User.findById(req.user.userId).select('-password')

        if(!user){
            return res.status(401).json({
                message : "user not found"
            })
        }

        res.status(200).json({
            message : "profile fetch successfily ",
            user
        })

    }
    catch(err){
    console.error(err);
    res.status(400).json({
      message : "server error"
    })
    }
    
}




export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "email and otp are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                message: "email already verified"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        if (!user.otpExpiry || user.otpExpiry < new Date()) {
            return res.status(400).json({
                message: "OTP expired"
            });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        
        await sendWlecomeMail(user.email, user.name);

        const token = jwt.sign(
            {
                user: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        res.status(200).json({
            message: "Email verified successfully",
            user,
            token
        });

    } catch (err) {
        console.error(err);

        res.status(400).json({
            message: "server error"
        });
    }
};