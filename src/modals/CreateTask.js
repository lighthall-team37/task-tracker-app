import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

const CreateTaskPopup = ({modal, toggle, save}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState('Pending')
    const [taskPriority, setTaskPriority] = useState("")
    const [dueDate, setDueDate] = useState(getCurrentDate())

    function getCurrentDate() {
        let today = new Date();
        let month = (today.getMonth() + 1).toString().padStart(2, '0');
        let day = today.getDate().toString().padStart(2, '0');
        let year = today.getFullYear();
        return `${year}-${month}-${day}`;
    }

    const handleChange = (e) => {
        
        const {name, value} = e.target

        if(name === "taskName"){
            setTaskName(value);
        }
        else if(name === "description") {
            setDescription(value);
        }
        else if(name === "dueDate"){
            setDueDate(value);
        }
        else if(name === "taskPriority") {
            setTaskPriority(value)
        }
        else {
            setTaskStatus(value);
        }
    }

    const handleSave = (e) => {
        e.preventDefault()
        if (taskName.trim() === '') {
            alert('Task Name is required!');
            return;
        }
        let taskObj = {}
        taskObj["id"] = uuidv4()
        taskObj["name"] = taskName
        taskObj["description"] = description
        taskObj["dueDate"] = dueDate
        taskObj["status"] = taskStatus
        taskObj["priority"] = taskPriority
        save(taskObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Task</ModalHeader>
            <ModalBody>
            
            <div className = "form-group">
                <label>Task Name</label>
                <input type="text" className = "form-control" value = {taskName} onChange = {handleChange} name = "taskName" required/>
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
                        <input type="date" className = "form-control" value = {dueDate} onChange = {handleChange} name = "dueDate" min={getCurrentDate()}></input>
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
            <Button color="primary" onClick={handleSave}>Create</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default CreateTaskPopup;