import React, {useState} from 'react';
import { v1 as uuidv1 } from 'uuid';

/**
 * Функциональная компонента добавления новой задачи
 * @param {function} setTodo - метод установки нового состояния todo
 * @param {array} todo – состояние, в котором хранятся задачи
 */

const AddTodo = ({setTodo, todo}) => {

    /**
     * Инициализация нового состояния, в котором будет находиться новая задача
     */
    const [value, setValue] = useState('');

    /**
     * Функция добавления новой задачи
     */
    const addTodo = () => {
        if (!value || /^\s*$/.test(value)) {
            return;
        }
        setTodo([
            ...todo, {
                id: uuidv1(),
                title: value,
                status: false,
                description: 'Добавить описание...',
                completedData: '01.01.01',
            }
        ]);
        setValue('');
    };

    /**
     * JSX, в котором есть поле ввода и кнопка добавить
     */
    return (
        <>
            <input
                placeholder='Добавить todo'
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <button onClick={addTodo}>
                Добавить
            </button>
        </>
    )
};

export default AddTodo;
