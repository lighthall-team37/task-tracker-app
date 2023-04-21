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
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
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
        <Card sx={{ width: 370}}>
            <CardActionArea>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {taskObj.name} 
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Due: {taskObj.date}<br/>
                    {taskObj.description}<br/>
                    {taskObj.status}
                </Typography>
                    <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                        <i className = "far fa-edit mr-3" style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {() => setModal(true)}></i>
                        <i className="fas fa-trash-alt" style = {{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {handleDelete}></i>
                    </div>
                </CardContent>
            </CardActionArea>
            <EditTaskPopup modal = {modal} toggle = {toggle} id = {id} updateTask = {updateTask} taskObj = {taskObj}/>
        </Card>
    );
};

export default TaskCard;