import { Router, Request, Response } from "express";
import Zamowienie from "./model";

export default Router()
  .get("/", (req: Request, res: Response) => {
    try {
      const zamowienia = Zamowienie.aggregate([
        {
          $addFields: {
            kwota: { $round: [{ $sum: "$pozycje.cena" }, 2] },
          },
        },
      ]);

      return res.send(zamowienia);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .get("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      const zamowienie = await Zamowienie.findById(id);

      return res.send(zamowienie);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .get("/oblozenie", async (req: Request, res: Response) => {
    try {
      const oblozenie = Zamowienie.aggregate([
        {
          $group: {
            _id: "$stolik",
            iloscZamowien: { $sum: 1 },
          },
        },
      ]);

      return res.send(oblozenie);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .post("/", async (req: Request, res: Response) => {
    const zamowienie = new Zamowienie({
      pracownik: req.body.pracownik,
      pozycje: req.body.pozycje,
      status: req.body.status,
      stolik: req.body.stolik,
      kwota: req.body.kwota,
    });

    try {
      await zamowienie.save();

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
    zamowienie
      .save()
      .then((result: any) => {
        res.send(result);
      })
      .catch((error: any) => {
        res.send("Błędne dane zamowienia," + error);
      });
  })
  .put("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      await Zamowienie.findByIdAndUpdate(id, req.body, { new: true });

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;

    try {
      await Zamowienie.findByIdAndDelete(id);

      return res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e);
    }
  });
