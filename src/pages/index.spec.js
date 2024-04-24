import { render, waitFor } from "@testing-library/react"
import MockAdapter from 'axios-mock-adapter'
import Home from "./index"
import axios from "axios"
import { useSession } from "next-auth/react"

//instanciando e mockando um novo MockAdapter com o axios
const mockAxios = new MockAdapter(axios)

//criando mock do useSession utilizando a função fake do jest e retornando dados de sessão simulados
jest.mock('next-auth/react', () => {
    return {
        useSession: jest.fn(() => ({
            data: { user: {name: "Matheus", email: "amonmatheus757@gmail.com"} }
        }))
    }
})

describe('Home page', () => {
    beforeEach(() => {
        mockAxios.reset()
    })

    it('should contains table with bookings', async() => {
        //useSession mockado com o valor da sessão
        useSession.mockReturnValueOnce({
            data: { user: {name: "Matheus", email: "amonmatheus757@gmail.com"} }
        })

        const bookingsData = [
            {id: 1, guestName: 'Lívia', roomId: '104', checkInDate: '2024/04/20', checkOutDate: '2024/04/24'},
        ]

        //interceptando chamadas GET e retornando os valores que configurei
        mockAxios.onGet('/bookings').reply(200, { bookings: bookingsData })

        const { getByText, debug } = render(
            <Home />
        )

        await waitFor(() => {
            expect(getByText('Matheus')).toBeInTheDocument()
            expect(getByText('104')).toBeInTheDocument()
            expect(getByText('20/04/2024')).toBeInTheDocument()
            expect(getByText('24/04/2024')).toBeInTheDocument()
        })    
        
        // debug()
    })
})