import mongoose from "mongoose";

const UserSchema = new mongoosse.Schema({
  firtName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
});
