import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    points: { type: Number, default: 1000 },
    inventory: { type: Array, default: [] },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
