const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const notFound = require("./middleware/notFound");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/errorHandler");
// .envbb
require("dotenv").config();
// middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

// const start = async () => {
//     try {
//         await connectDB(process.env.MONGO_URI)
//         app.listen(port, () => {
//             console.log("server is listening");
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
const start = () => {
  try {
    connectDB(
      "mongodb+srv://sujitadroja:03V2GzknntmTmJeZ@cluster0.ngdgss0.mongodb.net/taskcontroller?retryWrites=true&w=majority"
    );
    app.listen(port, () => {
      console.log("server is listening");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
