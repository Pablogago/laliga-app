import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch } from 'react-redux';
import { handleAddUser, handleUpdateUser, handleDeleteUser } from '../actions/users';
import { ReactComponent as CancelIcon } from '../assets/cancel.svg';
import Modal from '../hooks/useModal/index';

function UserModal(props) {
  const dispatch = useDispatch();
  const { title, closeModal, type } = props;
  const modalNode = useRef();
  const emailInputNode = useRef();
  const [firstName, setFirstName] = useState(type === 'update' ? props.user["first name"] : '');
  const [lastName, setLastName] = useState(type === 'update' ? props.user["last name"] : '');
  const [email, setEmail] = useState(type === 'update' ? props.user["email"] : '');

  useEffect(() => {
    emailInputNode.current.select();
  }, []);

  const handleForm = (evt) => {
    evt.preventDefault();
    if (type === 'update') {
      const updatedUser = {
        ['first_name']: firstName,
        ['last_name']: lastName,
        ['email']: email,
        ['avatar']: props.user.avatar,
        ['id']: props.user['#']
      }
      dispatch(handleUpdateUser({...updatedUser}));
      closeModal();
    } else if (type === 'add') {
      const randomAvatarIdx = Math.floor(Math.random() * 12) + 1;
      const addedUser = {
        'first_name': firstName,
        'last_name': lastName,
        'email': email,
        'avatar': `https://reqres.in/img/faces/${randomAvatarIdx}-image.jpg`
      }
      dispatch(handleAddUser({...addedUser}));
      closeModal();
    }
  }

  const onCloseButton = () => {
    const animation = modalNode.current.animate([
      { transform: 'scale(1)', opacity: 1},
      { transform: 'scale(0.95)', opacity: 0},
    ], { duration: 100 });
    animation.onfinish = _ => closeModal();
  }

  const onClickDelete = () => {
    dispatch(handleDeleteUser(props.user['#']))
  }

  return (
    <Modal>
      <ModalContent ref={modalNode}>
        <Title>{ title }</Title>
        <Form onSubmit={handleForm}>
          <label htmlFor="email">Email</label>
          <input
            ref={emailInputNode} value={email} id="email" name="email"
            placeholder="e.g. bill.howards@reqres.in"
            required onChange={({ target }) => setEmail(target.value)}
            autoCapitalize="off" tabIndex="0" type="email"
          />
          <label htmlFor="email">First name</label>
          <input
            value={firstName} tabIndex="0" required placeholder="e.g. Bill"
            onChange={({ target }) => setFirstName(target.value)}
            type="text"
          />
          <label htmlFor="email">Last name</label>
          <input
            value={lastName} tabIndex="0" required placeholder="e.g. Howards"
            onChange={({ target }) => setLastName(target.value)}
            type="text"
          />
          <div>
            <Button>{title.split(' ')[0]}</Button>
            {type === 'update' && <DeleteButton
              onClick={() => onClickDelete()}
              className="delete">Delete user</DeleteButton>}
          </div>
        </Form>
        <CloseButton onClick={onCloseButton}>
          <CancelIcon title="Go back" width="20" height="20"/>
        </CloseButton>
      </ModalContent>
    </Modal>
  )
}

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const ModalContent = styled.div`
  color: ${props => props.theme["color-text-primary"]};
  background: ${props => props.theme["color-bg-doc"]};
  width: 80vw;
  max-width: 575px;
  height: 450px;
  border-radius: 6px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 30px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgb(0 0 0 / 18%);
  animation: 125ms ${slideIn} ease-out;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 20px;
`;

const Title = styled.div`
  font-family: 'CoreSansBold';
  font-size: 24px;
`;
const Button = styled.button`
  width: 150px;
  height: 40px;
  font-size: 18px;
  font-family: 'CoreSansBold';
  border-radius: 4px;
  cursor: pointer;
  background: ${props => props.theme["color-bg-doc-inverse"]};
  color: ${props => props.theme["color-text-inverse"]};
  box-shadow: inset 0 -2px 1px ${props => props.theme["color-bg-doc-inverse"]}, -2px 3px 2px rgb(0 0 0 / 6%);
  border: 2px solid ${props => props.theme["color-text-tertiary"]};
  &:focus {
    outline-color: #888;
  }
`;

const DeleteButton = styled.button`
  font-size: 18px;
  margin-left: 10px;
  position: absolute;
  bottom: 42px;
  right: 29px;
  color: ${props => props.theme["color-auto-red-5"]};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 32px;
  right: 29px;
  font-size: 16px;
  display: flex;
  padding: 4px;
  fill: ${props => props.theme["color-icon-primary"]};
`;

export default UserModal