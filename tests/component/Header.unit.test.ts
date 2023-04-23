import { render, screen } from '@testing-library/vue'
import { describe, expect } from 'vitest'
import Header from '~/components/Header.vue'

describe('Header', () => {
  test('should render correctly', () => {
    const title = 'Tasks'
    render(Header, {
      props: {
        title
      }
    })

    expect(screen.getByRole('img')).toBeVisible()

    const header = screen.getByRole('heading')
    expect(header).toBeVisible()
    expect(header).toContainHTML(title)
  })
})