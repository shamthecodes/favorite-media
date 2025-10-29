import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const router = Router();
const prisma = new PrismaClient();

const schema = z.object({
  title: z.string().min(1),
  type: z.enum(["Movie", "TV Show"]),
  director: z.string().min(1),
  budget: z.string().optional(),
  location: z.string().optional(),
  duration: z.string().optional(),
  year_time: z.string().optional(),
  poster_url: z.string().url().optional(),
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const data = schema.parse(req.body);
    const entry = await prisma.entry.create({ data });
    res.status(201).json(entry);
  } catch (e) {
    res.status(400).json({ error: (e as any).message });
  }
});

// READ
router.get("/", async (req, res) => {
  const entries = await prisma.entry.findMany({ orderBy: { id: "asc" } });
  res.json(entries);
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = schema.partial().parse(req.body);
    const entry = await prisma.entry.update({ where: { id }, data });
    res.json(entry);
  } catch (e) {
    res.status(400).json({ error: (e as any).message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.entry.delete({ where: { id } });
  res.json({ success: true });
});

export default router;
