import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (request, { params } ) =>{
        
    try{
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("prompt not found", {status:400})

        return new Response(JSON.stringify(prompt), {
             status: 200, 
                headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response("Failed to fetch prompts", {status: 500})
    }
}

export const PATCH = async (request, {params})=>{
  const {prompt, tag} = await request.json()
  try{
    await connectToDB()

    const ePrompt = await Prompt.findById(params.id)
    if(!ePrompt) return new Response('prompt not found', {status: 404})
      ePrompt.prompt = prompt
      ePrompt.tag = tag

      await ePrompt.save()

       return new Response(JSON.stringify(prompt), {
             status: 200, 
                headers: { "Content-Type": "application/json" }
        });
           
  }catch (error){
       return new Response("Failed to update prompts", {status: 500})
  }
}

export const DELETE = async (request, {params}) =>{
  try{
    await connectToDB()

    await Prompt.findByIdAndDelete(params.id)

    return new Response('prompt successfully deleted', {status:200})

  }catch(err){
     return new Response('Failed to delete prompt', {status:500})
  }
}