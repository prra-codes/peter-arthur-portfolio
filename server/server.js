const express = require("express"); // imports express
const cors = require("cors"); // imports cors

const app = express(); // creates express application

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
