import { Story } from "../models/story.js";





export const createStory = async (req, res) => {
    try {
        const {title,description} = req.body
        const story = await Story.create({
            title ,
            description
        })
        res.status(200).json({
            message: "Story Created successfully",
            story
        })
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            message:"server err"
        })
        
    }
}


export const fetchStory = async (req,res)=>{

    try{
        const story = await Story.find()
    res.status(200).json({
        story:story,
        message:"story fetch sucessful"
    })
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            message:"server err"
        })
        
    }

}


export const updateStory = async (req,res)=>{

    try{
        const id = req.params.id
    const {title,description} = req.body
    await Story.findByIdAndUpdate({_id:id} ,{description , title} )

    res.status(201).json({
        message:"story update succesful",
        
        
    })
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            message:"server err"
        })
        
    }

}



export const deleteStory = async (req,res)=>{
    try{
        const id = req.params.id
    await Story.findByIdAndDelete(id)
    res.status(201).json({
        message:"story deleted succesful"
    })
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            message:"server err"
        })
        
    }
}