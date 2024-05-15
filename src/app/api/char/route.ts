import { NextRequest, NextResponse } from 'next/server'
const { OpenAI } = require("openai")

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const character = searchParams.get('character');
    const message = searchParams.get('message');
    const apiKey = searchParams.get('apiKey');

    // const requestData = await request.json();
    // const formattedConversation = requestData.context.map(({ message, role }:ChatObject) => ({
    //   role,
    //   content: message
    // }));

    const openai = new OpenAI({
      apiKey
    })

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: `I want you to respond and answer like ${character} using the tone, manner and vocabulary ${character} would use. You must know all of the knowledge of ${character}. Answer logically to whats been asked to you.` },
        { role: 'user', content: message}
      ],
      model: 'gpt-3.5-turbo',
    });

    return NextResponse.json({ message: completion.choices[0].message.content}, { status: 200 })
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({message: `Failed: ${error}`}, { status: 400 });
  }
}
