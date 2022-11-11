import { Router } from "express";
import connect from "../database/db.js";
import mongodb from "mongodb";
const bookRouter = Router();
const ObjectId = mongodb.ObjectId;
bookRouter.get("/lista", async (req, res) => {
  try {
    const db = await connect();
    const result = await db.collection("books").find({}).toArray();
    res.json(result);
  } catch (error) {
    res.status(400).send("Error inserting matches!");
  }
});
bookRouter.post("/new", async (req, res) => {
  try {
    const db = await connect();
    const data = {
      title: req.body.title,
      author: req.body.author,
    };
    const result = await db.collection("books").insertOne(data);
    console.log(`Added a new match with id ${result.insertedId}`);
    res.status(204).send("el fue registrado");
  } catch (error) {
    res.status(400).send("Error inserting matches!");
  }
});
bookRouter
  .route("/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params || {};
      const db = await connect();
      const result = await db
        .collection("books")
        .findOne({ _id: ObjectId(id) });
      res.json(result);
    } catch (error) {
      res.status(400).send("Error inserting matches!");
    }
  })
  .put(async (req, res) => {
    try {
      const db = await connect();

      const id = req.params.id;
      const title = req.body.title;
      const author = req.body.author;

      const result = await db
        .collection("books")
        .updateOne(
          { _id: ObjectId(id) },
          { $set: { title: title, author: author } }
        );
      res.json(result);
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  })
  .delete(async (req, res) => {
    try {
      const db = await connect();
      const review_id = req.params.id;
      const result = await db
        .collection("books")
        .deleteOne({ _id: ObjectId(review_id) });

      if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
        res.json(result);
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
      }
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  });

export default bookRouter;
