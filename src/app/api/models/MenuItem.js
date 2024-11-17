const {
  Mongoose,
  Schema,
  models,
  model,
  default: mongoose,
} = require("mongoose");

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const MenuItemSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    image: { type: String },
    basePrice: { type: Number },
    sizes: { type: [ExtraPriceSchema] },
    extraIngredientPrice: { type: [ExtraPriceSchema] },
    categoryValue: { type: mongoose.Types.ObjectId },
  },
  { timestamps: true }
);

export const MenuItems =
  models?.MenuItems || model("MenuItems", MenuItemSchema);
