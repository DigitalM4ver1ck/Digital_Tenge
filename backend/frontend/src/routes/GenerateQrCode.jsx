import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

export default function GenerateQrCode() {
  const navigateTo = useNavigate();
  const [amount_req, setAmount] = useState(0);
  const API_URL = "http://localhost:8000/api/"
 
  const handleAmount = (e) => {
    let value = e.target.value
    if(value) {
        setAmount(value);
    }else{
        setAmount(0);
    }
};
const createQr = () =>{
  axios.post(API_URL + "create-qr-transaction/", { 
      r_public_address: window.localStorage.getItem("reciever-address"),
      r_short_name: window.localStorage.getItem("username"),
      amount: amount_req * 100,

  }).then((res) => {
    const response = res.data
    console.log(response)
    navigateTo('/show-qr/'+ res.data)
  })
}
const goBack = () => {
  navigateTo(-1);
}
  return (
    <div>
      <div className="h-screen bg-[#F4F6F8]">
      <div className="bg-[#333B47] p-4">
          <div>
            <a href="#" className="mb-5 flex gap-5">
                <i onClick={goBack} className="far fa-long-arrow-left text-2xl text-white"></i>
            </a>
            <div className="flex items-center">
                <div className="text-lg  font-semibold text-white">Введите сумму к оплате</div>
            </div>
          </div>
      </div>
      <div className="flex justify-center flex-col items-center mt-20">
          <div className="mb-6 w-96">
          <div className="">
              <div className="col-span-3 flex flex-col items-start rounded-xl bg-white p-[14px]">
              <div className="input-div">
                  <input type="number" placeholder="0" onChange={handleAmount} className="mb-3 h-8 input-number border-none bg-transparent p-0 text-4xl outline-none focus:border-transparent focus:outline-none sm:text-sm" />₸
              </div>
              <div className="text-xs text-gray-400">Комиссия <span className="font-semibold">0</span> ₸</div>
              </div>
            
          </div>
          </div>
          <button type="button" onClick={createQr} className="mr-2 mt-5 w-96 rounded-lg bg-[#29313A] px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Перевести {amount_req} ₸</button>
        </div>
      </div>
    </div>
  )
}