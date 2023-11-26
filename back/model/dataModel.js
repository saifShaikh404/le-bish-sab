import mongoose from 'mongoose';
const { Schema } = mongoose;

const datas = new Schema({
  name: String, 
  desc: String,
  date: Date
});

let dataModel = mongoose.model('datas', datas);
export default dataModel;