// 分享主页
export const shareIndex = () => {
  return {
    title: "Beats Killer",
    path: "/pages/index/main",
    // imageUrl: "../../static/share-logo.png"
  }
}

// 分享作品
export const shareWork = (work) => {
    return {
      title: `我在Beats Killer创作了${work.name},快来试试看吧~`,
      path: `/pages/index/main?beatsmakerwork=${encodeURIComponent(JSON.stringify(work))}`,
      // imageUrl: '../../static/share-logo.png'
    } 
}

// 获取一个随机数
export const randInt = (start, end) => {
  return Math.floor(start + Math.random() * (end - start + 1));
};

// 处理请求错误
export const handleError = (title='网络错误，请重试~') => {
  wx.showToast({
    title: title,
    icon: 'none'
  });
}