import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { FaPlay } from 'react-icons/fa'
import { MdSettings } from 'react-icons/md'
import { AiOutlineHistory } from 'react-icons/ai'
import { NavItem } from 'elements'

const PageNav = ({ width }) => {
  const location = useLocation()
  const defaultMenu = 'play'
  const [current, setCurrent] = useState(defaultMenu)

  useEffect(() => {
    setCurrent(location.pathname || defaultMenu)
  }, [location])

  return (
    <>
      <Link to="/">
        <NavItem selected={current === '/'}>
          <FaPlay />
          {isWidthUp('md', width) && <span>Play</span>}
        </NavItem>
      </Link>

      <Link to="/setup">
        <NavItem selected={current === '/setup'}>
          <MdSettings />
          {isWidthUp('md', width) && <span>Setup</span>}
        </NavItem>
      </Link>

      <Link to="/history">
        <NavItem selected={current === '/history'}>
          <AiOutlineHistory />
          {isWidthUp('md', width) && <span>History</span>}
        </NavItem>
      </Link>
    </>
  )
}

export default withWidth()(PageNav)
