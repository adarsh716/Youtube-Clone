import jwt from 'jsonwebtoken'

export const auth =(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];

        let decodeData= jwt.verify(token,process.env.JWT_SECRET)
         req.userId=decodeData?.id
        next();        
    }catch(error){
        res.status(400).json("Invalid Creadentials");
    }
}

export const use = (req, res, next) => {
    // Check if user is authenticated, and if so, extract user ID
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Attach user ID to request object
    req.userId = userId;
    next();
  };
