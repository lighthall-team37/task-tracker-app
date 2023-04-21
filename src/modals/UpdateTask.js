import React, { useState , useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditTaskPopup = ({modal, toggle, id, updateTask, taskObj}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState('');
    const [taskPriority, setTaskPriority] = useState("")
    const [dueDate, setDueDate] = useState('')

    const handleChange = (e) => {
        
        const {name, value} = e.target

        if(name === "taskName"){
            setTaskName(value)
        }else if(name === "description"){
            setDescription(value)
        }
        else if(name === "dueDate") {
            setDueDate(value)
        }
        else if(name === "taskPriority") {
            setTaskPriority(value)
        }
        else {
            setTaskStatus(value)
        }
    }

    useEffect(() => {
        setTaskName(taskObj.name)
        setDescription(taskObj.description)
        setDueDate(taskObj.dueDate)
        setTaskStatus(taskObj.status)
        setTaskPriority(taskObj.priority)
    },[])

    const handleUpdate = (e) => {
        e.preventDefault();
        if (taskName.trim() === '') {
            alert('Task Name cannot be empty!');
            return;
        }
        let tempObj = {}
        tempObj['name'] = taskName
        tempObj['description'] = description
        taskObj["dueDate"] = dueDate
        tempObj['status'] = taskStatus
        taskObj["priority"] = taskPriority
        updateTask(tempObj, id)
        toggle();
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>
                <div className = "form-group">
                    <label>Task Name</label>
                    <input type="text" className = "form-control" value = {taskName} onChange = {handleChange} name = "taskName"/>
                </div>
                <div className = "form-group">
                    <label>Description</label>
                    <textarea rows = "5" className = "form-control" value = {description} onChange = {handleChange} name = "description"></textarea>
                    <div className="row">
                        <div className="col-sm-6">
                            <label>Priority</label>
                            <select className="form-control" value={taskPriority} onChange={handleChange} name="taskPriority">
                                <option value="">Select a Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="urgent">Urgent</option>
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <label>Due Date</label>
                            <input type="date" className = "form-control" value = {dueDate} onChange = {handleChange} name = "dueDate"></input>
                        </div>
                    </div>
                    <label>Status</label>
                    <select className="form-control" value={taskStatus} onChange={handleChange} name="taskStatus">
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default EditTaskPopup;