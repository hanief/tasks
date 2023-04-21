import { render, screen } from '@testing-library/vue'
import Header from '~/components/Header.vue'

describe('Header', () => {
  test('should render', () => {
    render(Header, {
      props: {
        title: 'Tasks',
      }
    })
    const header = screen.getByRole('heading', { name: 'Tasks' })
    expect(header).toBeInTheDocument()
    expect(header).toBeVisible()
  })
})