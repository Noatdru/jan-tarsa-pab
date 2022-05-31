import { Router, Request, Response } from "express";
import Danie from "./model";

export default Router()
  .get("/", async (req: Request, res: Response) => {
    try {
      const dania = await Danie.find();

      return res.send(dania);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .get("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      const danie = await Danie.findById(id);

      return res.send(danie);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .post("/", async (req: Request, res: Response) => {
    const danie = new Danie({
      nazwa: req.body.nazwa,
      cena: req.body.cena,
      kategoria: req.body.kategoria,
    });

    try {
      await danie.save();

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .put("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      await Danie.findByIdAndUpdate(id, req.body, { new: true });

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      await Danie.findByIdAndRemove(id);

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  });
