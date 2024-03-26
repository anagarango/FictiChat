import connection from "../mysql";
import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest) {
  let connectionInstance;
  try {
    const searchParams = request.nextUrl.searchParams;
    const currentUserId = searchParams.get('currentUserId');
    const character = searchParams.get('character');
    connectionInstance = await connection.getConnection();
    const [rows]:any = await connectionInstance.query("SELECT * FROM chat WHERE user_id = ? AND character_name = ?", [Number(currentUserId), character]);

    if (rows[0]) {
      return NextResponse.json(rows[0]);
    }
  } catch (error:any) {
    console.log(error)
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  } finally {
    if(connectionInstance){
      connectionInstance.release();
    }
  }
}

export async function POST(request: NextRequest) {
  let connectionInstance;
  try {
    const searchParams = request.nextUrl.searchParams;
    const currentUserId = searchParams.get('currentUserId');
    const character = searchParams.get('character');
    const requestData = await request.json();
    const chat = JSON.stringify(requestData.context);
    connectionInstance = await connection.getConnection();
    
    // Pass an array of values as the second argument
    const result = await connectionInstance.query("INSERT INTO chat (user_id, character_name, messages) VALUES (?, ?, ?)", [currentUserId, character, chat]);
    return NextResponse.json({ message: `Chat sent!`});
  } catch (error:any) {
    console.log(error);
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  } finally {
    if(connectionInstance){
      connectionInstance.release();
    }
  }
}

export async function PUT(request: NextRequest) {
  let connectionInstance;
  try {
    const searchParams = request.nextUrl.searchParams;
    const currentUserId = searchParams.get('currentUserId');
    const character = searchParams.get('character');
    const requestData = await request.json();
    const chat = JSON.stringify(requestData.context);

    connectionInstance = await connection.getConnection();
    const result = await connectionInstance.query("UPDATE chat SET messages = ? WHERE user_id = ? AND character_name = ?", [chat, Number(currentUserId), character]);

    return NextResponse.json({ message: `Chat updated for ${currentUserId}`});
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({ message: error.message },{status: 500})
  } finally {
    if(connectionInstance){
      connectionInstance.release();
    }
  }
}


