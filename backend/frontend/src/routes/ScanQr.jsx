import "../style/scan.sass"
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import QrReader from 'react-qr-scanner'
import axios from "axios"

export default function ScanQr() {
  const navigateTo = useNavigate();
  const [scanResult, setScanResult] = useState('');
  const [qrTransactionInfo, setQrTransactionInfo] = useState('');
  const [choosedType, setChoosedType] = useState("");
  const [chooseCard, setChooseCard] = useState(0);
  const [signature, setSignature] = useState("");

  const API_URL = "http://localhost:8000/api/"
  const handleScanError = (error) =>{
    console.log(error)
  }
  const goBack = () => {
    navigateTo(-1);
  }
  const handleScan = (result) =>{
    if(result){
      console.log(result);
      setScanResult(result);
      axios.get(API_URL + "get-qr-transaction/" + result.text + "/").then((res) => {
        res.data.amount = res.data.amount / 100
        setQrTransactionInfo(res.data)
      const response = res.data
      console.log(response)
    })
    }
  }
  
  const chooseStandart = () =>{
    document.getElementById("standart-wrapper").style.backgroundColor = '#333B47'
    document.getElementById("standart-balance-text").style.color = '#FFFFFF'
    document.getElementById("standart-balance-decs").style.color = '#CACACA'
    document.getElementById("special-wrapper").style.backgroundColor = '#F4F6F8'
    document.getElementById("special-balance-text").style.color = '#000000'
    document.getElementById("special-balance-desc").style.color = '#67707C'
    setChoosedType("standard")
    setChooseCard(1)
  }
  const chooseLunch = () =>{
    document.getElementById("special-wrapper").style.backgroundColor = '#333B47'
    document.getElementById("special-balance-text").style.color = '#FFFFFF'
    document.getElementById("special-balance-desc").style.color = '#CACACA'
    document.getElementById("standart-wrapper").style.backgroundColor = '#F4F6F8'
    document.getElementById("standart-balance-text").style.color = '#000000'
    document.getElementById("standart-balance-decs").style.color = '#67707C'
    setChoosedType("lunch allowance")
    setChooseCard(1)
  }
  const previewStyle ={
    height: 500,
    width: 320,
  }

  const transfer = () => {
    if(chooseCard == 1){
      sendDataToKotlin()
      window.localStorage.setItem('reciever-name', 'QR Transaction')
      axios.post(API_URL + "transferbynumber/", { 
        s_public_address: window.localStorage.getItem("wallet"), 
        s_node_id: "O=Eurasian Bank, L=Nur-Sultan, C=KZ",
        s_signature: signature,
        r_public_address: qrTransactionInfo.r_public_address,
        r_node_id: "O=Eurasian Bank, L=Nur-Sultan, C=KZ",
        amount: qrTransactionInfo.amount * 100,
        type: choosedType,
        note: ""


      }).then((res) => {
          const response = res.data
          console.log(response)
      })
      navigateTo('/succes-transfer')

    }else{
      setChooseCard(2)
    }
  }
  const sendDataToKotlin = () =>{
    window.JavaScriptMoth.getData("showAndroidData", window.localStorage.getItem("wallet"), "O=Eurasian Bank, L=Nur-Sultan, C=KZ", qrTransactionInfo.r_public_address, "O=Eurasian Bank, L=Nur-Sultan, C=KZ", qrTransactionInfo.amount * 100);
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
                  <i onClick={goBack} className="far fa-long-arrow-left text-2xl text-white"></i>
                  <div className="text-base font-semibold text-white">Оплата по QR</div>
              </a>
            </div>
        </div>
        
          
            {
                scanResult ? (
                    
                  <div class="flex flex-col items-center">
                    <div class="w-10/12 h-20 rounded-xl mt-5 bg-white"> 
                      <h1 class=" text-blue-600 text-sm ml-4 mt-3">Информация о продавце</h1>
                      <h2 class="mt-2 text-xl ml-4">{qrTransactionInfo.r_short_name}</h2>
                    </div>
                    <div class="w-10/12 h-28 bg-white mt-3 rounded-xl">
                      <h3 class="ml-4 text-gray-400 mt-2 text-sm">К оплате</h3>
                      <h1 class="ml-4 mt-2 text-3xl font-semibold">{qrTransactionInfo.amount} <span class="text-xl text-gray-500 font-normal">₸</span></h1>
                      <h3 class="ml-4 text-gray-400 mt-2 text-sm">Комиссия <span class="text-black font-bold">0</span> ₸</h3>
                    </div>
                    <div class="w-10/12 bg-white mt-3 h-64 rounded-xl">
                    {
                        chooseCard == 2 ? (<h2 className="text-red-700 text-sm ml-4">Выберите тип ЦТ</h2>) : (null)
                      }
                      <h1 class=" text-blue-600 text-sm ml-4 mt-3 w-full">Способ оплаты</h1>
                      <div className="method_item ml-4 mt-3 rounded-xl flex flex-row" style={{backgroundColor: "#F4F6F8"}} id="standart-wrapper" onClick={chooseStandart}>
                        <div className="left-standart ml-4">
                        </div>
                        <div className="right ml-4 mt-4">
                          <div className="balance text-xl font-semibold" id="standart-balance-text" style={{color: "#000000"}}>{window.localStorage.getItem("balance")} ₸</div>
                          <h2 className="font-medium" id="standart-balance-decs" style={{color: "#67707C"}}>Стандартные ЦТ</h2>
                        </div>
                      </div>
                      <div className="method_item ml-4 mt-3 rounded-xl flex flex-row" id="special-wrapper" style={{backgroundColor: "#F4F6F8"}} onClick={chooseLunch}>
                        <div className="left-special ml-4">
                        </div>
                        <div className="right ml-4 mt-4">
                          <div className="balance text-xl font-semibold" id="special-balance-text" style={{color: "#000000"}}>{window.localStorage.getItem("special_balance")} ₸</div>
                          <h2 className="font-medium" id="special-balance-desc" style={{color: "#67707C"}}>Пособие на обед</h2>
                        </div>
                      </div>
                    </div>
                    <div class="w-10/12 absolute bottom-12">
                      <h3 class="font-light text-gray-500 text-sm">Нажимая кнопку, Я соглашаюсь с <span class="underline"> условиями перевода</span></h3>
                      <button class="mt-6 text-lg p-3 w-full rounded-xl bg-[#333B47] text-white font-bold" onClick={transfer}>Подтвердить</button>
                    </div>
                  </div>
                ) : 
                ( 
                  <div className="flex justify-center flex-col items-center mt-20">
                    <div className="flex justify-center flex-col items-center bg-white p-4">
                        <QrReader
                        facingMode = "front"
                        delay= "100"
                        style={previewStyle}
                        onError={handleScanError}
                        onScan={handleScan}
                        />
                    </div>
                  </div>
                )
            }
      </div>
    </div>
  )
}