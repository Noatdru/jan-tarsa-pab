import mongoose from "mongoose";

interface IZamowienie {
  pracownik: string;
  pozycje: string;
  status: "zlozone" | "w realizacji" | "zrealizowane" | "rachunek";
  stolik: string;
  kwota: number;
}

const zamowienieSchema = new mongoose.Schema<IZamowienie>(
  {
    pracownik: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Pracownik",
        required: true,
      },
    ],
    pozycje: [
      {
        type: mongoose.Schema.Types.Mixed,
        ref: "Danie",
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["zlozone", "w realizacji", "zrealizowane", "rachunek"],
      required: true,
    },
    stolik: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Stolik",
        required: true,
      },
    ],
    kwota: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IZamowienie>("Zamowienie", zamowienieSchema);
