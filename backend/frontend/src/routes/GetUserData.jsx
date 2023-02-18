import { useParams, useSearchParams } from "react-router-dom";
import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function GetUserData() {
  const navigateTo = useNavigate();
  const params = useParams();
  useEffect( ()=>{
    goToMaingPage();
  },[]);
  const goToMaingPage = () =>{
    window.localStorage.setItem("phone_number", params.phone_number)
    navigateTo('/');
  }
  return (
    <div>
    </div>
  )
}