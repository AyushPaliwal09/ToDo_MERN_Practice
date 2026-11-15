import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
    const [todos, setTodos] =useState([]);
    const [text, setText] = useState("");


    useEffect(() => {
        async function fetchData(){
           const res= await axios.get("http://localhost:5000/todo/fetch", { withCredentials: true });
           console.log(res);
        setTodos(res.data.data);
        }
        fetchData();
    },[]);

    const addTodo = async () =>{
        try {
            const res= await axios.post("http://localhost:5000/todo/create", {text : text}, { withCredentials: true });
            setTodos([...todos, res.data.data]);
            console.log(res.data.data);
            setText("");
        }
        catch(error){
            console.error("Error in addTodo:", error.message);
        }
    }

    const deleteTodo = async (id) => {
        try{
            await axios.delete(`http://localhost:5000/todo/delete/${id}`, { withCredentials: true });
            const updatedtodo = todos.filter((todo) => todo._id !== id);
            setTodos(updatedtodo);
            console.log("Todo deleted successfully"); 
        }
        catch(error){
            console.error("Error in deleteTodo:", error.message);
        }
    }

    const toggleTodo = async (id) => {
      const todo = todos.find((todo) => todo._id === id);
      try{
        const res = await axios.put(`http://localhost:5000/todo/update/${id}`, {...todo, completed: !todo.completed}, { withCredentials: true });
        // console.log(res.data.data);
        const updatedTodo = todos.map((t) => t._id === id ? res.data.data : t);
        setTodos(updatedTodo);
      }
      catch(error){
        console.error("Error in toggleTodo:", error.message);
      }
    }
    const navigateTo = useNavigate();
    const handleLogout = async () => {
      try {
        await axios.post("http://localhost:5000/user/logout");
        console.log("Logged out successfully");
        localStorage.removeItem("token");
        navigateTo("/login");
      }
      catch(error){
        console.log("Error in handleLogout:", error.message);
      }
    } 

    const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div style={styles.container}>
     
      <h2 style={styles.heading}>🚀 Todo App</h2>

      <div style={styles.inputSection}>
       
        <input
          type="text"
          placeholder="Enter a task"
          style={styles.input}
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />

        <button 
          style={styles.addBtn} 
          onClick={addTodo}
          onMouseOver={(e)=> e.target.style.transform="scale(1.1)"}
          onMouseOut={(e)=> e.target.style.transform="scale(1)"}
        >
          Add
        </button>
      </div>

      <div style={styles.listContainer}>
        {todos.map((todo) => (
          
          <div key={todo._id} style={styles.listItem}>
             <div>
          <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo._id)} style={{marginRight: "10px"}}
          className='m-0.5 cursor-pointer scale-130' />
          </div>
            <span className={`text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.text}
            </span>

            <button 
              style={styles.deleteBtn} 
              onClick={() => deleteTodo(todo._id)}
              onMouseOver={(e)=> e.target.style.transform="scale(1.1)"}
              onMouseOut={(e)=> e.target.style.transform="scale(1)"}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
      <div>
        <p style={styles.remainingTodos}>{remainingTodos} Todo Remaining</p>
         <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>

    </div>
  );
};

const styles = {
  container: {
    width: '380px',
    margin: '60px auto',
    padding: '25px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
  },
  logoutBtn: {
    position: 'relative',
    top: '0',
    right: '0',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '5px'
  },
  heading: {
    marginBottom: '20px',
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#333'
  },
  remainingTodos: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#555'
  },

  inputSection: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },

  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
  },

  addBtn: {
    padding: '10px 15px',
    borderRadius: '10px',
    border: 'none',
    background: '#4facfe',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
  },

  listContainer: {
    marginTop: '10px'
  },

  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '12px',
    background: '#ffffff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    transition: '0.3s'
  },

  deleteBtn: {
    background: '#fff176',
    border: 'none',
    color: '#fff',
    padding: '6px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s'
  }
};

export default Todo;
