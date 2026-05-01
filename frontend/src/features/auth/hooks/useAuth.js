import { useContext, useEffect } from "react";
import { AuthContext} from "../authContext";
import { login, register, logout, getMe } from "../services/auth.api";



export const useAuth =() => {
    const context = useContext(AuthContext)
    const {user,setUser,loading,setLoading} = context

    const handleLogin = async({email, password}) => {
        setLoading(true)
        try{
            const data = await login({email,password})
            const user = data?.user ?? null
            setUser(user)
            return user
        }catch(err){
            console.log(err)
            return null
        }finally{
            setLoading(false)
        }
    }

    const handleRegister = async({email,username,password}) => {
        setLoading(true)
        try{
            const data = await register({email,username,password})
            const user = data?.user ?? null
            setUser(user)
            return user
        }catch(err){
            console.log(err)
            return null
        }finally{
            setLoading(false)
        }
    }

    const handleLogout = async() => {
        setLoading(true)
        try{
        await logout()
        setUser(null)
        }catch(err){
            console.log(err)
        }finally{
        setLoading(false)
        }
    }

    useEffect(() => {
        const getAndSetUser = async() => {
            try{
                const userData = await getMe()
                if(userData?.user){
                    setUser(userData.user)
                }else{
                    console.warn("No user data returned from getMe()")
                    setUser(null)
                }
            }catch(err){
                console.warn("Auth check failed:", err.response?.status, err.message)
                setUser(null)
            }finally{
                setLoading(false)}
        }
        getAndSetUser()
    } ,[setLoading, setUser])

    return {user, loading, handleRegister, handleLogin, handleLogout}
}