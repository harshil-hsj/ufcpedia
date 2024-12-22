const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const Fuse = require('fuse.js');
const PORT = 5000;
const csv = require('csv-parser');
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
   let found = false;
   fs.createReadStream(filePathFighter)

   .pipe(csv())
   .on('data',(row)=>{
      if(found){
         return;
      }
      const searchString = name.toLowerCase().replace(/\s+/g, '');
    // Fuse.js options
    const options = {
      includeScore: true,   // Include the match score
      threshold: 0.3,       // 0.3 corresponds to a 70% match (score is between 0 and 1)
      keys: ['name']        // Specify the key to search within the row
    };
    const simpleRow = {
      ...row,
      name:row.name.toLowerCase().replace(/\s+/g,'')
    }
    const fuse = new Fuse([simpleRow], options);
    const result = fuse.search(searchString);
    if (result.length > 0 && result[0].score <= 0.3) {
      res.json(row);  // Return the row if match is 70%
      found = true;
    }
   })
   .on('end',()=>{
      if(!found){
         res.status(404).json({message:"no data found of that fighter"});
      }
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
