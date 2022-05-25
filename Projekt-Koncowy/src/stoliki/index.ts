import { Router, Request, Response } from "express";
import Stolik from "./model";

export default Router()
  .get("/", async (req: Request, res: Response) => {
    try {
      const stoliki = await Stolik.find();

      return res.send(stoliki);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .get("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      const stolik = await Stolik.findById(id);

      return res.send(stolik);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .get(
    "/wolne/:miejsca",
    async (req: Request<{ miejsca: number }>, res: Response) => {
      const { miejsca } = req.params;

      try {
        const stoliki = await Stolik.find({
          status: "Wolny",
          iloscOsob: miejsca,
        });

        return res.send(stoliki);
      } catch (e) {
        res.status(500).send(e);
      }
    }
  )
  .post("/", async (req: Request, res: Response) => {
    const stolik = new Stolik({
      nazwa: req.body.nazwa,
      iloscOsob: req.body.iloscOsob,
      status: req.body.status,
    });

    try {
      await stolik.save();

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .put("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      await Stolik.findByIdAndUpdate(id, req.body, { new: true });

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      await Stolik.findByIdAndRemove(id);

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  });
