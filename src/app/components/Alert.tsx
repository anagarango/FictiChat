export default function Alert({ showModal = false, closeFeedback = () => {} }: { showModal: boolean; closeFeedback: Function }) {
  const submitForm = (e:any) => {
    e.preventDefault()
  }
  return (
    <>
      {showModal &&
        <div id="feedback" className="w-screen h-screen absolute z-40 bg-gray-700/75 flex justify-center items-center">
          <form  action="/" onSubmit={(e) => submitForm(e)} className="bg-white p-5 rounded-lg w-5/6 max-w-[600px]">
            <div>
              <h1 className='text-xl font-bold'>You haven't signed in</h1>
              <div className="flex justify-end gap-3 pt-5">
                <button onClick={() => closeFeedback(false)} className='text-[#50A98D] bg-gray-200 py-2 px-3  rounded-md cursor-pointer'>Dismiss</button>
              </div>
            </div>
          </form>
        </div>
      }
    </>
  );
}