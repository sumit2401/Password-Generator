import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  let [length, setLength] = useState(8);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [characterAllowed, setCharacterAllowed] = useState(false);
  let [password, setPassword] = useState("");

  //ref hook---> used to take reference

  const passwordRef = useRef(null)


  // useCallback hooks to cache the call back function defination between re-render means this hooks memorize the function and use only when the dependencies change

  //syntax -  useCallBack(function, dependencies(the things which we changes the result by changing them... put them in the array))
  const passwordGenerator = useCallback(() => {

    let pass = "" //passing null variable for 
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" // from where we generate the password
    if (numberAllowed) str += "0123456789" //if numberallowed is true then add these numbers
    if (characterAllowed) str += "!@#$%^&*_-+=[]{}`~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char) //appending character

    }

    setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword])

  // passwordGenerator()------>//can call this function like this in here coz we use callback function 

  const copyPassword = useCallback(() => {
    // passwordRef.current?.select() //just for selecting what we copy ---for givinf small but impactfull effect use ref hook
    passwordRef.current?.setSelectionRange(0, 100) // just for giving the selection range

    window.navigator.clipboard.writeText(password) //for copying password in clipboard

  }, [password])

  //useEffect hook------------> 
  useEffect(() => { passwordGenerator() }, [length, numberAllowed, characterAllowed, passwordGenerator])






  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-md px-4 py-3 my-8 text-orange-500 bg-gray-900'>

        <h1 className='text-white text-center'>Password Generator</h1>

        <div className='flex shadow rounded-md overflow-hidden mb-4'>

          <input
            ref={passwordRef}
            type="text"
            value={password}
            className='   outline-none w-full my-2 py-1 px-3 rounded-l-lg'
            placeholder='password'
            readOnly
          />

          <button onClick={copyPassword} className='outline-none bg-blue-700 my-2 px-4  text-white rounded-r-lg py-2 shrink-0'

          >Copy</button>


        </div>
        <div className='flex text-sm gap-x-2 my-3'>
          <div className='flex items-center gap-x-1 mx-3 w-full'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2 w-50">
            <input
              defaultChecked={numberAllowed}
              type="checkbox"
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev) //that simply means if the value is true then after change in become false and if it is false then make it true
              }}

            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className='px-2'
              id="characterInput"
              onChange={() => { setCharacterAllowed((prev) => !prev) }}

            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
