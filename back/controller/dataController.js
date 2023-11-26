import dataModel from '../model/dataModel.js';

// Get Data
const getDataFromData = async (req, res) => {
    try{
      let getData = await dataModel.find();
      if(getData){
        res.status(200).json(JSON.stringify(getData))
      } else {
        res.status(404).send("No Data Found")
      }
    }
    catch(err){
      res.status(500)
      console.log(err.message)
    }
}

const getDataByIdData = async (req, res) => {
    try{
        let id = req.params.id
        let getData = await dataModel.findById(id);
        if(getData){
          res.status(200).json(JSON.stringify(getData))
        } else {
          res.status(404).send("No Data Found")
        }
      }
      catch(err){
        res.status(500)
        console.log(err.message)
      }
}

// Create Data
const createDataForData = async (req, res) => {
    try{
        let addData = await new dataModel()
        // console.log(req.body)
        addData.name = req.body.name;
        addData.desc = req.body.desc;
        addData.date = req.body.date;
        await addData.save()
        res.status(200).json({'message':'Data Added Successfully'})
    }
    catch(err){
        console.log(err.message)
        res.status(500)
    }
}

// Update Data
const updateDataOfData = async (req, res) => {
    try{
        let id = req.params.id
        let dataToUpdate = req.body
        let updateData = await dataModel.updateOne({_id:id},dataToUpdate)
        // let updateData = await dataModel.replaceOne({_id:id},dataToUpdate) // For replacing whole-ass object
        console.log(updateData)
        if(updateData.matchedCount > 0){
            res.status(200).json({'message':'Data Updated Successfully'})
        } else {
            res.status(404).json({'message':'Data not Found'})
        }
    }
    catch(err){
        console.log(err.message)
        res.status(500)
    }
}

// Delete Data
const deleteDataFromData = async (req, res) => {
    try{
        let id = req.params.id
        let deleteData = await dataModel.deleteOne({_id:id})
        if(deleteData.deletedCount > 0){
            res.status(200).json({'message':'Data Deleted Successfully'})
        } else {
            res.status(404).json({'message':'Data not Found'})
        }
    }
    catch(err){
        console.log(err.message)
        res.status(500)
    }
}

export { 
    getDataFromData,
    createDataForData,
    getDataByIdData,
    updateDataOfData,
    deleteDataFromData
}