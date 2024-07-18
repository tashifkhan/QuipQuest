// import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <div className="flex bg-gray-950 w-full h-[100vh] justify-center items-center">
        <div className='bg-boxColor w-[40.625%] h-[80.528vh] m-4 rounded-[50px] flex-col items-center'>
          <div className="cointainer-input-box-mainpage ">
            {/* pt-[14.3%] */}
            <input className='input-box-mainpage' placeholder='Enter Your Name' />
          </div>
          <div className='flex items-center '>
            {/* py-[6.1%] */}
            <div className='arrow-buttons '> {'<'}</div>
            <div className='m-auto bg-light-green-01 w-[37.5%] h-[195px] rounded-[5px]'> </div>
            <div className='arrow-buttons'> {'>'}</div>
          </div>
          <div className='cointainer-input-box-mainpage '>
            {/* pb-[4.545%] */}
            <input className='input-box-mainpage' placeholder='Enter Room Code' />
          </div>
          <div className='flex  justify-center '>
            <button className='bg-green-02 m-5 rounded-[5px] text-white h-[51px] w-[35%]'>JOIN</button>
            <button className='bg-dark-green-03 m-5 rounded-[5px] text-white h-[51px] w-[35%]'>CREATE</button>
          </div>
        </div>
        {/* right box ends here */}
        <div className='w-[40%] m-4'>
          <h1 className='text-white font-Head text-[84px] '> Quip Quest </h1>
        </div>
      </div>
    </>
  )
}

export default App
