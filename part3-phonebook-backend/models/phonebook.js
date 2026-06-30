import mongoose, { mongo } from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const url = process.env.MONGODB_URL;

console.log('connecting to ', url);

mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('Connected to MongoDb');
  })
  .catch(error => {
    console.log('Error Connecting to MongoDb :', error.message);
  })

const phonebookSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true
  }
});

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Phone = new mongoose.model('phonebook', phonebookSchema)

export default Phone