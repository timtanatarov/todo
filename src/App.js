import './App.css';
import Header from "./components/Header/Header";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import {useState} from "react";

function App() {
    const [todo, setTodo] = useState([]);

    return (
        <>
            <Header/>
            <div>
                <AddTodo setTodo={setTodo} todo={todo}/>
            </div>
            <TodoList todo={todo} setTodo={setTodo}/>
        </>
    );
}

export default App;
