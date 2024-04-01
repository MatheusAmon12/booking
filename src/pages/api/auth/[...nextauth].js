import axios from "axios"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "example@email.com"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                try{
                    const { data } = await axios.post("http://localhost:3333/api/auth/login", {
                        email: credentials.email,
                        password: credentials.password
                    })
                    console.log("Essa é a resposta da req", data)
                    if(data.user){
                        console.log("Dentro do user", data.user)
                        return data.user
                    } else return null
                } catch(error){
                    console.log("Erro na credentials", error)
                }
            }
        })
    ]
}

export default (req, res) => NextAuth(req, res, options)