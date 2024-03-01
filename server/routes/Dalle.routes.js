import  express  from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi} from 'openai';



dotenv.config();

const router = express.Router();

const config = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config);

router.route('/').get((req,res)=>{
    res.status(200).json({message: "Hello, from Dalle routes"});
})

router.route('/').post(async(req,res)=>{
    try{

    }
    catch (error){
        console.log(error);
    }
})

export default router;