import express from "express";
import bookRouter from "./book.js";
const router = express.Router();

router.use("/books", bookRouter);

router.all("/*", (req, res) => {
  res.send("page no found");
});

export default router;
