import { Select, Input, Button, Grid, Header, Icon } from "semantic-ui-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; //generador ID aleatorio

const options = [
  { key: "deporte", text: "Deporte", value: "Deporte" },
  { key: "casa", text: "Casa", value: "Casa" },
  { key: "oficina", text: "Oficina", value: "Oficina" },
  { key: "otra", text: "Otra", value: "Otra" },
];

export default function InputTask(props) {
  const [task, setTask] = useState({
    idTask: "",
    taskName: "",
    categoryTask: "",
  });
  const [error, setError] = useState(false);

  const { createTask } = props;

  const onChangeTask = (e) => {
    /* la E es predefinido del onchange*/
    setTask({
      ...task /*Los tres puntitos es para lo que tenia la tarea vamos a seguir agarrandolo*/,
      [e.target.name]:
        e.target
          .value /*el target.name(input name) actualizara los state (IdTask,taskName,categoryName) */,
    });
  };

  const onChangeCategoryTask = (e, data) => {
    setTask({
      ...task,
      [data.name]: data.value,
    });
  };

  const onSubmitTask = (e) => {
    //que no recargue la pag
    e.preventDefault(); //esta funcion es para que no recargue la pag

    //validacion
    if (task.taskName === "") {
      //si task(tarea).taskname(nombre de la tarea) esta vacio,se va a poner error al clicker enviar,lo m ismo con la categoria
      setError(true);
      return;
    }
    //eliminar mensaje error
    setError(false); //actualizamos set error si se corrigio los campos de tarea

    //asignar ID
    task.idTask = uuidv4(); //generamos id aleatorio a la tarea

    //crear tarea
    createTask(task);

    //limpiar imputs
    setTask({
      idTask: "",
      taskName: "",
      categoryTask: "",
    });
  };

  return (
    <>
      <Grid centered columns={2}>
        <Input type="text" action>
          <Input
            size="small"
            icon="add"
            placeholder="Escribe tu proxima tarea"
            iconPosition="left"
            name="taskName"
            value={task.taskName}
            onChange={onChangeTask}
          />
          <Select
            compact
            options={options}
            className="select-form-task"
            name="categoryTask"
            placeholder="Categoria"
            value={task.categoryTask}
            onChange={onChangeCategoryTask}
          />
          <Button type="Submit" color="violet" onClick={onSubmitTask}>
            Añadir tarea
          </Button>
        </Input>
      </Grid>
      {error && (
        <Grid centered>
          <Header as="h4" color="red" className="alert-error-form">
            <Icon name="close" />
            <Header.Content>
              Es obliogatoria seleccionar la tarea
            </Header.Content>
            <Icon name="close" />
          </Header>
        </Grid>
      )}
    </>
  );
}
