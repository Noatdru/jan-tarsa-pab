import mongoose from "mongoose";

interface IDanie {
  nazwa: string;
  cena: number;
  kategoria: string;
}

const danie = new mongoose.Schema<IDanie>(
  {
    nazwa: {
      type: String,
      required: true,
    },
    cena: {
      type: Number,
      required: true,
    },
    kategoria: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IDanie>("Danie", danie);
