// import asyncHandler from "express-async-handler";
// import User from "../Models/UserModel.js";
// import bcrypt from "bcryptjs";
// import { generateToken } from "../middlewares/Auth.js";

// // @desc Register user
// // @route POST /api/users
// // @access Public

// const registerUser = asyncHandler(async (req, res) => {
//   const { fullName, email, password, image } = req.body;
//   try {
//     const userExist = await User.findOne({ email });
//     // check id user exists
//     if (userExist) {
//       res.status(400);
//       throw new Error("User already exists");
//     }
//     // else create new user
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // create user in DB
//     const user = await User.create({
//       fullName,
//       email,
//       password: hashedPassword,
//       image,
//     });

//     console.log("user", user);
//     if (user) {
//       return res.status(201).json({
//         _id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         image: user.image,
//         isAdmin: user.isAdmin,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(400);
//       throw new Error("Invalid user data");
//     }
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });

// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.json({
//         _id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         image: user.image,
//         isAdmin: user.isAdmin,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401);
//       throw new Error("Invalid email or password");
//     }
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });

// // @desc Update user profile
// // @route PUT  /api/users/profile
// // @access Private

// const updateUserProfile = asyncHandler(async (req, res) => {
//   const { fullName, email, image } = req.body;
//   try {
//     // find usr on db
//     const user = await User.findById(req.user._id);
//     if (user) {
//       user.fullName = fullName || user.fullName;
//       user.email = email || user.email;
//       user.image = image || user.image;

//       const updatedUser = await user.save();
//       // send updated user data and token to client

//       res.json({
//         _id: updatedUser._id,
//         fullName: updatedUser.fullName,
//         email: updatedUser.email,
//         image: updatedUser.image,
//         isAdmin: updatedUser.isAdmin,
//         token: generateToken(updatedUser._id),
//       });
//     } else {
//       res.status(404);
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });

// // @desc Delete user Profile
// // @route Delete api/users
// // @access Private

// const deleteUserProfile = asyncHandler(async (req, res) => {
//   try {
//     // find user in DB
//     const user = await User.findById(req.user._id);
//     // if user is admin throw error message

//     if (user) {
//       if (user.isAdmin) {
//         res.status(400);
//         throw new Error("Can not delete admin user");
//       }

//       // else delete user from DB
//       await user.remove();
//       res.json({
//         message: "User deleted successfully",
//       });
//     } else {
//       res.status(404);
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     res.status.apply(400).json({
//       message: error.message,
//     });
//   }
// });

// // @desc Change user password
// // @route PUT api/users/password
// // @access Private
// //1:11:00

// const changeUserPassword = asyncHandler(async (req, res) => {
//   const { oldPassword, newPassword } = req.body;
//   try {
//     // find user in the Database
//     const user = await User.findById(req.user._id);
//     // if user exists compare old password with hashed password then update user password and save it
//     if (user && (await bcrypt.compare(oldPassword, user.password))) {
//       // hash new password
//       const salt = await bcrypt.genSalt(10);
//       const hashPassword = await bcrypt.hash(newPassword, salt);
//       user.password = hashedPassword;
//       await user.save();
//       res.json({
//         message: "Password Changed",
//       });
//     } else {
//       // send error message
//       res.status(401);
//       throw new Error("Invalid old Password");
//     }
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });

// // @desc Get all liked movies
// // @route GET api/users/favorites
// // @access Private
// //1:14:40

// const getLikedMovies = asyncHandler(async (req, res) => {
//   try {
//     // find user in the DB
//     const user = await User.findById(req.user._id).populate("likedMovies");
//     if (user) {
//       res.json(user.likedMovies);
//     } else {
//       // get error message
//       res.status(404);
//       throw new Error("user not found");
//     }
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });

// // @desc Add movie to liked movies
// // @route POST api/users/favorites
// // @access Private
// //1:17:20

// const addLikedMovie = asyncHandler(async (req, res) => {
//   const { movieId } = req.body;
//   try {
//     // find user in DB
//     const user = await User.findById(req.user._id);
//     // if user is exists add movie to liked movies and save in DB

//     if (user) {
//       // checked if movie already liked
//       //const isMovieLiked = user.likedMovies.find((movie) => movie.toString() === movieId)
//       const isMovieLiked = user.likedMovies.includes(movieId);

//       if (isMovieLiked) {
//         res.status(400);
//         throw new Error("movie already liked");
//       }

//       //else add movie to liked movies and save it in DB

//       user.likedMovies.push(movieId);
//       await user.save();
//       res.json(user.likedMovies);
//     } else {
//       res.status(404);
//       throw new Error("movie not found");
//     }
//   } catch (err) {
//     res.status(400).json({
//       message: err.message,
//     });
//   }
// });

