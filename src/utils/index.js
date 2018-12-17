const shareImg = "../../static/logo1.png";

// 分享主页
export const shareIndex = () => {
  return {
    title: "Beats Maker",
    path: "/pages/index/main",
    imageUrl: shareImg
  }
}

// 分享作品
export const shareWork = (name) => {
  return {
    title: `我在Beats Maker创作了${name}, 快来试试看吧~`,
    path: "/pages/index/main",
    imageUrl: shareImg
  }
}

// 获取一个随机数
export const randInt = (start, end) => {
  return Math.floor(start + Math.random() * (end - start + 1));
};