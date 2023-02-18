import "../style/c2c.sass"
import { useParams, useSearchParams } from "react-router-dom";
import { useRef, useState } from 'react';
import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function C2C() {
  const navigateTo = useNavigate();
  const [amount_req, setAmount] = useState(0);
  const [note_req, setNote] = useState("");
  const [signature, setSignature] = useState("");

  const API_URL = "http://localhost:8000/api/"

  const handleAmount = (e) => {
    let value = e.target.value
    if(value) {
        setAmount(value);
    }else{
        setAmount(0);
    }
};
const handleNote = (e) => {
    let value = e.target.value
    if(value) {
        setNote(value);
    }else{
        setNote("");
    }
};
    const transfer = () =>{
        sendDataToKotlin()
        axios.post(API_URL + "transferbynumber/", { 
            s_public_address: window.localStorage.getItem("wallet"), 
            s_node_id: "O=Eurasian Bank, L=Nur-Sultan, C=KZ",
            s_signature: signature,
            r_public_address: window.localStorage.getItem("reciever-address"),
            r_node_id: window.localStorage.getItem("reciever-node"),
            amount: amount_req * 100,
            type: "standard",
            note: note_req


        }).then((res) => {
            const response = res.data
            console.log(response)
        })
        window.localStorage.removeItem("amount_transfer");
        window.localStorage.setItem("amount_transfer", amount_req);
        navigateTo('/succes-transfer')
    }
    const sendDataToKotlin = () =>{
        window.JavaScriptMoth.getData("showAndroidData", window.localStorage.getItem("wallet"), "O=Eurasian Bank, L=Nur-Sultan, C=KZ",window.localStorage.getItem("reciever-address"), window.localStorage.getItem("reciever-node"), amount_req * 100);
      }
    
      const showAndroidData = (string) =>{
        setSignature(string)
      }

  return (
    <div>
        <div className="h-screen bg-[#F4F6F8]">
        <div className="bg-[#333B47] p-4">
            <div>
            <a href="#" className="mb-5 flex gap-5">
                <i onClick={() => navigateTo(-1)} className="far fa-long-arrow-left text-2xl text-white"></i>
                <div className="text-base font-semibold text-white">Куда</div>
            </a>
            <div className="flex items-center">
                <div className="mr-3 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#51819C] text-white">A</div>
                <div>
                <div className="text-sm font-semibold text-white">{window.localStorage.getItem("reciever-name")}</div>
                <div className="text-xs text-gray-400">{window.localStorage.getItem("reciever-phone")}</div>
                </div>
            </div>
            </div>
        </div>
        <div className="flex flex-col justify-between p-4">
            <div className="mb-6">
            <div className="grid grid-cols-4 gap-2">
                <div className="col-span-1 flex flex-col items-center rounded-xl bg-white p-[14px]">
                <div className="mb-3 text-xs font-semibold">Откуда</div>
                <div className="mb-3 h-9 w-14 rounded-md bg-fuchsia-800"></div>
                <i className="far fa-chevron-down"></i>
                </div>
                <div className="col-span-3 flex flex-col items-start rounded-xl bg-white p-[14px]">
                <div className="mb-3 text-xs">Баланс {window.localStorage.getItem("balance")} ₸</div>
                <div className="input-div">
                    <input type="number" placeholder="0" onChange={handleAmount} className="mb-3 h-8 input-number border-none bg-transparent p-0 text-4xl outline-none focus:border-transparent focus:outline-none sm:text-sm" />₸
                </div>
                <div className="text-xs text-gray-400">Комиссия <span className="font-semibold">0</span> ₸</div>
                </div>
                <label for="UserEmail" className="relative col-span-4 mb-3 block overflow-hidden rounded-md bg-white px-3 pt-3">
                <input type="text" id="UserEmail" onChange={handleNote} placeholder="Напишите сообщение" className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent outline-none focus:border-transparent focus:placeholder-gray-300 focus:outline-none focus:ring-0 sm:text-sm" />
                <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-400 transition-all line-clamp-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">Сообщение получателю</span>
                </label>
            </div>
            <div className="text-sm text-gray-500">Транзакция будет скрыта</div>
            </div>
            <button type="button" onClick={transfer} className="mr-2 mb-2 w-full rounded-lg bg-[#29313A] px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Перевести {amount_req} ₸</button>
        </div>
        </div>

        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css" />

    </div>
  )
}