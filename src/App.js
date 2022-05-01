// import TaskBar from "./TaskBar";
import { useState } from "react";
import "./App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//********IMPORT FONTAWESOME*************
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash);

function App() {
    const [toDo, setTodo] = useState([]); //!pour tester { id: 1, text: "", status: false }

    const [newTask, setNewTask] = useState("");

    //!On declare la fonction qui va permettre de créer une nouvelle task
    const creatTask = () => {
        if (newTask) {
            let newAdd = { id: toDo.length + 1, text: newTask, status: false }; //!je déclare un nouveau task sous le format de toDo(CF Ligne 11)

            const newToDo = [...toDo]; //!spread du tableau toDo qui contient tous les tasks
            newToDo.push(newAdd); //! on push à cet copie le nouveau task declaré a la ligne 18
            setTodo(newToDo); //! changement du state par la copie avec le nouveau task
            setNewTask(""); //! on remet le champ input à une chaine de caract vide :D
        }
    };

    const taskDone = (theTaskId) => {
        // ********VERSION PLUS PROPRE**************
        // let newTasks = toDo.map((task) => {
        //     //! je déclare une variable  newTasks qui sera la nouvelle state de toDo a la fin
        //     //!je parcours le tableau  toDo de tous les tasks qui sont des objets (cf Ligne 12)
        //     if (task.id === theTaskId) {
        //         //!on va cibler le task qui a la même correspondance avec le task en question
        //         return { ...task, status: !task.status }; //!faire un spread de l'objet task en question et lui changer son status en toogle(inversion de son status avec le !)
        //     }
        //     return task; //!return du task modifiers
        // });

        // return setTodo(newTasks); //!je change le state de toDo comme prévu au depart par une copie de toDo qui contient le task.status modifier a chaque clique
        //***********VERSION METHODE FOR IN */
        const newTasks = [...toDo]; //! je fais un spread de mon tableau toDo

        //! on va parcourir le tableau d'objets (CF cour sur les Objets en JS Jour 7)
        for (let key in newTasks) {
            if (newTasks.hasOwnProperty(key)) {
                if (newTasks[key].id === theTaskId) {
                    //!condition pour selectionner le bon objet du tableau
                    newTasks[key].status = !newTasks[key].status; //! on modifie la valeur
                }
            }
        }
        setTodo(newTasks);
    };

    const deleteTask = (theTaskId) => {
        const newTasks = toDo.filter((task) => task.id !== theTaskId); //! methode filter sur le tableau toDo return un tableau de tous les tasks différent du TaskId
        setTodo(newTasks); //!changement du state par ce nouveau tableau
    };

    return (
        <div className="todo">
            <div className="hello">
                {toDo &&
                    toDo.map((task, index) => {
                        return (
                            <div className="text-task" key={task.id}>
                                {task && (
                                    <input
                                        type="checkbox"
                                        title="Done or not"
                                        onClick={() => taskDone(task.id)} //!au click on declenche la fonction taskDone (cf Ligne 27)
                                    />
                                )}
                                {task && (
                                    <span
                                        className={
                                            task.status === true ? "done" : ""
                                        }
                                    >
                                        {task.text}
                                    </span>
                                )}

                                {task && (
                                    <span className="trash">
                                        <FontAwesomeIcon
                                            icon="fa-solid fa-trash"
                                            onClick={() => deleteTask(task.id)}
                                        />
                                    </span>
                                )}
                            </div>
                        );
                    })}
                <div>
                    <form
                        action="submit"
                        onSubmit={(e) => {
                            e.preventDefault();
                            return creatTask();
                        }}
                    >
                        <input
                            type="text"
                            className="searchbar"
                            placeholder="new task"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <input
                            className="add-button"
                            type="submit"
                            value="Add task"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
