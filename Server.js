const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({ path: './config/.env' });
const User = require('./models/User')
const app = express()
const port = 3001
const mongoURI = process.env.MONGO_URI

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("connexion avec la base de donnée bien reussie");

    }).catch((err) => {
        console.error("il y'a une erreur lors de la connexion avec la base de donnée", err);

    }
    )
    app.use(express.json())

    app.get('/api/user', async(req,res)=>{
        
            const {name,age,phone,adresse,email}=req.body
       
            try {
               const user = await User.find({name,age,phone,adresse,email}); 
               if (!user) {
                   return res.status(404).json({ message: "Pas d'utilisateurs dans la base de donnée" });
               }
               res.status(200).json(user); 
           } catch (error) {
               res.status(500).json({
                   message: "Erreur lors de la récupération des utilisateurs",
                   error: error
               });
           }
       }
    )
app.post('/api/user', async(req, res) =>  {
    const {name,age,phone,adresse,email} = req.body;

    try {
       
       const user = await  User.create({ name, age, phone,adresse,email});

   
       res.status(201).json({
           message: "l'Utilisateur créée avec succès",
           user
       });
   } catch (error) {
       
       res.status(404).json({
           message: "Erreur lors de la création de la création d'un utilisateur",
           error: error
       });
   }
    
})

app.put('/api/user/:id', async(req, res) =>  {
    const id= req.params.id

    try {
       
       const user = await  User.findByIdAndUpdate({_id:id},
        {$set:{name:"Tatum"}},
        {new:true});

   
       res.status(201).json({
           message: "l'Utilisateur modifié avec succés",
           user
       });
   } catch (error) {
       
       res.status(404).json({
           message: "Erreur lors de la modification de l'utilisateur",
           error: error
       });
   }
     
})

app.delete('/api/user/:id', async(req, res) =>  {
    const id= req.params.id

    try {
       
       const user = await  User.findByIdAndDelete({_id:id},
        );

   
       res.status(201).json({
           message: "l'Utilisateur a été supprimé avec success",
           user
       });
   } catch (error) {
       
       res.status(404).json({
           message: "Erreur lors de la suppression de l'utilisateur",
           error: error
       });
   }
     
})

app.listen(port, () => {
    console.log(`le serveur ecoute au port ${port}`)
})