import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ModalWrapper = styled.div`
  position: absolute;
  background: ${props => props.theme["color-bg-backdrop"]};
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: 150ms ${fadeIn} ease-out;
`;

export default ({ children }) => {
  const modalRoot = document.querySelector('#modal-root');

  return (
    ReactDOM.createPortal(<ModalWrapper>{children}</ModalWrapper>, modalRoot)
  )
};