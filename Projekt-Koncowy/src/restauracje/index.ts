import { Router, Request, Response } from "express";

import Restauracja from "./model";

export default Router()
  .get("/", async (req: Request, res: Response) => {
    try {
      const restauracje = await Restauracja.find();

      return res.send(restauracje);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  //req typ generyczny (id)
  .get("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      const restauracja = await Restauracja.findById(id);

      return res.send(restauracja);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .post("/", async (req: Request, res: Response) => {
    const restauracja = new Restauracja({
      nazwa: req.body.nazwa,
      adres: req.body.adres,
      telefon: req.body.telefon,
      nip: req.body.nip,
      email: req.body.email,
      www: req.body.www,
    });

    try {
      await restauracja.save();

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .put("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      await Restauracja.findByIdAndUpdate(id, req.body, { new: true });

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      await Restauracja.findByIdAndRemove(id);

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  });
