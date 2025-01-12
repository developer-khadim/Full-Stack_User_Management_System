import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setUserData } from '../store/userSlice'
 
const UserProtectWrapper = ({ childern }) => {

    const token = localStorage.getItem('token') 
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    
    useEffect(() => {
     
     if(!token){
        navigate('/signin')
     }
     axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(response => {
        if (response.status === 200) {

           
            dispatch(setUserData({userData: response.data.user}))
            setIsLoading(false)
        }
    })
        .catch(error => {
            localStorage.removeItem('token')
            navigate('/signup')
        })
     

    }, [dispatch, token, navigate])
    
    if(isLoading) {
        return (
            <div className=' h-full flux items-center text-center py-56 '>
                <h1>Loading..</h1>
            </div>
        )
    }
    return <> { childern } </>
    
//  i have to push
}

export default UserProtectWrapper