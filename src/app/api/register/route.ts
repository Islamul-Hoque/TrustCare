// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect, collections } from "@/lib/db";

export async function POST(req: Request) {
    const { nid, name, email, contact, password } = await req.json();

    if (!nid || !name || !email || !contact || !password) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
        return NextResponse.json({ error: "Weak password" }, { status: 400 });
    }

    // Connect to your USERS collection
    const usersCollection = await dbConnect(collections.USERS);

    // Check if email already exists
    const exists = await usersCollection.findOne({ email });
    if (exists) {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Insert new user
    await usersCollection.insertOne({
        nid,
        name,
        email,
        contact,
        password: hashed,
        role: "user",
        provider: "credentials",
    });

    return NextResponse.json({ success: true });
}
