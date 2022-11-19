import './App.css';
import Header from "./components/Header/Header";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import {useState} from "react";

function App() {
    const [todo, setTodo] = useState([
        {
            id: 1,
            title: 'Прогуляться с собакой',
            detail: 'Захватить одноразовый пакетик',
            status: false,
        },
        {
            id: 2,
            title: 'Зайти в магазин',
            detail: 'Захватить авоську',
            status: false,
        },
        {
            id: 3,
            title: 'Написать ментору',
            detail: 'Сказать спасибо за терпение :)',
            status: false,
        },
    ]);

    // let now = `${new Date().toLocaleTimeString()}, ${new Date().toLocaleDateString()}`;
    // console.log(now);


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