// // @desc Delete all liked movies
// // @route DELETE api/users/favorites
// // @access Private
// //1:20:55


// const deleteLikedMovies = asyncHandler( async(req,res) => {
//     try {
//         // find user in DB
//         const user = await User.findById(req.user._id)
//         // if user exists delete all liked movies and save it in DB
//         if (user) {
//             user.likedMovies = []
//             await user.save()
//             res.json({
//                 message: 'all liked movies deleted successfully'
//             })
//         } else {
//             res.status(404)
//             throw new Error('User not found')
//         }

//     } catch(error) {
//         res.status(400).json({
//             message: error.message,
//           });
//     }
// })


// // ************* admin controllers  *************

// // @desc GET all users
// // @route GET api/users
// // @access Private/Admin
// //1:22:30

// const getUsers = asyncHandler(async(req,res) => {
//     try {
//         // find all users in DB
//         const users = await User.find({})
//         // if users exists send users to client
//         if (users) {
//             res.json(users)
//         }

//     } catch(error) {
//         res.status(400).json({
//             message: error.message
//         })
//     }
// })

// // @desc DELETE user
// // @route DELETE api/users/:id
// // @access Private/Admin
// //1:23:24

// const deleteUser = asyncHandler(async(req,res) => {
//     try {
//         // find user in DB
//         const user = await User.findById(req.params.id)
//         // if user exists delete user in DB

//         if (user) {
//             // if user is admin throw error message

//             if (user.isAdmin) {
//                 res.status(400)
//                 throw new Error("can't delete admin role")
//             }
//             // else delete user in DB
//             await user.remove()
//             res.json({
//                 message: 'user deleted successfully'
//             })
//         } else {
//             res.status(404)

//         throw new Error('User not found')
//         }

//     } catch(error) {
//         res.status(400).json({
//             message: error.message
//         })
//     }
// })


// export {
//   registerUser,
//   loginUser,
//   updateUserProfile,
//   deleteUserProfile,
//   changeUserPassword,
//   getLikedMovies,
//   addLikedMovie, // we are going to use this function in the next section after we create the movie model
//   deleteLikedMovies,
//   getUsers,
//   deleteUser
// };


import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";

// @desc Register user
// @route POST /api/users/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, image } = req.body;
  try {
    const userExists = await User.findOne({ email });
    // check if user exists
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user in DB
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      image,
    });

    // if user created successfully send user data and token to client
    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // find user in DB
    const user = await User.findOne({ email });
    // if user exists compare password with hashed password then send user data and token to client
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
      // if user not found or password not match send error message
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ********* PRIVATE CONTROLLERS *********

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, image } = req.body;
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists update user data and save it in DB
    if (user) {
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.image = image || user.image;

      const updatedUser = await user.save();
      // send updated user data and token to client
      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        image: updatedUser.image,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete user profile
// @route DELETE /api/users
// @access Private
const deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists delete user from DB
    if (user) {
      // if user is admin throw error message
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can't delete admin user");
      }
      // else delete user from DB
      await user.remove();
      res.json({ message: "User deleted successfully" });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Change user password
// @route PUT /api/users/password
// @access Private
const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists compare old password with hashed password then update user password and save it in DB
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      // hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.json({ message: "Password changed!!" });
    }
    // else send error message
    else {
      res.status(401);
      throw new Error("Invalid old password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get all liked movies
// @route GET /api/users/favorites
// @access Private
const getLikedMovies = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.user._id).populate("likedMovies");
    // if user exists send liked movies to client
    if (user) {
      res.json(user.likedMovies);
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Add movie to liked movies
// @route POST /api/users/favorites
// @access Private
const addLikedMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists add movie to liked movies and save it in DB
    if (user) {
      // check if movie already liked
      // if movie already liked send error message
      if (user.likedMovies.includes(movieId)) {
        res.status(400);
        throw new Error("Movie already liked");
      }
      // else add movie to liked movies and save it in DB
      user.likedMovies.push(movieId);
      await user.save();
      res.json(user.likedMovies);
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete all liked movies
// @route DELETE /api/users/favorites
// @access Private
const deleteLikedMovies = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.user._id);
    // if user exists delete all liked movies and save it in DB
    if (user) {
      user.likedMovies = [];
      await user.save();
      res.json({ message: "Your favorites movies deleted successfully" });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//  ************** ADMIN CONTROLLERS **************

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  try {
    // find all users in DB
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.params.id);
    // if user exists delete user from DB
    if (user) {
      // if user is admin throw error message
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can't delete admin user");
      }
      // else delete user from DB
      await user.remove();
      res.json({ message: "User deleted successfully" });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
  getLikedMovies,
  addLikedMovie,
  deleteLikedMovies,
  getUsers,
  deleteUser,
};