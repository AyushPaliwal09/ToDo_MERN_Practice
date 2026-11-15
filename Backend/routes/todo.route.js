import express from 'express';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todo.controller.js';
import { authenticate } from '../middleware/authorize.js';

const router=express.Router();
export default router

router.get("/fetch", authenticate, fetchTodos);
router.post("/create", authenticate, createTodo); 
router.put("/update/:id", authenticate, updateTodo);
router.delete("/delete/:id", authenticate, deleteTodo);

