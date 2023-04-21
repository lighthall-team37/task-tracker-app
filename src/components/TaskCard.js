import React, {useState} from 'react';
import EditTaskPopup from '../modals/UpdateTask'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const TaskCard = ({taskObj, index, id, deleteTask, updateListArray}) => {
    const [modal, setModal] = useState(false);

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

    const prioritySymbols = {
        low: '\u2606',
        medium: '\u2605\u2606',
        high: '\u2605\u2605\u2606',
        urgent: '\u2605\u2605\u2605',
    };

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
            {/* <div className="task-holder">
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
                <div>Due on {taskObj.dueDate}</div>
                <div className="mt-auto">
                    <button className="btn btn-secondary mb-2" style={{ backgroundColor: colors[index%5].primaryColor }}>{taskObj.status}</button>
                    <div style={{"position": "absolute", "right": "20px", "bottom": "20px"}}>
                        <i className="far fa-edit mr-3 edit-icon" style={{"color": colors[index%5].primaryColor, "cursor": "pointer", "marginRight": "10px"}} onClick={() => setModal(true)}></i>
                        <i className="fas fa-trash-alt delete-icon" style={{"color": colors[index%5].primaryColor, "cursor": "pointer"}} onClick={handleDelete}></i>
                    </div>
                </div>
            </div> */}
            <Card sx={{ width: 370, height: 230}} style={{backgroundColor: colors[index%5].secondaryColor, borderRadius: "10px"}}>
                <CardActionArea sx={{ width: 370, height: 230}}>
                    <CardContent sx={{ width: 370, height: 230}} style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                        <div class="d-flex justify-content-between">
                            <Typography gutterBottom variant="h5" component="div">
                                {taskObj.name} 
                            </Typography>
                            <span className="priority-symbol">{prioritySymbols[taskObj.priority]}</span>
                        </div>
                        <Typography variant="body2" color="text.secondary">
                                <span>Description:</span>
                                {taskObj.description.length > 35 ? (
                                    <div class="description" style={{ maxHeight: '80px', overflowY: 'auto', textAlign: 'start' }}>{taskObj.description}</div>
                                ) : (
                                    taskObj.description
                                )}
                        </Typography>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Typography variant="body2" color="text.secondary">
                                <button className="btn btn-secondary" style={{ backgroundColor: colors[index%5].primaryColor, border: '0px' }}>{taskObj.status}</button>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <span>Due: </span><button className="btn btn-secondary" style={{ backgroundColor: colors[index%5].primaryColor, border: '0px' }}>{taskObj.dueDate}</button>
                            </Typography>
                            <div>
                                <i className="far fa-edit mr-3 edit-icon" style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer", "marginRight": "10px"}} onClick={() => setModal(true)}></i>
                                <i className="fas fa-trash-alt delete-icon" style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick={handleDelete}></i>
                            </div>
                        </div>
                    </CardContent>
                </CardActionArea>
                <EditTaskPopup modal={modal} toggle={toggle} id={id} updateTask={updateTask} taskObj={taskObj}/>
            </Card>

        </div>
    );
};

export default TaskCard;