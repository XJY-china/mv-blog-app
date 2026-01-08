
import React, { useEffect, useState } from 'react'; // 引入React核心库和hooks
import { useNavigate } from 'react-router-dom'; // 引入路由导航hook
import { 
  Card, 
  Avatar, 
  Typography, 
  Divider, 
  List, 
  Tag, 
  message, 
  Space,
  Button 
} from 'antd'; // 引入Ant Design UI组件
import { 
  UserOutlined, 
  CalendarOutlined, 
  MailOutlined,
  BookOutlined,
  EyeOutlined,
  EditOutlined
} from '@ant-design/icons'; // 引入图标组件
import storage from '../utils/storage'; // 引入本地存储工具
import '../App.css'; // 引入全局样式文件

// 从Typography组件中解构出Title, Text, Paragraph组件
const { Title, Text, Paragraph } = Typography;

function ProfilePage() {
  // 使用useNavigate hook获取导航函数，用于页面跳转
  const navigate = useNavigate();
  
  // 定义用户状态，初始值为null，表示未加载
  const [user, setUser] = useState(null);
  
  // 定义用户文章列表状态，初始为空数组
  const [userArticles, setUserArticles] = useState([]);
  
  // 定义加载状态，初始为true，表示正在加载
  const [loading, setLoading] = useState(true);

  // 使用useEffect hook处理组件挂载和依赖变化
  useEffect(() => {
    // 定义加载用户资料和文章的函数
    const loadUserProfile = () => {
      try {
        // 从storage中获取当前登录用户信息
        const currentUser = storage.getCurrentUser();
        
        // 如果没有登录用户，显示提示并跳转到登录页
        if (!currentUser) {
          message.warning('请先登录查看个人资料'); // 显示警告消息
          navigate('/login'); // 跳转到登录页面
          return; // 结束函数执行
        }

        // 从storage中获取所有文章
        const allArticles = storage.getArticles();
        
        // 过滤出当前用户的文章：通过比较文章作者ID和用户ID
        const filteredArticles = allArticles.filter(
          article => article.authorId === currentUser.id
        );

        // 更新用户状态
        setUser(currentUser);
        
        // 更新用户文章状态
        setUserArticles(filteredArticles);
        
      } catch (error) {
        // 捕获并处理错误
        console.error('加载个人资料失败:', error); // 控制台输出错误
        message.error('加载个人资料失败，请稍后重试'); // 显示错误消息
      } finally {
        // 无论成功或失败，最终都会执行这里
        setLoading(false); // 将加载状态设为false
      }
    };

    // 调用加载函数
    loadUserProfile();
    
  }, [navigate]); // 依赖数组：当navigate变化时重新执行

  // 定义计算统计数据的函数
  const calculateStats = () => {
    // 如果用户没有文章，返回空的统计对象
    if (!userArticles.length) {
      return { totalViews: 0, totalLikes: 0, totalComments: 0 };
    }
    
    // 使用reduce计算总阅读量：遍历所有文章，累加views字段
    const totalViews = userArticles.reduce((sum, article) => {
      return sum + (article.views || 0); // 如果article.views不存在则用0
    }, 0); // 初始值为0
    
    // 计算总点赞数
    const totalLikes = userArticles.reduce((sum, article) => {
      return sum + (article.likes || 0);
    }, 0);
    
    // 计算总评论数
    const totalComments = userArticles.reduce((sum, article) => {
      return sum + (article.comments || 0);
    }, 0);
    
    return { totalViews, totalLikes, totalComments }; // 返回统计对象
  };

  // 定义格式化日期的函数
  const formatDate = (dateString) => {
    // 如果没有日期字符串，返回空字符串
    if (!dateString) return '';
    
    try {
      // 将ISO格式日期字符串转换为Date对象
      const date = new Date(dateString);
      
      // 格式化为中文日期字符串：年-月-日
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric', // 显示年份
        month: '2-digit', // 显示两位数月份
        day: '2-digit' // 显示两位数日期
      });
    } catch (error) {
      console.error('日期格式化错误:', error);
      return ''; // 格式化失败返回空字符串
    }
  };

  // 如果正在加载，显示加载提示
  if (loading) {
    return (
      <div style={{ 
        padding: 100, 
        textAlign: 'center',
        fontSize: 18,
        color: '#666'
      }}>
        加载中...
      </div>
    );
  }

  // 如果用户数据不存在（可能跳转到登录页了），不渲染内容
  if (!user) {
    return null; // 返回null，不渲染任何内容
  }

  // 计算统计数据
  const stats = calculateStats();

  // 返回JSX结构
  return (
    <div style={{ 
      maxWidth: 1000, // 最大宽度
      margin: '0 auto', // 水平居中
      padding: 24 // 内边距
    }}>
      {/* 用户信息卡片 */}
      <Card 
        style={{ 
          marginBottom: 24, // 底部外边距
          borderRadius: 8, // 圆角
          boxShadow: '0 2px 8px rgba(0,0,0,0.09)' // 阴影效果
        }}
      >
        <div style={{ 
          display: 'flex', // 使用flex布局
          flexDirection: 'row', // 水平排列
          alignItems: 'flex-start', // 顶部对齐
          gap: 24 // 子元素间距
        }}>
          {/* 左侧：头像区域 */}
          <div style={{ 
            textAlign: 'center', // 文字居中
            flexShrink: 0 // 防止头像区域被压缩
          }}>
            <Avatar 
              size={120} // 头像大小
              icon={!user.avatar && <UserOutlined />} // 如果没有头像，显示默认图标
              src={user.avatar} // 头像图片URL
              style={{ 
                marginBottom: 16, // 底部外边距
                border: '3px solid #f0f0f0', // 边框
                backgroundColor: user.avatar ? 'transparent' : '#1890ff' // 背景色
              }}
            />
            {/* 编辑资料按钮 */}
            <Button 
              type="link" // 链接样式按钮
              icon={<EditOutlined />} // 编辑图标
              onClick={() => navigate('/edit-profile')} // 点击跳转到编辑资料页
              style={{ color: '#1890ff' }} // 按钮颜色
            >
              编辑资料
            </Button>
          </div>

          {/* 右侧：用户详细信息 */}
          <div style={{ flex: 1 }}> {/* 占据剩余空间 */}
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {/* 用户基本信息 */}
              <div>
                {/* 用户名 */}
                <Title level={2} style={{ marginBottom: 8 }}>
                  {user.name || user.username} {/* 优先显示name，没有则显示username */}
                </Title>
                
                {/* 用户邮箱和注册时间 */}
                <Space size="large" wrap> {/* wrap允许换行 */}
                  <span style={{ color: '#666' }}>
                    <MailOutlined style={{ marginRight: 8, color: '#999' }} />
                    {user.email}
                  </span>
                  <span style={{ color: '#666' }}>
                    <CalendarOutlined style={{ marginRight: 8, color: '#999' }} />
                    注册于 {formatDate(user.createdAt)}
                  </span>
                </Space>
              </div>

              {/* 个人简介（如果有） */}
              {user.bio && (
                <div>
                  <Paragraph style={{ 
                    color: '#666',
                    fontSize: 16,
                    marginBottom: 0
                  }}>
                    {user.bio}
                  </Paragraph>
                </div>
              )}

              {/* 统计数据 */}
              <div>
                <Space size="large">
                  {/* 文章数量 */}
                  <div style={{ textAlign: 'center' }}>
                    <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
                      {userArticles.length}
                    </Title>
                    <Text type="secondary">文章</Text>
                  </div>
                  
                  {/* 总阅读量 */}
                  <div style={{ textAlign: 'center' }}>
                    <Title level={3} style={{ margin: 0, color: '#52c41a' }}>
                      {stats.totalViews}
                    </Title>
                    <Text type="secondary">阅读量</Text>
                  </div>

                  {/* 总点赞数 */}
                  <div style={{ textAlign: 'center' }}>
                    <Title level={3} style={{ margin: 0, color: '#fa8c16' }}>
                      {stats.totalLikes}
                    </Title>
                    <Text type="secondary">点赞</Text>
                  </div>

                  {/* 总评论数 */}
                  <div style={{ textAlign: 'center' }}>
                    <Title level={3} style={{ margin: 0, color: '#722ed1' }}>
                      {stats.totalComments}
                    </Title>
                    <Text type="secondary">评论</Text>
                  </div>
                </Space>
              </div>

              {/* 个人介绍（详细版，如果有） */}
              {user.introduction && (
                <div>
                  <Title level={4} style={{ marginBottom: 12 }}>个人介绍</Title>
                  <Paragraph style={{ 
                    whiteSpace: 'pre-wrap', // 保留空白和换行
                    lineHeight: 1.8,
                    color: '#444'
                  }}>
                    {user.introduction}
                  </Paragraph>
                </div>
              )}

              {/* 技术栈（如果有） */}
              {user.techStack && (
                <div>
                  <Title level={4} style={{ marginBottom: 12 }}>技术栈</Title>
                  <Text type="secondary">{user.techStack}</Text>
                </div>
              )}

              {/* 兴趣爱好（如果有） */}
              {user.interests && (
                <div>
                  <Title level={4} style={{ marginBottom: 12 }}>兴趣爱好</Title>
                  <Text type="secondary">{user.interests}</Text>
                </div>
              )}
            </Space>
          </div>
        </div>
      </Card>

      {/* 分割线 */}
      <Divider />

      {/* 用户的文章列表 */}
      <Card 
        title={ // 卡片标题
          <span>
            <BookOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            我的文章 ({userArticles.length})
          </span>
        }
        style={{ borderRadius: 8 }}
      >
        {userArticles.length === 0 ? ( // 如果没有文章
          <div style={{ 
            textAlign: 'center', 
            padding: 40,
            color: '#999'
          }}>
            <Title level={4} type="secondary" style={{ marginBottom: 16 }}>
              还没有发布过文章
            </Title>
            <Button 
              type="primary" 
              onClick={() => navigate('/admin')} // 跳转到写文章页面
            >
              开始创作
            </Button>
          </div>
        ) : (
          // 文章列表
          <List
            itemLayout="vertical" // 垂直布局
            dataSource={userArticles} // 数据源
            renderItem={(article) => ( // 渲染每个文章项
              <List.Item
                // 文章项的操作按钮
                actions={[
                  <span key="time" style={{ color: '#999' }}>
                    {formatDate(article.createdAt)} // 发布时间
                  </span>,
                  <span key="views" style={{ color: '#999' }}>
                    <EyeOutlined style={{ marginRight: 4 }} />
                    {article.views || 0} 次阅读 // 阅读次数
                  </span>,
                  <span key="likes" style={{ color: '#999' }}>
                    👍 {article.likes || 0} 点赞
                  </span>,
                  <span key="comments" style={{ color: '#999' }}>
                    💬 {article.comments || 0} 评论
                  </span>,
                  <Button 
                    key="view" 
                    type="link" 
                    size="small"
                    onClick={() => navigate(`/article/${article.id}`)} // 查看文章
                    icon={<EyeOutlined />}
                  >
                    查看详情
                  </Button>
                ]}
              >
                <List.Item.Meta
                  // 文章标题，点击可查看
                  title={
                    <Button
                      onClick={() => navigate(`/article/${article.id}`)}
                      style={{ fontSize: 18 }}
                    >
                      {article.title}
                    </Button>
                  }
                  // 文章描述和标签
                  description={
                    <div>
                      {/* 文章描述 */}
                      {article.description && (
                        <Paragraph 
                          ellipsis={{ rows: 2 }} // 最多显示2行，超出显示...
                          style={{ 
                            marginBottom: 8,
                            color: '#666'
                          }}
                        >
                          {article.description}
                        </Paragraph>
                      )}
                      
                      {/* 文章标签 */}
                      {article.tags && article.tags.length > 0 && (
                        <div>
                          {/* 处理标签：确保是数组格式 */}
                          {(Array.isArray(article.tags) 
                            ? article.tags 
                            : article.tags.split(' ') // 如果是字符串，按空格分割
                          )
                            .filter(tag => tag && tag.trim()) // 过滤空标签
                            .map((tag, index) => (
                              <Tag 
                                key={index} 
                                color="blue" 
                                style={{ marginBottom: 4 }}
                              >
                                {tag.trim()} 
                              </Tag>
                            ))}
                        </div>
                      )}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
}

// 导出组件
export default ProfilePage;
