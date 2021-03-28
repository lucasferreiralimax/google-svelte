import { render } from '@testing-library/svelte'

import Keyboard from './Keyboard.svelte'

describe("Should render Keyboard", () => {
  it('renders components, valid link and text', () => {
    const { getByTestId } = render(Keyboard)

    expect(getByTestId('app-keyboard')).toBeInTheDocument()
  })
})
