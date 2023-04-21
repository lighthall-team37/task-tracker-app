import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

const CreateTaskPopup = ({modal, toggle, save}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState('Pending');
    const [dueDate, setDueDate] = useState('');

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
        else {
            setTaskStatus(value);
        }
    }

    const handleSave = (e) => {
        e.preventDefault()
        let taskObj = {}
        taskObj["id"] = uuidv4()
        taskObj["name"] = taskName
        taskObj["description"] = description
        taskObj["status"] = taskStatus
        taskObj["date"] = dueDate
        save(taskObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Task</ModalHeader>
            <ModalBody>
            
                    <div className = "form-group">
                        <label>Task Name</label>
                        <input type="text" className = "form-control" value = {taskName} onChange = {handleChange} name = "taskName"/>
                    </div>
                    <div className = "form-group">
                        <label>Description</label>
                        <textarea rows = "5" className = "form-control" value = {description} onChange = {handleChange} name = "description"></textarea>
                        <label>Due Date</label>
                        <input type="date" className = "form-control" value = {dueDate} onChange = {handleChange} name = "dueDate"></input>
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