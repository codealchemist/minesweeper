import React from 'reactn'
import { MineBox, DoomMine } from 'elements'
import { FaBomb } from 'react-icons/fa'

const Mine = ({ show, selectedMode }) => {
  return (
    <>
      {selectedMode < 3 && (
        <MineBox show={show}>
          <FaBomb />
        </MineBox>
      )}

      {selectedMode >= 3 && <DoomMine show={show} />}
    </>
  )
}

export default Mine
