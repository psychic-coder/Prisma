import prisma from "../prisma/index.js"


//create a new post
export const createPost=async(req,res,next)=>{
    try {
      const { slug,title ,body,authorId } = req.body;
      const result=await prisma.post.create({
        data:{
            slug,
            title,
            body,
            author:{connect:{id:authorId}}
        }
      })
      res.json(result);

    } catch (error) {
        throw new Error(error)
    }
}   
//update a post
export const  updatePost=async(req,res,next)=>{
    const {id} = req.params;
    const {title,body}=req.body;
   try {
   
    const result=await prisma.post.update({
        where:{
            id:id
        },
        data:{
            title:title,
            body:body
        }
    })
    res.json(result);
   } catch (error) {
    res.json({
        error: `Post with ${id} does not exists`
    })
   }
}

export const deletePost=async(req,res,next)=>{
    const {id}=req.params;
    try {
    const result=  await  prisma.post.delete({
        where:{id:id}
    });
    res.json(result);

    } catch (error) {
       throw new Error(error)
    }
}

export const getPosts=async(req,res,next)=>{
    try {
       const result=await  prisma.post.findMany()
       res.json(result)
    } catch (error) {
        res.json({error:` NO post was found `})
    }
}