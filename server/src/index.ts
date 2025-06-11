// src/index.ts
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hotel Management Backend (TypeScript) is running! - Server Branch");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
