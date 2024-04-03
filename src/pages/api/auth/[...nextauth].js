import axios from "axios"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const options = {
    pages: {
        error: "/auth/signin?i=1"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "example@email.com"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, res) {
                try{
                    const { data } = await axios.post("http://localhost:3333/api/auth/login", {
                        email: credentials.email,
                        password: credentials.password
                    })

                    if(data.user){
                        const user = data.user

                        return user
                    } else throw "Erro ao efetuar login!"
                } catch(error){
                    throw error.message
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
}

export default (req, res) => NextAuth(req, res, options)