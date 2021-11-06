const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/BudgetCalculator")
  .catch((error) => console.log(error));

mongoose.connection.on("error", (err) => {
  console.log(err);
});

const costSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The property "name" in costs[] is required!'],
  },
  value: {
    type: Number,
    required: [true, 'THe property "value" in costs[] is required!'],
  },
});

const costsListsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The property "name" is required!'],
    },
    description: {
      type: String,
      required: [true, 'The property "description" is required!'],
    },
    costs: {
      type: [costSchema],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: () =>
          'The property "costs" is required and must not be empty!',
      },
    },
  },
  {
    versionKey: false,
  }
);

let costsLists;
try {
  costsLists = mongoose.model("costs-lists");
} catch (error) {
  costsLists = mongoose.model("costs-lists", costsListsSchema);
}

async function getCostsLists() {
  foundLists = await costsLists.find();
  return costsLists.find();
}

async function formatErrors(errors) {
  let message = "";
  for (const value of Object.values(errors)) {
    message += `${value.message}\n`;
  }

  return message;
}

async function addCostList(newCostList) {
  try {
    await costsLists.insertMany(newCostList);
  } catch (err) {
    let errorMessage = await formatErrors(err.errors);
    return errorMessage;
  }
}

async function deleteCostList(id) {}

app.use(function (req, res, next) {
  // Allow http://127.0.0.1:3000 and http://localhost:3000 for the (React.js project) to use the API
  const allowedOrigins = ["http://127.0.0.1:3000", "http://localhost:3000"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // After allowing the React.js project, proceed to the wanted Route
  next();
});

var jsonParser = bodyParser.json();

app.get("/costs-lists", async (req, res) => {
  let costsLists = await getCostsLists().catch((err) => console.log(err));
  res.send(costsLists);
});

app.post("/costs-lists", jsonParser, async (req, res) => {
  let result = await addCostList(req.body);
  res.send(result);
});

app.get("/", (req, res) => {
  console.log("Ops! Caminho de API inválida!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
