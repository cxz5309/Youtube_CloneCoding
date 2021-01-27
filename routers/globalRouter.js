import express from "express";
import passport from "passport";
import routes from "../routes";
import {home, search} from "../controllers/videoController"
import {
    getJoin, 
    postJoin, 
    getLogin, 
    logout,
    getMe,
    postLogin,
    githubLogin,
    postGithubLogIn,
    facebookLogin,
    postFacebookLogIn
  } from "../controllers/userController"
import {onlyPublic, onlyPrivate } from "../middlewares"

const globalRouter = express.Router();


globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

//github
globalRouter.get(routes.gitHub, githubLogin);

globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogIn
);

//facebook
globalRouter.get(routes.facebook, facebookLogin);

globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  postFacebookLogIn
);

globalRouter.get(routes.me, getMe);

export default globalRouter;