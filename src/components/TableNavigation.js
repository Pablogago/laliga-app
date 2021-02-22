import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as ArrowIcon } from '../assets/arrow.svg';

function TableNavigation(props) {
  const { setSelectedPage, rowsPerPage, selectedPage, totalPages, totalRows } = props;
  return (
    <NavigationWrapper>
      <div>{selectedPage} — {rowsPerPage} of {totalRows}</div>
      <Nav>
        <Button disabled={selectedPage === 1} className="left-arrow" onClick={() => setSelectedPage(prevState => prevState -= 1)}>
          <ArrowIcon title="Previous page" />
        </Button>
        {selectedPage} of {totalPages}
        <Button disabled={selectedPage === totalPages} className="right-arrow" onClick={() => setSelectedPage(prevState => prevState += 1)}>
          <ArrowIcon title="Next page" />
        </Button>
      </Nav>
    </NavigationWrapper>
  )
}

const NavigationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.theme["color-text-primary"]};
  padding: 20px 44px 20px 50px;
  font-size: 18px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: flex-start;
  padding: 5px 10px;
  justify-content: flex-start;
  transition: 155ms opacity ease-out;
  opacity: 1;
  &[disabled] {
    opacity: 0;
  }
  & svg {
    width: 16px;
    height: 16px;
    fill: ${props => props.theme["color-text-primary"]};
  }
  &.right-arrow {
    margin-left: 15px;
    svg {
      transform: rotate(180deg);
    }
  }
  &.left-arrow {
    margin-right: 15px;
  }
`;

export default TableNavigation;