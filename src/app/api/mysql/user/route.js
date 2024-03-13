import connection from "../mysql";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    const password = searchParams.get('password');
    
    const connectionInstance = await connection;
    const [rows] = await connectionInstance.query("SELECT * FROM user WHERE email = ? AND password = ?", [email, password]);

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

    const connectionInstance = await connection;
    const [rows] = await connectionInstance.query("SELECT * FROM user WHERE email = ?", [email]);
    if (rows[0]) {
      return NextResponse.json({message: "Email already in use."});
    }
    const result = await connectionInstance.query("INSERT INTO user SET ?", { username, email, password });

    return NextResponse.json({username, email, password});
  } catch (error) {
    return NextResponse.json({ message: error.message },{ status: 500 });
  }
}