import express from "express";
import morgan from "morgan";   
import helmet from "helmet";   
import cookieParser from "cookie-parser";   
import bodyParser from "body-parser";   

const app = express();

const PORT = 4000;

const handleListeining = () => {
   console.log("Listening on: http:loaclhost:${PORT}");
}

const handleHome = (req, res)=>{
    console.log("Hello!");
    res.send("Hello!");
}

const handleProfile = (req, res)=>{
    res.send("Profile");
}

const middleWare = (req, res, next) =>{
    console.log("Between");
    next();
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));
app.use(morgan("combined"));

app.use(middleWare);

app.get("/", handleHome);

app.get("/profile", handleProfile)

app.listen(PORT, handleListeining);