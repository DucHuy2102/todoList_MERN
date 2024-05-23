import { useEffect, useState } from 'react';
import CreateTaskPage from './CreateTaskPage';
import axios from 'axios';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { BsCircleFill } from 'react-icons/bs';

const HomePage = () => {
    const [todos, setTodos] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentTask, setCurrentTask] = useState({ id: null, task: '' });

    // get all tasks
    const getTasks = () => {
        axios
            .get('http://localhost:5000/getAll')
            .then((res) => {
                setTodos(res.data);
                // window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getTasks();
    }, []);

    // edit task
    const handleEditTask = (task) => {
        setEditMode(true);
        setCurrentTask({ id: task._id, task: task.task });
    };
    const handleUpdateTask = () => {
        axios
            .put(`http://localhost:5000/edit/${currentTask.id}`, {
                task: currentTask.task,
            })
            .then((res) => {
                console.log(res);
                setEditMode(false);
                setCurrentTask({ id: null, task: '' });
                getTasks();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // delete task
    const handleDeleteTask = (id) => {
        axios
            .delete(`http://localhost:5000/delete/${id}`)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // checkdone task
    const handleCheckDoneTask = (id) => {
        axios
            .put(`http://localhost:5000/checkdone/${id}`)
            .then((res) => {
                console.log(res);
                window.location.reload();
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

            {/* edit task */}
            {editMode && (
                <div className='mt-5'>
                    <input
                        autoFocus
                        type='text'
                        className='w-[20vw] px-5 py-3 border border-black text-lg rounded-l-lg'
                        value={currentTask.task}
                        onChange={(e) =>
                            setCurrentTask({
                                ...currentTask,
                                task: e.target.value,
                            })
                        }
                    />
                    <button
                        className='px-5 w-[9vw] py-3 border border-black rounded-r-lg text-lg hover:bg-black hover:text-white transition duration-300'
                        onClick={handleUpdateTask}
                    >
                        Update
                    </button>
                </div>
            )}

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
                            className={
                                todo.checkDone
                                    ? 'mt-5 bg-blue-500 py-3 text-white pl-10 rounded-lg flex justify-between items-center'
                                    : 'mt-5 bg-black py-3 text-white pl-10 rounded-lg flex justify-between items-center'
                            }
                        >
                            <div
                                onClick={() => handleCheckDoneTask(todo._id)}
                                className='flex justify-center items-center gap-3'
                            >
                                {/* button checkdone */}
                                {todo.checkDone ? (
                                    <BsFillCheckCircleFill
                                        className='icon'
                                        key={inputId}
                                    />
                                ) : (
                                    <BsCircleFill
                                        className='icon'
                                        key={inputId}
                                    />
                                )}

                                {/* name task */}
                                <p
                                    className={
                                        todo.checkDone ? 'line-through' : ''
                                    }
                                    htmlFor={inputId}
                                >
                                    {todo.task}
                                </p>
                            </div>

                            {/* buttons: edit & delete */}
                            <div className='flex justify-center items-center gap-5 text-black mr-10'>
                                <CiEdit
                                    onClick={() => handleEditTask(todo)}
                                    title='Edit this task'
                                    size={35}
                                    className=' bg-white hover:cursor-pointer rounded-lg p-1'
                                />
                                <MdDelete
                                    onClick={() => handleDeleteTask(todo._id)}
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
