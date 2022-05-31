import e, { Router, Request, Response } from "express";
import Zamowienie from "./model";
/*
$sum - Returns a sum of numerical values. Ignores non-numeric values

*/
export default Router()
  .get("/", async (req: Request, res: Response) => {
    await Zamowienie.find()
      .then((result:any) => {
        res.send(result);
      })
      .catch((e:any) => {
        res.status(500).send
      }) 
  })
      
  .get("/oblozenie", async (req: Request, res: Response) => {
    
      Zamowienie.aggregate([
        {
          $group: {
            _id: "$stolik",
            iloscZamowien: { $sum: 1 },
          },
        },
      ]).then((result: any) => {
        res.send(result);
    })
    .catch((e: any) => {
        res.status(500).send(e)
    })
  })
  .get("/oblozenieKelnera", async (req: Request, res: Response) => {
    
    Zamowienie.aggregate([
      {
        $group: {
          _id: "$pracownik",
          iloscZamowien: { $sum: 1 },
        },
      },
    ]).then((result: any) => {
      res.send(result);
  })
  .catch((e: any) => {
      res.status(500).send(e)
  })
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
