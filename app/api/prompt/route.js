import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (request) =>{
        
    try{
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');
        // console.log("Fetched prompts:", JSON.stringify(prompts, {status:200}));
        return new Response(JSON.stringify(prompts), {
             status: 200, 
                headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response("Failed to fetch prompts", {status: 500})
    }
}