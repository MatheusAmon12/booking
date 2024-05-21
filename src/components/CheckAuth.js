import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/router"

import BackdropLoading from "./Backdrop"

const  CheckAuth = ({ Component, pageProps }) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if(status === "loading") return
        if(!session || status === "unauthenticated"){
            router.push(`${process.env.NEXT_PUBLIC_SITE_URL}/auth/signin`)
        }
    }, [session, status])

    if(session) return <Component {...pageProps} />
    
    return (
        <BackdropLoading open={true} />
    )
}

export default CheckAuth