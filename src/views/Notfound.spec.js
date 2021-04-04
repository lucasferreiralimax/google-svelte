import { render } from '@testing-library/svelte'

import Notfound from './Notfound.svelte'

describe("Should render Notfound", () => {
  it('renders component, texts and link', () => {
    const { getByTestId } = render(Notfound)

    expect(getByTestId('app-notfound')).toBeInTheDocument()
    expect(getByTestId('link-home').href).toBe("http://localhost/")
  })
})
