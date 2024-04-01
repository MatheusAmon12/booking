import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/router" 

const CheckAuth = ({ Component, pageProps }) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if(status === "loading") return
        if(!session || status === "unauthenticated"){
            router.push("/auth/signin")
        }
    }, [session, status])

    if(session) return <Component {...pageProps} />
    
    return "Loading..."
}

export default CheckAuth