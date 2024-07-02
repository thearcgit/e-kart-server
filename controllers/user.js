import Category from "../models/category.js"
import User from "../models/user.js"


export const fetchUserById = async (req, res) => {
    const {id} = req.user

    try {
        const user = await User.findOne({_id:id},"name email addresses role").exec()
        res.status(200).json( user )
    } catch (error) {        
        console.log('error', error)
        res.status(400).json(error)

    }
}

export const updateUser = async (req, res) => {
    try {
        const {id} = req.user
        const user = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({name:user.name,id:user.id,email:user.email,addresses:user.addresses,role:user.role})
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)

    }
}


export const signout = (req, res) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.session.destroy(err => {
        if (err) {
          return res.status(500).send('Failed to destroy session');
        }
        res.clearCookie('jwt'); 
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).send('Logged out successfully');
      });
    });
  };
  