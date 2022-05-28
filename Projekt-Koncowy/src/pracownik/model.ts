import mongoose from "mongoose";

interface IPracownik {
  imie: string;
  nazwisko: string;
  stanowisko: string;
}

const pracownikSchema = new mongoose.Schema<IPracownik>(
  {
    imie: {
      type: String,
      required: true,
    },
    nazwisko: {
      type: String,
      required: true,
    },
    stanowisko: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPracownik>("Pracownik", pracownikSchema);
