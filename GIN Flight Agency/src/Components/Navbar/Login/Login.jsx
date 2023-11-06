/* eslint-disable react/prop-types */
import 'antd/dist/reset.css';

import React, { useState } from 'react';

import {
  Form,
  Input,
  Modal,
} from 'antd';

class Login extends React.Component {
    
    render(){
        const formItemLayout = {
          labelCol: {
            xs: {
              span: 24,
            },
            sm: {
              span: 8,
            },
          },
          wrapperCol: {
            xs: {
              span: 24,
            },
            sm: {
              span: 16,
            },
          },
        };
        const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
          const [form] = Form.useForm();
          const onFinish = (values) => {
            console.log('Received values of form: ', values);
          };//This is where the data gets transferred.
        
          return (
            <Modal
            visible={visible}
            title="Log In"
            okText="Log In"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                  form.resetFields();
                  onCreate(values);
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}
          >
            <Form
              {...formItemLayout}
              form={form}
              name="login"
              onFinish={onFinish}
              scrollToFirstError
            >
            <Form.Item
                name="username"
                label={
                  <span>
                    Username&nbsp;
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: 'Please input a username.',
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password/>
              </Form.Item>
            </Form>
            </Modal>
          );
        };
        
        const CollectionsPage = () => {
          const [visible, setVisible] = useState(false);
          
          const onCreate = (values) => {
            console.log('Received values of form: ', values);
            fetch("http://127.0.0.1:8000/api/getuser" + "?username=" + values.username).then((response) => response.json()).then((data) => {
              if (data.username === values.username) {
                localStorage.setItem("authenticated", true);
                localStorage.setItem("owner", data.username);
                if(data.is_staff == true){
                  localStorage.setItem("is_admin", true);
                  console.log("Admin Authenticated")
                  window.location.href="/admin"
                }else{
                  console.log("Authenticated")
                  localStorage.setItem("is_admin", false);
                  window.location.reload(true)
                }
              }
            });
            
            setVisible(false);
          };
        
          return (
            <div >
              <button className = 'btn register'
                type="primary"
                onClick={() => {
                  setVisible(true);
                }}
              >
                Log In
              </button>
              <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                  setVisible(false);
                }}
              />
            </div>
          );
        };

    return (
            <div>
             <CollectionsPage />
            </div>
    );
  }
  }
  export default Login;