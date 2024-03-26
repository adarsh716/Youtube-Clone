import videoFiles from "../models/videoFiles.js";
import User from "../models/auth.js";
import jwt from "jsonwebtoken";
export const uploadVideo = async (req, res, next) => {
  if (req.file === undefined) {
    res.status(404).json({ message: "Please upload a '.mp4' video file only." });
  } else {
    try {
      const { title, chanel, Uploder, sub } = req.body;
      const { originalname, path, mimetype, size } = req.file;

      const file = new videoFiles({
        videoTitle: title,
        fileName: originalname,
        filePath: path,
        fileType: mimetype,
        fileSize: size,
        videoChanel: chanel,
        Uploder,
        toSubscribers: sub || false, 
      });

      await file.save();
      res.status(200).send("File uploaded successfully");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
};

export const getAllvideos = async (req, res) => {
  try {
    let userId;

    const token = req.headers.authorization?.split(' ')[1]; // Check if token is present
    console.log('Token:', token); // Log the token
    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        userId = decodedToken.userId;
        console.log('Decoded Token:', decodedToken); // Log the decoded token to inspect its contents
        console.log('User ID:', userId);
      } catch (decodeError) {
        console.error('Error decoding token:', decodeError);
      }
    }

    // If user is logged in, fetch subscribed channels
    let subscribedChannels = [];
    if (userId) {
      const user = await User.findById(userId);
      subscribedChannels = user.subscriberIds || []; // Get the subscribed channel IDs
      console.log('Subscribed Channels:', subscribedChannels);
    }

    // Retrieve videos based on subscription status
    let videos;
    if (userId && subscribedChannels.length > 0) {
      videos = await videoFiles.find({
        $or: [
          { Uploder: userId }, // Videos uploaded by the user
          { $and: [{ toSubscribers: true }, { Uploder: { $in: subscribedChannels } }] }, // Videos marked for subscribers only and uploaded by subscribed channels
        ],
      });
    } else {
      // If the user is not logged in or not subscribed, retrieve all videos that are not marked for subscribers only
      videos = await videoFiles.find({ toSubscribers: false });
    }
    console.log(videos)
    res.status(200).send(videos);
  } catch (error) {
    console.error('Error:', error);
    res.status(401).send('Unauthorized: Invalid token');
  } 
};



