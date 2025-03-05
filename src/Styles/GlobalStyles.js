import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.palette.primario.main};
    color: ${({ theme }) => theme.palette.secundario.main};
    font-family: "Poppins", sans-serif;
    height: 100%;
  }

  html {
    height: 100%;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
  }

  h1 {
    font-family: ${({ theme }) => theme.typography.h1.fontFamily};
    font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
    font-style: ${({ theme }) => theme.typography.h1.fontStyle};
    font-size: ${({ theme }) => theme.typography.h1.fontSize};
  }

  h2 {
    font-family: ${({ theme }) => theme.typography.h2.fontFamily};
    font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
    font-style: ${({ theme }) => theme.typography.h2.fontStyle};
    font-size: ${({ theme }) => theme.typography.h2.fontSize};
  }

  h3 {
    font-family: ${({ theme }) => theme.typography.h3.fontFamily};
    font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
    font-size: ${({ theme }) => theme.typography.h3.fontSize};
  }

  h4 {
    font-family: ${({ theme }) => theme.typography.h4.fontFamily};
    font-weight: ${({ theme }) => theme.typography.h4.fontWeight};
    font-size: ${({ theme }) => theme.typography.h4.fontSize};
  }

  h5 {
    font-family: ${({ theme }) => theme.typography.h5.fontFamily};
    font-weight: ${({ theme }) => theme.typography.h5.fontWeight};
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
  }

  h6 {
    font-family: ${({ theme }) => theme.typography.h6.fontFamily};
    font-weight: ${({ theme }) => theme.typography.h6.fontWeight};
    font-size: ${({ theme }) => theme.typography.h6.fontSize};
  }

  button {
    font-family: ${({ theme }) => theme.typography.button.fontFamily};
    font-weight: ${({ theme }) => theme.typography.button.fontWeight};
    font-size: ${({ theme }) => theme.typography.button.fontSize};
    background-color: ${({ theme }) => theme.palette.botones.activo};
    border: none;
    color: #FFFFFF;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.palette.botones.hovered};
    }

    &:active {
      background-color: ${({ theme }) => theme.palette.botones.presionado};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.palette.botones.inactivo};
      cursor: not-allowed;
    }
  }
`;

export default GlobalStyles;
