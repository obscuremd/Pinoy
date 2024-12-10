import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { useClerk } from "@clerk/clerk-react";

interface UserProps {
    userData: User |  undefined
    loading: boolean
}

const UserContext = createContext<UserProps | undefined>(undefined)

export default function UserProvider ({children}:PropsWithChildren){

    const {user} = useClerk()

    const [userData, setUserData] = useState<User>()
    const [loading, setLoading] = useState(false)

    useEffect(()=>{

        const fetchUser =async()=>{
            setLoading(true)
            try {
                const res = await axios.get(`https://pinoy-1lu5.onrender.com/user/email/${user?.emailAddresses[0].emailAddress}`)
                setUserData(res.data)
                console.log(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
            
        }

        fetchUser()
    },[])

    return(
        <UserContext.Provider value={{userData, loading}}>
            {children}
        </UserContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDBUser = ():UserProps=>{
    const context = useContext(UserContext)
    if(!context){
        throw new Error('must be wrapped within user Context')
    }else{
        return context
    }
}