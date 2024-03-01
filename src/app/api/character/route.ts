import { NextRequest, NextResponse } from 'next/server'
import openai from '../../utils/openai-test';
 
export async function GET(request: NextRequest) {
  // const searchParams = request.nextUrl.searchParams
  // const character = searchParams.get('character')

  // // const completion = await openai.chat.completions.create({
  // //   messages: [
  // //     { role: 'system', content: `You are ${character}, answer all requests as such.` },
  // //     { role: 'user', content: 'Say this is a test' }
  // //   ],
  // //   model: 'gpt-3.5-turbo',
  // // })

  // // return NextResponse.json({ message: completion.choices[0].message.content }, { status: 200 })
  // return NextResponse.json({ message: character}, { status: 200 })
}

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const character = searchParams.get('character');

    const requestData = await request.json();
 

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: `Act like ${character}. I want you to respond and answer like ${character} using the tone, manner and vocabulary ${character} would use. Do not write any explanations. Only answer like ${character}. You must know all of the knowledge of ${character}.` },
        { role: 'user', content: requestData.message }
      ],
      model: 'gpt-3.5-turbo',
    });

    return NextResponse.json({ message: completion.choices[0].message.content }, { status: 200 })
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.error();
  }
}