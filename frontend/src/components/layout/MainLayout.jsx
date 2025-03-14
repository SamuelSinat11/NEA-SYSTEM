import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { Breadcrumb, Dropdown, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Dashboard', '/home', <PieChartOutlined />),
  getItem('Seekers', '/seekers', <DesktopOutlined />),
  getItem('User', '/user', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Interview', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('CV', '9', <FileOutlined />),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const onClickMenu = (param) => {
    navigate(param.key);
  };

  const profileMenu = (
    <Menu
      items={[
        { key: '1', label: 'Profile', icon: <UserOutlined /> },
        { key: '2', label: 'Settings', icon: <SettingOutlined /> },
        { key: '4', label: 'Register', icon: <FileOutlined /> },
        { danger: true, key: '3', label: 'Logout', icon: <LogoutOutlined />, onClick: () => navigate('/Login') },
      ]}
    />
  );
  

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onClickMenu} />
      </Sider>
      <Layout>
        <header className="bg-blue-950 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center">
              <a href="#" className="flex">
                <img className="w-16 md:w-20 lg:w-24 xl:w-16 h-auto" src="./src/assets/nea.png" alt="Logo" />
              </a>
            </div>

            {/* Navigation & Controls */}
            <div className="flex items-center space-x-6">
              {/* Notification Icon */}
              <div className="relative">
                <button className="text-white hover:text-blue-300 transition focus:outline-none" aria-label="Notifications">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5">3</span>
              </div>

              {/* Profile Section */}
              <div className="hidden md:flex items-center space-x-4">
                <Dropdown overlay={profileMenu} trigger={['click']}>
                  <div className="flex flex-col text-right cursor-pointer">
                    <div className="text-white font-semibold hover:text-blue-300 transition">Admin</div>
                    <span className="text-gray-300 text-sm">Administrator</span>
                  </div>
                </Dropdown>
                <img className="w-10 h-10 rounded-full object-cover border-2 border-white" src="" alt="Profile" />
              </div>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <button
                  id="menu-btn"
                  className="text-white hover:text-blue-300 transition focus:outline-none"
                  aria-label="Open Menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
