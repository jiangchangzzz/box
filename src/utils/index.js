// 召唤好友
export const callFriend = (userId) => {
  return {
    title: "box 召唤好友",
    path: `/pages/index/main?userid=${userId}`,
    imageUrl: "../../static/box.png"
  }
};

// 分享主页
export const shareIndex = () => {
  return {
    title: "Beats Maker",
    path: "/pages/index/main",
    imageUrl: "../../static/box.png"
  }
}