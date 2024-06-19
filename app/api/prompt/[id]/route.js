import { connecttodb } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async(request, {params})=>{
    try{
        await connecttodb()

        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt){
            return new Response("Prompt not found",{status:404})
        }

        return new Response(JSON.stringify(prompt),{
            status:200
        })
    } catch(error){
        return new Response('Failed to fetch all prompts',{
            status:500
        })
    }
}

export const PATCH = async(request, {params})=>{
    const {prompt, tag} = await request.json()

    try{
        await connecttodb()

        const existingprompt = await Prompt.findById(params.id)

        if(!existingprompt) return new Response("Prompt not found", {status: 404})
        
        existingprompt.prompt = prompt
        existingprompt.tag = tag

        await existingprompt.save()

        return new Response(JSON.stringify(existingprompt),{status:200})
    }catch(error){
        return new Response("Failed to update prompt",{status:500})
    }
}

export const DELETE = async(request, {params})=>{
    try{
        await connecttodb()
        await Prompt.findByIdAndDelete(params.id)

        return new Response("Prompt deleted successfully",{status:200})
    } catch(error){
        return new Response("Failed to update prompt",{status:500})
    }
}