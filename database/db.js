import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
// Connection URL
const url = process.env["MONGO_URL"];
const client = new MongoClient(url);

// Database Name
const dbName = "myProject";
async function connect(params) {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  return db;
}

export default connect;
