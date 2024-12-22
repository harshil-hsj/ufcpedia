const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;
const csv = require('csv-parser');
const { error } = require('console');
const { type } = require('os');
app.use(cors());
app.use(express.json());

const filePathFights = './ufc-master.csv'
const filePathFighter= './ufc-fighters-statistics.csv'

app.get('/getFighterInfo',(req,res)=>{
   console.log("getting data");
   console.log(typeof(req));
   console.log(req.query);
   const name = req.query.fighter.toLowerCase();
   result=[];
   fs.createReadStream(filePathFighter)
   .pipe(csv())
   .on('data',(row)=>{
      if(row.name.toLowerCase().replace(/\s+/g, '') === name.toLowerCase().replace(/\s+/g, '')){
         res.json(row);
         return;
      }
   })
   .on('end',()=>{
         res.status(404).json({message:"no data found"});
   })
   .on('error',()=>{
      console.log("wrong");
      res.status(500).json({error:'error reading csv file'});
   });
});





// app.get('/get-data',(req,res)=>{
//    console.log("getting data");
//    result =[]
//    fs.createReadStream(filePath)
//    .pipe(csv())
//    .on('data',(row)=>{
//     result.push(row);
//    })
//    .on('end',()=>{

//       res.json(result[0]);
//    })
//    .on(error,()=>{
//     res.status(500).json({error:'error reading CSV file'});
//    });

// }
// );
   


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
