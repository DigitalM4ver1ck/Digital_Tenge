import "../style/main_transfer_page.sass"
import { useNavigate } from "react-router-dom"
import { InputPhone } from '../components';
import React, {useState,useEffect} from 'react';

export default function TransferView() {
    const navigateTo = useNavigate()
    const goBack = (e) => {
        navigateTo(-1)
    }
    useEffect( ()=>{
        deleteChooseBank();
      },[]);
    const deleteChooseBank = () =>{
       window.localStorage.removeItem("choosed_bank");
      }
    return (
        <div className="h-screen bg-[#F4F6F8]">
            <div className="p-4">
                {/* NAV */}
                <div className="mb-5" onClick={goBack}>
                    <a href="#">
                        <i className="far fa-long-arrow-left text-2xl"></i>
                    </a>
                </div>
                {/* INPUT */}
                <div class="mb-6">
                    <div className="mb-3 text-2xl font-bold">По номеру телефона</div>
                        <InputPhone />
                </div>
            </div>
        </div>
    )
}
