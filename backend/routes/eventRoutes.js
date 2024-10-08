    const router = require("express").Router();
    const jwt = require("jsonwebtoken");
    const multer = require("multer");

    const Event = require("../models/event");
    const User = require("../models/user");

    //file Sorage
    const diskStorage = require("../helpers/file-storage");
    const upload = multer({ storage: diskStorage});

    //middlewares
    const verifyToken = require("../helpers/check-token");

    //helpers
    const getUserByToken = require("../helpers/get-user-by-token");

    //create new event
    router.post("/", verifyToken, upload.fields([{ name: "photos"}]), async(req, res) =>{
        
    // req data
    const title = req.body.title;
    const description = req.body.description
    const eventDate = req.body.event_date

    let files = [];

    if(req.files) {
        files = req.files.photos
    }

    //validations
    if(title == "null" || description == "null" || eventDate == "null"){

        return res.status(400).json({error: "Oa campos nome descrição e data são obrigatorios"})
    }

    // verify user

    const token = req.header("auth-token");
    console.log("----------Token recebido:", token);

    const userByToken = await getUserByToken(token)
    console.log("Usuário encontrado:", userByToken);

    const userId = userByToken._id.toString();

    try {
        const user = await User.findOne({ _id: userId });

        // create photos array with image path
        let photos = []

        if(files && files.length > 0){

            files.forEach((photo, i) => {
                photos[i] = photo.path;

        })
    }

    const event = new Event({
        title: title,
        description: description,
        eventDate: eventDate,
        photos: photos,
        privacy: req.body.privacy,
        userId: user._id.toString()
    });

    try {

      const newEvent = await event.save();
      res.json ({ error: null, msg: "Evento criado com sucesso!", data: newEvent})

    } catch (error) {
      return res.status(400).json({error})
    }

    } catch(error) {
      return res.status(400).json({ error: "Acesso negado"});
    }
});
    //get all public events
    router.get("/all", async(req, res) =>{
        try {

          const events = await Event.find({ privacy: false}).sort([['_id', -1]])
          res.json({ error: null, events: events})
        } catch (error) {

          return res.status(400).json({ error});
        }
    })

    //get all user events

    router.get("/userevents", verifyToken, async(req, res)=>{
      try {

        const token = req.header("auth-token")

        const user = await getUserByToken(token)

        const userId = user._id.toString()

        const events = await Event.find({userId: userId})
        res.json({ error: null, events: events })

      }catch(error){
        return res.status(400).json({ error });
      }
    })

    // get user event
    // Pega um evento de um usuário que está logado

    router.get("/userevent/:id", verifyToken, async (req, res) =>{

      try{

        const token = req.header("auth-token");

        const user = await getUserByToken(token);
        
        const userId = user._id.toString();
        console.log("ID do usuário:", userId);


        const eventId = req.params.id;

        const event = await Event.findOne({_id: eventId, userId: userId })

        res.json({ error: null, event: event});

      }catch (error) {
       return res.status(400).json ({error})
      }

    });


    // get event (public or private)

    router.get("/:id", async (req, res)=>{

     try{

      const id = req.params.id;

      const event = await Event.findOne({ _id: id});

      //public event
      if(event.privacy === false){
        res.json ({error: null, event: event})

      //private event
      }else{
        const token = req.header("auth-token")

        const user = await getUserByToken(token);
        
        const userId = user._id.toString();
        const eventUserId = event.userId.toString()

        //check if user id is equal to event user id
        if(userId == eventUserId) {
          res.json ({error: null, event: event})
        }
      }

     }catch(error){

      return res.status(400).json ({error: "Evento não existe"})
     }

    });

    //delete event
    router.delete("/", verifyToken, async (req, res) => {

      const token = req.header ("auth-token");
      const user = await getUserByToken(token)
      const eventId = req.body.id;
      const userId = user._id.toString()

      try {
        await Event.deleteOne({_id: eventId, userId: userId})
        res.json({error: null , msg:"Evento removido"})

      } catch(error){
        res.status(400).json({error: "Acesso negado!"})
      }
    })

    // update event
    router.patch("/", verifyToken, upload.fields([{ name: "photos"}]), async(req, res) =>{
      
      
      const title = req.body.title;
      const description = req.body.description;
      const eventDate = req.body.event_date;
      const eventId = req.body.id;
      const eventUserId = req.body.user_id;

      let files = [];

      if(req.files) {
          files = req.files.photos
      }

      //validations
      if(title == "null" || description == "null" || eventDate == "null"){

          return res.status(400).json({error: "Os campos nome descrição e data são obrigatorios"})
      }
      
      //verify user
      const token = req.header("auth-token");

      const userByToken = await getUserByToken(token)

      const userId = userByToken._id.toString()

      if(userId != eventUserId) {
        return res.status(400).json({error: "Acesso negado"})
      }

      //build event object
      const event ={
        id: eventId,
        title: title,
        description: description,
        eventDate: eventDate,
        privacy: req.body.privacy,
        userId: userId
      }
      console.log("Dados recebidos:", { title, description, eventDate, eventId, eventUserId }); // Verificar dados recebidos
      let photos = []

      if(files && files.length > 0){

          files.forEach((photo, i) => {
              photos[i] = photo.path;
      })

      event.photos = photos
    }

    try{
      //return uptade data

      const updatedEvent = await Event.findOneAndUpdate({_id: eventId, userId: userId}, {$set: event}, {new: true})
      res.json({ error: null, msg: "Evento alterado com secesso", data: updatedEvent})

    }catch (error) {
      res.status(400).json({error});
    }

    })


    module.exports = router;