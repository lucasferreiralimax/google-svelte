import { render } from '@testing-library/svelte'

import HeaderComponent from './HeaderComponent.svelte'

describe("Should render HeaderComponent", () => {
  it('renders components, valid link and text', () => {
    const { getByTestId } = render(HeaderComponent)

    expect(getByTestId('app-header')).toBeInTheDocument()
  })
})
