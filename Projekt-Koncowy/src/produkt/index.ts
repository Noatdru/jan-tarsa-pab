import { Router, Request, Response } from "express";
import Produkt from "./model";

export default Router()
  .get("/", async (req: Request, res: Response) => {
    try {
      const produkty = await Produkt.find();

      return res.send(produkty);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .get("/sort", async (req: Request, res: Response) => {
    try {
      const produkty = await Produkt.find().sort("cena");

      return res.send(produkty);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .get("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      const produkt = await Produkt.findById(id);

      return res.send(produkt);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  
  .post("/", async (req: Request, res: Response) => {
    const produkt = new Produkt({
      nazwa: req.body.nazwa,
      cena: req.body.cena,
      ilosc: req.body.ilosc,
      jednostkaMiary: req.body.jednostkaMiary,
    });

    try {
      await produkt.save();

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .put("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      await Produkt.findByIdAndUpdate(id, req.body, { new: true });

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      await Produkt.findByIdAndRemove(id);

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  });
