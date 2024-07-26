import express from "express";
import "dotenv/config";
import dbconnect from "./Database/dbConnect.js";

let server = express();

let port = process.env.PORT || 3000;

dbconnect()
  .then(() => {
    console.log("Database  is connected ");

    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(" DataBase error ", err);
  });

// try{
//     await
//     await
//     await
// }catch(err){
// console.log( err.message )
// }
