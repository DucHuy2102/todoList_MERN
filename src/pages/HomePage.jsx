import { useEffect, useState } from 'react';
import CreateTaskPage from './CreateTaskPage';
import axios from 'axios';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';

const HomePage = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checkDone, setCheckDone] = useState(false);

    // get all tasks
    const getTasks = () => {
        axios
            .get('http://localhost:5000/getAll')
            .then((res) => {
                setTodos(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        getTasks();
        // const intervalId = setInterval(getTasks, 5000);
        // return () => clearInterval(intervalId);
    }, []);

    // edit task
    const handleEditTask = () => {
        console.log('Edit task');
    };

    // delete task
    const handleDeleteTask = () => {
        console.log('Delete task');
    };

    // checkdone task
    const handleCheckDoneTask = (id) => {
        axios
            .put(`http://localhost:5000/checkdone/${id}`)
            .then(() => {
                setCheckDone(!checkDone);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            {/* title page */}
            <h1 className='font-bold text-4xl mb-5'>What do you wanna do?</h1>

            {/* edit task page */}
            <CreateTaskPage getTasks={getTasks} />

            {/* display task */}
            {todos.length === 0 ? (
                // no task
                <div className=''>
                    <h2 className='text-center font-bold text-2xl mt-5'>
                        No task here
                    </h2>
                </div>
            ) : (
                // have task
                todos.map((todo, index) => {
                    const inputId = `checkdone-${index}`;
                    return (
                        <div
                            key={index}
                            className='mt-5 bg-black py-3 text-white pl-10 rounded-lg flex justify-between items-center'
                        >
                            <div className='flex justify-center items-center gap-3'>
                                {/* button checkdone */}
                                <input
                                    id={inputId}
                                    checked={todo.checkDone}
                                    onChange={() => {
                                        handleCheckDoneTask(todo._id);
                                    }}
                                    type='checkbox'
                                    className='h-5 w-5'
                                    title='Check this task as done'
                                />

                                {/* name task */}
                                <label
                                    className={todo.done ? 'line-through' : ''}
                                    htmlFor={inputId}
                                >
                                    {todo.task}
                                </label>
                            </div>

                            {/* buttons: edit & delete */}
                            <div className='flex justify-center items-center gap-5 text-black mr-10'>
                                <CiEdit
                                    onClick={handleEditTask}
                                    title='Edit this task'
                                    size={35}
                                    className=' bg-white hover:cursor-pointer rounded-lg p-1'
                                />
                                <MdDelete
                                    onClick={handleDeleteTask}
                                    title='Delete this task'
                                    size={35}
                                    className=' bg-white hover:cursor-pointer rounded-lg p-1'
                                />
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default HomePage;
