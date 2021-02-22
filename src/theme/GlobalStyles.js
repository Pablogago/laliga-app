import {  createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme["color-bg-doc"]};
    color: ${({ theme }) => theme["--color-bg-primary"]};
    transition: all 0.50s linear;
  }

  a {
    color: ${({ theme }) => theme["color-text-link"]};
    cursor: pointer;
  }

  label {
    z-index: 1;
    padding-bottom: 3px;
    color: ${({ theme }) => theme["color-text-tertiary"]};
  }

  input {
    margin-bottom: 30px;
    border: 2px solid ${({ theme }) => theme["name"] === 'light' ? '#f3f3f3' : '#394b6d'};
    box-sizing: border-box;
    width: 100%;
    padding: 0 10px;
    background: ${({ theme }) => theme["name"] === 'light' ? '#f7f7f7' : '#c8d3e6'};
    font-size: 14px;
    border-radius: 3px;
    line-height: 3.2;
    height: 44px;
    &::placeholder {
      padding: 2px;
    }
  }

  button {
    cursor: pointer;
    background: inherit;
    border: none;
  }

  button.btn {
    background-color: ${({ theme }) => theme["color-bg-doc-inverse"]};
    color: ${({ theme }) => theme["color-bg-doc-inset"]};
  }
`;