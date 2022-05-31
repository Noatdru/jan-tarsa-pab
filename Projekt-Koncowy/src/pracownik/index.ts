import e, { Router, Request, Response } from "express";
import Pracownik from "./model";
import Zamowienie from "./model";


export default Router()
  .get("/", async (req: Request, res: Response) => {
    try {
      const pracownicy = await Pracownik.find();

      return res.send(pracownicy);
    } catch (e) {
      res.status(500).send(e);
    }
  })

  .get("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      const pracownik = await Pracownik.findById(id);
      return res.send(pracownik);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .post("/", async (req: Request, res: Response) => {
    const pracownik = new Pracownik({
      imie: req.body.imie,
      nazwisko: req.body.nazwisko,
      stanowisko: req.body.stanowisko,
    });

    try {
      await pracownik.save();

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .put("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      await Pracownik.findByIdAndUpdate(id, req.body, { new: true });

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      await Pracownik.findByIdAndRemove(id);

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  });
