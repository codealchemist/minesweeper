import styled from 'styled-components'

export const Page = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 3rem);
  flex-direction: column;
`

export const Sidebar = styled.div`
  width: 20vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  ${({ theme }) => `
    background: ${theme.background300};
  `}
`

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: pointer;

  span {
    padding: 0 0.5rem;
  }

  ${({ theme, selected }) => {
    let output = `
      background: ${theme.background200};
      border-bottom: 1px solid ${theme.background300};

      :hover {
        background: ${theme.background100};
      }
    `

    if (selected) output += `background: ${theme.background100}`
    return output
  }}
`

export const GameBoard = styled.div`
  display: grid;
  padding: 0.5rem;

  ${({ theme, rows, cols, width, locked }) => {
    let output = `
      width: calc(${width}px - 2rem);
      height: calc(${width}px - 2rem);
      background: ${theme.background300};
      border: 1px solid ${theme.background100};
      grid-template-rows: repeat(${rows}, 1fr);
      grid-template-columns: repeat(${cols}, 1fr);
    `
    if (locked) output += 'pointer-events: none;'
    return output
  }}
`

export const TileBox = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: absolute;
  font-size: 150%;
  transition: all 1s ease;

  p {
    margin: 0;
    padding: 0 5%;
  }

  i {
    font-style: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
  }

  svg {
    position: absolute;
    top: 10%;
    right: 10%;
  }

  :hover {
    opacity: 0.5;
  }

  ${({ theme, revealed, selectedMode, detonated, highlighted }) => {
    let output = `
      background: ${theme.background200};
      border: 1px solid ${theme.background300};

      p {
        color: ${theme.background300};
      }

      i {
        color: ${theme.highlightAlt300};
      }

      svg {
        fill: ${theme.highlightAlt300};
      }
    `

    if (revealed)
      output += `
      background: ${theme.background100};
      :hover {
        opacity: 1;
      }
    `
    if (selectedMode === 1) output += 'font-size: 100%;'
    if (selectedMode === 2) output += 'font-size: 60%;'
    if (selectedMode >= 3) output += 'font-size: 30%;'
    if (detonated)
      output += `
      background: rgba(255,150,150,0.3);
      animation: detonation 0.5s ease;
    `
    if (highlighted) output += 'animation: pulse 0.5s ease;'
    return output
  }}
`

export const MineBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 200%;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease;

  svg {
    position: relative;
    top: 0;
    right: 0;
  }

  ${({ show }) => {
    let output = ''
    if (show)
      output += `
      opacity: 1;
      visibility: visible;
    `
    return output
  }}
`

export const Modal = styled.div`
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
  transition: all 0.5s ease;
  opacity: 0;
  visibility: hidden;

  > div {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  ${({ show }) => {
    let output = ''
    if (show)
      output += `
        opacity: 1;
        visibility: visible;
      `
    return output
  }}
`

export const Spacer = styled.div`
  padding: 1rem;

  ${({ size }) => {
    let output = ''
    if (size) output += `padding: ${size}rem;`
    return output
  }}
`
