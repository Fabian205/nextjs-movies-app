import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  concepto: {
    type: String,
    required: [true, "Enter the concept"],
  },
  cuenta: {
    type: String,
    required: [true, "Enter the account"],
  },
  detalle: {
    type: String,
    required: [true, "Enter the detail"],
  },
  fecha: {
    type: String,
    required: [true, "Enter the date"],
  },
  valor: {
    type: String,
    required: [true, "Enter the value"],
  },
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
