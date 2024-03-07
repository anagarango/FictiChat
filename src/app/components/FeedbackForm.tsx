import { useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";

export default function FeedbackForm({ showFeedback = false, closeFeedback = () => {} }: { showFeedback: boolean; closeFeedback: Function }) {
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [idleEmail, setIdleEmail] = useState<boolean>(false);

  async function submitForm(e: any) {
    e.preventDefault();
    setIdleEmail(true);
    var email = emailRef?.current?.value;
    var message = messageRef?.current?.value;

    if (!email || !message) {
      alert("Failed: Ensure to fill all form inputs");
      return;
    }

    const response = await axios({
      method: 'post',
      url: "/api/feedback",
      data: {
        email: email,
        message: message
      }
    });
    const messageData = await response.data;
    console.log(messageData.message);

    emailRef.current!.value = "";
    messageRef.current!.value = "";

    setIdleEmail(false);
    closeFeedback(false);
  }

  return (
    <>
      {showFeedback &&
        <div className="w-screen h-screen absolute z-40 bg-gray-800/50 flex justify-center items-center">
          <form action="/" onSubmit={(e) => submitForm(e)} className="bg-white p-5 rounded-lg w-3/6 max-w-[600px]">
            <div>
              <h1 className='text-xl font-bold'>Got A Suggestion?</h1>
              <p className="py-4">Let me know if there are any well-known characters you&apos;d like to chat with (or if you encountered any bugs 🙈).</p>
              <input className="bg-[#D9F3EB] w-full p-2 rounded-md text-sm outline-none" type="email" placeholder="Email:" required ref={emailRef} />
              <textarea placeholder="Tell me what you think..." rows={2} className="outline-none p-2 rounded-md my-2 bg-[#D9F3EB] w-full text-sm" required ref={messageRef}></textarea>
              <div className="flex justify-end gap-3 pt-5">
                <button type="submit" disabled={idleEmail} className='bg-[#50A98D] text-white py-1 px-2 rounded-md cursor-pointer'>{idleEmail ? <Image alt="loading gif" src="/spinner.svg" width={70} height={70} className="w-[50px] h-5" /> : "Submit"}</button>
                <button onClick={() => closeFeedback(false)} className='text-[#50A98D] bg-gray-200 py-1 px-2 rounded-md cursor-pointer'>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      }
    </>
  );
}