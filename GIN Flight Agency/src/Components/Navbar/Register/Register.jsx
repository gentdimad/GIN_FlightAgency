/* eslint-disable react/prop-types */
import 'antd/dist/reset.css';

import React, { useState } from 'react';

import {
  Checkbox,
  Form,
  Input,
  Modal,
  Tooltip,
} from 'antd';

import { QuestionCircleOutlined } from '@ant-design/icons';

class Register extends React.Component {
  
    
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
        const tailFormItemLayout = {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 8,
            },
          },
        };
        const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
          const [form] = Form.useForm();
          const onFinish = (values) => {
            console.log('Received values of form: ', values);
          };
        
          return (
            <Modal
            visible={visible}
            title="Register"
            okText="Register"
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
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
            <Form.Item
                name="username"
                label={
                  <span>
                    Username&nbsp;
                    <Tooltip title="How would you like to be called on the website?">
                      <QuestionCircleOutlined />
                    </Tooltip>
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
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
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
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('The two passwords that you entered do not match!');
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>
              </Form.Item>
            </Form>
            </Modal>
          );
        };
      
     
        
        const CollectionsPage = () => {
          const [visible, setVisible] = useState(false);
        
         
          const onCreate = (values) => {
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
            },
              body: JSON.stringify(values)
            };
            fetch('http://127.0.0.1:8000/api/createuser', requestOptions).then((response)=> response.json()
            ).then((data) => console.log(data));
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
                Register
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
  export default Register;