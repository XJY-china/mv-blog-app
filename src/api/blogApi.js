// 博客API接口管理
import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: 'http://localhost:3001/api', // 后端API地址
  timeout: 10000, // 10秒超时
});

// 博客相关API
export const blogApi = {
  // 获取文章列表
  getArticles: () => api.get('/articles'),
  
  // 获取单篇文章
  getArticle: (id) => api.get(`/articles/${id}`),
  
  // 创建文章
  createArticle: (articleData) => api.post('/articles', articleData),
  
  // 更新文章
  updateArticle: (id, articleData) => api.put(`/articles/${id}`, articleData),
  
  // 删除文章
  deleteArticle: (id) => api.delete(`/articles/${id}`),
};