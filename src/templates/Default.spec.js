import { fireEvent, render, waitFor } from "@testing-library/react"
import TemplateDefault from "./Default"
import { useSession, signOut } from "next-auth/react"

jest.mock('next-auth/react', () => {
    return {
        useSession: jest.fn(),
        signOut: jest.fn()
    }
})

describe('Template Default', () => {
    beforeEach(() => {
        useSession.mockReturnValueOnce({
            data: {
                user: {
                    name: 'Matheus', 
                    email: 'amonmatheus757@gmail.com',
                }
            }  
        })
    })

    it('should render sidebar correctly', () => {

        const { getByText, getAllByText, debug } = render(<TemplateDefault />)

        //debug()

        expect(getAllByText(/dreamscape/i)).toHaveLength(2)
        expect(getByText(/meu perfil/i)).toBeInTheDocument()
        expect(getByText(/criar reserva/i)).toBeInTheDocument()
        expect(getByText(/listar reservas/i)).toBeInTheDocument()
        expect(getByText(/matheus/i)).toBeInTheDocument()
    })

    it('should call profile page on click in the button profile', async() => {

        const { getByText, getByRole, debug } = render(<TemplateDefault />)

        const profileButton = getByText(/meu perfil/i)

        fireEvent.click(profileButton)

        await waitFor(() => {
            const link = getByRole('link', { name: /meu perfil/i })
            expect(link).toHaveAttribute('href', '/user/profile')
        })
    })

    it('should call create booking page on click in the button create booking', async() => {

        const { getByText, getByRole, debug } = render(<TemplateDefault />)

        const createBookingButton = getByText(/criar reserva/i)

        fireEvent.click(createBookingButton)

        await waitFor(() => {
            const link = getByRole('link', { name: /criar reserva/i })
            expect(link).toHaveAttribute('href', '/user/create-booking')
        })
    })

    it('should call create booking page on click in the button create booking', async() => {

        const { getByText, getByRole, debug } = render(<TemplateDefault />)

        const listButton = getByText(/listar reservas/i)

        fireEvent.click(listButton)

        await waitFor(() => {
            const link = getByRole('link', { name: /listar reservas/i })
            expect(link).toHaveAttribute('href', '/')
        })

        debug()
    })

    it('should sign out on click in the exit button', async() => {
        const { getByText, getByRole, debug } = render(<TemplateDefault />)

        const logoutButton = getByRole('signOutButton')

        fireEvent.click(logoutButton)

        await waitFor(() => expect(signOut).toHaveBeenCalled())
    })
})