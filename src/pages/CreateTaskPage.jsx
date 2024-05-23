import { useState } from 'react';
import axios from 'axios';

const CreateTaskPage = ({ getTasks }) => {
    const [task, setTask] = useState('');
    const handleCreateTask = () => {
        axios
            .post('http://localhost:5000/add', { task: task })
            .then(() => {
                setTask('');
                getTasks();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleCreateTask();
        }
    };

    return (
        <div className='flex justify-center items-center'>
            <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
                className='w-[20vw] px-5 py-3 border border-black text-lg rounded-l-lg'
                type='text'
                id='inputTask'
                placeholder='Enter task here...'
            />
            <button
                onClick={handleCreateTask}
                className='px-5 py-3 border border-black rounded-r-lg text-lg hover:bg-black hover:text-white transition duration-300'
            >
                Create Task
            </button>
        </div>
    );
};

export default CreateTaskPage;
