import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleGoogleCallback } from '../store/userSlice'

function TokenHandler() {
      
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()

    useEffect(() => {
       const token =  searchParams.get('token') || ''
       const user = searchParams.get('user')  || ''
       if(token && user) {
          localStorage.setItem('token', token)
          dispatch(handleGoogleCallback({user, token}))
          navigate('/User_dashboard')
       }  else {
           navigate('/signin')
       }
    }, [searchParams, dispatch, navigate])
}

export default TokenHandler