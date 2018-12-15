const shareImg = "../../static/box.png";

// 召唤好友
export const callFriend = (userId) => {
  return {
    title: "box 召唤好友",
    path: `/pages/index/main?userid=${userId}`,
    imageUrl: shareImg
  }
};

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