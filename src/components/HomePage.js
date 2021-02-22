import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useTheme from '../hooks/useTheme/index.js';
import { logoutUser, handleGetAuthedUser } from '../actions/authedUser';
import { ReactComponent as SignOutIcon } from '../assets/signout.svg';
import { ReactComponent as AddIcon } from '../assets/add.svg';
import { ReactComponent as MenuIcon } from '../assets/menu.svg';
import LogoImg from '../assets/logo.png';
import Table from './Table';
import UserModal from './UserModal';

function HomePage() {
  const dispatch = useDispatch();
  const authedUser = useSelector(state => state.authedUser);
  const [showModal, setShowModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (authedUser.token && !authedUser.data) {
      dispatch(handleGetAuthedUser(authedUser.id));
    }
  }, [authedUser]);

  if (!authedUser.data) {
    return <h1>Loading...</h1>
  }

  const onClickTable = () => {
    if (openMenu) {
      setOpenMenu(false);
    }
  }

  const user = authedUser.data;
  return (
    <Main>
      <Panel className={openMenu ? 'show' : ''}>
        <PanelHeader>
          <Avatar src={user.avatar} alt={user.first_name} />
          <Title>Hi {user.first_name} 👋!</Title>
        </PanelHeader>
        <PanelButtons>
          <ThemeToggle />
          <Button onClick={() => dispatch(logoutUser())}>
            Sign out
            <SignOutIconStyled title="Sign out" width="20" height="20" />
          </Button>
        </PanelButtons>
        <LogoStyled src={LogoImg} />
      </Panel>
      <Content onClick={onClickTable}>
        <ContentWrapper>
          <ContentHeader>
            <ContentHeaderInfo>
              <MenuButton
                onClick={() => setOpenMenu(prevState => !prevState)}>
                  <MenuIcon className="menu" width="20" height="20" title="menu"/>
              </MenuButton>
              <Title>Clients</Title>
            </ContentHeaderInfo>
            <button onClick={_ => setShowModal(true)}>
              <AddIconStyled fill="#7048e5" width="35" height="35" />
            </button>
          </ContentHeader>
          <Table />
        </ContentWrapper>
      </Content>
      {showModal && <UserModal type="add" title="Add client" closeModal={() => setShowModal(false)}/>}
    </Main>
  );
}

function ThemeToggle() {
  const theme = useSelector(state => state.theme);
  const { setMode } = useTheme(); 
  const [active, setActive] = useState(theme.name === 'dark');

  const onClickToggle = () => {
    setActive(prevState => !prevState);
    const name = !active ? 'dark' : 'light';
    setMode({ name });
  }

  return (
    <Button onClick={() => onClickToggle()}>
      {active ? 'Dark' : 'Light'} theme
      <Toggle>
        <ToggleTrackEmoji active={active} className="dark">🌜</ToggleTrackEmoji>
        <ToggleTrackEmoji active={active} className="light">🌞</ToggleTrackEmoji>
        <ToggleThumb className={active ? 'toggleOn' : 'toggleOff'} />
      </Toggle>
    </Button>
  )
}

const Main = styled.main`
  height: 100vh;
  color: ${props => props.theme["color-text-primary"]};
  @media (min-width: 1050px) {
    & {
      display: grid;
      grid-template-columns: minmax(150px, 300px) minmax(auto, auto);
      &.menu {
        opacity: 0;
      }
    }
  }
`;

const slideOut = keyframes`
  0% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  100% {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
`;

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const Panel = styled.section`
  background: ${props => props.theme["color-bg-secondary"]};
  color: ${props => props.theme["color-text-primary"]};
  padding: 40px 25px;
  font-size: 22px;
  position: relative;
  @media (max-width: 1050px) {
    & {
      animation: 250ms ${slideOut} ease-out;
      position: absolute;
      transform: translate3d(-100%, 0, 0);
      height: 100vh;
      width: 250px;
      box-sizing: border-box;
      border-right: 2px solid ${props => props.theme["color-bg-tertiary"]}
    }
    &.show {
      animation: 250ms ${slideIn} ease-out;
      transform: translate3d(0, 0, 0);
    }
  }    
`;

const AddIconStyled = styled(AddIcon)`
  fill: ${props => props.theme["color-auto-purple-6"]};
`;

const SignOutIconStyled = styled(SignOutIcon)`
  fill: ${props => props.theme["color-icon-primary"]};
`;

const PanelHeader = styled.header`
  display: flex;
  align-items: center;
`;

const PanelButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 50px;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 16px;
  margin-bottom: 10px;
  height: 45px;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  
`;

const Avatar = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 100%;
  margin-right: 10px;
`;

const Title = styled.div`
  font-family: 'CoreSansBold';
`;

const Toggle = styled.div`
  font-size: 16px;
  height: 24px;
  background: ${props => props.theme["color-icon-primary"]};
  padding: 2px;
  position: relative;
  width: 50px;
  border-radius: 20px;
  box-sizing: border-box;
`;

const toggleOn = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(25px, 0, 0);
  }
`;

const toggleOff = keyframes`
  0% {
    transform: translate3d(25px, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const ToggleThumb = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 19px;
  top: 2px;
  &.toggleOn {
    animation: ${toggleOn} 0.15s ease-out;
    transform: translate3d(25px, 0, 0);
  }
  &.toggleOff {
    animation: ${toggleOff} 0.15s ease-out;
    transform: translate3d(0, 0, 0);
  }
`;

const LogoStyled = styled.img`
  width: 150px;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  filter: invert(${props => props.theme["name"] === 'light' ? 0 : 1});
`;

const ToggleTrackEmoji = styled.span`
  transition: 150ms opacity;
  position: absolute;
  bottom: 2px;
  &.dark {
    opacity: ${props => props.active ? 1 : 0};
    left: 2px;
  }

  &.light {
    opacity: ${props => props.active ? 0 : 1};
    right: 2px;
  }
`;


// CONTENT STYLES
const Content = styled.section`
  background: ${props => props.theme["color-bg-doc"]};
  font-size: 22px;
  & .menu {
    opacity: 0;
  }
  @media (max-width: 1050px) {
    & .menu {
      fill: ${props => props.theme["color-icon-primary"]};
      opacity: 1;
    }
  }
`;

const ContentHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  & button {
    margin-right: 20px;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  align-items: flex-start;
  grid-template-rows: max-content 525px max-content;
`;

const ContentHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 50px 15px 50px;
  & button {
    display: inline-flex;
    padding: 4px;
  }
`;

const MenuButton = styled.button`
  cursor: pointer;
`;

export default HomePage;
