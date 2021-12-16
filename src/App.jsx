import { useState } from "react";
import "./App.css";

function App() {

  const [taskList, setTaskList] = useState([]);
  const [inputs, setInputs] = useState({
    task: "",
    priority: "Low"
  });

  const handleChange = (e) => {
    setInputs(inputs => ({
      ...inputs,
      [e.target.name]: e.target.value
    }))
  };

  const addTask = (e) => {
    e.preventDefault();
    const newTask = {
      task: inputs.task,
      priority: inputs.priority,
      id: Math.random().toString(36)
    };
    setTaskList((taskList) => ([...taskList, newTask]));
    setInputs({
      task: "",
      priority: "Low"
    });
  };

  return (
    <div className="App">
      <div className="taskContainer">
          <form onSubmit={addTask} className="inputBar">
            <input type="text" className="taskText" name="task" placeholder="Enter a task" value={inputs.task} onChange={handleChange} />
            <select name="priority" className="prioritySelect" value={inputs.priority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option> 
              <option value="High">High</option>
            </select>
            <input type="submit" className="taskSubmit" value="Add Task" />
          </form>
        
        <div className="taskList">
          {taskList.map((t) => (<Task {...t} key={t.id} />))}
        </div>
      </div>
    </div>
  );

  function Task( {task, priority, id} ) {

    const style = {}
    if(priority === "Low") { style.backgroundColor = "#BDFFC3" }
    else if(priority === "Medium") { style.backgroundColor = "#FFFFBD" }
    else { style.backgroundColor = "#FFBDBD" }
  
    const deleteTask = () => {
      const newTaskList = (t) => {
        t.map((task,i) => {
          if(task.id === id) {
            t = t.splice(i,1)
          }
        })
        return t;
      };
      setTaskList((previousTaskList) => newTaskList(previousTaskList));
    };
  
    return (
      <div className="task" style={style} onDoubleClick={deleteTask}>
        <p>{task}</p>
      </div>
    )
  
  };

}

export default App;
