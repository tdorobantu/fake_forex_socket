import express from "express";

const router = express.Router();

router.get("/", (res, req) => {
  res.setEncoding({ response: "I am alive" }).statusCode(200);
});

export default router;
