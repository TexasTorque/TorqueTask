import express from "express";
import cors from "cors";
import * as routes from "./routes";

const app = express();
const PORT = 3001;

app.use(express.json());

// implements query parameters for data exchange!

app.use(cors());
app.options("*", cors());

app.use("/getTasks", routes.getTasks);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("hello, world");
