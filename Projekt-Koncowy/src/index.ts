import express from "express";
import { connect as dbConnect } from "mongoose";
import restauracjeRouter from "./restauracje";
import stolikiRouter from "./stoliki";
import pracwonikRouter from "./pracownik";
import produktRouter from "./produkt";
import danieRouter from "./danie";
import zamowienieRouter from "./zamowienie";
import rezerwacjeRouter from "./rezerwacje";

const app = express();
const PORT = process.env.PORT ?? 3000;
const mongoUri =
  process.env.MONGO_URI ?? "mongodb+srv://root:root@cluster0.qn0rz.mongodb.net/?retryWrites=true&w=majority";
dbConnect(mongoUri)
  .then(() => console.log("connected to db"))
  .catch((e) => console.error("error occured when trying to connect" + e));
  app.use(express.json())
app.use("/restauracje", restauracjeRouter);
app.use("/stoliki", stolikiRouter);
app.use("/pracownik", pracwonikRouter);
app.use("/produkt", produktRouter)
app.use("/danie", danieRouter)
app.use("/zamowienie", zamowienieRouter)
app.use("/rezerwacje", rezerwacjeRouter)


app.listen(PORT, () => {
  console.log(`app running on port: ${PORT}`);
});
