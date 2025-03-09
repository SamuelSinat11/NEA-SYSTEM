import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { request } from '../../util/request';
import { setAccessToken, setRefreshToken, setUser } from '../../util/service';
import { setIsLogin } from '../../util/service';
const { Title } = Typography;

const LoginPage = () => {


  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
  
    const param = { 
      Username: values.Username, // Match API field names (if required)
      Password: values.Password, 
    };
  
    try {
      const res = await request("users/login", "post", param);
  
      console.log("API Response:", res); // Debugging
  
      if (res?.status === 200) { // Ensure successful login
        setUser(res.data.user); 
        setIsLogin(true); 
        setAccessToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);
        window.location.href = "/home";
      } else {
        setMessage(res?.data?.message || "Invalid login credentials");
      }
    } catch (error) {
      console.error("API Request Error:", error);
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="text-center">
          
          <img className='w-40 h-40 mx-auto mb-3' src="./src/assets/nea.png" alt="" />
          <p className="text-gray-500">Please login to your account</p>
        </div>

        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>

          <div className="flex justify-between items-center mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <Form.Item>
            <Button block type="primary" htmlType="submit" size="large">
              Log in
            </Button>
          </Form.Item>

          <div className="text-center">
            <span className="text-gray-500">Don’t have an account? </span>
            <a href="" className="text-blue-600 hover:underline">Register now!</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
