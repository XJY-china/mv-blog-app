// 定义本地存储的键名
const STORAGE_KEY = 'blog_articles';

// 导出本地存储管理对象
export const storage = {
  // 获取所有文章的函数
  getArticles: () => {
    // 从localStorage获取数据
    const data = localStorage.getItem(STORAGE_KEY);
    // 解析JSON数据，如果没有数据则返回空数组
    return data ? JSON.parse(data) : [];
  },
  
  // 在 saveArticle 函数中修改：
saveArticle: (article) => {
  // 获取现有文章列表
  const articles = storage.getArticles();
  // 创建新文章对象
  const newArticle = {
    ...article,  // 展开传入的文章数据
    id: Date.now().toString(),  // 使用时间戳生成唯一ID
    tags: Array.isArray(article.tags) ? article.tags : [], // 确保tags是数组
    createdAt: new Date().toISOString(),  // 创建时间
    updatedAt: new Date().toISOString(),  // 更新时间
    // 添加默认统计字段
    views: article.views || 0,
    likes: article.likes || 0,
    comments: article.comments || 0
  };
    
    // 将新文章添加到列表开头
    articles.unshift(newArticle);
    // 保存到localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    // 返回新创建的文章
    return newArticle;
  },
  
  // 删除文章的函数
  deleteArticle: (id) => {
    // 获取现有文章列表
    const articles = storage.getArticles();
    // 过滤掉指定ID的文章
    const filtered = articles.filter(article => article.id !== id);
    // 保存过滤后的列表
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },
  
  // 更新文章的函数
  updateArticle: (id, updatedData) => {
    // 获取现有文章列表
    const articles = storage.getArticles();
    // 查找要更新的文章索引
    const index = articles.findIndex(article => article.id === id);
    
    // 如果找到文章
    if (index !== -1) {
      // 更新文章数据
      articles[index] = {
        ...articles[index],  // 保留原有数据
        ...updatedData,  // 合并更新数据
        updatedAt: new Date().toISOString(),  // 更新修改时间
      };
      // 保存到localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
      // 返回更新后的文章
      return articles[index];
    }
    // 如果没找到文章，返回null
    return null;
  },
  // 根据 id 拿一篇文章
  getArticleById(id) {
    const articles = this.getArticles();
    return articles.find(a => a.id === id);
  },
};


// 用户存储键
const USER_KEY = 'blog_current_user';

// 添加这些方法到现有的storage对象中：
storage.getCurrentUser = function() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

storage.updateCurrentUser = function(updatedData) {
  const currentUser = this.getCurrentUser();
  if (!currentUser) {
    throw new Error('用户未登录');
  }
  
  // 合并更新数据
  const updatedUser = {
    ...currentUser,
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };
  
  // 保存到localStorage
  localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  return updatedUser;
};

storage.logout = function() {
  localStorage.removeItem(USER_KEY);
};

export default storage;