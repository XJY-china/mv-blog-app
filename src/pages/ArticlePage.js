import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, Typography, Divider, Tag } from 'antd';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import storage from '../utils/storage';   // 你本地已经有的文件

const { Title } = Typography;

function ArticlePage() {
    // 1. 取 /article/123 里的 123
    const { id } = useParams();
    // 2. 存真实文章
    const [article, setArticle] = useState(null);

    useEffect(() => {
      // 3.读本地
      console.log('① 要查的id:', id);
      const found = storage.getArticleById(id);
        console.log('② 查到结果:', found);
        setArticle(found);
    }, [id]);

    if (!article) return <p style={{ padding: 24 }}>加载中…</p>;
  
    

  return (
  <Card style={{ maxWidth: 800, margin: '0 auto', padding: 24 , wordBreak:'break-word',whiteSpace:'pre-wrap'}}>
    {/* 标题 */}
    <Title level={1}>{article.title}</Title>

    {/* 时间 */}
    <p style={{ color: '#999', marginBottom: 16 }}>
      {new Date(article.createdAt).toLocaleString()}
    </p>

    {/* 标签 */}
    {article.tags?.length > 0 && (
      <div style={{ marginBottom: 16 }}>
        {article.tags.map(t => (
          <Tag key={t} color="blue">{t}</Tag>
        ))}
      </div>
    )}

    <Divider />

    {/* 描述 */}
    {article.description && (
      <p style={{ fontSize: 16, marginBottom: 24 }}>{article.description}</p>
    )}

    {/* 正文 Markdown */}
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ 
        h1: ({node, ...props}) => <Title level={2} {...props} />,
        h2: ({node, ...props}) => <Title level={3} {...props} />,
        h3: ({node, ...props}) => <Title level={4} {...props} />,
        hr: ({node, ...props}) => <Divider />}}
        unwrapDisallowed={false}   // ① 保留换行    
        >
      {article.content}
    </ReactMarkdown>
  </Card>
);
}

export default ArticlePage;