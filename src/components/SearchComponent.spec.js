import { render } from '@testing-library/svelte'

import SearchComponent from './SearchComponent.svelte'

describe("Should render SearchComponent", () => {
  it('renders components, valid link and text', () => {
    const { getByTestId } = render(SearchComponent)

    expect(getByTestId('app-search')).toBeInTheDocument()
  })
})
