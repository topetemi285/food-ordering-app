import { Schema, models, model } from "mongoose";
import bcrypt from "bcrypt";
import { type } from "os";

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
      type: String,
    },

    password: {
      type: String,
      required: true,
      validate: (pass) => {
        if (!pass?.length || pass.length < 8) {
          new Error("password must be at least 5 characters");
          return false;
        }
      },
    },
  },
  { timestamps: true }
);
UserSchema.post("validate", function (user) {
  //[HOW TO HASHED PASSWORD]
  if (user.isModified("password")) {
    const notHashedPassword = user.password;

    if (typeof notHashedPassword !== "string") {
      throw new Error("Password must be a string");
    }

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(notHashedPassword, salt);
  }
});

// UserSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     if (typeof this.password !== "string") {
//       throw new Error("Password must be a string");
//     }

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
// //   next();
// });

export const User = models?.User || model("User", UserSchema);
