import { useState } from "react";
import "./App.css";
import { useCallback } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState("");
  const [symbolAllowed, setSymbolAllowed] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let alpha = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    let num = "1234567890";
    let symbols = "!@#$%^&*?_";

    let str = alpha;
    numberAllowed && (str += num);
    symbolAllowed && (str += symbols);

    for (let i = 0; i < passwordLength; i++) {
      const index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);

    console.log(password);
  }, [passwordLength, numberAllowed, symbolAllowed]);

  useEffect(() => {
    generatePassword();
  }, [passwordLength, numberAllowed, symbolAllowed]);

  const copyToClipBoard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  }


  return (
    <>
      <div className="bg-slate-500 w-screen h-screen flex justify-center items-start pt-10">
        <div className="bg-slate-700 w-8/12 min-h-32 flex flex-col justify-center items-center">
          <div className="w-6/12 flex justify-center items-start">
            <input
              type="text"
              value={password}
              ref={passwordRef}
              readOnly
              className="h-9 w-full pl-2 rounded-l-md outline-none"
            />
            <button
              className="bg-blue-500 h-9 px-2 rounded-r-md"
              onClick={copyToClipBoard}
            >
              Copy
            </button>
          </div>
          <div className="w-6/12 mt-5 gap-4 flex justify-start items-center text-gray-200">
            <div className="flex justify-center items-center gap-1">
              <input
                type="range"
                min={6}
                max={20}
                value={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
                className="cursor-pointer"
              />
              <label htmlFor="passwordLength">Length: {passwordLength}</label>
            </div>

            <div className="flex justify-center items-center gap-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={(e) => setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor="numberAllowed">Number</label>
            </div>

            <div className="flex justify-center items-center gap-1">
              <input
                type="checkbox"
                defaultChecked={symbolAllowed}
                onChange={(e) => setSymbolAllowed((prev) => !prev)}
              />
              <label htmlFor="symbolAllowed">Symbol</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
