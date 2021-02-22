import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import HomeBgImg from '../assets/laliga-test.png';
import LogoImg from '../assets/logo.png';
import { Redirect } from 'react-router-dom';
import { login, getUsers } from '../utils/api';
import { setAuthedUser } from '../actions/authedUser';

function Login() {
  const [redirectHome, setRedirectHome] = useState(false);
  const user = useSelector(state => state.authedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    setRedirectHome(Boolean(user));
  }, [user]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (evt) => {
    evt.preventDefault();
    try {
      const user = await login( email, password );
      dispatch(setAuthedUser(user));
    } catch(err) {
      setError(err.message);
    }
  }

  if (redirectHome) {
    return <Redirect to="/"/>;
  }

  return (
    <Main>
      <LeftSection className="left">
        <LeftSectionWrapper>
          <Title>
            Hello, <br />
            Welcome back!
          </Title>
          <Form onSubmit={handleSignIn}>
            <label htmlFor="email">Email</label>
            <Input
              value={email} id="email" name="email" autoFocus
              placeholder="e.g. janet.weaver@reqres.in"
              required onChange={({ target }) => setEmail(target.value)}
              autoCapitalize="off" tabIndex="0" type="email"
            />
            <label htmlFor="email">Password</label>
            <Input
              value={password} tabIndex="0" required placeholder="e.g. •••••••••"
              onChange={({ target }) => setPassword(target.value)}
              type="password" 
            />
            <Button>Sign in</Button>
            {error && <h1>{error}</h1>}
          </Form>
          <Logo src={LogoImg} alt="La Liga logo" />
        </LeftSectionWrapper>
      </LeftSection>
      <RightSection className="right">
        <HomeBg src={HomeBgImg} alt="Home background" />
      </RightSection>
    </Main>
  );
}

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  overflow: hidden;
  background: #fff;
  @media (max-width: 850px) {
    & .left {
      position: absolute;
      background: #fff;
      z-index: 1;
      height: 80vh;
      left: 0;
      right: 0;
    }
    & .right {
      width: 100vw;
    }
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(50px, 0, 0);
  }
  70% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const RightSection = styled.section`
  background: #000;
`;

const Input = styled.input`
  background: #f7f7fa;
  border-color: #eee;
`;

const LeftSection = styled.section``;

const LeftSectionWrapper = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin: 0 auto;
  max-width: 350px;
  padding: 70px 0;
  position: relative;
  animation: 250ms ${fadeIn} ease-out;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  margin: 60px;
  width: 100%;
  max-width: 350px;
`;

const Button = styled.button`
  width: 150px;
  height: 40px;
  font-size: 18px;
  font-family: 'CoreSansBold';
  border-radius: 4px;
  cursor: pointer;
  background: #1c2d2c;
  color: #ffffff;
  box-shadow: inset 0 -2px 1px #000000, -2px 3px 2px rgb(0 0 0 / 6%);
  border: 2px solid #000000;
`;

const Logo = styled.img`
  bottom: 0;
  right: 0;
  margin-top: auto;
  margin-right: auto;
  transform: translate3d(-10px, 70px, 0);
`;

const HomeBg = styled.img`
  filter: contrast(0.75);
  object-fit: cover;
  object-position: left;
  width: 100%;
  height: 100%;
`;

const Title = styled.span`
  font-size: 48px;
  font-family: 'CoreSansBold';
  text-align: center;
`;

export default Login;