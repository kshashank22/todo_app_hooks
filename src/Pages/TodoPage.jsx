import React,{useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import './TodoPage.css'
import ListItems from '../Components/ListItems/ListItems'


function TodoPage() {
  const [task,setTask]=useState("")
  const [taskList,setTaskList]=useState([])
  
  const addTodoTask=(e)=>{
    e.preventDefault()
    if (task.trim()!==""){
        setTaskList([...taskList,{id:uuidv4(),title:task,status:false}]);
        setTask('')
        
    } 
  }

  const updatedTodoInput=(e)=>{
       setTask(e.target.value)
  }

  const clearTodoList=(e)=>{
    e.preventDefault()
    setTaskList([])
  }

  return (
    <div className='todo-container'>
      <div className='todo-box'>
         <h1 className='todo-heading'>Todo-App</h1>
         <form onSubmit={addTodoTask}>
            <input type="text" className='todo-input' placeholder='Your Todo' value={task} onChange={updatedTodoInput}/>
            <br/>
            <div className='todo-add-button-container'>
                <button className="todo-add-button" type='submit' onClick={addTodoTask}>Add</button>
            </div>
         </form>
         {taskList.length>0 && <ListItems taskList={taskList} setTaskList={setTaskList}/> }
         {taskList.length>0 && <div className='todo-add-button-container'>
            <button type="button" onClick={clearTodoList}>Clear All</button>
         </div>
}
      </div>
    </div>
  )
}

export default TodoPage
