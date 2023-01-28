import express from "express";
import bodyParser from "body-parser";
import connectDb from './src/database/dbconnection';
import cors from "cors";
import routes from './src/routers/index';
import fileupload from 'express-fileupload'
const app = express();
connectDb(); 
let corsOptions ={
  origin:'*', 
  credentials:true,     
  optionSuccessStatus:200
}
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileupload({useTempFiles:true}))
app.use('/api', routes);
app.get("/",(req, res) => {
  res.send("Wasac Project");
  
});  

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log("server up and running on " + PORT);
});