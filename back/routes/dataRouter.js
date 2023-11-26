import express from 'express';
import { 
    getDataFromData,
    createDataForData,
    getDataByIdData,
    updateDataOfData,
    deleteDataFromData
} from '../controller/dataController.js'

let dataRouter = express.Router()

// Read
dataRouter.get('/todos', getDataFromData)
dataRouter.get('/todos/:id', getDataByIdData)
dataRouter.post('/todos', createDataForData)
dataRouter.put('/todos/:id', updateDataOfData)
dataRouter.delete('/todos/:id', deleteDataFromData)

export default dataRouter;