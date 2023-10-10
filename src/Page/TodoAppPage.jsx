import React,{useState,useEffect} from 'react'
import { v4 as uuidv4 } from "uuid";
import './TodoAppPage.css'

function TodoAppPage() {
   const updatedTodoList=JSON.parse(localStorage.getItem("todoKeys")) || [];
   const [todoInput,setTodoInput]=useState("")
   const [todoList,setTodoList]=useState(updatedTodoList)
   const [todoFilter,setTodoFilter]=useState('All')
   const [errorInput,setErrorInput]=useState(false)
   const [editedTodo, setEditedTodo] = useState('');
   const [editedTodoId,setEditedTodoId] = useState(null)

   localStorage.setItem("todoKeys",JSON.stringify(todoList));

   useEffect(()=>{
    if (updatedTodoList!==undefined){
        console.log(updatedTodoList)
        setTodoList(updatedTodoList)
    }
   },[])

   useEffect(()=>{
    if (updatedTodoList===undefined){
        localStorage.setItem("todoKeys",JSON.stringify(todoList));
    }
   },[todoList])
   

   const updatedTodoInput = (event) => {
    if (event.target.value===" "){
      setErrorInput(!errorInput)
    }
    setTodoInput(event.target.value);
  };

   const addTodoTask = (event) => {
    event.preventDefault();
    if (todoInput.trim() !== "") {
      setTodoList([...todoList, { id: uuidv4(), title: todoInput, status: false }]);
      setTodoInput("");
    }
  };
  
  const deleteTodoTask=(eachTodo)=>{
    setTodoList(todoList.filter((eachElement)=>eachElement.id!== eachTodo.id))
  };
  
  const updateCheckbox=(eachTodo)=>{
    setTodoList(
      todoList.map((eachElement)=>{
        if(eachElement.id===eachTodo.id){
          return{...eachElement,status:!eachElement.status}
        }
        return eachElement
      })
    )
  }

  const updatedText=(id)=>{
    setEditedTodoId(id);
    const textUpdated=todoList.find((eachElement)=>eachElement.id===id)
    if (textUpdated.title!==" "){
      setEditedTodo(textUpdated.title.trim())
    }
  }

  const onSaveEdit=()=>{
    if(editedTodo.trim()!==""){
      const updatedTodo=todoList.map((eachElement)=>
        eachElement.id===editedTodoId?{...eachElement,title:editedTodo}:eachElement
        );
      setTodoList(updatedTodo);
      setEditedTodoId(null)
    }
  }

  const todoFilterPage=todoList.filter((eachElement)=>{
    if (todoFilter==="Completed"){
        return eachElement.status===true;
    } else if (todoFilter==="Incomplete"){
        return eachElement.status===false;
    } else{
        return true;
    }
  });

  const clearTodoList = (event) => {
    event.preventDefault();
    setTodoList([]);
    
  };


  return (
    <div className="todo-container">
      <div className="todo-box">
        <h1 className="todo-heading">Todo-App</h1>
        <form onSubmit={addTodoTask}>
          <input
            type="text"
            className={errorInput?"todo-input-error":"todo-input"}
            placeholder="Your Todo"
            value={todoInput}
            onChange={updatedTodoInput}
          />
          <br />
          <div className="todo-add-button-container">
            <button
              className="todo-add-button"
              type="submit"
              onClick={addTodoTask}
            >
              Add
            </button>
          </div>
        </form>
      
        {todoList.length>0 && (
          <>
            <div className="todo-filter">
              <label><input type="radio" value="All" name="todo" className="todo-filter-input" onChange={()=>setTodoFilter("All")} checked={todoFilter==='All'} />All</label>
              <label><input type="radio" value="Completed" name="todo" className="todo-filter-input" onChange={()=>setTodoFilter("Completed")} checked={todoFilter==='Completed'}/>Completed</label>
              <label><input type="radio" value="Incomplete" name="todo" className="todo-filter-input" onChange={()=>setTodoFilter("Incomplete")} checked={todoFilter==='Incomplete'}/>InCompleted</label>
            </div>

          <ul>
          {todoFilterPage.map((eachElement)=>{
            return  <li key={eachElement.id} className='todo-list-items-container'>
            <div>
                {editedTodoId===eachElement.id?(
                  <form onSubmit={onSaveEdit}>
                    <input
                    className='editInputTodo'
                    type='text'
                    value={editedTodo}
                    onChange={(event)=>setEditedTodo(event.target.value)}
                    autoFocus
                    />
                  </form>
                    
                ):(
                  <>
                  <input id={eachElement.id} type="checkbox" className='todo-checkbox' onChange={()=>updateCheckbox(eachElement)} checked={eachElement.status}/>
                  <label className='todo-list-inputs' htmlFor={eachElement.id}>{eachElement.title}</label>
                  </>
                    
                )}
                
            </div>
            <div>
                {eachElement.status && <label className='todo-checkbox'>completed</label>}
                <button type="button" className='todo-edit-buttons' onClick={()=>updatedText(eachElement.id)}>
                    <i className="fa-regular fa-pen-to-square todo-icon-style"></i>
                </button>
                <button type="button" className='todo-edit-buttons' onClick={()=>deleteTodoTask(eachElement)}>
                    <i className="fa-solid fa-trash todo-icon-style"></i>
                </button>
            </div>
        </li>
           
          })}
          </ul>
        
            <div className="todo-add-button-container todo-clear-button-container">
              <button type="button" onClick={clearTodoList}>
                Clear All
              </button>
            </div>
          </>
        )}
        
      </div>
    </div>
  )
}

export default TodoAppPage
