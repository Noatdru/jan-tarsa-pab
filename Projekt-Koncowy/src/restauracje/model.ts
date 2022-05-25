import mongoose from "mongoose";

interface IRestauracja {
  nazwa: string;
  adres: string;
  telefon: string;
  nip: string;
  email: string;
  www: string;
}

const restauracjaSchema = new mongoose.Schema<IRestauracja>(
  {
    nazwa: {
      type: String,
      required: true,
    },
    adres: {
      type: String,
      required: true,
    },
    telefon: {
      type: String,
      required: true,
    },
    nip: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    www: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRestauracja>("Restauracja", restauracjaSchema);
