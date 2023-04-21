import React, {useEffect, useState} from 'react';
import CreateTaskPopup from '../modals/CreateTask'
import TaskCard from './TaskCard';
import {auth, db, logout} from '../base'
import { query, collection, getDocs, where, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar'

const TaskList = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])

    const [sortBy, setSortBy] = useState('');
    const [sortOrderName, setSortOrderName] = useState('asc');
    const [sortOrderDueDate, setSortOrderDueDate] = useState('asc');
    const [sortOrderPriority, setSortOrderPriority] = useState('asc');

    const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
    
          setName(data.name);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
    };

    const fetchTaskList = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();

            setTaskList(data.taskList)
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching task list");
        }
    }
    
    useEffect(() => {
        if(loading) return;
        if (!user) return navigate("/login");
        fetchUserName();
        fetchTaskList();
    }, [user, loading])


    const deleteTask = async (id) => {
        const updatedList = taskList.filter(task => task.id !== id);
        
        const docRef = doc(db, "users", user.uid)
        await updateDoc(docRef, {
            taskList: updatedList,
        })

        setTaskList(updatedList)
        window.location.reload()
    }

    const updateListArray = async (taskObj, id) => {
        let updatedList = taskList.map(task => {
            if(task.id === id) {
                return { ...task, ...taskObj };
            }
            else {
                return task;
            }
        })

        const docRef = doc(db, "users", user.uid)
        await updateDoc(docRef, {
            taskList: updatedList,
        })
        setTaskList(updatedList)

        // window.location.reload()
        setModal(false)
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = async (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)

        const user = auth.currentUser;

        const docRef = doc(db, "users", user.uid)
        await updateDoc(docRef, {
            taskList: arrayUnion(taskObj),
        })

        // fetchTaskList()
        setTaskList(tempList)
        setModal(false)
    }

    const toggleSortOrder = (sortType) => {
        if (sortType === 'name') {
            setSortOrderName(sortOrderName === 'asc' ? 'desc' : 'asc');
        }
        else if (sortType === 'dueDate') {
            setSortOrderDueDate(sortOrderDueDate === 'asc' ? 'desc' : 'asc');
        }
        else if (sortType === 'priority') {
            setSortOrderPriority(sortOrderPriority === 'asc' ? 'desc' : 'asc');
        }
    };
    
    const handleSort = (sortType) => {
        setSortBy(sortType);
        toggleSortOrder(sortType);
    };

    console.log(sortOrderName)
    console.log(sortOrderDueDate)

    return (
        <>
            <NavBar user={user} name={name} logout={logout}/>
            <div className='rembody' style={{backgroundColor: 'black'}}>
            <div className = "header text-center">
                <h2>{name}'s Tasks </h2>
                <button className = "btn btn-light mt-4" onClick = {() => setModal(true)} >Create Task</button>
            </div>

            <div className="d-flex justify-content-center align-items-center mb-3">
                <div>
                    <button className="btn btn-secondary me-2" onClick={() => handleSort('name')}>Sort by Name</button>
                    <button className="btn btn-secondary me-2" onClick={() => handleSort('dueDate')}>Sort by Due Date</button>
                    <button className="btn btn-secondary me-2" onClick={() => handleSort('priority')}>Sort by Priority</button>
                </div>
            </div>
            <br/>

            <div className="task-container d-flex justify-content-between">
                <div className="task-column">
                    <h3>
                        Pending
                        <span className="count-circle">{taskList && taskList.filter(task => task.status === 'Pending').length}</span>
                    </h3>
                    {taskList && taskList
                    .filter(task => task.status === 'Pending')
                    .sort((a, b) => {
                        if (sortBy === 'name') {
                            if (sortOrderName === 'asc') {
                            return a.name.localeCompare(b.name);
                            } else {
                            return b.name.localeCompare(a.name);
                            }
                        }
                      })
                      .sort((a, b) => {
                        if (sortBy === 'dueDate') {
                            if (sortOrderDueDate === 'asc') {
                            return new Date(a.dueDate) - new Date(b.dueDate);
                            } else {
                            return new Date(b.dueDate) - new Date(a.dueDate);
                            }
                        }
                      })
                      .sort((a, b) => {
                        if (sortBy === 'priority') {
                            if (sortOrderPriority === 'asc') {
                            return a.priority.localeCompare(b.priority);
                            } else {
                            return b.priority.localeCompare(a.priority);
                            }
                        }
                      })
                    .map((obj, index) => (
                        <div key={index} className="mb-2 d-flex flex-column justify-content-center align-items-center">
                            <TaskCard taskObj={obj} index={0} id={obj.id} deleteTask={deleteTask} updateListArray={updateListArray} />
                        </div>
                    ))}
                </div>
                <div className="task-column">
                    <h3>
                        In Progress
                        <span className="count-circle">{taskList && taskList.filter(task => task.status === 'In Progress').length}</span>
                    </h3>
                    {taskList && taskList
                    .filter(task => task.status === 'In Progress')
                    .sort((a, b) => {
                        if (sortBy === 'name') {
                            if (sortOrderName === 'asc') {
                            return a.name.localeCompare(b.name);
                            } else {
                            return b.name.localeCompare(a.name);
                            }
                        }
                      })
                      .sort((a, b) => {
                        if (sortBy === 'dueDate') {
                            if (sortOrderDueDate === 'asc') {
                            return new Date(a.dueDate) - new Date(b.dueDate);
                            } else {
                            return new Date(b.dueDate) - new Date(a.dueDate);
                            }
                        }
                      })
                      .sort((a, b) => {
                        if (sortBy === 'priority') {
                            if (sortOrderPriority === 'asc') {
                            return a.priority.localeCompare(b.priority);
                            } else {
                            return b.priority.localeCompare(a.priority);
                            }
                        }
                      })
                    .map((obj, index) => (
                        <div key={index} className="mb-2 d-flex flex-column justify-content-center align-items-center">
                            <TaskCard taskObj={obj} index={1} id={obj.id} deleteTask={deleteTask} updateListArray={updateListArray} />
                        </div>
                    ))}
                </div>
                <div className="task-column">
                    <h3>
                        Done
                        <span className="count-circle">{taskList && taskList.filter(task => task.status === 'Done').length}</span>
                    </h3>
                    {taskList && taskList
                    .filter(task => task.status === 'Done')
                    .sort((a, b) => {
                        if (sortBy === 'name') {
                            if (sortOrderName === 'asc') {
                            return a.name.localeCompare(b.name);
                            } else {
                            return b.name.localeCompare(a.name);
                            }
                        }
                      })
                      .sort((a, b) => {
                        if (sortBy === 'dueDate') {
                            if (sortOrderDueDate === 'asc') {
                            return new Date(a.dueDate) - new Date(b.dueDate);
                            } else {
                            return new Date(b.dueDate) - new Date(a.dueDate);
                            }
                        }
                      })
                      .sort((a, b) => {
                        if (sortBy === 'priority') {
                            if (sortOrderPriority === 'asc') {
                            return a.priority.localeCompare(b.priority);
                            } else {
                            return b.priority.localeCompare(a.priority);
                            }
                        }
                      })
                    .map((obj, index) => (
                        <div key={index} className="mb-2 d-flex flex-column justify-content-center align-items-center">
                            <TaskCard taskObj={obj} index={2} id={obj.id} deleteTask={deleteTask} updateListArray={updateListArray} />
                        </div>
                    ))}
                </div>
            </div>
            </div>
            <CreateTaskPopup toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

export default TaskList;