const express = require('express')
const app = express()
const port = 3001

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BudgetCalculator');

app.use(function (req, res, next) {
    // Allow http://127.0.0.1:3000 (React.js project) to use the API
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // After allowing the React.js project, proceed to the wanted Route
    next();
})

const costsListsSchema = new mongoose.Schema({
    name: String,
    costs: [{ name: String, value: Number }]  
});

const costsLists = mongoose.model('costs-lists', costsListsSchema);

app.get('/costs-lists', (req, res) => {

    main().catch(err => console.log(err));
    
    async function main() {
        console.log('connect');
    
        const listsFound = await costsLists.find();
        console.log(listsFound);
        res.send(listsFound);
    }
    
})

app.get('/', (req, res) => {
    console.log('Ops! Caminho de API inválida!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})