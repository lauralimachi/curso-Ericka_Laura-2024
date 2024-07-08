import {Task} from '../models/task.js'
import logger from '../logs/logger.js';
async function getTasks(req, res){
    const {userId}= req.user;
    try{
        const tasks = await Task.findAll({
            attributes: ['id','name','done'],
            order: [['name','ASC']],
            where:{
                userId,
            },
        });
        res.json(tasks)
    }catch(error){
        logger.error(error.message);
        res.status(500).json({
            menssage: error.message,
        });
    }
}

async function CreateTask(req, res){
    const {name}= req.body;
    const {userId}=req.user;
    console.log("llego hasta aqui")
    try{
        const task = await Task.create({
            name,
            userId,
        });
        res.json(task)
    }catch(error){
        logger.error(error.message);
        res.status(500).json({
            menssage: error.message,
        });
    }
}
async function getTask(req, res){
    const {id} = req.params;
    const {userId}= req.user;
    try{
        const task = await Task.findOne({
            attributes: ['name','done'],
            where:{
                id,
                userId,
            },
        });
        res.json(task)
    }catch(error){
        logger.error(error.message);
        res.status(500).json({
            menssage: error.message,
        });
    }
}
async function updateTask(req, res){
    const {id} = req.params;
    const {userId}= req.user;
    const {name} = req.body;
    try{
        const task = await Task.update(
            {
                name,
            },
            {
                where:{
                    id,
                    userId,
                },
            }
        );
        if(task[0]===0)
            return res.status(404).json({message: 'la tarea no se encuntra'});
        res.json(task)
    }catch(error){
        logger.error(error.message);
        res.status(500).json({
            menssage: error.message,
        });
    }
}
async function taskDone(req, res){
    const {id} = req.params;
    const {userId}= req.user;
    const {done} = req.body;
    try{
        const task = await Task.update(
            {
                done,
            },
            {
                where:{
                    id,
                    userId
                },
            }
        );
        if(task[0]===0)
            return res.status(404).json({message: 'la tarea no se encuntra'});
        res.json(task)
    }catch(error){
        logger.error(error.message);
        res.status(500).json({
            menssage: error.message,
        });
    }
}
const deleteTask = async (req,res) => {
    const {id} = req.params;
    try{
        await Task.destroy({where : {id}});
        return res.sendStatus(204)
    }catch(error){
        logger.error(error.message);
        res.status(500).json({
            menssage: error.message,
        });
    }
}
export default {
    getTasks,
    CreateTask,
    getTask,
    updateTask,
    taskDone,
    deleteTask

};