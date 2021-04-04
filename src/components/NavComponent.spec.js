import { render } from '@testing-library/svelte'

import NavComponent from './NavComponent.svelte'

describe("Should render NavComponent", () => {
  it('renders component', () => {
    const { getByTestId } = render(NavComponent)

    expect(getByTestId('app-nav')).toBeInTheDocument()
  })
})
