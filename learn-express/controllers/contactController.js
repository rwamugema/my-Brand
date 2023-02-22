import { query } from "express";
import contact from "../models/contact.js";




export const createContact = async(req,res) =>{
    try {
        const query = new contact({
            userName:req.body.userName,
            email:req.body.email,
            message:req.body.message,
        }) 
        await query.save()
       return res.status(201).json(query)
    } catch (err) {
        console.log(err);
    }
}
export const deleteQuery = async(req,res) =>{
    const post = await contact.findOne({_id:req.params.id})
    if (post) {
        const result =  await contact.deleteOne({_id: req.params.id})
        res.status(204).json(result)
    }
        res.status(400).send({error:'post does not exists'})
}
export const getQueries = async(req,res)=>{
    const Queries = await contact.find({})
    if (Queries) {
        return res.status(200).json(Queries)
    }else{
        return res.status(404).json({message:"no queries found"})
    }
}