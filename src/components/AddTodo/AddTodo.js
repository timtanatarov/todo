import React, {useState} from 'react';
import { v1 as uuidv1 } from 'uuid';

const AddTodo = ({setTodo, todo}) => {
    const [value, setValue] = useState('');


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
