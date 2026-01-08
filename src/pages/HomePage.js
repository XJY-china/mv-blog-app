// 导入React库
import React from 'react';
// 导入Ant Design组件
import { List, Card, Typography, Button, Spin, Space } from 'antd';
// 导入自定义博客Hook
import { useBlog } from '../hooks/useBlog';
// 导入文章卡片组件
import ArticleCard from '../components/ArticleCard';
// 导入Ant Design图标
import { PlusOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
// 导入React Router导航组件
import { Link, useNavigate } from 'react-router-dom';

// 解构Typography中的Title组件
const { Title, Text } = Typography;

// 定义首页组件
function HomePage({ currentUser }) {
  // 使用自定义Hook获取博客数据和方法
  const { articles, loading, deleteArticle } = useBlog();
  // 使用导航钩子
  const navigate = useNavigate();

  // 处理发布文章点击
  const handlePublishClick = () => {
    if (!currentUser) {
      // 如果未登录，跳转到登录页面
      navigate('/login');
      return;
    }
    // 已登录，跳转到发布页面
    navigate('/admin');
  };

  // 处理查看个人资料点击
  const handleProfileClick = () => {
    if (!currentUser) {
      // 如果未登录，跳转到登录页面
      navigate('/login');
      return;
    }
    // 已登录，跳转到个人资料页面
    navigate('/profile');
  };

  return (
    <div>
      {/* 顶部标题和发布按钮区域 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap', // 允许换行
        gap: '16px' // 添加间距
      }}>
        {/* 页面标题 */}
        <Title level={2}>最新文章</Title>
        
        {/* 右侧按钮区域 */}
        <Space>
          {currentUser ? (
            // 已登录用户显示的按钮
            <>
              <Button type="primary" icon={<PlusOutlined />} onClick={handlePublishClick}>
                发布新文章
              </Button>
              <Button onClick={handleProfileClick}>
                我的主页
              </Button>
            </>
          ) : (
            // 未登录用户显示的按钮
            <Space>
              <Button type="primary" icon={<LoginOutlined />} onClick={() => navigate('/login')}>
                登录
              </Button>
              <Button icon={<UserAddOutlined />} onClick={() => navigate('/register')}>
                注册
              </Button>
            </Space>
          )}
        </Space>
      </div>

      {/* 未登录时的引导卡片 */}
      {!currentUser && articles.length === 0 && !loading && (
        <Card 
          style={{ 
            marginBottom: 24, 
            backgroundColor: '#f0f9ff',
            borderColor: '#91d5ff',
            textAlign: 'center'
          }}
        >
          <Space direction="vertical" size="middle">
            <Title level={4}>欢迎来到我的博客</Title>
            <Text type="secondary">
              登录后可以发布文章、管理个人资料、评论互动
            </Text>
            <Space>
              <Button 
                type="primary" 
                size="large"
                onClick={() => navigate('/login')}
              >
                立即登录
              </Button>
              <Button 
                size="large"
                onClick={() => navigate('/register')}
              >
                注册账号
              </Button>
            </Space>
            <Text type="secondary" style={{ fontSize: 12 }}>
              或使用演示账号：用户名 pigStar，密码 123456
            </Text>
          </Space>
        </Card>
      )}

      {/* 加载状态显示 */}
      {loading ? (
        <div style={{ 
          position: 'fixed',
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
            {currentUser ? (
              // 已登录但无文章
              <>
                <p style={{ fontSize: '16px', color: '#999', marginBottom: '20px' }}>
                  还没有文章，快去发布第一篇吧！
                </p>
                <Button type="primary" size="large" onClick={() => navigate('/admin')}>
                  发布第一篇文章
                </Button>
              </>
            ) : (
              // 未登录且无文章
              <>
                <p style={{ fontSize: '16px', color: '#999', marginBottom: '20px' }}>
                  还没有文章，登录后可以发布您的第一篇文章！
                </p>
                <Space>
                  <Button type="primary" size="large" onClick={() => navigate('/login')}>
                    登录后发布
                  </Button>
                  <Button size="large" onClick={() => navigate('/register')}>
                    注册账号
                  </Button>
                </Space>
              </>
            )}
          </div>
        </Card>
      ) : (
        // 有文章时的显示区域
        <div>
          {/* 文章列表顶部信息 */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 16 
          }}>
            <Text type="secondary">共 {articles.length} 篇文章</Text>
            {!currentUser && (
              <Text type="secondary" style={{ fontSize: 12 }}>
                登录后可以发布文章和评论
              </Text>
            )}
          </div>
          
          {/* 遍历文章数组，渲染每个文章卡片 */}
          {articles.map(article => (
            <ArticleCard
              key={article.id}  // React列表渲染需要的key
              article={article}  // 文章数据
              onDelete={deleteArticle}  // 删除回调函数
              currentUser={currentUser}  // 传递当前用户信息
              isAdmin={currentUser && currentUser.id === article.authorId}  // 检查是否是作者
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 导出HomePage组件
export default HomePage;