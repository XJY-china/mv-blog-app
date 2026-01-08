
// 导入React库
import React from 'react';
// 导入Ant Design组件
import { Card, Button, Tag, Space, message } from 'antd';
// 导入React Router导航组件
import { Link, useNavigate } from 'react-router-dom';
// 导入Ant Design图标
import { DeleteOutlined, EditOutlined, EyeOutlined, CommentOutlined, LikeOutlined } from '@ant-design/icons';

// 定义文章卡片组件
const ArticleCard = ({ 
  article,  // 文章数据对象
  onDelete,  // 删除回调函数
  showActions = true,  // 是否显示操作按钮，默认true
  currentUser = null,  // 当前登录用户信息
  isAdmin = false  // 是否为管理员模式，默认false
}) => {
  // 使用导航钩子
  const navigate = useNavigate();
  
  // 从文章对象中解构出需要的属性
  const { id, title, description, createdAt, tags = [], authorId, views = 0, likes = 0, comments = 0 } = article;

  // 处理删除操作
  const handleDelete = () => {
    if (window.confirm('确定要删除这篇文章吗？此操作不可恢复。')) {
      if (onDelete) {
        onDelete(id);
      }
    }
  };

  // 处理编辑操作
  const handleEdit = () => {
    if (currentUser) {
      navigate(`/edit/${id}`);
    } else {
      message.warning('请先登录后编辑文章');
      navigate('/login');
    }
  };

  // 处理查看操作
  const handleView = () => {
    navigate(`/article/${id}`);
  };

  // 处理评论操作
  const handleComment = () => {
    if (currentUser) {
      navigate(`/article/${id}#comments`);
    } else {
      message.warning('请先登录后发表评论');
      navigate('/login');
    }
  };

  // 处理点赞操作
  const handleLike = () => {
    if (currentUser) {
      // 这里可以添加点赞逻辑
      message.success('点赞成功！');
    } else {
      message.warning('请先登录后点赞');
      navigate('/login');
    }
  };

  // 判断是否是文章作者
  const isAuthor = currentUser && currentUser.id === authorId;

  return (
    // Card组件：文章卡片容器
    <Card
      // 卡片标题区域
      title={
        <Link to={`/article/${id}`} style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
          {title}  {/* 显示文章标题 */}
        </Link>
      }
      // 卡片右上角额外内容
      extra={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* 显示创建日期 */}
          <span style={{ color: '#999', fontSize: '14px' }}>
            {new Date(createdAt).toLocaleDateString('zh-CN')}
          </span>
          {/* 阅读量 */}
          <span style={{ color: '#666', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
            <EyeOutlined style={{ marginRight: 4 }} />
            {views}
          </span>
        </div>
      }
      // 卡片样式
      style={{ 
        marginBottom: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.09)'
      }}
      // 卡片底部操作区域
      actions={
        showActions ? [
          // 查看详情按钮
          <Button 
            type="text" 
            key="view" 
            icon={<EyeOutlined />}
            onClick={handleView}
          >
            查看详情
          </Button>,
          
          // 点赞按钮
          <Button 
            type="text" 
            key="like" 
            icon={<LikeOutlined />}
            onClick={handleLike}
          >
            点赞 ({likes})
          </Button>,
          
          // 评论按钮
          <Button 
            type="text" 
            key="comment" 
            icon={<CommentOutlined />}
            onClick={handleComment}
          >
            评论 ({comments})
          </Button>,
          
          // 作者/管理员操作按钮
          ...(isAdmin || isAuthor ? [
            // 编辑文章按钮
            <Button 
              type="text" 
              key="edit"
              icon={<EditOutlined />}
              onClick={handleEdit}
            >
              编辑
            </Button>,
            // 删除文章按钮
            <Button 
              type="text" 
              danger
              key="delete"
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            >
              删除
            </Button>
          ] : [])
        ] : undefined  // 如果不显示操作，设为undefined
      }
    >
      {/* 文章描述 */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ color: '#666', lineHeight: '1.6', fontSize: '14px' }}>
          {description || '暂无描述'}  {/* 如果有描述显示描述，否则显示默认文字 */}
        </p>
      </div>
      
      {/* 标签显示区域（如果有标签） */}
      {tags && tags.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <Space wrap>
            {/* 遍历标签数组，渲染Tag组件 */}
            {(Array.isArray(tags) ? tags : tags.split ? tags.split(',').filter(Boolean) : [])
              .filter(tag => tag && tag.trim())
              .map((tag, index) => (
                <Tag 
                  key={index} 
                  color={['blue', 'green', 'orange', 'purple', 'red'][index % 5]}
                  style={{ 
                    marginBottom: '4px',
                    borderRadius: '12px',
                    padding: '2px 8px'
                  }}
                >
                  {tag.trim()}  {/* 标签文字 */}
                </Tag>
              ))}
          </Space>
        </div>
      )}
      
      {/* 作者信息（如果存在） */}
      {article.authorName && (
        <div style={{ 
          marginTop: '12px', 
          paddingTop: '12px', 
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: '#999', fontSize: '12px' }}>
            作者：{article.authorName}
          </span>
          {isAuthor && (
            <Tag color="cyan" style={{ fontSize: '10px' }}>
              我的文章
            </Tag>
          )}
        </div>
      )}
    </Card>
  );
};

// 导出ArticleCard组件
export default ArticleCard;
