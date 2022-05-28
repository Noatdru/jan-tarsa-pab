import mongoose from "mongoose";

interface IProdukt {
  nazwa: string;
  cena: number;
  ilosc: number;
  jednostkaMiary: string;
}

const produktSchema = new mongoose.Schema<IProdukt>(
  {
    nazwa: {
      type: String,
      required: true,
    },
    cena: {
      type: Number,
      required: true,
    },
    ilosc: {
      type: Number,
      required: true,
    },
    jednostkaMiary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProdukt>("Produkt", produktSchema);
