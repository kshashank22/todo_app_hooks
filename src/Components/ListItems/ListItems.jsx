import React from 'react'
import './ListItems.css'

const ListItems=({taskList,setTaskList})=>{
  
  const deleteTodoTask=({id})=>{
    setTaskList(taskList.filter((each)=>each.id!== id))
  };

  return (
    <ul>
        {taskList.map(eachTodo=>
            <li key={eachTodo.id} className='todo-list-items-container'>
                <div>
                    <input type="checkbox" className='todo-checkbox'/>
                    <label className='todo-list-inputs'>{eachTodo.title}</label>
                </div>
                <div>
                    <button type="button" className='todo-edit-buttons'>
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
