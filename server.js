const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const Fuse = require('fuse.js');
const fastcsv = require('fast-csv');
const PORT = 5000;
const csv = require('csv-parser');
app.use(cors());
app.use(express.json());
const filePathFights = './ufc-master.csv'
const filePathFighter= './ufc-fighters-statistics.csv'
const imageLink = './link.json'
//// Get link from json

app.get('/getLink',(req,res)=>{
   const name = req.query.name;
   if( imageLink.hasOwnProperty(name)){
      res.json(imageLink[name]);
   }
   else{
      console.log("error ");
      res.status(404).json({message:"no data found"});
   }
})



///// Get fighters info
app.get('/getFighterInfo',(req,res)=>{
   console.log("getting data");
   console.log(typeof(req));
   console.log(req.query);
   const name = req.query.fighter.toLowerCase();                           ///// '/getFighterInfo'
   let found = false;
   result =[]
   let maxClose = 1;
   let finalResult ={};
   fs.createReadStream(filePathFighter)
   .pipe(csv())
   .on('data',(row)=>{
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
    if (result.length > 0 && result[0].score <= 0.3 ) { 
      if( result[0].score < maxClose){
        finalResult = {...row};
        maxClose = result[0].score;
        found = true;
      }
    }
   })
   .on('end',()=>{
      if(!found){
         res.status(404).json({message:"no data found of that fighter"});
      }
      else{
         res.json(finalResult);
      }
   })
   .on('error',()=>{
      console.log("wrong");
      res.status(500).json({error:'error reading csv file'});
   });
});



///// Add fights info
app.post('/addFightInfo', (req, res) => {
  const newRow = [
    ...Object.values(req.body)           //This will take all the values from req.body and add them to the array
  ];

  const rows = [];
  // Read the existing CSV file
  fs.createReadStream(filePathFights)
    .pipe(fastcsv.parse({ headers: false }))  // Assuming no headers in the file
    .on('data', (row) => rows.push(row))  // Collect all rows
    .on('end', () => {
      // Step 1: Insert the new row after the header (second position)
      rows.splice(1, 0, newRow);  // Insert the new row at the second position

      // Step 2: Write the updated rows back to the CSV file
      const writeStream = fs.createWriteStream(filePathFights);
      const csvStream = fastcsv.format({ headers: false });  // Writing without headers

      // Pipe the new data into the CSV file
      csvStream.pipe(writeStream)
        .on('end', () => {
          console.log("Data added successfully");
          res.status(200).json({ message: "Fight info added at the second row successfully!" });
        })
        .on('error', (error) => {
          console.error("Error writing to CSV:", error);
          res.status(500).json({ error: "Error writing to CSV file" });
        });
      // Write all the rows (with the new row at the second position)
      rows.forEach((row) => {
        csvStream.write(row);
      });

      csvStream.end();
    })
    .on('error', (error) => {
      console.error("Error reading CSV file:", error);
      res.status(500).json({ error: "Error reading CSV file" });
    });
});


/// Update record of fighter
app.post('/updateRecord', (req, res) => {
  console.log(req.body);
  const { name, wins, losses, draws,UFC} = req.body;
  console.log(UFC);
  const rows = [];
  let updated = false;
  let header = '';  // Variable to store the header row

  fs.createReadStream(filePathFighter)
      .pipe(fastcsv.parse({headers:true}))
      .on('data', (row) => {
          // if (!header) {
          //     // storing the header
          //     header = Object.keys(row).join(','); // Saves the header column names
          // }
          // If the row's name matches, update the record
          if (row.name === name) {
              console.log("here ")
              if (wins !== 0) row.wins = wins;
              if (losses !== 0) row.losses = losses;
              if (draws !== 0) row.draws = draws;
              if(UFC !=='')row.UFC = UFC;
              updated = true;
          }
          rows.push(row);
      })
      .on('end', () => {
          if (!updated) {
              return res.status(404).send({ error: 'Fighter not found' });
          }
          const writeStream = fs.createWriteStream(filePathFighter);
          const csvStream = fastcsv.format({headers:true});

           csvStream.pipe(writeStream)
            .on('finish',()=>{
              console.log("data updated succesfully");
              res.status(200).json({message:"data added"});
            })
            .on('error',(error)=>{
              console.log("error writing to csv",error);
              res.status(500).json({error:"error adding data"});
            });
          rows.forEach((row)=>{
            csvStream.write(row);
          });
          csvStream.end();
      })
      .on('error', (err) => {
          res.status(500).send({ error: 'Error reading CSV file' });
      });
});


////   Add New Fighter to the Dataset ()
///    const filePathFighter= './ufc-fighters-statistics.csv'
app.post('/addNewFighter',(req,res)=>{
  console.log(req.body);
  console.log("about to add data");
  const newFighter = [
    ...Object.values(req.body)
  ]
  console.log(newFighter[0] +" "+newFighter[4]);
  const oldData= [];
  let lastName = "";
  const name = typeof newFighter[0] === 'string' ? newFighter[0].toLowerCase().trim() : '';
  console.log("the string is name = ",{name});
  fs.createReadStream(filePathFighter)
  .pipe(fastcsv.parse({headers:true}))
  .on('data',(row)=>{
    
    const newName = row && row.name && typeof row.name === 'string' ? row.name.toLowerCase().trim() : '';
  
     if( name > lastName && name < newName){
      oldData.push(newFighter); // new fighter added to system.
      console.log("found the place");
      oldData.push(row);
      lastName = newName;
     }
     else{
      
      oldData.push(row);
      lastName = newName;
     }
  })
  .on('end',()=>{
     console.log("got to the end");

     const writeStream = fs.createWriteStream(filePathFighter);
     const csvStream = fastcsv.format({headers:true});

     csvStream.pipe(writeStream)
       .on('finish',()=>{
        console.log("data added succesfully ");
        res.status(200).json({message:"data added "});
       })
       .on('error',(error)=>{
        console.log("error writing to csv",error);
        res.status(500).json({error:"error adding data "});
        });
     oldData.forEach((row)=>{
      csvStream.write(row);
     });
     csvStream.end();
  })
  .on('error',(error)=>{
    console.log("error adding data",error);
    res.status(500).json({error:"error"});
  })
})




app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
