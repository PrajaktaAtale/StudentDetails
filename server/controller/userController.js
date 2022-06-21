const User = require("../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwt_key = "sdfghjkla@$%&"


//signUp

const signUp = async(req, res) =>{
    try {
        let createUser = await User.findOne ({ email: req.body.email })
        if(createUser){
            return res
            .status(400)
            .json({ success: false, message: "the user is already exist" })
        }
        
        const password = req.body.password;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
  
        createUser = await new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });

        const payload = {
        user: {
          id: createUser.id
        }
      }
      // creating a jwt token for user 
      const token = jwt.sign(payload, jwt_key)

      createUser.save()
      
      res.status(200).json({ sucess: true, token: token })
      
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
}

//sigIn

const signIn = async(req, res)=>{

    const { email, password } = req.body;
    
    try {
        
        let user = await User.findOne({
            email: email,
        });
        if(!user){
            return res
            .status(400)
            .json({
                success:false, message: "Please enter registered email"
            })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res
              .status(400)
              .json({ success: false, message: "incorrect Password" });
          }
         
          const payload = {
            user: {
              id: user._id,
            },
          };
          
          const authtoken = jwt.sign(payload, jwt_key);
          
          res.status(200).json({success:true, authtoken:authtoken})
        } catch (error) {
          console.log(error);
          res.status(500).send("internal server error");
        }
}

module.exports = { signUp, signIn }