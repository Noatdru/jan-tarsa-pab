import { Router, Request, Response } from "express";
import Rezerwacja from "./model";

export default Router()
  .get("/", async (req: Request, res: Response) => {
    try {
      const rezerwacje = await Rezerwacja.find();

      return res.send(rezerwacje);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const rezerwacja = await Rezerwacja.findById(id);

      return res.send(rezerwacja);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .post("/", async (req: Request, res: Response) => {
    const rezerwacja = new Rezerwacja({
      stolik: req.body.stolik,
      start: req.body.start,
      koniec: req.body.koniec,
      klient: req.body.klient,
    });

    try {
      await rezerwacja.save();

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .put("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      await Rezerwacja.findByIdAndUpdate(id, req.body, { new: true });

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      await Rezerwacja.findByIdAndRemove(id);

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  });
