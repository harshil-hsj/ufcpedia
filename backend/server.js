require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const Fuse = require('fuse.js');
const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
MONGO_CONN = process.env.MONGO_CONN;

// Connect to MongoDB database
mongoose.connect(`${MONGO_CONN}ufcpedia`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  const fighterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nickname:{type:String},
    wins: { type: Number, required: true },
    losses: { type: Number,required:true},
    draws: { type:Number,required:true},
    height_cm:{type:Number,required:true},
    weight_in_kg:{type:Number,required:true},
    reach_in_cm:{type:Number},
    stance:{type:String},
    date_of_birth:{type:String},
    inUFC:{type:Boolean}
    }
  ); 
  const matchSchema = new mongoose.Schema(
    {
      RedFighter: { type: String, required: true },
      BlueFighter: { type: String, required: true },
      RedOdds: { type: Number },
      BlueOdds: { type: Number },
      Date: { type: String, required: true },
      Location: { type: String, required: true },
      Country: { type: String, required: true },
      Winner: { type: String, required: true },
      TitleBout: { type: Boolean, required: true },
      WeightClass: { type: String, required: true },
      Gender: { type: String, required: true },
      BlueStance: { type: String },
      BlueHeightCms: { type: Number, required: true },
      BlueReachCms: { type: Number, required: true },
      RedStance: { type: String },
      RedHeightCms: { type: Number, required: true },
      RedReachCms: { type: Number, required: true },
      RedAge: { type: Number, required: true },
      BlueAge: { type: Number, required: true },
      Finish: { type: String },
      FinishDetails: { type: String },
      FinishRound: { type: Number },
      FinishRoundTime: { type: String },
      UfcEvent: { type: String },
      fightNumber:{type:Number}
    }
  );
  const link = new mongoose.Schema({
     name:{type:String},
     imageLink:{type:String}
  });

  const Fighter = mongoose.model('Fighter', fighterSchema, 'athletesData');
  const Image = mongoose.model('Image',link,'links');
  const Match = mongoose.model('Match',matchSchema,'matchData');

  // get image link
  app.get('/ping',async(req,res)=>{
    try{
      const img = await Image.find();
    res.json(img);
    }
    catch(erro){

    }
  })
  app.get('/getLink',async(req,res)=>{
   try{
    const name = req.query.name?req.query.name:req.query.fighter;
    const returnLink = await Image.find({name});
    res.json({link:returnLink[0].imageLink});
    console.log("link"+req.query.name);
    console.log(name);
    }
    catch(error){
     res.status(404).json({message:"no data found"});
    }
 })

///// Get fighters info
app.get('/getFighterInfo',async(req,res)=>{
   try{
     const name = req.query.fighter;
     let found = false;
     let maxClose = 1;
     const fighterInfo = await Fighter.find();
     const fuseOptions = {
      keys: ['name'],         // Fields you want to search on
      threshold: 0.3,                 // 0.0 to 1.0, how fuzzy you want to search 0.3 ->70%
      includeScore: true,             // Include the score of each match (relevance)
    };
    const fuse = new Fuse(fighterInfo, fuseOptions);
    const result = fuse.search(name);
    if(result.length>0){
      const bestMatch = result[0].item;
      res.json(bestMatch);
    }
    else{
      res.status(404).json({message:"Error not found"});
    }
   }
   catch(error){
    res.status(500).json({message:"Intenal server error"});
    console.log(error);
   }
});



///Add fights info in Match
app.post('/addFightInfo', async (req, res) => {
  try {
    const latestMatch = await Match.findOne().sort({ fightNumber: -1 });
    const nextFightNumber = latestMatch ? latestMatch.fightNumber + 1 : 1; 
    const match = new Match({
      ...req.body,
      fightNumber: nextFightNumber, 
    });
    await match.save();
    res.status(200).json({ message: "Successfully added match data" });
    console.log("Successfully added data");
  } catch (error) {
    console.log("Internal server error*", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


///// add New Fighter
app.post('/addNewFighter',async(req,res)=>{
  console.log("new data entering");
  try{
    console.log("adding new fighter"+req.body);
  const newFighter = new Fighter(req.body);
  await newFighter.save();
  await Fighter.find().sort({ name: 1 });
  res.status(200).json({message:"Fighter added successfully"});
  console.log(req.body.name+"added successfully");
  }
  catch(error){
     res.status(500).json({message:"Internal Server Error"});
     console.log(error+"Internal Server Error");
  } 
})

////// update record
app.post('/updateRecord',async(req,res)=>{
  try{
  const {name,wins,losses,draws,inUFC} = req.body;
  const fighterToBeChanged = await Fighter.findOne({name});
  if (wins !== undefined && wins !== 0) {
    fighterToBeChanged.wins = wins;
  }
  if (losses !== undefined && losses !== 0) {
    fighterToBeChanged.losses = losses;
  }
  if (draws !== undefined && draws !== 0) {
    fighterToBeChanged.draws = draws;
  }
  fighterToBeChanged.inUFC = inUFC;
  console.log(fighterToBeChanged.inUFC + " "+inUFC);
  await fighterToBeChanged.save();
  console.log("updated "+ name + " data");
  res.status(200).json({message:"updated data succesfully for "+name});
  }
  catch(error){
    res.status(500).json({message:"Internal Server Error"});
    console.log("Internal Server Error");
  }
});

// Basic route to test server




// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port "+PORT);
});
