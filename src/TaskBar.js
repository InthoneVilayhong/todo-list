import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaskBar = ({ toDoArray, setToDoArray }) => {
    const [done, setDone] = useState(false);

    return (
        <div>
            <div className="todo">
                {toDoArray.map((todo, index) => {
                    return (
                        <div
                            key={index}
                            className="text-task"
                            style={{
                                textDecoration: done && "line-through",
                            }}
                        >
                            <input
                                type="checkbox"
                                onClick={() => {
                                    done === false
                                        ? setDone(true)
                                        : setDone(false);
                                }}
                            />
                            {todo}
                            <div className="trash">
                                <FontAwesomeIcon icon="fa-solid fa-trash fa-xl" />
                            </div>
                        </div>
                    );
                })}
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const array = [...toDoArray];
                    array.push(toDoArray.text);
                    setToDoArray(array);
                }}
            >
                <input
                    className="searchbar"
                    type="text"
                    name="searchbar"
                    id="searchbar"
                    placeholder="new task"
                    value={toDoArray.text}
                    onChange={(e) => setToDoArray.text(e.target.value)}
                />
                <input className="add-button" type="submit" value="Add task" />
            </form>
        </div>
    );
};

export default TaskBar;
