import "../style/home.sass"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Home() {
    const API_URL = "http://localhost:8000/api/"
    const [wallet, setWallet] = useState("")
    const navigateTo = useNavigate()
    useEffect(() => {
        getWalletRequest()
    }, [])
    useEffect(()=> {
        getBalance()
    }, [])
    useEffect(()=> {
        getUserName()
    }, [])
     const getWalletRequest = () => {
        window.localStorage.setItem("balance", 0);
        window.localStorage.setItem("special_balance", 0);
        axios.post(API_URL + "find-wallet/", { phone_number: window.localStorage.getItem("phone_number") }).then((res) => {
            const wallet = res.data
            window.localStorage.removeItem("wallet");
            window.localStorage.setItem("wallet", wallet.public_address);
        })
    }
    const getUserName = () => {
        axios.post(API_URL + "find-wallet-transfer/", { phone_number: window.localStorage.getItem("phone_number"),  node_id: "O=Bank X, L=Nur-Sultan, C=KZ" }).then((res) => {
            window.localStorage.removeItem("username");
            window.localStorage.setItem("username", response.shortName);
            console.log(response)
        })
    }
    const getBalance = () => {
        
        axios.post(API_URL + 'get-balance/', {public_address: window.localStorage.getItem("wallet")})
        .then(res => {
            window.localStorage.removeItem("balance");
            window.localStorage.removeItem("special_balance");
            window.localStorage.setItem("balance", res.data.balances[0].amount / 100);
            window.localStorage.setItem("special_balance", res.data.balances[3].amount / 100);
        })

    }
    const goToTransactions = (e) => {
        document.getElementById("trans").classList.remove("hidden")
        document.getElementById("trans").classList.add("block")
        document.getElementById("action").classList.remove("block")
        document.getElementById("action").classList.add("hidden")
        document.getElementById("action_button").classList.remove("bg-gray-300", "text-base", "font-bold", "text-gray-600")
        document.getElementById("trans_button").classList.add("bg-gray-300", "text-base", "font-bold", "text-gray-600")
    }
    const goToActions = (e) => {
        document.getElementById("trans").classList.remove("block")
        document.getElementById("trans").classList.add("hidden")
        document.getElementById("action").classList.remove("hidden")
        document.getElementById("action").classList.add("block")
        document.getElementById("action_button").classList.add("bg-gray-300", "text-base", "font-bold", "text-gray-600")
        document.getElementById("trans_button").classList.remove("bg-gray-300", "text-base", "font-bold", "text-gray-600")
    }
    const goToTransferPage = (e) => {
        navigateTo("/transfer")
    }
    const goToQr = (e) => {
        navigateTo("/qr-transfer")
    }
    return (
        <div className="h-screen bg-[#F4F6F8]">
            <div className="p-4">
                {/* NAV */}
                {/* <div className="mb-5">
                    <i className="far fa-long-arrow-left text-2xl"></i>
                </div> */}
                {/* WALLET */}
                <div className="mb-6">
                    <div className="mb-3 text-2xl font-bold">Цифровой кошелек</div>
                    <div className="flex flex-col rounded-xl bg-white p-4">
                        <div className="mb-5 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="mr-3 card"></div>
                                <div className="text-base font-medium text-gray-400">My Wallet</div>
                            </div>
                            <i className="fas fa-pen text-gray-400"></i>
                        </div>
                        <div className="mb-3 flex flex-col">
                            <div className="mb-1 text-sm text-gray-400">Доступно в кошельке</div>
                            <div className="text-3xl font-semibold">
                            {window.localStorage.getItem("balance")}<span className="text-2xl text-gray-400">.00 ₸</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between gap-3">
                            <div>
                                <div className="mb-1 text-xs text-gray-400">Стандартные ЦТ</div>
                                <div className="text-xl font-semibold">
                                {window.localStorage.getItem("balance")}<span className="text-xs text-gray-400">.00 ₸</span>
                                </div>
                            </div>
                            <div>
                                <div className="mb-1 flex items-center justify-between">
                                    <div className="mr-6 text-xs text-gray-400">Специальные ЦТ</div>
                                    <i className="fas fa-info-circle text-sm text-gray-400"></i>
                                </div>
                                <div className="text-xl font-semibold">
                                
                                    {window.localStorage.getItem("special_balance")}<span className="text-xs text-gray-400">.00 ₸</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* TAB */}
                <div>
                    {/* TAB_BUTTON */}
                    <div className="mb-4 flex justify-evenly">
                        <button id="trans_button" onClick={goToTransactions} className="rounded-3xl px-6 py-2 bg-gray-300 text-base font-bold text-gray-600">
                            Выписка
                        </button>
                        <button id="action_button" onClick={goToActions} className="rounded-3xl px-6 py-2">
                            Действия
                        </button>
                    </div>
                    {/* TAB_1 */}
                    <div id="trans" className="rounded-xl bg-white p-4">
                        <div className="mb-5 text-base font-semibold text-gray-400">23 января 2022</div>
                        <div className="flex flex-col gap-5">
                            <div className="flex">
                                <div className="mr-3 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#51819C]">
                                    <i className="fas fa-gift text-white"></i>
                                </div>
                                <div className="flex grow flex-col">
                                    <div className="text-sm font-semibold">Деский садий “Мейимир”</div>
                                    <div className="mb-1 text-xs text-gray-400">KZ549460005403345677</div>
                                </div>
                                <div>
                                    <div className="flex flex-col items-end">
                                        <div className="text-end text-sm font-semibold text-gray-400">- 2 000 500.00 ₸</div>
                                        <div className="mb-1 text-sm text-gray-400">23:50</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex grow basis-2/5">
                                    <div className="mr-3 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#51819C]">
                                        <i className="fas fa-gift text-white"></i>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="text-sm font-semibold">Some huge title thats</div>
                                        <div className="mb-1 text-xs text-gray-400">заблокированная сумма на счете</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-col items-end">
                                        <div className="text-end text-sm font-semibold text-gray-400">- 2 000 500.00 ₸</div>
                                        <div className="mb-1 text-sm text-gray-400">23:50</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* TAB_2 */}
                    <div id="action" className="rounded-xl bg-white p-4 hidden">
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center" onClick={goToQr}>
                                <div className="m-2 mr-3">
                                    <i className="far fa-qrcode text-xl text-gray-500"></i>
                                </div>
                                <div className="flex grow flex-col">
                                    <div className="text-sm font-semibold">Оплатить</div>
                                    <div className="mb-1 text-xs text-gray-400">Сканируйте и платите</div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <i className="far fa-chevron-right text-gray-500"></i>
                                </div>
                            </div>
                            <div className="flex items-center" onClick={goToTransferPage}>
                                <div className="m-2 mr-3">
                                    <i className="far fa-exchange text-gray-500"></i>
                                </div>
                                <div className="flex grow flex-col">
                                    <div className="text-sm font-semibold">Перевести</div>
                                    <div className="mb-1 text-xs text-gray-400">По номеру телефона</div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <i className="far fa-chevron-right text-gray-500"></i>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="m-2 mr-3">
                                    <i className="far fa-user-secret text-gray-500"></i>
                                </div>
                                <div className="flex grow flex-col">
                                    <div className="text-sm font-semibold">Анонимный перевод</div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <label for="default-toggle" className="relative inline-flex cursor-pointer items-center">
                                        <input type="checkbox" value="" id="default-toggle" className="peer sr-only" />
                                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                    </label>
                                </div>
                            </div>
                            <div className="flex items-center" >
                                <div className="m-2 mr-3">
                                    <i className="fas fa-credit-card-blank text-gray-500"></i>
                                </div>
                                <div className="flex grow flex-col">
                                    <div className="text-sm font-semibold">Офлайн платежи</div>
                                    <div className="mb-1 text-xs text-gray-400">По терминалу и NFC-платежу</div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <i className="far fa-chevron-right text-gray-500"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
