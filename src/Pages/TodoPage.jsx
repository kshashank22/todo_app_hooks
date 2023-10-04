import React,{useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import './TodoPage.css'
import ListItems from '../Components/ListItems/ListItems'


function TodoPage() {
  const [task,setTask]=useState("")
  const [taskList,setTaskList]=useState([])
  const [toggleButton,setToggleButton]=useState(true)
  const [editedTask,setEditedTask]=useState(null)
  
  const addTodoTask=(event)=>{
    event.preventDefault()
    if ((task.trim()!=="") && (!editedTask)){
        setTaskList([...taskList,{id:uuidv4(),title:task,status:false}]);
        setTask('')   
    }else if(task && !toggleButton){
      setTaskList(taskList.map((eachElement)=>{
        if(eachElement.id===editedTask){
          return{...eachElement,title:task}
        }
        return eachElement
      }))
      setEditedTask(null)
      setToggleButton(true)
      setTask('')   
    }
  }

  const updatedTodoInput=(event)=>{
    setTask(event.target.value)
  }

  const clearTodoList=(event)=>{
    event.preventDefault()
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
                <button className="todo-add-button" type='submit' onClick={addTodoTask}>{toggleButton?"Add":"Save"}</button>
            </div>
         </form>
         {taskList.length>0 && <ListItems setTask={setTask} taskList={taskList} setTaskList={setTaskList} setEditedTask={setEditedTask} setToggleButton={setToggleButton}/> }
         {taskList.length>0 && <div className='todo-add-button-container'>
            <button type="button" onClick={clearTodoList}>Clear All</button>
         </div>
         }
      </div>
    </div>
  )
}

export default TodoPage
