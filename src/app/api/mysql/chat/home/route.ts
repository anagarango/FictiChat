import connection from "../../mysql";
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const currentUserId = searchParams.get('currentUserId');
   
    const connectionInstance = await connection;
    const [rows]:any = await connectionInstance.query("SELECT * FROM chat WHERE user_id = ?", [Number(currentUserId)]);
    if (rows[0]) {
      return NextResponse.json(rows);
    }
    return NextResponse.json([])
  } catch (error:any) {
    console.log(error)
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const character = searchParams.get('character');
    const currentUserId = searchParams.get('currentUserId');
   
    const connectionInstance = await connection;
    const [rows]:any = await connectionInstance.query("DELETE FROM chat WHERE user_id = ? AND character_name = ?", [Number(currentUserId), character]);
    return NextResponse.json(rows)
  } catch (error:any) {
    console.log(error)
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}