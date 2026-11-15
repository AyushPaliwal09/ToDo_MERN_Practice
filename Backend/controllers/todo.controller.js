import { Todo } from "../models/todo.model.js";

export const fetchTodos=async(req,res)=>{
    // res.send("I Love You:)");
    try{
        const todos= await Todo.find({user: req.user.userId}); // Fetch todos for the authenticated user
        if(!todos){
            return res.status(404).json({ message: "No data found" });
        }
        res.status(200).json({ message: "Data fetched successfully", data: todos });
    } catch (error) {
        console.log("Error in fetchTodos controller", error);
        res.status(500).json({ message: error.message });
    }
    
}

export const createTodo=async(req,res)=>{
    try{
        const { text } = req.body;
        const userId = req.user.userId; // Get the user ID from the authenticated request
        // console.log("Received text:", text); // Debugging log
        if (!text) {
            return res.status(400).json({message: "Text field is required"});
        }
        const newTodo = await Todo.create({ text, user: userId });
        res.status(201).json({ message: "Todo created successfully", data: newTodo });
    }catch (error) {
        console.log("Error in createTodo controller", error.message);
        res.status(500).json({ message: error.message });
    }

    
}

export const updateTodo=async(req,res)=>{
 try{
        const { id } = req.params;
        const { text, completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, { text, completed },
            { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({message: "Todo updated successfully", data: updatedTodo });
    }catch (error) {
        console.log("Error in updateTodo controller", error);
        res.status(500).json({ message: error.message });
    }
}
export const deleteTodo=async(req,res)=>{

    try{
        const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted successfully" });

    }
    catch (error) {
        console.log("Error in deleteTodo controller", error);
        res.status(500).json({ message: error.message });
    }
    
}