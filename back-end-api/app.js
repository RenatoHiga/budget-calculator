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
    id: {
      type: Number
    },
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

async function getCostListById(id) {

  const costList = await costsLists.findOne(
      { 'id': id },
      "id name description"
  ).catch((error) => {
    console.log("error below!");
    console.log(error);
  });

  return costList;
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
    let result = await costsLists.insertMany(newCostList);
    return result;
  } catch (err) {
    let errorMessage = await formatErrors(err.errors);
    return errorMessage;
  }
}

async function deleteCostList(id) {
  try {
    const result = await costsLists.deleteOne({ id: id });
    return result;
  } catch (error) {
    console.log('an error has ocurred!');
    console.log(error);
  }
}

async function updateCostList(id, body) {
  try {
    const result = await costsLists.updateOne({id: id}, body);

    if (result.modifiedCount > 0) {
      const updatedElement = await costsLists.findOne({id: id});
      return updatedElement;
    } else {
      return `Cost list with id ${id} was not modified because it has already the same data or the id don't exist!`
    }

  } catch (error) {
    console.log(error);
  }
}

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

app.get("/v1/costs-lists", async (req, res) => {
  let costsLists = await getCostsLists().catch((err) => console.log(err));
  res.send(costsLists);
});

app.get("/v1/costs-list/:id", async (req, res) => {
  try {
    const foundList = await getCostListById(req.params.id)
      .catch(error => console.log("an error has ocurred!", error));

    if (foundList === null) {
      res.send('Whoops! Cost list not found!');
    } else {
      res.send(foundList);
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/costs-lists", jsonParser, async (req, res) => {
  let result = await addCostList(req.body);
  res.send(result);
});

app.patch("/v1/costs-list/:id", jsonParser, async (req, res) => {
  try {
    const result = await updateCostList(req.params.id, req.body);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}) 

app.delete("/v1/costs-list/:id", async (req, res) => {
  try {
    const result = await deleteCostList(req.params.id);
    if (result.deletedCount > 0) {
      res.send(`Cost list with ID: ${req.params.id} has been deleted!`);
    } else {
      res.send(`Cost list with ID: ${req.params.id} does not exist or was already deleted!`);
    }
    
  } catch (error) {
    console.log('an error has ocurred!');
    console.log(error);
  }
});

app.get("/", (req, res) => {
  console.log("Ops! Caminho de API inválida!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
