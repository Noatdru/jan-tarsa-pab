import mongoose from "mongoose";

interface IStolik {
  nazwa: string;
  iloscOsob: number;
  status: "Wolny" | "Zajety" | "Niedostepny";
}

const stolikSchema = new mongoose.Schema<IStolik>(
  {
    nazwa: {
      type: String,
      required: true,
    },
    iloscOsob: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Wolny", "Zajety", "Niedostepny"],
      default: "Wolny",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IStolik>("Stolik", stolikSchema);
