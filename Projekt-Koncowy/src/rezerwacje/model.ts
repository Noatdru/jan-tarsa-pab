import mongoose from "mongoose";

interface IRezerwacja {
  start: Date;
  koniec: Date;
  klient: string;
  stolik: string;
}

const rezerwacjaSchema = new mongoose.Schema<IRezerwacja>(
  {
    stolik: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Stolik",
        required: true,
      },
    ],

    start: {
      type: Date,
      required: true,
    },
    koniec: {
      type: Date,
      required: true,
    },
    klient: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRezerwacja>("Rezerwacja", rezerwacjaSchema);
