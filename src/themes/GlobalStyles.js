import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
  
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    align-items: flex-start;
    background: ${({ theme }) => theme.background100};
    color: ${({ theme }) => theme.foreground100};
    display: flex;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    height: 100vh;
    justify-content: center;
    text-rendering: optimizeLegibility;
  }

  h1 {
    margin: 0;
  }

  h2 {
    margin: 0;
    color: ${({ theme }) => theme.foreground300};
  }

  h3 {
    margin: 0;
    color: ${({ theme }) => theme.foreground300};
    padding: 0.5rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.background50};
  }

  input {
    color: ${({ theme }) => theme.foreground100} !important;
  }

  a {
    color: ${({ theme }) => theme.highlight100};
    text-decoration: none;
  }

  .MuiFormLabel-root {
    color: ${({ theme }) => theme.foreground300} !important;
  }

  .MuiPaper-root {
    background: ${({ theme }) => theme.background100} !important;
  }

  label.Mui-focused {
    color: ${({ theme }) => theme.highlight50};
  }

  .MuiInput-underline:before {
    border-bottom-color: ${({ theme }) => theme.foreground300} !important;
  }

  .MuiInput-underline:before {
    border-bottom-color: ${({ theme }) => theme.background50};
  }

  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom-color: ${({ theme }) => theme.highlight100};
  }

  .MuiCircularProgress-colorPrimary {
    color: ${({ theme }) => theme.highlight200};
  }

  .MuiAlert-standardInfo {
    color: ${({ theme }) => theme.foreground50};
  }

  .MuiAlert-standardError {
    color: ${({ theme }) => theme.foreground100};
  }

  .MuiAlert-root {
    background-color: ${({ theme }) => theme.background300} !important;
  }

  .MuiChip-root {
    color: ${({ theme }) => theme.foreground100} !important;
    background-color: ${({ theme }) => theme.background200} !important;
    width: 4.5rem;
    margin: 0 0.2rem;
    display: flex !important;
    justify-content: flex-start !important;
    padding: 0 0.3rem !important;

    &.large {
      width: 6rem;
    }

    svg {
      color: ${({ theme }) => theme.foreground300} !important;
    }

    rect {
      stroke: ${({ theme }) => theme.foreground300} !important;
    }
  }

  .MuiInputBase-root {
    width: 100%;
    color: ${({ theme }) => theme.foreground100} !important;

    svg {
      fill: ${({ theme }) => theme.foreground100} !important;
    }
  }

  .MuiPaper-root {
    color: ${({ theme }) => theme.foreground200} !important;
  }

  .MuiInput-underline:after {
    border-bottom: 2px solid ${({ theme }) => theme.highlight200};
  }

  .MuiSelect-select:focus {
    background-color: ${({ theme }) => theme.background100} !important;
  }

  @keyframes pulse {
    0% {
      background-color: ${({ theme }) => theme.highlight200};
    }
    100% {
      background-color: ${({ theme }) => theme.background200};
    }
  }

  @keyframes detonation {
    0% {
      filter: blur(1px) brightness(2);
    }
    100% {
      filter: blur(0) brightness(1);
    }
  }
`

export default GlobalStyles
