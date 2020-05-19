import React from 'react'
import App from 'App'

describe('App', () => {
  it('should render', () => {
    const wrapper = <App />
    expect(wrapper).toMatchSnapshot()
  })
})
