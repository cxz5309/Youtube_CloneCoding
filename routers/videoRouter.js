import express from "express";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.videos, (req, res)=>res.send("Videos"));
videoRouter.get(routes.upload, (req, res)=>res.send("Upload"));
videoRouter.get(routes.videoDetail, (req, res)=>res.send("VideoDetail"));
videoRouter.get(routes.editVideo, (req, res)=>res.send("editVideo"));
videoRouter.get(routes.deleteVidio, (req, res)=>res.send("deleteVidio"));

export default videoRouter;