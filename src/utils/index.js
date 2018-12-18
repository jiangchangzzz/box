// 分享主页
export const shareIndex = () => {
  return {
    title: "Beats Maker",
    path: "/pages/index/main",
    imageUrl: "../../static/logo1.png"
  }
}

export const shareWork = (work) => {
    return {
      title: `我在Beats Maker创作了${work.name},快来试试看吧~`,
      path: `/pages/index/main?beatsmakerwork=${encodeURIComponent(JSON.stringify(work))}`,
      imageUrl: '../../static/logo1.png'
    } 
}

// 获取一个随机数
export const randInt = (start, end) => {
  return Math.floor(start + Math.random() * (end - start + 1));
};