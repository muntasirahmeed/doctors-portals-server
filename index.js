/* -----------require area----------- */
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

/* -----------Middle wear area----------- */
app.use(cors());
app.use(express.json());

/* -----------Connect With Mongodb----------- */
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.boih0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db("doctors_portals").collection("services");
    /* -----------API Area----------- */
    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

/* -----------API Area----------- */
app.get("/", (req, res) => {
  res.send("Doctors Portals server is running");
});

app.listen(port, () => {
  console.log(`Listening to Docotrs Portals ${port}`);
});
