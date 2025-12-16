// 导入React的Hook
import { useState, useEffect, use } from 'react';
// 导入Ant Design消息组件
import { message } from 'antd';
// 导入本地存储工具
import { storage } from '../utils/storage';

// 定义自定义Hook：useBlog
export const useBlog = () => {
  // 文章列表状态
  const [articles, setArticles] = useState([]);
  // 加载状态
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  // 进度百分比
  const [currentOperation, setCurrentOperation] = useState('');

  // 加载文章列表的函数
  const loadArticles = async () => {
    setLoading(true);  // 开始加载
    try {
      // 从本地存储获取文章数据
      const data = storage.getArticles();
      // 更新文章列表状态
      setArticles(data);
    } catch (error) {
      // 错误处理：显示错误消息
      message.error('加载文章失败');
      console.error('加载文章失败:', error);
    } finally {
      setLoading(false);  // 结束加载
    }
  };

  // 创建文章的函数
  const createArticle = async (articleData) => {
    setLoading(true);  // 开始加载
     setCurrentOperation('发布文章'); // 设置操作描述
     setProgress(10); // 开始进度
    try {
      // 模拟进度更新30%
      setProgress(30);
      // 保存文章到本地存储
      const newArticle = storage.saveArticle(articleData);
      // 模拟进度更新70%
      setProgress(70);
      // 更新文章列表（新文章添加到开头）
      setArticles(prev => [newArticle, ...prev]);
      // 模拟进度更新100%
      setProgress(100);
      // 显示成功消息
      message.success('文章发布成功');
      // 延迟后清空进度
      setTimeout(() => {
      setProgress(0);
      setCurrentOperation('');
    }, 500);
    
    return newArticle;
 } catch (error) {
    // 错误时也清空进度
    setProgress(0);
    setCurrentOperation('');
    // ... 原有错误处理
  }finally {
    setLoading(false);
  } 
};


  // 删除文章的函数
  const deleteArticle = async (id) => {
    setLoading(true);  // 开始加载
    try {
      // 从本地存储删除文章
      storage.deleteArticle(id);
      // 更新文章列表（过滤掉被删除的文章）
      setArticles(prev => prev.filter(article => article.id !== id));
      // 显示成功消息
      message.success('文章删除成功');
      return true;
    } catch (error) {
      // 错误处理：显示错误消息
      message.error('删除文章失败');
      console.error('删除文章失败:', error);
      // 抛出错误供调用者处理
      throw error;
    } finally {
      setLoading(false);  // 结束加载
    }
  };

  // 组件挂载时加载文章列表
  useEffect(() => {
    loadArticles();
  }, []);  // 空依赖数组表示只在组件挂载时执行一次

  // 返回对象，供组件使用
  return {
    articles,  // 文章列表
    loading,  // 加载状态
    progress,  // 进度条
    currentOperation,  // 当前操作
    loadArticles,  // 加载文章函数
    createArticle,  // 创建文章函数
    deleteArticle,  // 删除文章函数
  };
};