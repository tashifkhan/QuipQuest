// import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <div className="flex [background:linear-gradient(90deg,#3E3E48_56.72%,#191D24_100%)] w-full h-[100vh] justify-center items-center">
        <div className='bg-boxColor w-[37.625%] h-[73.528vh] m-4 rounded-[50px] flex-col justify-evenly'>
          <div className="cointainer-input-box-mainpage mt-[19.3%]">
            {/* pt-[14.3%] */}
            <input className='input-box-mainpage' placeholder='Enter Your Name' />
          </div>
          <div className='flex items-center my-[6.1%]'>
            {/*  */}
            <div className='arrow-buttons '>{'<'}</div>
            <div className='m-auto bg-light-green-01 w-[37.5%] h-[195px] rounded-[5px]'> </div>
            <div className='arrow-buttons'>{'>'}</div>
          </div>
          <div className='cointainer-input-box-mainpage mb-[6.1%]'>
            {/* pb-[4.545%] */}
            <input className='input-box-mainpage' placeholder='Enter Room Code' />
          </div>
          <div className='flex justify-center mb-[16.5%] gap-[4.5%]'>
            <button className='bg-green-02 button-general'>JOIN</button>
            <button className='bg-dark-green-03 button-general'>CREATE</button>
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
