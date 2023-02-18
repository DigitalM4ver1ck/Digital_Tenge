import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import qrCode from 'qrcode';

export default function ShowQrPage() {
  const navigateTo = useNavigate();
  const params = useParams();
  const [qr_image, setQrImage] = useState("");
  useEffect(() => {
    generateQrCode()
}, [])
  const generateQrCode = ()=>{
    qrCode.toDataURL(params.qr_id, function (err, url) {
        setQrImage(url);
      console.log(url)
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
            </div>
        </div>
        <div className="flex w-full items-center justify-center content-center">
          <div className="mt-10 bg-white w-11/12 h-64">
            <img src={qr_image} alt="" className="w-64 ml-16"/>
          </div>
        </div>
      </div>
    </div>
  )
}