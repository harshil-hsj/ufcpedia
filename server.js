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
app.get('/getFighterInfo',(req,res)=>{
   console.log("getting data");
   console.log(typeof(req));
   console.log(req.query);
   const name = req.query.fighter.toLowerCase();
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

app.post('/addFightInfo', (req, res) => {
  const newRow = [
    ...Object.values(req.body)  // This will take all the values from req.body and add them to the array
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



app.post('/updateRecord', (req, res) => {
  const { name, wins, losses, draws } = req.body;

  const rows = [];
  let updated = false;
  let header = '';  // Variable to store the header row

  fs.createReadStream(filePathFighter)
      .pipe(csv())
      .on('data', (row) => {
          if (!header) {
              // storing the header
              header = Object.keys(row).join(','); // Saves the header column names
          }
          // If the row's name matches, update the record
          if (row.name === name) {
              if (wins != 0) row.wins = wins;
              if (losses != 0) row.losses = losses;
              if (draws != 0) row.draws = draws;
              updated = true;
          }
          rows.push(row);
      })
      .on('end', () => {
          if (!updated) {
              return res.status(404).send({ error: 'Fighter not found' });
          }

          // Update CSV data: Create updated rows (skipping the header row for row mapping)
          const updatedData = rows.map((row) => {
              return `${row.name},${row.nickname},${row.wins},${row.losses},${row.draws},${row.height_cm},${row.weight_in_kg},${row.reach_in_cm},${row.stance},${row.date_of_birth}`;
          }).join('\n');

          // Write the header row back along with the updated rows
          const finalData = `${header}\n${updatedData}`;

          // Overwrite the CSV file with the header and updated data
          fs.writeFile(filePathFighter, finalData, (err) => {
              if (err) {
                  console.log(err);
                  return res.status(500).send({ error: 'Error writing to CSV file' });
              }
              // Successfully updated
              res.status(200).send('Record updated successfully');
          });
      })
      .on('error', (err) => {
          res.status(500).send({ error: 'Error reading CSV file' });
      });
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
