import React from 'react'

const InCompletedListItems=({setTask,inCompletedList,setInCompletedList,setEditedTask,setToggleButton})=>{
  
  const deleteTodoTask=(eachTodo)=>{
    setInCompletedList(inCompletedList.filter((eachElement)=>eachElement.id!== eachTodo.id))
  };
  
  const updateCheckbox=(eachTodo)=>{
    setInCompletedList(
        inCompletedList.map((eachElement)=>{
        if(eachElement.id===eachTodo.id){
          return{...eachElement,status:!eachElement.status}
        }
        return eachElement
      })
    )
  }

  const updatedText=(eachTodo)=>{
    const textUpdated=inCompletedList.find((eachElement)=>eachElement.id===eachTodo.id)
    setEditedTask(textUpdated.id);
    setToggleButton(false)
    setTask(textUpdated.title)
  }

  return (
    <ul>
        {inCompletedList.map(eachTodo=>
            <li key={eachTodo.id} className='todo-list-items-container'>
                <div>
                    {eachTodo.status?<input type="checkbox" className='todo-checkbox' onChange={()=>updateCheckbox(eachTodo)} checked/>:<input type="checkbox" className='todo-checkbox' onChange={()=>updateCheckbox(eachTodo)}/>}
                    <label className='todo-list-inputs'>{eachTodo.title}</label>
                </div>
                <div>
                    {eachTodo.status && <label className='todo-checkbox'>completed</label>}
                    <button type="button" className='todo-edit-buttons' onClick={()=>updatedText(eachTodo)}>
                        <i className="fa-regular fa-pen-to-square todo-icon-style"></i>
                    </button>
                    <button type="button" className='todo-edit-buttons' onClick={()=>deleteTodoTask(eachTodo)}>
                        <i className="fa-solid fa-trash todo-icon-style"></i>
                    </button>
                </div>
            </li>
            )}
    </ul>
  )
}

export default InCompletedListItems
