import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { request } from '../../util/request';
import { setAccessToken, setProfile } from '../../../store/profile.store';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onLogin = async (item) => {
    try {
      const param = {
        username: item.username,
        password: item.password,
      };

      const res = await request("auth/login", "post", param);

      if (res && !res.error) {
        setAccessToken(res.access_token);
        setProfile(JSON.stringify(res.profile));
        navigate("/home");
      } else {
        alert(JSON.stringify(res));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="text-center">
          <img className="w-60 h-60 mx-auto mb-3" src="./src/assets/Tep.png" alt="Logo" />
          <p className="text-gray-500">សូមវាយបញ្ចូលទៅកាន់គណនីរបស់អ្នក ៖</p>
        </div>

        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={onLogin}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>

          <div className="flex justify-between items-center mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <Form.Item>
            <Button block type="primary" htmlType="submit" size="large">
              Log in
            </Button>
          </Form.Item>

          <div className="text-center">
            <span className="text-gray-500">Don’t have an account? </span>
            <a href="#" className="text-blue-600 hover:underline">Register now!</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
