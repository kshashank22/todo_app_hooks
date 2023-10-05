import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoPage.css";
import ListItems from "../Components/ListItems/ListItems";
import CompletedListItems from "../Components/CompletedListItems/CompletedListItems";
import InCompletedListItems from "../Components/InCompletedListItems/InCompletedListItems";

function TodoPage() {
  const todoStorage = JSON.parse(localStorage.getItem("tasks")) || [];
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(todoStorage);
  const [toggleButton, setToggleButton] = useState(true);
  const [editedTask, setEditedTask] = useState(null);
  const [completedList,setCompletedList]= useState([]);
  const [inCompletedList,setInCompletedList]= useState([]);
  const [toggleAllButton,setToggleAllButton] = useState(true)
  const [toggleCompleteButton,setToggleCompleteButton] = useState(false)
  const [toggleInCompleteButton,setToggleInCompleteButton] = useState(false)

  localStorage.setItem("tasks", JSON.stringify(taskList));

  const addTodoTask = (event) => {
    event.preventDefault();
    if (task.trim() !== "" && !editedTask) {
      setTaskList([...taskList, { id: uuidv4(), title: task, status: false }]);
      setTask("");
    } else if (task && !toggleButton) {
      setTaskList(
        taskList.map((eachElement) => {
          if (eachElement.id === editedTask) {
            return { ...eachElement, title: task.trim() };
          }
          return eachElement;
        })
      );
      setEditedTask(null);
      setToggleButton(true);
      setTask("");
    }
  };

  const updatedTodoInput = (event) => {
    setTask(event.target.value);
  };

  const clearTodoList = (event) => {
    event.preventDefault();
    setTaskList([]);
  };

  const allTodo=(event)=>{
    event.target.value
    setToggleCompleteButton(false)
    setToggleInCompleteButton(false)
    setToggleAllButton(true)
  }

  const completedTodo=()=>{
    const completedTodo=taskList.filter((eachElement)=>eachElement.status===true)
    setToggleAllButton(false)
    setToggleInCompleteButton(false)
    setToggleCompleteButton(true)
    setCompletedList(completedTodo)
  }

  const inCompletedTodo=()=>{
    const inCompletedTodo=taskList.filter((eachElement)=>eachElement.status===false)
    setToggleAllButton(false)
    setToggleCompleteButton(false)
    setToggleInCompleteButton(true)
    setInCompletedList(inCompletedTodo)
  }


  return (
    <div className="todo-container">
      <div className="todo-box">
        <h1 className="todo-heading">Todo-App</h1>
        <form onSubmit={addTodoTask}>
          <input
            type="text"
            className="todo-input"
            placeholder="Your Todo"
            value={task}
            onChange={updatedTodoInput}
          />
          <br />
          <div className="todo-add-button-container">
            <button
              className="todo-add-button"
              type="submit"
              onClick={addTodoTask}
            >
              {toggleButton ? "Add" : "Save"}
            </button>
          </div>
        </form>
        {taskList.length > 0 && (
          <>
            <div className="todo-filter">
              <label><input type="radio" value="All" name="todo" className="todo-filter-input" onChange={allTodo}/>All</label>
              <label><input type="radio" value="Complete" name="todo" className="todo-filter-input" onChange={completedTodo}/>Complete</label>
              <label><input type="radio" value="Incomplete" name="todo" className="todo-filter-input" onChange={inCompletedTodo}/>InComplete</label>
            </div>
              
            {toggleAllButton && <ListItems
              setTask={setTask}
              taskList={taskList}
              setTaskList={setTaskList}
              setEditedTask={setEditedTask}
              setToggleButton={setToggleButton}
              set/>}
            {toggleCompleteButton && <CompletedListItems setTask={setTask}
              completedList={completedList}
              setCompletedList={setCompletedList}
              setEditedTask={setEditedTask}
              setToggleButton={setToggleButton}/>}
            {toggleInCompleteButton && <InCompletedListItems setTask={setTask}
              inCompletedList={inCompletedList}
              setInCompletedList={setInCompletedList}
              setEditedTask={setEditedTask}
              setToggleButton={setToggleButton}/>}
            
            <div className="todo-add-button-container todo-clear-button-container">
              <button type="button" onClick={clearTodoList}>
                Clear All
              </button>
            </div>
          </>
        )}
        
      </div>
    </div>
  );
}

export default TodoPage;
