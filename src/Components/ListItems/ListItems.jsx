import React from 'react'
import './ListItems.css'

const ListItems=({setTask,taskList,setTaskList,setEditedTask,setToggleButton})=>{
  
  const deleteTodoTask=(eachTodo)=>{
    setTaskList(taskList.filter((eachElement)=>eachElement.id!== eachTodo.id))
  };
  
  const updateCheckbox=(eachTodo)=>{
    setTaskList(
      taskList.map((eachElement)=>{
        if(eachElement.id===eachTodo.id){
          return{...eachElement,status:!eachElement.status}
        }
        return eachElement
      })
    )
  }

  const updatedText=(eachTodo)=>{
    const textUpdated=taskList.find((eachElement)=>eachElement.id===eachTodo.id)
    setEditedTask(textUpdated.id);
    setToggleButton(false)
    setTask(textUpdated.title)
  }

  return (
    <ul>
        {taskList.map(eachTodo=>
            <li key={eachTodo.id} className='todo-list-items-container'>
                <div>
                    <input type="checkbox" className='todo-checkbox' onChange={()=>updateCheckbox(eachTodo)}/>
                    <label className='todo-list-inputs'>{eachTodo.title}</label>
                </div>
                <div>
                    {eachTodo.status && <label className='todo-checkbox'>completed</label>}
                    <button type="button" className='todo-edit-buttons' onClick={()=>updatedText(eachTodo)}>
                        <i className="fa-regular fa-pen-to-square todo-icon-style" style={{color:'#95dbc3'}}></i>
                    </button>
                    <button type="button" className='todo-edit-buttons' onClick={()=>deleteTodoTask(eachTodo)}>
                        <i className="fa-solid fa-trash todo-icon-style" style={{color:"#99e5e0"}}></i>
                    </button>
                </div>
            </li>
            )}
    </ul>
  )
}

export default ListItems
