import novel1 from "@/assets/novel-1-cover.jpg";
import novel2 from "@/assets/novel-2.jpg";
import mecha1 from "@/assets/mecha-1.jpg";
import mecha2 from "@/assets/mecha-2.jpg";
import mecha3 from "@/assets/mecha-3.jpg";
import photo4 from "@/assets/photo-4.jpg";

export type Platform = "番茄小说" | "七猫小说";

export interface BookLink {
  platform: Platform;
  /** Real reading URL. Leave empty string when the link is not yet available. */
  url: string;
}

export interface Book {
  index: string;
  status: string;
  title: string;
  genre: string;
  tagline: string;
  synopsis: string;
  cover: string;
  coverAlt: string;
  links: BookLink[];
}

export const books: Book[] = [
  {
    index: "NO.01",
    status: "连载中",
    title: "重生断亲后，假千金全家悔疯了",
    genre: "现代都市 · 重生 · 真假千金 · 断亲逆袭",
    tagline: "她把所有算计原路退回，把亲情这本账，一笔一笔清算。",
    synopsis:
      "重活一世，她不再是那个被豪门收养、努力讨好的乖顺假千金。撕破温情表象，她主动断亲，走出金丝笼；曾经辜负她、算计她的家族，从疑惑到崩溃，一步一步悔到发疯。都市豪门、家族棋局、职场翻身、感情克制——所有人都会看清：她值得的，从来不是残羹冷炙。",
    cover: novel1,
    coverAlt: "《重生断亲后，假千金全家悔疯了》封面",
    links: [{ platform: "番茄小说", url: "" }],
  },
  {
    index: "NO.02",
    status: "连载中",
    title: "皇兄送我去和亲，我扶战损质子破局",
    genre: "古言 · 和亲 · 权谋 · 战损质子 · 乱世破局",
    tagline: "他被弃于风雪，她被送入敌国，两个残局，合成一盘活棋。",
    synopsis:
      "皇兄一道诏书，把她送去和亲，塞外风雪迎接她的，是一个满身战伤、被本国抛弃的年轻质子。她本应认命，他本应赴死；她偏要看看，两个被弃子的人，能不能在敌国的棋盘上，为自己扳回一局。宫阙、边塞、旌旗、暗涌——权谋徐徐展开，锋芒藏于袖间。",
    cover: novel2,
    coverAlt: "《皇兄送我去和亲，我扶战损质子破局》封面",
    links: [{ platform: "七猫小说", url: "" }],
  },
];

export interface VideoItem {
  id: string;
  label: string;
  caption: string;
  poster: string;
  /**
   * Optional MP4/HLS source. When empty, the player shows a
   * "video not connected" state instead of a broken control bar.
   */
  src?: string;
}

export const videos: VideoItem[] = [
  { id: "morph-01", label: "MECHA MORPH / 01", caption: "重工·苏醒", poster: mecha1, src: "" },
  { id: "morph-02", label: "MECHA MORPH / 02", caption: "核心·点亮", poster: mecha2, src: "" },
  { id: "morph-03", label: "MECHA MORPH / 03", caption: "跪拜·圣所", poster: mecha3, src: "" },
];

export interface GalleryItem {
  src: string;
  alt: string;
  meta: string;
  /** Column span on the 12-col editorial grid at md+. */
  span: "full" | "half" | "third" | "twoThird" | "fiveTwelfth" | "sevenTwelfth";
  ratio: string;
  width: number;
  height: number;
}

/**
 * Vivo 摄影公开作品，本地静态存放于 public/images/photography/
 * 原始比例保留，alt 文本使用中性画面描述。
 */
export const galleryItems: GalleryItem[] = [
  {
    src: "/images/photography/vivo-3.webp",
    alt: "开阔的城市远景，天空占据画面上部",
    meta: "City · Skyline",
    span: "full",
    ratio: "aspect-[598/384]",
    width: 598,
    height: 384,
  },
  {
    src: "/images/photography/vivo-2.webp",
    alt: "竖幅光影记录",
    meta: "Light · Frame",
    span: "third",
    ratio: "aspect-[597/883]",
    width: 597,
    height: 883,
  },
  {
    src: "/images/photography/vivo-6.webp",
    alt: "竖幅街巷光影",
    meta: "Street · Light",
    span: "third",
    ratio: "aspect-[597/881]",
    width: 597,
    height: 881,
  },
  {
    src: "/images/photography/vivo-5.webp",
    alt: "竖幅生活切片",
    meta: "Life · Slice",
    span: "third",
    ratio: "aspect-[600/886]",
    width: 600,
    height: 886,
  },
  {
    src: "/images/photography/vivo-1.webp",
    alt: "横幅景观记录",
    meta: "Scene · Wide",
    span: "half",
    ratio: "aspect-[599/516]",
    width: 599,
    height: 516,
  },
  {
    src: "/images/photography/vivo-4.webp",
    alt: "横幅光影切片",
    meta: "Light · Wide",
    span: "half",
    ratio: "aspect-[598/513]",
    width: 598,
    height: 513,
  },
];

/** 外部完整作品页（vivo 摄影） */
export const vivoGalleryUrl =
  "https://gallery.vivo.com.cn/galleryh5static/index.html?#/user/661532516758";

export const about = {
  heading: "关于我",
  eyebrow: "About · Jiang",
  paragraphs: [
    "我是 Jiang，一个喜欢在文字里造世界、在光影里记远方的普通创作者。",
    "白天写小说，把脑子里翻涌的重生、权谋、都市与古代故事一点点落成章节，目前在番茄小说和七猫小说各有一部作品在连载。",
    "闲下来的时候，我会背着相机走走停停，把夜色里的城市、江南的水与远方山川，安静地收进画面。",
  ],
};

export const contact = {
  name: "Jiang",
  /**
   * Real WeChat QR image path. Leave empty until a real QR is provided —
   * the UI shows a "待补充" state instead of displaying a placeholder.
   */
  wechatQrSrc: "",
  wechatQrAlt: "Jiang 的微信二维码",
  /** Only real, working links belong here. Empty list renders 待补充. */
  socials: [] as { key: string; label: string; href: string }[],
};

export const navSections = [
  { id: "top", label: "首页" },
  { id: "novels", label: "小说作品" },
  { id: "gallery", label: "风景摄影" },
  { id: "about", label: "关于我" },
  { id: "contact", label: "联系" },
];