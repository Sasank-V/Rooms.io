// src/index.ts
import express, { Request, Response } from "express";
import { prisma } from "./lib/prisma";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send(
    "Hotel Management Backend (TypeScript) is running! - Server Branch Created"
  );
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
