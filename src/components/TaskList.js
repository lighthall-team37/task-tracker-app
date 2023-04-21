import React, {useEffect, useState} from 'react';
import CreateTaskPopup from '../modals/CreateTask'
import TaskCard from './Card';
import {auth, db} from '../base'
import { query, collection, getDocs, where, doc, addDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { async } from '@firebase/util';

const TaskList = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");

    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
    // console.log("taskList")
    // console.log(taskList)

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
        if (!user) return navigate("/login");
        fetchUserName();
        fetchTaskList();
    }, [user])


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

        window.location.reload()
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
            <div className = "header text-center">
                <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Create Task</button>
            </div>
            <div className="d-flex justify-content-between">
                <div className="task-column">
                    <h3 style={{textAlign: "center", color: 'white'}}>Assigned</h3>
                    {taskList && taskList
                    .filter(task => task.status === 'Pending')
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((obj, index) => (
                        <div key={index} className="mb-2 d-flex flex-column justify-content-center align-items-center">
                            <TaskCard taskObj={obj} index={index} id={obj.id} deleteTask={deleteTask} updateListArray={updateListArray} />
                        </div>
                    ))}
                </div>
                <div className="task-column">
                    <h3 style={{textAlign: "center", color: 'white'}}>In Progress</h3>
                    {taskList && taskList
                    .filter(task => task.status === 'In Progress')
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((obj, index) => (
                        <div key={index} className="mb-2 d-flex flex-column justify-content-center align-items-center">
                            <TaskCard taskObj={obj} index={index} id={obj.id} deleteTask={deleteTask} updateListArray={updateListArray} />
                        </div>
                    ))}
                </div>
                <div className="task-column">
                    <h3 style={{textAlign: "center", color: 'white'}}>Done</h3>
                    {taskList && taskList
                    .filter(task => task.status === 'Done')
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((obj, index) => (
                        <div key={index} className="mb-2 d-flex flex-column justify-content-center align-items-center">
                            <TaskCard taskObj={obj} index={index} id={obj.id} deleteTask={deleteTask} updateListArray={updateListArray} />
                        </div>
                    ))}
                </div>
            </div>
            <CreateTaskPopup toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

export default TaskList;