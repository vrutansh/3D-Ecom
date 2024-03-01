import { Express } from "express";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";

dotenv.config();


const app = express();
 
app.use(cors());
app.use(express.json({limig:"50mb"}))

app.get('/', (req,res)=>{
    res.status(200).json({message: "Hello, world!"});
})