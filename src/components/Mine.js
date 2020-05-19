import React from 'reactn'
import { MineBox } from 'elements'
import { FaBomb } from 'react-icons/fa'

const Mine = ({ show, selectedMode }) => {
  return (
    <MineBox show={show}>
      <FaBomb />
    </MineBox>
  )
}

export default Mine
