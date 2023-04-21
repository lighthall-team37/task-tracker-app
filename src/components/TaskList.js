import React, {useEffect, useState} from 'react';
import CreateTaskPopup from '../modals/CreateTask'
import Card from './Card';
import {auth, db, logout} from '../base'
import { query, collection, getDocs, where, doc, addDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { async } from '@firebase/util';
import NavBar from './NavBar'

const TaskList = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");

    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])

    const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
    
          setName(data.name);
          setUserId(data.uid);
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
    }, [user, loading, taskList])


    const deleteTask = async (id) => {
        const updatedList = taskList.filter(task => task.id !== id);
        
        const docRef = doc(db, "users", user.uid)
        await updateDoc(docRef, {
            taskList: updatedList,
        })

        fetchTaskList()

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

        //window.location.reload()
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

        fetchTaskList()
        setModal(false)
    }

    return (
        <>
            <NavBar user={user} name={name} logout={logout}/>
            <div className = "header text-center">
                <button className = "btn btn-dark mt-4" onClick = {() => setModal(true)} >Create Task</button>
            </div>

            <div className="d-flex justify-content-between">
                <div className="task-column">
                    <h3>
                        Pending
                        <span className="count-circle">{taskList && taskList.filter(task => task.status === 'Pending').length}</span>
                    </h3>
                    {taskList && taskList
                    .filter(task => task.status === 'Pending')
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((obj, index) => (
                        <div key={index} className="mb-2 d-flex flex-column justify-content-center align-items-center">
                            <Card taskObj={obj} index={index} id={obj.id} deleteTask={deleteTask} updateListArray={updateListArray} />
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
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((obj, index) => (
                        <div key={index} className="mb-2 d-flex flex-column justify-content-center align-items-center">
                            <Card taskObj={obj} index={index} id={obj.id} deleteTask={deleteTask} updateListArray={updateListArray} />
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
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((obj, index) => (
                        <div key={index} className="mb-2 d-flex flex-column justify-content-center align-items-center">
                            <Card taskObj={obj} index={index} id={obj.id} deleteTask={deleteTask} updateListArray={updateListArray} />
                        </div>
                    ))}
                </div>
            </div>
            <CreateTaskPopup toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

export default TaskList;