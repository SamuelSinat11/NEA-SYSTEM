import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { Breadcrumb, Dropdown, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { getProfile, setAccessToken } from '../../../store/profile.store';

const { Header, Content, Sider } = Layout;

const getItem = (label, key, icon, children) => ({
  key,
  icon,
  children,
  label,
});

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
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [profile, setProfile] = useState(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const userProfile = getProfile();
    if (!userProfile) {
      navigate('/login');
    } else {
      setProfile(userProfile);
    }
  }, [navigate]);

  const onClickMenu = (param) => {
    navigate(param.key);
  };

  const onLogout = () => {
    localStorage.removeItem("profile");
    setAccessToken("");
    setProfile(null);
    navigate('/login');
  };

  if (!profile) {
    return null; // Prevent rendering before redirecting
  }

  const profileMenu = (
    <Menu
      items={[
        { key: '1', label: 'Profile', icon: <UserOutlined /> },
        { key: '2', label: 'Settings', icon: <SettingOutlined /> },
        { key: '4', label: 'Register', icon: <FileOutlined /> },
        { key: '3', label: 'Logout', danger: true, icon: <UserOutlined />, onClick: onLogout },
      ]}
    />
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onClickMenu} />
      </Sider>
      <Layout>
        <header className="bg-blue-950 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <a href="#" className="flex">
                <img className="w-16 md:w-20 lg:w-24 xl:w-16 h-auto" src="./src/assets/nea.png" alt="Logo" />
              </a>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <button className="text-white hover:text-blue-300 transition focus:outline-none" aria-label="Notifications">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5">3</span>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <Dropdown overlay={profileMenu} trigger={['click']}>
                  <div className="flex flex-col text-right cursor-pointer">
                    <div className="text-white font-semibold hover:text-blue-300 transition">{profile?.name}</div>
                    <span className="text-gray-300 text-sm">Admin</span>
                  </div>
                </Dropdown>
              
                <img className="w-10 h-10 rounded-full object-cover border-2 border-white" src="./src/assets/nea.png" alt="Profile" />
              </div>
            </div>
          </div>
        </header>

        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
