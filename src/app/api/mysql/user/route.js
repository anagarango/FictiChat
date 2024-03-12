import connection from "../mysql";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    const password = searchParams.get('password');

    const connectionInstance = await connection;
    const [rows] = await sql`"SELECT * FROM user WHERE email = ${email} AND password = ${password}`;

    if (rows[0]) {
      return NextResponse.json(rows[0]);
    } else {
      return NextResponse.json({ message: "Invalid email or password."});
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message },{ status: 500 });
  }
}


export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    // const connectionInstance = await connection;
    const [rows] = await sql`SELECT * FROM user WHERE email = ${email}`;
    if (rows[0]) {
      return NextResponse.json({message: "Email already in use."});
    }
    const result = await sql`INSERT INTO user (username, email, password) VALUES (${username}, ${email}, ${password})`;

    return NextResponse.json({username, email, password});
  } catch (error) {
    return NextResponse.json({ message: error.message },{ status: 500 });
  }
}