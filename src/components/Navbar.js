
// 导入React核心库
import React from 'react';
// 导入路由相关组件
import { Link, useNavigate } from 'react-router-dom';
// 导入Ant Design组件
import { Layout, Menu, Dropdown, Avatar, Button, Space } from 'antd'; // 添加了 Space
// 导入Ant Design图标
import { HomeOutlined, FormOutlined, UserOutlined, EditOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

// 从Layout组件解构Header头部
const { Header } = Layout;

// 定义导航栏组件，接收currentUser参数
function Navbar({ currentUser, onLogout }) {
  // 创建导航函数
  const navigate = useNavigate();

  // 退出登录处理
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  // 下拉菜单点击处理函数
  const handleMenuClick = ({ key }) => {
    // 根据菜单项的key执行不同操作
    switch (key) {
      case 'profile':
        navigate('/profile');  // 跳转到个人主页
        break;
      case 'edit-profile':
        navigate('/edit-profile');  // 跳转到编辑个人信息
        break;
      case 'settings':
        navigate('/settings');  // 跳转到设置页面
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  // 用户下拉菜单项配置
  const userMenuItems = [
    {
      key: 'profile',  // 菜单项唯一标识
      label: '个人资料',  // 显示文本
      icon: <UserOutlined />,  // 图标
    },
    {
      key: 'edit-profile',
      label: '编辑个人信息',
      icon: <EditOutlined />,
    },
    {
      key: 'settings',
      label: '设置',
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',  // 分割线
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
    }
  ];

  // 返回导航栏JSX
  return (
    <Header>
      <div style={{
        float: 'left',  // 左浮动
        marginRight: '20px',  // 右外边距
        color: 'white',  // 文字颜色
        fontSize: '18px',  // 字体大小
        fontWeight: 'bold',  // 字体加粗
        display: 'flex',  // Flex布局
        alignItems: 'center'  // 垂直居中
      }}>
        <Link to="/" style={{ color: 'white' }}>
          我的博客
        </Link>
      </div>
      
      <div style={{
        float: 'right',  // 右浮动
        display: 'flex',  // Flex布局
        alignItems: 'center',  // 垂直居中
        color: 'white',  // 文字颜色
        marginLeft: 'auto'  // 自动左边距，推到最右
      }}>
        {currentUser ? (  // 如果用户已登录
          <Dropdown 
            menu={{ 
              items: userMenuItems,  // 菜单项配置
              onClick: handleMenuClick  // 点击事件处理
            }}
            placement="bottomRight"  // 菜单弹出位置
            arrow  // 显示箭头
          >
            <div style={{ 
              display: 'flex',  // Flex布局
              alignItems: 'center',  // 垂直居中
              cursor: 'pointer',  // 鼠标指针样式
              padding: '0 10px'  // 内边距
            }}>
              <Avatar 
                size="small"  // 小尺寸头像
                src={currentUser.avatar}  // 头像图片源
                icon={!currentUser.avatar && <UserOutlined />}  // 无头像时显示默认图标
                style={{ marginRight: '8px' }}  // 右边距
              />
              <span>{currentUser.name || currentUser.username}</span>  {/* 显示用户名 */}
            </div>
          </Dropdown>
        ) : (  // 如果用户未登录
          <Space>
            <Button size="small">
              <Link to="/register">注册</Link>
            </Button>
            <Button type="primary" size="small">
              <Link to="/login" style={{ color: 'white' }}>登录</Link>
            </Button>
          </Space>
        )}
      </div>
      
      <Menu 
        theme="dark"  // 暗色主题
        mode="horizontal"  // 水平模式
        defaultSelectedKeys={['home']}  // 默认选中首页
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="admin" icon={<FormOutlined />}>
          <Link to="/admin">发布</Link>  
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link to="/profile">我的</Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <Link to="/settings">设置</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

// 导出组件
export default Navbar;
