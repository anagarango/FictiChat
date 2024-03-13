import { useState, useRef, use } from "react";
import Image from "next/image";
import axios from "axios";

export default function LogIn({showModal, closeFeedback = () => {}, currentUserId = () => {} }: { showModal: string; closeFeedback: Function, currentUserId: Function }){
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [idleEmail, setIdleEmail] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<string>("login");
  const [warning, setWarning] = useState<string>("hello");

  async function submitForm(e: any) {
    e.preventDefault();
    setIdleEmail(true);
    var email = emailRef?.current?.value;
    var password = passwordRef?.current?.value;
    var username = usernameRef?.current?.value;
  
    if (!email || !password) {
      setWarning("Failed: Ensure to fill all form inputs");
      return;
    }
  
    var response = null;
  
    if (formMode == "login") {
      response = await axios({
        method: 'get',
        url: `/api/mysql/user?email=${email}&password=${password}`,
      });
    } else {
      response = await axios({
        method: 'post',
        url: "/api/mysql/user",
        data: {
          username: username,
          email: email,
          password: password
        }
      });
    }
  
    const messageData = await response.data;
    console.log(messageData.message)
  
    if (messageData.message) {
      setWarning(messageData.message);
    } else {
      sessionStorage.setItem(messageData.id, JSON.stringify(messageData));
      currentUserId(messageData);
      setWarning("hello");
      closeFeedback(false);
      // Refresh the page after submitting the form
      window.location.reload();
    }
  
    emailRef.current!.value = "";
    passwordRef.current!.value = "";
    setIdleEmail(false);
  }

  return (
    <>
      {showModal == "login" &&
        <div id="feedback" className="w-screen h-screen absolute z-40 bg-gray-700/75 flex justify-center items-center">
          <form action="/" onSubmit={(e) => submitForm(e)} className="bg-white p-5 rounded-lg w-5/6 max-w-[600px]">
            <div>
              <h1 className='text-xl font-bold'>{formMode == "login" ? "Welcome Back!":"Join FictiChat!"}</h1>
              <p className=''>Please enter your details</p>
              <div className="bg-gray-400 p-1 rounded-md my-4">
                <button className={`p-2 w-2/4 rounded-md transition-colors duration-500 ${formMode == "login" ? "bg-white text-black" : "text-gray-600"}`} onClick={()=>{setFormMode("login"); setWarning("hello")}}>Sign In</button>
                <button className={`p-2 w-2/4 rounded-md transition-colors duration-500 ${formMode !== "login" ? "bg-white  text-black" : "text-gray-600"}`}  onClick={()=>{setFormMode("signup"); setWarning("hello")}}>Sign Up</button>
              </div>
              {formMode !== "login" && <input type="text" className="bg-[#D9F3EB] w-full p-2 rounded-md outline-none" placeholder="Username:" required ref={usernameRef} />}
              <input type="email" className="bg-[#D9F3EB] w-full p-2 rounded-md outline-none my-2" placeholder="Email:" required ref={emailRef} />
              <input type="password" placeholder="Password:" className="outline-none p-2 rounded-md bg-[#D9F3EB] w-full" required ref={passwordRef}></input>
              <p className={`text-red-600 pt-3 ${warning.length > 5 ? "visible" : "invisible"}`}>{warning}</p>
              <div className="flex justify-end gap-3 pt-5">
                <button type="submit" disabled={idleEmail} className='bg-[#50A98D] text-white py-2 px-3 rounded-md cursor-pointer'>{idleEmail ? <Image alt="loading gif" src="/spinner.svg" width={70} height={70} className="w-[50px] h-5" /> : "Submit"}</button>
                <button onClick={() => {closeFeedback(false); setWarning("hello")}} className='text-[#50A98D] bg-gray-200 py-2 px-3  rounded-md cursor-pointer'>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      }
    </>
  );
}