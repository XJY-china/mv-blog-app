// 导入React库
import React from 'react';
// 导入Ant Design组件
import { List, Card, Typography, Button, Spin } from 'antd';
// 导入自定义博客Hook
import { useBlog } from '../hooks/useBlog';
// 导入文章卡片组件
import ArticleCard from '../components/ArticleCard';
// 导入Ant Design图标
import { PlusOutlined } from '@ant-design/icons';
// 导入React Router导航组件
import { Link } from 'react-router-dom';

// 解构Typography中的Title组件
const { Title } = Typography;

// 定义首页组件
function HomePage() {
  // 使用自定义Hook获取博客数据和方法
  const { articles, loading, deleteArticle } = useBlog();

  return (
    <div>
      {/* 顶部标题和发布按钮区域 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        {/* 页面标题 */}
        <Title level={2}>最新文章</Title>
        {/* 发布新文章按钮 */}
        <Button type="primary" icon={<PlusOutlined />}>
          {/* 点击跳转到管理页面 */}
          <Link to="/admin">发布新文章</Link>
        </Button>
      </div>

      {/* 加载状态显示 */}
      {loading ? (
        <div style={{ position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000
  }}>
          <Spin size="large" />
        </div>
      ) : articles.length === 0 ? (
        // 无文章时的空状态显示
        <Card>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            {/* 提示文字 */}
            <p style={{ fontSize: '16px', color: '#999', marginBottom: '20px' }}>
              还没有文章，快去发布第一篇吧！
            </p>
            {/* 发布按钮 */}
            <Button type="primary" size="large">
              <Link to="/admin">发布第一篇文章</Link>
            </Button>
          </div>
        </Card>
      ) : (
        // 文章列表显示区域
        <div>
          {/* 遍历文章数组，渲染每个文章卡片 */}
          {articles.map(article => (
            <ArticleCard
              key={article.id}  // React列表渲染需要的key
              article={article}  // 文章数据
              onDelete={deleteArticle}  // 删除回调函数
              isAdmin={true}  // 是否显示管理员操作（根据实际需求调整）
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 导出HomePage组件
export default HomePage;