import Axios from 'axios'
import { useEffect, useState } from 'react';
const useAuth = () => {
    const [isRegistered, setIsRegistered] = useState(false)
    useEffect(() => {
        async function CheckUserAuthStatus(){
            await Axios.get('http://localhost:5001/user/isRegistered', {withCredentials: true})
            .then((res) => {
                setIsRegistered(res.data.isRegistered)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        CheckUserAuthStatus()
    }, [])

    return isRegistered;
    
}

export default useAuth;