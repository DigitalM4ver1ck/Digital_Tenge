import './inputPhone.sass'
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import CloseImg from '../../images/close.svg'
import OpenMore from '../../images/openMore.svg'
import CloseBanks from '../../images/close_banks.svg'
import axios from "axios"

export const InputPhone  = () => {
    const navigateTo = useNavigate();
    const API_URL = "http://localhost:8000/api/"

    const [isFocused, setFocus] = useState(false);
    const [isNameReceived, setName] = useState(false);
    const [isBankChoosed, setBankChoose] = useState(false);
    const [isRecieverSearched, setIsRecieverSearched] = useState(false);
    const [wasRequest, setWasRequest] = useState(0);
    const [recieverPhone, setRecieverPhone] = useState("");
    const [receiver, setReciever] = useState("");
    const [state, setState] = useState({
        phoneNumber: ''
    });

    const handlePhoneNumber = (e) => {
        let value = e.target.value
        if(value) {
            setState({
                phoneNumber: value
            });
            if(value.replace(/\s/g, '').replace("+7",'').match(/^[0-9]*$/)){
                setName(true);
                window.localStorage.removeItem("reciever-phone");
                window.localStorage.setItem("reciever-phone", value);
                setRecieverPhone(value.split(" ").join(""));
            }
            else {
                setName(false);
            };
        }
    };

    const erase = () => {
        setState({
            phoneNumber: ''
        });
        setName(false)
        const inputElem = document.getElementById('phoneNumber');
        inputElem.setSelectionRange(3,4);
        inputElem.focus();
    };

    const goBanks = () => {
        document.getElementById("bank").style.visibility = "visible";
    }
    const goToTransfer = () => {
        navigateTo('/c2c');
    }
        
    const close = () => {
        document.getElementById("bank").style.visibility = "hidden";
    }

    const chooseBank = (id) =>{
        if(window.localStorage.getItem("choosed_bank") != null){
            localStorage.removeItem("choosed_bank");
        }
        if(id = 1){
            window.localStorage.setItem("choosed_bank", 1);
            setWasRequest(1);
            axios.post(API_URL + "find-wallet-transfer/", { phone_number: recieverPhone,  node_id: "O=Eurasian Bank, L=Nur-Sultan, C=KZ" }).then((res) => {
                const response = res.data
                setReciever(response)
                window.localStorage.removeItem("reciever-name");
                window.localStorage.removeItem("reciever-address");
                window.localStorage.removeItem("reciever-node");
                window.localStorage.setItem("reciever-name", response.shortName);
                window.localStorage.setItem("reciever-address", response.public_address);
                window.localStorage.setItem("reciever-node", response.node_id);
                console.log(response)
                setIsRecieverSearched(true);
                setWasRequest(2);
            })
            setBankChoose(true);
        }else if(id = 2){
            window.localStorage.setItem("choosed_bank", 2);
            setWasRequest(1);
            axios.post(API_URL + "find-wallet-transfer/", { phone_number: recieverPhone,  node_id: "O=Bank X, L=Nur-Sultan, C=KZ" }).then((res) => {
                const response = res.data
                setReciever(response)
                window.localStorage.removeItem("reciever-name");
                window.localStorage.removeItem("reciever-address");
                window.localStorage.removeItem("reciever-node");
                window.localStorage.setItem("reciever-name", response.shortName);
                window.localStorage.setItem("reciever-address", response.public_address);
                window.localStorage.setItem("reciever-node", response.node_id);
                console.log(response)
                setIsRecieverSearched(true);
                setWasRequest(2);
            })
            setBankChoose(true);
        }else if(id = 3){
            window.localStorage.setItem("choosed_bank", 3)
            setWasRequest(1);
            axios.post(API_URL + "find-wallet-transfer/", { phone_number: recieverPhone,  node_id: "O=BTS Digital, L=Nur-Sultan, C=KZ" }).then((res) => {
                const response = res.data
                setReciever(response)
                window.localStorage.removeItem("reciever-name");
                window.localStorage.removeItem("reciever-address");
                window.localStorage.removeItem("reciever-node");
                window.localStorage.setItem("reciever-name", response.shortName);
                window.localStorage.setItem("reciever-address", response.public_address);
                window.localStorage.setItem("reciever-node", response.node_id);
                console.log(response)
                setIsRecieverSearched(true);
                setWasRequest(2);
            })
            setBankChoose(true);
        }else if(id = 4){
            window.localStorage.setItem("choosed_bank", 4)
            setWasRequest(1);
            axios.post(API_URL + "find-wallet-transfer/", { phone_number: recieverPhone,  node_id: "O=Senim, L=Nur-Sultan, C=KZ" }).then((res) => {
                const response = res.data
                setReciever(response)
                window.localStorage.removeItem("reciever-name");
                window.localStorage.removeItem("reciever-address");
                window.localStorage.removeItem("reciever-node");
                window.localStorage.setItem("reciever-name", response.shortName);
                window.localStorage.setItem("reciever-address", response.public_address);
                window.localStorage.setItem("reciever-node", response.node_id);
                console.log(response)
                setIsRecieverSearched(true);
                setWasRequest(2);
            })
            setBankChoose(true);
        }
        document.getElementById("bank").style.visibility = "hidden";
    }

    return (
        <div className='inputPhone'>
            <div className="base-input">
                <div>
                    <span style={{ color: isFocused  ? '#386AB5' : 'black'}} className='base-input__discription'>Введите номер телефона, счета, карты, имя ...</span>
                    <div>
                        <InputMask 
                            id="phoneNumber"
                            autoFocus
                            onFocus={()=> setFocus(true)} 
                            onBlur={()=> setFocus(false)} 
                            className='base-input__input' 
                            placeholder='введите номер'
                            mask='+7 999 999 99 99'
                            value={state.phoneNumber}
                            onChange={handlePhoneNumber}
                            />
                    </div>
                </div>
                <img 
                    className='base-input__close' 
                    src={CloseImg} 
                    alt="" 
                    onClick={erase}
                    />
            </div>
            {
                isRecieverSearched && wasRequest == 2? (
                <div style={{ display: isNameReceived ? 'block' : 'none'}} className='animation'>
                    <div className='receiver'>
                        <h1 className='receiver__title'>Имя получателя</h1>
                        {isBankChoosed ? (<span className='receiver__name'>{receiver.shortName}</span>) : (<span className='receiver__name'>Выберите банк</span>)}
                        
                    </div>
                </div>
            ) : (null)
            }
            
            {isBankChoosed ? (
                <div style={{ display: isNameReceived ? 'flex' : 'none'}} 
                    className='choose-bank'
                    onClick={goBanks}
                    >
                <div className="eurasian-image"></div>
                <h1 className='choise'>Евразийский банк</h1>
                <img  src={OpenMore} alt=""/>
                </div>
            ) : (
                <div style={{ display: isNameReceived ? 'flex' : 'none'}} 
                    className='choose-bank'
                    onClick={goBanks}
                    >
                <h1 className='choise'>Выберите банк получателя</h1>
                <img  src={OpenMore} alt=""/>
                </div>
            )}
            <div className='earlier' style={{ display: isNameReceived ? 'none' : 'flex'}}>
                <span className='earlier-title'>Рание переводы:</span>
                <div className='card-sdadad'>
                    <div className='icon'>A</div>
                    <div className='content'>
                        <span className='name'>Алена</span>
                        <span className='phone'>+7 707 537 33 59</span>
                    </div>
                </div>
            </div>
            {
                isBankChoosed && isRecieverSearched ? (
                    <div сlassName = "nextButtonWrapper"><button 
                    style={{width: '95%', borderRadius:'10px', height: '52px', backgroundColor: '#29313A', color: 'white', textAlign: 'center', fontWeight: '600', fontFamily: 'SF Pro Display', fontSize: '16px', position: 'absolute', bottom: '50px'}}
                    onClick = {goToTransfer}
                    >Продолжить</button></div>
                ):(
                    null
                )
            }
            
            {
                !isRecieverSearched && wasRequest == 1 ? (
                    <div className='ml-4 mt-2 w-full text-red-600'>
                        Пользователь не найден   
                    </div>
                ): (null)
            }
            <div className="banks" id="bank">
                <div className="banks-wrapper">
                    <div className="content-wrapper">
                        <header className="banks__header" onClick={close}>
                            <img src={CloseBanks} alt=""/>
                        </header>
                        <h1>Выберите банк получателя</h1>
                        <h3>Банки</h3>
                        <div className="banks-item-wrapper">
                            <div className="bank-item" onClick={() => chooseBank(1)}>
                                <div className="eurasian-image"></div>
                                <div className="bank-title">Евразийский банк</div>
                            </div>
                            <div className="bank-item" onClick={() => chooseBank(2)}>
                                <div className="bcc-image"></div>
                                <div className="bank-title">Банк ЦентрКредит</div>
                            </div>
                            <div className="bank-item" onClick={() => chooseBank(3)}>
                                <div className="btc-image"></div>
                                <div className="bank-title">BTS Digital</div>
                            </div>
                            <div className="bank-item" onClick={() => chooseBank(4)}>
                                <div className="senim-image"></div>
                                <div className="bank-title">Senim</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}