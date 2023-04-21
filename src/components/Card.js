import React, {useState} from 'react';
import EditTaskPopup from '../modals/UpdateTask'
import { Accordion, Card as BootstrapCard, Button } from 'react-bootstrap';

const Card = ({taskObj, index, id, deleteTask, updateListArray}) => {
    const [modal, setModal] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    const colors = [
        {
            primaryColor : "#00007a",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#ffb300",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#a70000",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#5c3675",
            secondaryColor : "#F3F0FD"
        }
    ]

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj, id) => {
        updateListArray(obj, id)
    }

    const handleDelete = () => {
        deleteTask(id)
    }

    return (
        <div className = "card-wrapper mr-5">
            <div className = "card-top" style={{"backgroundColor": colors[index%5].primaryColor}}></div>
            <div className="task-holder">
                <div className="card-header" style={{"backgroundColor": colors[index%5].secondaryColor, "borderRadius": "10px"}}>
                    <span>{taskObj.name}</span>
                </div>
                <div className="description mt-3" style={{ overflowY: showDescription ? 'auto' : 'hidden'}}>
                    {taskObj.description}
                </div>
                {taskObj.description.length > 100 && (
                    <div className="mt-2 text-right">
                    <button className="btn btn-link p-0" onClick={() => setShowDescription(!showDescription)}>
                        {showDescription ? 'See Less' : 'See More'}
                    </button>
                    </div>
                )}
                <div className="mt-auto">
                    <button className="btn btn-secondary mb-2" style={{ backgroundColor: colors[index%5].primaryColor }}>{taskObj.status}</button>
                    <div style={{"position": "absolute", "right": "20px", "bottom": "20px"}}>
                        <i className="far fa-edit mr-3 edit-icon" style={{"color": colors[index%5].primaryColor, "cursor": "pointer", "marginRight": "10px"}} onClick={() => setModal(true)}></i>
                        <i className="fas fa-trash-alt delete-icon" style={{"color": colors[index%5].primaryColor, "cursor": "pointer"}} onClick={handleDelete}></i>
                    </div>
                </div>
            </div>
            <EditTaskPopup modal = {modal} toggle = {toggle} id = {id} updateTask = {updateTask} taskObj = {taskObj}/>
        </div>
    );
};

export default Card;