import { render } from '@testing-library/svelte'

import Voice from './Voice.svelte'

describe("Should render Voice", () => {
  it('renders components, valid link and text', () => {
    const { getByTestId } = render(Voice)

    expect(getByTestId('app-voice')).toBeInTheDocument()
  })
})
