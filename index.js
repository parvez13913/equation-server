const express = require("express");
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ia7ky.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const equationDataCollection = client.db('equationProject').collection('equationData');

        app.get('/equationData', async (req, res) => {
            const quary = {};
            const cursor = equationDataCollection.find(quary);
            const alphabet = await cursor.toArray();
            res.send(alphabet);
        });
    }

    finally {

    }
}

run().catch(console.dir);

app.get('/', async (req, res) => {
    res.send("Hello");
});

app.listen(port, () => {
    console.log(`Listening On ${port}`)
})