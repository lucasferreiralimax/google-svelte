import { render } from '@testing-library/svelte'

import App from './App.svelte'

describe("Should render App", () => {
  it('renders components', () => {
    const { getByTestId } = render(App)

    expect(getByTestId('app-container')).toBeInTheDocument()
    expect(getByTestId('app-nav')).toBeInTheDocument()
    expect(getByTestId('app-footer')).toBeInTheDocument()
  })
})
