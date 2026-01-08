
// 导入React核心库
import React, { useState, useEffect } from 'react';
// 导入React Router组件，实现页面路由功能
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// 导入Ant Design布局组件
import { Layout } from 'antd';
// 导入自定义导航栏组件
import Navbar from './components/Navbar';
// 导入自定义页脚组件
import Footer from './components/Footer';
// 导入首页页面组件
import HomePage from './pages/HomePage';
// 导入文章详情页面组件
import ArticlePage from './pages/ArticlePage';
// 导入管理后台页面组件
import AdminPage from './pages/AdminPage';
// 导入应用全局样式文件
import './App.css';
// 导入文章编辑页面组件
import EditPage from './pages/EditPage';
// 导入编辑个人信息页面组件
import EditProfilePage from './pages/EditProfilePage';

// 导入个人资料页面组件
import ProfilePage from './pages/ProfilePage';
// 导入设置页面组件
import SettingsPage from './pages/SettingsPage';
// 导入登录页面组件
import LoginPage from './pages/LoginPage';
// 导入注册页面组件
import RegisterPage from './pages/RegisterPage';
// 导入storage工具
import storage from './utils/storage';

// 从Layout组件中解构出Content内容区域
const { Content } = Layout;

// 定义App主组件函数
function App() {
  // 定义状态：存储当前用户信息
  const [currentUser, setCurrentUser] = useState(null);
  // 定义状态：控制加载提示的显示
  const [loading, setLoading] = useState(true);

  // 使用useEffect处理组件挂载时的副作用
  useEffect(() => {
    // 从storage获取当前用户信息
    const user = storage.getCurrentUser();
    
    if (user) {
      setCurrentUser(user);
    }
    
    setLoading(false);
  }, []);

  // 定义更新用户信息的函数
  const handleUpdateUser = async (updatedData) => {
    try {
      const updatedUser = storage.updateCurrentUser(updatedData);
      setCurrentUser(updatedUser);
      return Promise.resolve(updatedUser);
    } catch (error) {
      console.error('更新用户失败:', error);
      return Promise.reject(error);
    }
  };

  // 登录函数
  const handleLogin = async (userData) => {
    try {
      // 模拟登录成功
      const user = {
        id: Date.now().toString(),
        name: userData.username || 'pigStar',
        username: userData.username,
        email: userData.email || 'pigStar@gmail.com',
        avatar: 'https://tutuhemrei.com/zb_users/upload/2023/06/20230613168661723',
        bio: '这个人很神秘，什么也没留下。',
        techStack: 'React, Node.js',
        interests: '编程, 阅读',
        introduction: '可以详细介绍您的背景、经历等。',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // 保存到storage
      localStorage.setItem('blog_current_user', JSON.stringify(user));
      setCurrentUser(user);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // 注册函数
  const handleRegister = async (userData) => {
    try {
      // 模拟注册成功
      const user = {
        id: Date.now().toString(),
        name: userData.username,
        username: userData.username,
        email: userData.email,
        avatar: '',
        bio: '',
        techStack: '',
        interests: '',
        introduction: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // 保存到storage
      localStorage.setItem('blog_current_user', JSON.stringify(user));
      setCurrentUser(user);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // 退出登录函数
  const handleLogout = () => {
    storage.logout();
    setCurrentUser(null);
  };

  // 如果正在加载，显示加载提示
  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        加载中...
      </div>
    );
  }

  // 返回应用主结构
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        {/* 导航栏组件，传递当前用户信息和退出函数 */}
        <Navbar currentUser={currentUser} onLogout={handleLogout} />
        
        <Content style={{ padding: '20px' }}>
          <Routes>
            {/* 首页路由，传递用户信息 */}
            <Route path="/" element={<HomePage currentUser={currentUser} />} />
            {/* 文章详情页路由 */}
            <Route path="/article/:id" element={<ArticlePage />} />
            {/* 管理页面路由 */}
            <Route path="/admin" element={<AdminPage />} />
            {/* 文章编辑页面路由 */}
            <Route path="/edit/:id" element={<EditPage />} />
            {/* 编辑个人信息页面路由 */}
            <Route 
              path="/edit-profile" 
              element={
                currentUser ? (
                  <EditProfilePage 
                    currentUser={currentUser}
                    onUpdateUser={handleUpdateUser}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            {/* 个人资料页面路由 */}
            <Route 
              path="/profile" 
              element={
                currentUser ? (
                  <ProfilePage />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            {/* 设置页面路由 */}
            <Route 
              path="/settings" 
              element={
                currentUser ? (
                  <SettingsPage currentUser={currentUser} onUpdateUser={handleUpdateUser} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            {/* 登录页面路由 */}
            <Route 
              path="/login" 
              element={
                currentUser ? (
                  <Navigate to="/profile" replace />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              } 
            />
            
            {/* 注册页面路由 */}
            <Route 
              path="/register" 
              element={
                currentUser ? (
                  <Navigate to="/profile" replace />
                ) : (
                  <RegisterPage onRegister={handleRegister} />
                )
              } 
            />
            
            {/* 默认重定向到首页 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
        
        <Footer />
      </Layout>
    </Router>
  );
}

// 导出App组件
export default App;