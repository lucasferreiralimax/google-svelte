import { render } from '@testing-library/svelte'

import Home from './Home.svelte'

describe("Should render Home", () => {
  it('renders components', () => {
    const { getByTestId } = render(Home)

    expect(getByTestId('app-profile')).toBeInTheDocument()
    expect(getByTestId('app-header')).toBeInTheDocument()
    expect(getByTestId('app-search')).toBeInTheDocument()
    expect(getByTestId('app-keyboard')).toBeInTheDocument()
    expect(getByTestId('app-voice')).toBeInTheDocument()
  })
})
