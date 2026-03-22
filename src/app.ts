import express from "express";
import messagesRouter from "./routes/messages";

const app = express();

app.use(express.json());
app.use("/api/messages", messagesRouter);

export default app;
