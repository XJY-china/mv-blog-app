
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  message,
  Upload,
  Avatar,
  Space,
  Row,
  Col,
  Divider
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  EditOutlined,
  UploadOutlined,
  BookOutlined,
  HeartOutlined,
  SettingOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

function EditProfilePage({ currentUser, onUpdateUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatar || '');
  const [form] = Form.useForm();

  // 初始化表单数据
  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        name: currentUser.name || '',
        email: currentUser.email || '',
        bio: currentUser.bio || '',
        introduction: currentUser.introduction || '',
        techStack: currentUser.techStack || '',
        interests: currentUser.interests || ''
      });
      setAvatarUrl(currentUser.avatar || '');
    }
  }, [currentUser, form]);

  // 处理表单提交
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const updatedUser = {
        ...currentUser,
        ...values,
        avatar: avatarUrl,
        updatedAt: new Date().toISOString()
      };
      
      await onUpdateUser(updatedUser);
      message.success('个人资料更新成功！');
      navigate('/profile'); // 返回个人资料页
    } catch (error) {
      message.error('更新失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 处理图片上传（模拟）
  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      // 模拟上传成功
      const url = URL.createObjectURL(info.file.originFileObj);
      setAvatarUrl(url);
      message.success('头像上传成功');
    }
  };

  // 返回个人资料页
  const goBack = () => {
    navigate('/profile');
  };

  // 模拟上传组件配置
  const uploadProps = {
    name: 'avatar',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // 模拟上传地址
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件！');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片大小不能超过2MB！');
      }
      return isImage && isLt2M;
    },
    onChange: handleAvatarChange,
    showUploadList: false
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      {/* 返回按钮 */}
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={goBack}
        style={{ marginBottom: 16 }}
      >
        返回个人资料
      </Button>

      <Card
        title={
          <Space>
            <SettingOutlined />
            <span>编辑个人信息</span>
          </Space>
        }
        style={{
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.09)'
        }}
      >
        <Form
          form={form}
          name="edit-profile"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Row gutter={48}>
            {/* 左侧：头像和基本信息 */}
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center', marginBottom: 30 }}>
                {/* 头像上传区域 */}
                <Upload {...uploadProps}>
                  <Avatar
                    size={120}
                    src={avatarUrl}
                    icon={!avatarUrl && <UserOutlined />}
                    style={{
                      marginBottom: 16,
                      border: '3px solid #f0f0f0',
                      backgroundColor: avatarUrl ? 'transparent' : '#1890ff',
                      cursor: 'pointer'
                    }}
                  />
                </Upload>
                <Button icon={<UploadOutlined />}>
                  更换头像
                </Button>
                <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                  支持 JPG, PNG 格式，大小不超过 2MB
                </Text>
              </div>

              {/* 基本信息 */}
              <Title level={4} style={{ marginBottom: 16 }}>
                <UserOutlined style={{ marginRight: 8 }} />
                基本信息
              </Title>
              
              <Form.Item
                name="name"
                label="昵称"
                rules={[
                  { required: true, message: '请输入昵称' },
                  { max: 20, message: '昵称最多20个字符' }
                ]}
              >
                <Input placeholder="请输入昵称" />
              </Form.Item>

              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>

              <Form.Item
                name="bio"
                label="个人简介"
              >
                <Input placeholder="请输入个人简介（简短介绍）" />
              </Form.Item>
            </Col>

            {/* 右侧：详细信息 */}
            <Col xs={24} md={16}>
              {/* 详细介绍 */}
              <div style={{ marginBottom: 30 }}>
                <Title level={4} style={{ marginBottom: 16 }}>
                  <BookOutlined style={{ marginRight: 8 }} />
                  详细信息介绍
                </Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
                  可以详细介绍您的背景、经历等。
                </Text>
                
                <Form.Item
                  name="introduction"
                >
                  <TextArea
                    rows={6}
                    placeholder="请详细介绍您的背景、工作经历、项目经验等..."
                    maxLength={1000}
                    showCount
                  />
                </Form.Item>
              </div>

              <Divider />

              {/* 技术栈 */}
              <div style={{ marginBottom: 30 }}>
                <Title level={4} style={{ marginBottom: 16 }}>
                  <SettingOutlined style={{ marginRight: 8 }} />
                  技术栈
                </Title>
                <Form.Item
                  name="techStack"
                >
                  <Input placeholder="例如：React, Node.js, Python..." />
                </Form.Item>
              </div>

              {/* 兴趣爱好 */}
              <div style={{ marginBottom: 30 }}>
                <Title level={4} style={{ marginBottom: 16 }}>
                  <HeartOutlined style={{ marginRight: 8 }} />
                  兴趣爱好
                </Title>
                <Form.Item
                  name="interests"
                >
                  <Input placeholder="例如：编程, 阅读, 旅游..." />
                </Form.Item>
              </div>

              {/* 联系邮箱（不可编辑） */}
              <div style={{ marginBottom: 30 }}>
                <Title level={4} style={{ marginBottom: 16 }}>
                  联系邮箱
                </Title>
                <div style={{
                  padding: 12,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 4,
                  border: '1px solid #d9d9d9'
                }}>
                  <MailOutlined style={{ marginRight: 8, color: '#666' }} />
                  <a href={`mailto:${currentUser?.email}`}>
                    {currentUser?.email || 'pigStar@gmail.com'}
                  </a>
                </div>
              </div>
            </Col>
          </Row>

          {/* 底部按钮 */}
          <Divider />
          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={goBack} size="large">
                取消
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<EditOutlined />}
                size="large"
              >
                保存更改
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default EditProfilePage;
