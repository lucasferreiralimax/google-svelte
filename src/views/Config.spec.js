import { render } from '@testing-library/svelte'

import Config from './Config.svelte'

describe("Should render Config", () => {
  it('renders components, valid link and text', () => {
    const { getByTestId, getByText } = render(Config)

    const titleConfig = getByText(/Configurações/i)
    const linkGithub = getByText(/Estude o código fonte desse projeto no Github acesse aqui./i)

    expect(titleConfig).toHaveTextContent('Configurações')
    expect(linkGithub).toHaveTextContent('Estude o código fonte desse projeto no Github acesse aqui.')

    expect(getByTestId('app-darkmode')).toBeInTheDocument()
  })
})
