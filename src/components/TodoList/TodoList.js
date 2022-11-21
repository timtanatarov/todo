import React, {useState} from 'react';
import FilesUpload from "../FilesUpload";

/**
 * Функциональная компонента, в которой находится весь todo-лист
 * @param todo - список задач
 * @param setTodo - метод установки нового todo
 */

const TodoList = ({todo, setTodo}) => {
    /**
     * Инициализация состояний
     * edit - состояние изменения, в зависимости от него отрисовывается либо обычный интерфейс взаимодействия с
     * задачами, либо интерфейс изменения задачи, при этом изчезают все кнопки и появляется кнопка "сохранить"
     * setEdit - получает id изменяемой задачи
     * value - состояние нового заголовка задачи, setValue - метод установки нового заголовка задачи
     * detailValue - состояние нового описания задачи, setDetailValue - метод установки нового описания задачи
     */
    const [edit, setEdit] = useState(null);
    const [value, setValue] = useState('');
    const [detailValue, setDetailValue] = useState('');

    /**
     * @description now - фиксируем время, чтобы после указать время закрытия задачи
     * @type {string}
     */
    let now = `Завершено в ${new Date().toLocaleTimeString()}, ${new Date().toLocaleDateString()}`;

    /**
     * @description - input, detailInput - рефы, нужные для того, чтобы при нажатии
     * на текстовые поля весь текст выделялся
     * @type {React.MutableRefObject<undefined>}
     */
    const input = React.useRef();
    const detailInput = React.useRef();

    /**
     * Функция удаления задачи
     * @param id - номер задачи, которую нужно удалить
     * setTodo возвращает новый state, в котором методом filter исключается задача с данным id
     */
    const deleteTodo = (id) => {
        let newTodo = [...todo].filter(item => item.id !== id);
        setTodo(newTodo);
    };

    /**
     * Функция изменения статуса задачи
     * @param id - номер задачи, статус выполнения которой изменился
     * setTodo возвращает новый state, в котором задача с данным id изменила статус выполнения
     */
    const statusTodo = (id) => {
        let newTodo = [...todo].filter(item => {
            if (item.id === id) {
                item.status = !item.status
            }
            return item
        });
        setTodo(newTodo);
    };

    /**
     * Функция измененения id, заголовка и описания задачи
     * @param id - номер задачи, которая изменяется
     * @param title - заголовок задачи, которая изменяется
     * @param detail - описание задачи, которая изменяется
     * setEdit, setValue, setDetailValue возвращают новые state: id, заголовок, описание соответственно
     */
    const editTodo = (id, title, detail) => {
        setEdit(id);
        setValue(title);
        setDetailValue(detail);
    };

    /**
     * Функция сохранения измененного todo
     * @param id - id измененного todo
     * Возвращается новый state todo, в него сохраняется новая задача
     */
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

    /**
     * Функция добавления описания
     * @param id - id задачи, в которую нужно добавить описание
     */
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

    /**
     * JSX, в котором отрисовывается todo лист
     * В зависимости от результата работы тернарного оператора возвращается либо исходный todo-лист, либо
     * поля изменения заголовка или описания задачи
     * Также есть кнопка завершнения задачи, при её нажатии задача перечеркивается, внизу появляется время завершения
     */
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
                                    <div>
                                        <FilesUpload />
                                    </div>

                                </div>
                        }
                    </div>
                ))
            }
        </>
    )
};

export default TodoList;
