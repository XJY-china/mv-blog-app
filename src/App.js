// 导入React库
import React from 'react';
// 导入React Router组件
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 导入Ant Design布局组件
import { Layout } from 'antd';
// 导入自定义组件
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import AdminPage from './pages/AdminPage';
// 导入应用样式
import './App.css';
import EditPage from './pages/EditPage';

// 从Layout组件中解构出Content组件
const { Content } = Layout;

// 定义主应用组件
function App() {
  return (
    // Router组件包裹整个应用，提供路由功能
    <Router>
      {/* Layout布局容器，设置最小高度为100vh */}
      <Layout style={{ minHeight: '100vh' }}>
        {/* 导航栏组件 */}
        <Navbar />
        
        {/* 内容区域 */}
        <Content style={{ padding: '20px' }}>
          {/* 路由配置区域 */}
          <Routes>
            {/* 首页路由 */}
            <Route path="/" element={<HomePage />} />
            {/* 文章详情页路由（动态路由，:id是参数） */}
            <Route path="/article/:id" element={<ArticlePage />} />
            {/* 管理页面路由 */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
          </Routes>
        </Content>
        
        {/* 页脚组件 */}
        <Footer />
      </Layout>
    </Router>
  );
}

// 导出App组件
export default App;