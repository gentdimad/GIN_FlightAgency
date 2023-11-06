import 'aos/dist/aos.css';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Button,
  Input,
  Modal,
  Space,
  Table,
} from 'antd';
import Aos from 'aos';
import Highlighter from 'react-highlight-words';

import { SearchOutlined } from '@ant-design/icons';

import OwnTable from './OwnTable/OwnTable';

const UserTable = () => {
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

  const [users, setUsers] = useState([])
    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        fetch("http://127.0.0.1:8000/api/getusers").then((response) => response.json()).then((data) => {
              console.log(data);
              setUsers(data);
    })
    }


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (
    selectedKeys,
    confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handleOpenTable = (value) => {
    localStorage.setItem("userTable", value);
    console.log(value);
    
    return(
      <Modal visible='true' title="Modal">

      </Modal>
    )
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys)[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: '35%',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      width: '20%',
      render: (text, record)=><div onMouseOver={()=> handleOpenTable(record.username)}><OwnTable/></div>
    }
  ];

  return (
    <>
    <div className="usertable container">
        <div data-aos='fade-up' data-aos-duration='1500' className="head">
          <h1>Users</h1>
        </div>
      <div data-aos='fade-up' data-aos-duration='1500' className="tableDiv container">
         <Table columns={columns} dataSource={users} pagination = {{pageSize:5}}/>
      </div>
    </div>
    
    </>
    );
};

export default UserTable;