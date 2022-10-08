import React, { useEffect } from 'react'

function LoginSuccess() {
    useEffect(() => {
        setTimeout(() => {
            window.close()
        },1000)
    },[])


  return (
    <h3>Thanks for loggin in</h3>
  )
}

export default LoginSuccess