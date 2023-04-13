import { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import Container from "./components/Container";
import Header from "./components/Header";
import InputTask from "./components/InputTask";
import TaskContent from "./components/TaskContent";

function App() {
  //pasar tareas a localstorage
  let initialTasks = JSON.parse(localStorage.getItem("tasks")); //guardamos las tareas en localstorage.getitem de los valores de tsks(tares)

  if (!initialTasks) {
    //comprobamos si initialtask contiene algo
    initialTasks = []; //si esta vacio lo iniciamos como un array vacio
  }

  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    if (initialTasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
  }, [initialTasks, tasks]); //este array indica cuando initialTasks y las tareas se actualize,este useEffect  se volvera hacer

  console.log(tasks);

  const createTask = (task) => {
    setTasks([...tasks, task]); // copia las tareas que tengamos,pasa la nueva tarea
  };

  const deleteTask = (id) => {
    const currentTask = tasks.filter((task) => task.idTask !== id);
    setTasks(currentTask);
  };

  return (
    <Container>
      <Header />
      <InputTask createTask={createTask} />
      <TaskContent tasks={tasks} deleteTask={deleteTask} />
    </Container>
  );
}

export default App;
