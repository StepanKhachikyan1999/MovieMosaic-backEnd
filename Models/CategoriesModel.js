import mongoose from "mongoose";

const CategoriesSchema = mongoose.Schema(
  {
    title_ARM: {
      type: String,
      required: true,
    },
    title_ENG: {
      type: String,
      required: true,
    },
    title_RU: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Categories", CategoriesSchema);