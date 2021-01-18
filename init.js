import app from "./app";

const PORT = 4000;

const handleListening = () => {
   console.log("Listening on: http:loaclhost:${PORT}");
}
app.listen(PORT, handleListening);