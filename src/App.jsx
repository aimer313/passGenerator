import { useState, useCallback ,useEffect ,useRef } from "react";
// import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // useRef
  const passref = useRef(null)
  // useCallback => for memoizatioin/optimization [with dependencies]
  const passGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let charInd = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(charInd);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]); // fn & dependencies


  const copyPassToClipboard = useCallback(() => {
    // usearEF VAR USE TO PRODUCE ON GIVING SOME ENVENTS TO STATE
    passref.current?.select()
    // passref.current?.setSelectionRange(0 , 3)

    // code to copy at clipboard
    window.navigator.clipboard.writeText(password)
  } , [password])

// useEffect => for rerrun if any changes occures with => =>[with dependencies]
  useEffect(() => {
    passGen()
  } , [length , charAllowed , numberAllowed , passGen])

  return (
    <>
      <div className=" w-full  max-w-md  mx-auto  shadow-md rounded-lg  px-4  py-3 my-8  text-orange-500 bg-gray-800">
        <h1 className=" text-white text-center my-3">Password Generator</h1>
        <div className=" flex shadow rounded-lg  overflow-hidden mb-4">
          {/* Input Tag */}
          <input
            type="text"
            value={password}
            className=" outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passref}
          />

          {/* Button Tag */}
          <button className=" outline-none bg-blue-700  text-white  px-3 py-0.5 shrink-0 "
          onClick={copyPassToClipboard}>
            copy
          </button>
        </div>

        <div className=" flex text-sm  gap-x-2">
          <div className=" flex item-center  gap-x-1">
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className=" cursor-pointer"
            // onchangr val
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label > Length : {length}</label>
          </div>
          <div className=" flex  items-center gap-x-1"> 
            <input type="checkbox"
            defaultChecked = {numberAllowed}
            id="numberInput"
            onChange={() => {setnumberAllowed((prev) => !prev)}}
             />
             <label > Number </label>
          </div>


          <div className=" flex  items-center gap-x-1"> 
            <input type="checkbox"
            defaultChecked = {numberAllowed}
            id="numberInput"
            onChange={() => {setcharAllowed((prev) => !prev)}}
             />
             <label > Characters </label>
          </div>


        </div>
      </div>
    </>
  );
}

export default App;
