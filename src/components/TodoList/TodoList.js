import React, {useState} from 'react';
import FilesUpload from "../FilesUpload";

const TodoList = ({todo, setTodo}) => {
    const [edit, setEdit] = useState(null);
    const [value, setValue] = useState('');
    const [detailValue, setDetailValue] = useState('');

    let now = `Завершено в ${new Date().toLocaleTimeString()}, ${new Date().toLocaleDateString()}`;

    const input = React.useRef();
    const detailInput = React.useRef();

    const deleteTodo = (id) => {
        let newTodo = [...todo].filter(item => item.id !== id);
        setTodo(newTodo);
    };

    const statusTodo = (id) => {
        let newTodo = [...todo].filter(item => {
            if (item.id === id) {
                item.status = !item.status
            }
            return item
        });
        setTodo(newTodo);
    };

    const editTodo = (id, title, detail) => {
        setEdit(id);
        setValue(title);
        setDetailValue(detail);
    };

    const saveTodo = (id) => {
        let newTodo = [...todo].map(item => {
            if ((item.id === id)) {
                if (!(!value || /^\s*$/.test(value))) {
                    item.title = value;
                }

            }
            return item
        });
        setTodo(newTodo);
        setEdit(null);
    };

    const addDetail = (id) => {
        let newTodo = todo.map(item => {
            if (item.id === id) {
                if (!(!detailValue || /^\s*$/.test(detailValue))) {
                    item.detail = detailValue;
                }
            }
            return item;
        });
        setTodo(newTodo);
        setDetailValue('');
    };

    return (
        <>
            {
                todo.map(item => (
                    <div key={item.id} className={item.status ? 'todo-row complete' : 'todo-row'}>
                        {
                            edit === item.id ?
                                <div>
                                    <div>
                                        <input
                                            ref={input}
                                            onFocus={() => input.current.select()}
                                            onChange={e => setValue(e.target.value)}
                                            value={value}/>
                                    </div>
                                    <div>
                                        <textarea
                                            ref={detailInput}
                                            onFocus={() => detailInput.current.select()}
                                            onChange={e => setDetailValue(e.target.value)}
                                            value={detailValue}
                                        >Добавить описание...</textarea>
                                    </div>
                                </div>
                                :
                                <div>
                                    <mark>{item.title}</mark>
                                    <div>
                                        {
                                            item.detail ?
                                                <div>
                                                    {item.detail}
                                                </div> :
                                                <div>
                                                    Нажмите редактировать, чтобы добавить описание...
                                                </div>
                                        }
                                    </div>
                                </div>
                        }
                        {
                            edit === item.id ?
                                <div>
                                    <button
                                        onClick={() => {
                                            saveTodo(item.id);
                                            addDetail(item.id);
                                        }}>Сохранить
                                    </button>
                                </div> :
                                <div>
                                    <button onClick={() => deleteTodo(item.id)}>Удалить</button>
                                    <button onClick={() => {
                                        statusTodo(item.id)
                                    }}>
                                        {item.status ? 'Вернуть' : 'Завершить'}
                                    </button>
                                    <button
                                        onClick={() => editTodo(item.id, item.title, item.detail)}>Редактировать
                                    </button>

                                    <div>
                                        <FilesUpload />
                                    </div>


                                    {
                                        item.status ?
                                            <div className='completionData'>
                                                {
                                                    now
                                                }
                                            </div> :
                                            <div>

                                            </div>
                                    }
                                </div>
                        }
                    </div>
                ))
            }
        </>
    )
};

export default TodoList;
