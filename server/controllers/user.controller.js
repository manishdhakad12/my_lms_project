import {User} from "../models/user.model.js";
import bcrypt, { compare } from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
export const register = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All field are required."
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exist with this email."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password:hashedPassword
        })
        return res.status(201).json({
            success:true,
            message:"Account created successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to register."
        }) 
    }
}
export const login = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All field are required."
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorect email or password"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            })
        }
        generateToken(res,user, `Welcome back ${user.name}`);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to login."
        })
    }
}
export const logout = async (req,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        })
    }
}
// export const getUserProfile = async(req,res) => {
//     try {
//         const userId = req.id;
//         const user = await User.findById(userId).select("-password").populate("enrolledCourses");
//         if(!user){
//             return res.status(404).json({
//                 message:"profile not found",
//                 success:false
//             })
//         }
//         return res.status(200).json({
//             success:true,
//             user
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Failed to logout"
//         })
//     }
// }

// export const getUserProfile = async (req, res) => {
//   try {
//     const userId = req.id || req.user?._id;

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized access. User ID not found.",
//       });
//     }

//     const user = await User.findById(userId)
//       .select("-password")
//       .populate("enrolledCourses");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.error("getUserProfile error:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch user profile",
//     });
//   }
// };

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. User ID not found.",
      });
    }

    const user = await User.findById(userId)
      .select("-password")
      .populate({
        path: "enrolledCourses",
        populate: {
          path: "creator",
          select: "name photoUrl", // only fetch necessary fields
        },
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("getUserProfile error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
    });
  }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const {name} = req.body;
        const profilePhoto = req.file;
        
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }
        // extract public id of the old image from the url is it exists;
        if(user.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
            deleteMediaFromCloudinary(publicId);
        }

        // upload new photo
        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updatedData = {name, photoUrl};
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Profile updated successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to update profile"
        })
    }
}
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("enrolledCourses") // ✅ this populates course details
      .select("-password"); // do not send password

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get current user failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
}
export const makeInstructor = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    user.role = "instructor";
    await user.save();
    return res.status(200).json({ success: true, message: "You are now an instructor" });
  } catch (err) {
    console.error("makeInstructor error", err);
    return res.status(500).json({ success: false, message: "Failed to update role" });
  }
};