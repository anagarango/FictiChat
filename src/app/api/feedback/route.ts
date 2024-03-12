import { NextRequest, NextResponse } from 'next/server'
const nodemailer = require('nodemailer');

export async function POST(request: NextRequest) {
  const requestData = await request.json()

  const transporter = nodemailer.createTransport({
    service: 'icloud',
    auth: {
        user: process.env.PERSONAL_EMAIL,
        pass: process.env.PERSONAL_PASSWORD
    }
  });

  try {
    const result = await transporter.sendMail({
      from: `"Fictichat 👻" <${process.env.PERSONAL_EMAIL}>`,
      to: `"Fictichat 👻" <${process.env.PERSONAL_EMAIL}>`,
      subject: `Fictichat feedback from ${requestData.email}`,
      html: `<p>Email: ${requestData.email}</p> <p>Message: ${requestData.message}</p>`
    });
    // console.log(JSON.stringify(result, null, 4))
    return NextResponse.json({ message: `Success: Feedback has been sent!` }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: `Failed: ${error}`}, { status: 400 });
  }
}