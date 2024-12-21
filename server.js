const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;
const csv = require('csv-parser');
const { error } = require('console');
app.use(cors());
app.use(express.json());

const filePath = './ufc-master.csv'

app.get('/get-data',(req,res)=>{
   console.log("getting data");
   result =[]
   fs.createReadStream(filePath)
   .pipe(csv())
   .on('data',(row)=>{
    result.push(row);
   })
   .on('end',()=>{

      res.json(result[0]);
   })
   .on(error,()=>{
    res.status(500).json({error:'error reading CSV file'});
   });

}
);
   


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
