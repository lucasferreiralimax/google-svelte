import { render } from '@testing-library/svelte'

import Login from './Login.svelte'

describe("Should render Login", () => {
  it('rendered text in Login', () => {
    const { getByText, getByLabelText } = render(Login)

    expect(getByText('Fazer login')).toBeInTheDocument()
    expect(getByText('Use sua Conta do Google')).toBeInTheDocument()
    expect(getByLabelText('Email ou telefone')).toBeInTheDocument()
    expect(getByText('Criar conta')).toBeInTheDocument()
    expect(getByText('Próxima')).toBeInTheDocument()
    expect(getByText('Esqueceu seu e-mail?').href).toBe("https://github.com/lucasferreiralimax")
    expect(getByText('Saiba mais').href).toBe("https://github.com/lucasferreiralimax")
  })
})
