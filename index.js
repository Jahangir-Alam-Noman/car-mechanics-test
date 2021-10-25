const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = 5000;

//middleware
app.use(cors());
app.use(express.json());

/* 
username: geniusMechanic2
password : HjQ3G5qfpq8AxhWD
*/

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.veusr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {

        await client.connect();
        const database = client.db("carMechanic2");
        const servicesCollection = database.collection("services");

        // get api 
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const result = await cursor.toArray();
            res.json(result);

        })

        // get single api 
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await servicesCollection.findOne(query);
            res.json(result);

        })

        // post api 
        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log('hit the post api', service);
            const result = await servicesCollection.insertOne(service);
            console.log('addedd a user', result);
            res.json(result);

        })

        // delete api 
        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            console.log(query);
            const result = await servicesCollection.deleteOne(query);

            console.log(result);
            res.json(result);
        })

    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('I am learning node');
})

app.listen(port, () => {
    console.log('listening to port', port);
})