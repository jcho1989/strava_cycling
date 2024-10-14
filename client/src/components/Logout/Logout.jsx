import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import { ROUTE_URLS } from "../../constants/routes";
import useAuthStore from "../../store/useAuthStore";

export default function Logout() {
  
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  
  useEffect(() => {
    logout();
    navigate(ROUTE_URLS.LOGIN);
  }, [logout, navigate])

}