import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const pass = searchParams.get('pass')
  if(process.env.PASSWORD == pass){
    return NextResponse.json({password: "correct"}, {status: 201})
  } else {
    return NextResponse.json({password: "wrong"}, {status: 201})
  }
  
}