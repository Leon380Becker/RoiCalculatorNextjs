import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

// 1. Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
}

// Mongoose schema & model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// API endpoint
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end("Method not allowed");

  try {
    await connectDB();
    const { name, email } = req.body;

    if (!name || !email) return res.status(400).json({ error: 'Missing name or email' });

    const newUser = new User({ name, email });
    await newUser.save();

    return res.status(200).json({ message: 'User saved to MongoDB' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to save user' });
  }
}
