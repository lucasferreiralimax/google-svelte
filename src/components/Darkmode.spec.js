import { render } from '@testing-library/svelte'

import Darkmode from './Darkmode.svelte'

describe("Should render Darkmode", () => {
  it('renders components, valid link and text', () => {
    const { getByTestId } = render(Darkmode)

    expect(getByTestId('app-darkmode')).toBeInTheDocument()
  })
})
