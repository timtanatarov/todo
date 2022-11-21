import './App.css';
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import React, {useState} from "react";

/**
 * Функциональная компонента todo-лист
 * @returns {JSX.Element} - возвращает поле ввода для создания новой задачи и задачи, которые уже добавлены
 */
function App() {
    const [todo, setTodo] = useState([]);

    return (
        <>
            <h1>
                Todo list
            </h1>
            <div>
                <AddTodo setTodo={setTodo} todo={todo}/>
            </div>
            <TodoList todo={todo} setTodo={setTodo}/>
        </>
    );
}

export default App;
