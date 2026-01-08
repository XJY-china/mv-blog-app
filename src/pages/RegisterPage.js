import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  message,
  Row,
  Col
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined
} from '@ant-design/icons';

const { Title, Text, Link } = Typography;

function RegisterPage({ onRegister }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // 处理表单提交
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 检查密码确认
      if (values.password !== values.confirmPassword) {
        message.error('两次输入的密码不一致');
        setLoading(false);
        return;
      }
      
      // 调用父组件的注册函数
      await onRegister({
        username: values.username,
        email: values.email,
        password: values.password
      });
      
      message.success('注册成功！');
      navigate('/profile'); // 跳转到个人资料页
    } catch (error) {
      message.error('注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 跳转到登录页
  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Card
          style={{
            borderRadius: 8,
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
          }}
        >
          {/* 标题 */}
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <Title level={2}>创建新账户</Title>
            <Text type="secondary">加入我们，开始您的创作之旅</Text>
          </div>

          {/* 注册表单 */}
          <Form
            form={form}
            name="register"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
          >
            {/* 用户名 */}
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                { required: true, message: '请输入用户名' },
                { min: 3, max: 20, message: '用户名长度为3-20个字符' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' }
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#999' }} />}
                placeholder="请输入用户名"
              />
            </Form.Item>

            {/* 邮箱 */}
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: '#999' }} />}
                placeholder="请输入邮箱"
              />
            </Form.Item>

            {/* 手机号（可选） */}
            <Form.Item
              name="phone"
              label="手机号"
              rules={[
                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
              ]}
            >
              <Input
                prefix={<PhoneOutlined style={{ color: '#999' }} />}
                placeholder="请输入手机号（可选）"
              />
            </Form.Item>

            {/* 密码 */}
            <Form.Item
              name="password"
              label="密码"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6位' },
                { pattern: /^(?=.*[A-Za-z])(?=.*\d)/, message: '密码必须包含字母和数字' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#999' }} />}
                placeholder="请输入密码"
              />
            </Form.Item>

            {/* 确认密码 */}
            <Form.Item
              name="confirmPassword"
              label="确认密码"
              dependencies={['password']}
              rules={[
                { required: true, message: '请确认密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#999' }} />}
                placeholder="请再次输入密码"
              />
            </Form.Item>

            {/* 注册协议 */}
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                { required: true, message: '请阅读并同意用户协议' }
              ]}
            >
              <label>
                <input type="checkbox" style={{ marginRight: 8 }} />
                我已阅读并同意
                <Link href="#" style={{ margin: '0 4px' }}>《用户协议》</Link>
                和
                <Link href="#" style={{ marginLeft: 4 }}>《隐私政策》</Link>
              </label>
            </Form.Item>

            {/* 注册按钮 */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
              >
                注册
              </Button>
            </Form.Item>
          </Form>

          {/* 登录链接 */}
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Text type="secondary">已有账户？</Text>
            <Link 
              onClick={goToLogin}
              style={{ marginLeft: 8, fontWeight: 'bold' }}
            >
              立即登录
            </Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default RegisterPage;