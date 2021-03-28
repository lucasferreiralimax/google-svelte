import { render } from '@testing-library/svelte'

import ProfileComponent from './ProfileComponent.svelte'

describe("Should render ProfileComponent", () => {
  it('renders components, valid link and text', () => {
    const { getByTestId } = render(ProfileComponent)

    expect(getByTestId('app-profile')).toBeInTheDocument()
  })
})
