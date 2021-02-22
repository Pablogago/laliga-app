import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { handleReceiveUsers } from '../actions/users';
import UserModal from './UserModal';
import TableNavigation from './TableNavigation';

function Table() {
  const dispatch = useDispatch();
  const usersData = useSelector(state => state.users);

  const [immutableRows, setImmutableRows] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);

  const [selectedRows, setSelectedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [clickedRow, setClickedRow] = useState(null);

  useEffect(() => {
    dispatch(handleReceiveUsers(selectedPage));
  }, []);

  useEffect(() => {
    if (usersData.data) {
      setImmutableRows(prevState => {
        const ids = usersData.data.map(u => u.id);
        const deletedItem = prevState.length > usersData.data.length;
        const updatedItem = Boolean(prevState.length && prevState.every(item => ids.includes(item.id)));
        if (updatedItem || deletedItem) {
          return usersData.data.slice();
        }
        return [...prevState, ...usersData.data];
      });
      setTotalPages(usersData["total_pages"]);
      setRowsPerPage(usersData["per_page"]);
    }
  }, [usersData]);

  useEffect(() => {
    if (!immutableRows.length) return;
    const from = (selectedPage - 1) * rowsPerPage;
    const to = selectedPage * rowsPerPage;
    const sliced = immutableRows.slice(from, to);
    if (sliced.length) {
      setSelectedRows(formatDataTable(sliced));
    } else {
      dispatch(handleReceiveUsers(selectedPage));
    }
  }, [selectedPage, immutableRows]);


  if (!immutableRows.length) {
    return (<h1>Loading...</h1>)
  }

  const onClickRow = (row) => {
    setClickedRow(row);
    setShowModal(true);
  }

  const tableNavProps = {
    setSelectedPage, rowsPerPage, selectedPage,
    totalPages, totalRows: immutableRows.length
  };

  const columnsEl = ['#', 'avatar', 'email', 'first name', 'last name'];
  const columns = columnsEl.map(c => <Column key={c}>{capitalize(c)}</Column>);

  return (
    <React.Fragment>
      <Wrapper>
        <Head>
          <Row>
            {columns}
          </Row>
        </Head>
        <Body>
          {selectedRows.map((r, i) => {
            return (<Row onClick={() => onClickRow(r)} key={`${r}-${i}`}>
              {columnsEl.map((columnKey, index) => {
                let text = r[columnKey];
                if (columnKey === '#') {
                  text = '#' + String(text).slice(0);
                }
                return (
                  <Td key={`${text}-${index}`}>
                    {columnKey === 'avatar' ? <Avatar src={text} /> : text}
                  </Td>
                )
              })}
            </Row>)
          })}
        </Body>
      </Wrapper>
      <TableNavigation {...tableNavProps} />
      {showModal && <UserModal
        type="update"
        title="Update client"
        user={clickedRow}
        closeModal={() => setShowModal(false)} />}
    </React.Fragment>
  );
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDataTable(data) {
  const renamedKeys = {
    'id': '#',
    'avatar': 'avatar',
    'email': 'email',
    'first_name': 'first name',
    'last_name': 'last name'
  }
  return data.map(obj => renameObjKeys(obj, renamedKeys));
}

function renameObjKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

const Wrapper = styled.table`
  table-layout: fixed;
  font-size: 16px;
  border-collapse: separate;
  border-spacing: 0;
  padding: 35px;
  overflow-x: auto;
`;

const Head = styled.thead`
  background: ${props => props.theme["color-bg-secondary"]};
  & tr {
    color: ${props => props.theme["color-text-tertiary"]};
    white-space: nowrap;
  }
`;

const Row = styled.tr`
  height: 52px;
  & th:first-child {
    text-align: left;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    width: 20px;
  }
  & th:nth-child(3) {
    width: 225px;
  }
  & th:nth-child(4) {
    text-align: right;
  }
  & th:last-child {
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    text-align: right;
  }
  & td:last-child {
    text-align: right;
  }
  & td:nth-child(4) {
    text-align: right;
  }
`;

const Column = styled.th`
  padding: 0 20px;
  font-family: 'CoreSansBold';
  text-align: left;
`;

const Body = styled.tbody`
  
  & tr {
    cursor: pointer;
  }
  & tr:hover {
    background: ${props => props.theme["color-bg-tertiary"]};
  }
`;

const Td = styled.td`
  padding: 8px 20px;
`;

const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 100%;
  object-fit: cover;
`;

export default Table;