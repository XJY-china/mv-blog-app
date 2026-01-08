import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, message } from 'antd';
import storage from '../utils/storage';

const { TextArea } = Input;

function EditPage() {
  const { id } = useParams();          // ① 取 /edit/123 里的 123
  const nav = useNavigate();            // ② 保存完跳回首页
  const [form] = Form.useForm();        // ③ AntD 表单实例

  // ④ 进来第一件事：把旧文章填进表单
  useEffect(() => {
    const art = storage.getArticleById(id);
    if (art) {
      form.setFieldsValue(art);         // 标题、描述、内容、标签一次性回填
    } else {
      message.error('文章不存在');
      nav('/');
    }
  }, [id, form, nav]);

  // ⑤ 点“保存”
  const onFinish = (values) => {
    storage.updateArticle(id, values);  // 本地更新
    message.success('已保存');
    nav(`/article/${id}`);              // 保存完直接去查看页
  };

  return (
    <Card title="编辑文章" style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="标题" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="描述" name="description">
          <Input />
        </Form.Item>

        <Form.Item label="标签（用空格分隔）" name="tags">
          <Input placeholder="例如 react hooks" />
        </Form.Item>

        <Form.Item label="正文（支持 Markdown）" name="content" rules={[{ required: true }]}>
          <TextArea rows={20} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">保存</Button>
          <Button style={{ marginLeft: 16 }} onClick={() => nav(-1)}>取消</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default EditPage;