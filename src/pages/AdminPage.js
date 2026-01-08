// 导入React和状态Hook
import React, { useState } from 'react';
// 导入Ant Design组件
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  message,
  Row,
  Col,
  Select,
  Tag,
  Spin
} from 'antd';
// 导入自定义博客Hook
import { useBlog } from '../hooks/useBlog';
// 导入React Router导航Hook
import { useNavigate } from 'react-router-dom';

// 解构Typography中的Title组件
const { Title } = Typography;
// 解构Input中的TextArea组件
const { TextArea } = Input;
// 解构Select中的Option组件
const { Option } = Select;

// 定义管理页面组件
function AdminPage() {
  // 创建表单实例
  const [form] = Form.useForm();
  // 文章标签状态
  const [tags, setTags] = useState([]);
  // 标签输入框值状态
  const [inputValue, setInputValue] = useState('');
  // 使用自定义Hook获取博客方法
  const { createArticle, loading } = useBlog();
  // 获取页面导航函数
  const navigate = useNavigate();

  // 标签输入框值改变处理函数
  const handleTagInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 确认添加标签处理函数
  const handleTagInputConfirm = () => {
  if (inputValue && inputValue.trim() !== '') {
    // 1. 按空格分割多个标签
    const inputTags = inputValue
      .split(' ')                    // 空格分割
      .map(tag => tag.trim())        // 去除首尾空格
      .filter(tag => tag !== '');    // 过滤空字符串
    
    // 2. 去重（不添加已存在的标签）
    const uniqueNewTags = inputTags.filter(tag => 
      !tags.includes(tag)
    );
    
    // 3. 添加到现有标签
    if (uniqueNewTags.length > 0) {
      setTags([...tags, ...uniqueNewTags]);
    }
    
    // 4. 清空输入框
    setInputValue('');
  }
};

  // 移除标签处理函数
  const handleTagRemove = (removedTag) => {
    // 过滤掉要移除的标签
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags);
  };

  // 表单提交处理函数
  const onFinish = async (values) => {
  try {
    // 确保tags是数组
    const articleData = {
      ...values,
      tags: Array.isArray(tags) ? tags : [tags],  // 强制转为数组
      excerpt: values.description?.substring(0, 100) || '',
    };
    
    console.log('保存的数据:', articleData);  // 检查tags格式
    
    const newArticle = await createArticle(articleData);
    // ... 其他代码
  } catch (error) {
    console.error('发布失败:', error);
  }
};

  return (
    <div>
      {/* 页面标题 */}
      <Title level={2} style={{ marginBottom: '24px' }}>
        发布新文章
      </Title>
      
      {/* 两栏布局容器 */}
      <Row gutter={16}>
        {/* 左侧主内容区（表单区域） */}
        <Col xs={24} lg={16}>
          {/* 表单卡片 */}
          <Card title="填写文章信息">
            {/* 表单组件 */}
            <Form
              form={form}  // 绑定表单实例
              layout="vertical"  // 垂直布局
              onFinish={onFinish}  // 提交回调
              autoComplete="off"  // 关闭自动完成
              initialValues={{ tags: [] }}  // 初始值
            >
              {/* 文章标题表单项 */}
              <Form.Item
                label="文章标题"  // 标签文字
                name="title"  // 字段名
                rules={[  // 验证规则
                  { required: true, message: '请输入文章标题' },
                  { min: 0, max: 100, message: '标题长度应在100字符以下' }
                ]}
              >
                {/* 输入框组件 */}
                <Input placeholder="请输入吸引人的文章标题" size="large" />
              </Form.Item>

              {/* 文章内容表单项 */}
              <Form.Item
                label="文章内容 (支持Markdown)"  // 标签文字
                name="content"  // 字段名
                rules={[  // 验证规则
                  { required: true, message: '请输入文章内容' },
                  { min: 50, message: '内容至少50个字符' }
                ]}
              >
                {/* 文本域组件 */}
                <TextArea
                  rows={15}  // 显示行数
                  placeholder="使用Markdown格式编写文章内容..."  // 占位符
                  showCount  // 显示字数统计
                  maxLength={10000}  // 最大字符数
                />
              </Form.Item>

              {/* 文章描述表单项 */}
              <Form.Item
                label="文章描述"  // 标签文字
                name="description"  // 字段名
                rules={[  // 验证规则
                  { required: true, message: '请输入文章描述' },
                  { max: 200, message: '描述不超过200字符' }
                ]}
              >
                {/* 文本域组件 */}
                <TextArea
                  rows={3}  // 显示行数
                  placeholder="请输入文章简要描述，用于文章列表显示..."  // 占位符
                  showCount  // 显示字数统计
                  maxLength={200}  // 最大字符数
                />
              </Form.Item>

              {/* 标签管理区域 */}
              <Form.Item label="文章标签">
                {/* 已添加标签显示区域 */}
                <div style={{ marginBottom: '8px' }}>
                  {/* 遍历标签数组渲染Tag组件 */}
                  {tags.map(tag => (
                    <Tag
                      key={tag}  // React列表key
                      closable  // 显示关闭按钮
                      onClose={() => handleTagRemove(tag)}  // 关闭回调
                      style={{ marginBottom: '8px' }}  // 样式
                    >
                      {tag}  {/* 标签文字 */}
                    </Tag>
                  ))}
                </div>
                {/* 标签输入框 */}
                <Input
                  type="text"  // 输入类型
                  size="small"  // 小尺寸
                  value={inputValue}  // 绑定值
                  onChange={handleTagInputChange}  // 变化回调
                  onBlur={handleTagInputConfirm}  // 失去焦点回调
                  onPressEnter={handleTagInputConfirm}  // 回车键回调
                  placeholder="输入标签（多个标签用空格分隔，按回车添加）"  // 占位符
                />
              </Form.Item>

              {/* 提交按钮表单项 */}
              <Form.Item>
                {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                <Spin size="large" />
                <div style={{ marginTop: '10px', color: '#1890ff' }}>发布中...</div>
                </div>
                ) : (
                <Button 
                type="primary"  
                htmlType="submit"  
                size="large"  
                block  
                >
                立即发布
                </Button>
                )}
              </Form.Item>
            </Form>
          </Card>
        </Col>
        
        {/* 右侧辅助信息区 */}
        <Col xs={24} lg={8}>
          {/* 写作提示卡片 */}
          <Card title="📝 写作提示" style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
              {/* 标题技巧部分 */}
              <p><strong>标题技巧：</strong></p>
              <ul>
                <li>吸引眼球，突出主题</li>
                <li>控制在10-20字最佳</li>
                <li>避免使用标点结尾</li>
              </ul>
              
              {/* 内容建议部分 */}
              <p><strong>内容建议：</strong></p>
              <ul>
                <li>开头简要介绍主题</li>
                <li>分点阐述，逻辑清晰</li>
                <li>适当使用代码示例</li>
                <li>结尾总结要点</li>
              </ul>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

// 导出AdminPage组件
export default AdminPage;