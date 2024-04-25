import mockRouter from 'next-router-mock'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Signup from '../src/pages/auth/signup'
import { Formik } from 'formik'

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

const user = userEvent.setup()

describe('Signup Page', () => {
    it('should contain the inputs form and the submit button', async() => {
        const { getByText, getByRole, debug } = render(<Signup />)

        const nameInput = getByRole('name')
        const emailInput = getByRole('email')
        const passwordInput = getByRole('password')
        const passwordConfirmInput = getByRole('passwordConfirm')
        const button = getByText(/cadastrar/i)

        expect(getByText(/login/i)).toBeInTheDocument()
        expect(nameInput).toBeInTheDocument()
        expect(emailInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(passwordConfirmInput).toBeInTheDocument()
        expect(button).toBeInTheDocument()

    })

    it('should show error validations on submit with empty input', async() => {
        const { getByText, getAllByText,debug } = render(<Signup />)

        const button = getByText(/cadastrar/i)

        fireEvent.click(button)

        //debug()

        await waitFor(() => expect(getAllByText(/campo obrigatório!/i)).toHaveLength(4))
    })
})