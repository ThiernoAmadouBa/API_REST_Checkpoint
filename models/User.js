const mongoose =require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      age:{
        type: Number,
        required:true, 
      },
      phone: {
        type: String,
        required: true,
      },
      adresse:{
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true, // L'email est obligatoire
        unique: true,   // L'email doit être unique dans la collection
      },
    } ,{timestamps: true});

    const User = mongoose.model('User', userSchema);

    module.exports = User;