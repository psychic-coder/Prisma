import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/postControllers.js";

const router=express.Router();


router.post("/post/create",isLoggedIn,createPost);
router.put("/post/update/:id",isLoggedIn,updatePost);
router.delete("/post/delete/:id",isLoggedIn,deletePost);
router.get("/post.get",getPosts);

export default router;