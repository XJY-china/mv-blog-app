// 导入React库
import React from 'react';
// 导入Ant Design组件
import { Card, Button, Tag } from 'antd';
// 导入React Router导航组件
import { Link } from 'react-router-dom';
// 导入Ant Design图标
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

// 定义文章卡片组件
const ArticleCard = ({ 
  article,  // 文章数据对象
  onDelete,  // 删除回调函数
  showActions = true,  // 是否显示操作按钮，默认true
  isAdmin = false  // 是否为管理员模式，默认false
}) => {
  // 从文章对象中解构出需要的属性
  const { id, title, description, createdAt, tags = [] } = article;

  return (
    // Card组件：文章卡片容器
    <Card
      // 卡片标题区域
      title={
        // 点击标题跳转到文章详情页
        <Link to={`/article/${id}`} style={{ fontSize: '18px', fontWeight: 'bold' }}>
          {title}  {/* 显示文章标题 */}
        </Link>
      }
      // 卡片右上角额外内容
      extra={
        // 显示创建日期
        <span style={{ color: '#999', fontSize: '14px' }}>
          {new Date(createdAt).toLocaleDateString()}
        </span>
      }
      // 卡片样式
      style={{ marginBottom: '16px' }}
      // 卡片底部操作区域
      actions={
        showActions ? [
          // 查看文章按钮
          <Link to={`/article/${id}`} key="view">
            <EyeOutlined /> 查看
          </Link>,
          
          // 管理员操作按钮（根据isAdmin决定是否显示）
          ...(isAdmin ? [
            // 编辑文章按钮（需要创建编辑页面）
            <Link to={`/edit/${id}`} key="edit">
              <EditOutlined /> 编辑
            </Link>,
            // 删除文章按钮
            <Button 
              type="text"  // 文本按钮样式
              danger  // 危险操作样式（红色）
              key="delete"  // React列表key
              onClick={() => onDelete(id)}  // 点击回调
              icon={<DeleteOutlined />}  // 删除图标
            >
              删除  {/* 按钮文字 */}
            </Button>
          ] : [])  // 如果不是管理员，显示空数组
        ] : undefined  // 如果不显示操作，设为undefined
      }
    >
      {/* 文章描述 */}
      <p style={{ color: '#666', marginBottom: '12px' }}>
        {description || '暂无描述'}  {/* 如果有描述显示描述，否则显示默认文字 */}
      </p>
      
      {/* 标签显示区域（如果有标签） */}
      {tags.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          {/* 遍历标签数组，渲染Tag组件 */}
          {tags.map(tag => (
            <Tag key={tag} color="blue" style={{ marginRight: '8px' }}>
              {tag}  {/* 标签文字 */}
            </Tag>
          ))}
        </div>
      )}
    </Card>
  );
};

// 导出ArticleCard组件
export default ArticleCard;