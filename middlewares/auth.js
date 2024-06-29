import passport from "passport"
import User from "../models/user.js"

export const isAuth = (req, res, next) => {
  return passport.authenticate('jwt')
}

export const userSignupAuth = async (req, res, next) => {
    let { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: `Incomplete data` })
    const user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: `User already registered.` })
    else next()
}

export const sanitizedUser = user => {

    return { id: user.id, role: user.role }
} 


export const cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
  console.log('cookie',token)
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzQ2NTFlYzViOTQyYjQ3NmYzZjcwOCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE4OTkzOTk0fQ.n0xS00Zshi-aUeCDd28YgC2MH90-S_rYFQrT3t8eoyE"
  return token;
};
// ...
