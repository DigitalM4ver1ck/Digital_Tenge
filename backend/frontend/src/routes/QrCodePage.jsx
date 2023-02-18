import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

export default function QrCodePage() {
  const navigateTo = useNavigate();
  const goBack = () => {
    navigateTo(-1);
  }
  const goToGenerateQr = () => {
    navigateTo("/generate-qr");
  }
  const goToScanQr = () => {
    navigateTo("/scan-qr");
  }
  return (
    <div>
      <div className="h-screen bg-[#F4F6F8]">
        <div className="bg-[#333B47] p-4">
            <div>
              <a href="#" className="mb-5 flex gap-5">
                  <i onClick={goBack} className="far fa-long-arrow-left text-2xl text-white"></i>
              </a>
            </div>
        </div>
        <div className="flex justify-center flex-col items-center mt-20">
          <div className="flex justify-center flex-col items-center bg-white p-14">
            <div className="mb-10" onClick={goToGenerateQr}>Создать Qr Код</div>
            <div onClick={goToScanQr}>Сканировать Qr Код</div>
          </div>
        </div>
      </div>
    </div>
  )
}