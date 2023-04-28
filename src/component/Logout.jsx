import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

function Logout() {
    const navigate  = useNavigate ();
    useEffect(() => {
      sessionStorage.removeItem("loginUsername")
      const txtmsg = "ログアウトできました"
      navigate('/login', { state:  txtmsg  });
    }, [1])
    
  return (
    <div>Logout OK</div>
  )
}

export default Logout