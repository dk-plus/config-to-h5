
// 上线状态
export const ONLINE_STATUS = {
  ONLINE: 1, // 上线
  OFFLINE: 0, // 下线
};

// 模块类型
export const MODULE_TYPE = {
  ARTICLE: 1, // 文章
  BIG_IMAGE: 2, // 大图
  CAROUSEL: 3, // 轮播图
  IMAGE_TEXT: 4, // 图文
  POP_UP: 5, // 弹窗
  SHARE: 6, // 分享
  VIDEO: 7, // 视频
};

// 模块类型map
export const MODULE_TYPE_MAP = [{
  label: '文章',
  value: 1,
}, {
  label: '大图',
  value: 2,
}, {
  label: '轮播图',
  value: 3,
}, {
  label: '图文',
  value: 4,
}, {
  label: '弹窗',
  value: 5,
}, {
  label: '分享',
  value: 6,
}, {
  label: '视频',
  value: 7,
}];

// 活动类型
export const ACTIVITY_TYPE = {
  DAILY: 1,
  SPECIAL: 2,
};

// 活动类型map
export const ACTIVITY_TYPE_MAP = [{
  label: '日常活动',
  value: 1,
}, {
  label: '专题活动',
  value: 2,
}];