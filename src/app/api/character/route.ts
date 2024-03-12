import { NextRequest, NextResponse } from 'next/server'
import openai from '../../utils/openai-test';

interface ChatObject {
  user:string,
  message:string,
  role:string
}

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const character = searchParams.get('character');

    const requestData = await request.json();
    const formattedConversation = requestData.context.map(({ message, role }:ChatObject) => ({
      role,
      content: message
    }));

    // const completion = await openai.chat.completions.create({
    //   messages: [
    //     { role: 'system', content: `I want you to respond and answer like ${character} using the tone, manner and vocabulary ${character} would use. You must know all of the knowledge of ${character}. Answer logically to whats been asked to you.` },
    //     ...formattedConversation,
    //   ],
    //   model: 'gpt-3.5-turbo',
    // });

    return NextResponse.json({ message: "imma barbie girl in a barbie world imma barbie girl in a barbie world " }, { status: 200 })
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.error();
  }
}