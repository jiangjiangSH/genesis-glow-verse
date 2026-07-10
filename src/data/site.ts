import novel1 from "@/assets/novel-1.jpg";
import novel2 from "@/assets/novel-2.jpg";
import mecha1 from "@/assets/mecha-1.jpg";
import mecha2 from "@/assets/mecha-2.jpg";
import mecha3 from "@/assets/mecha-3.jpg";
import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";

export interface Book {
  index: string;
  platform: "番茄阅读" | "七猫小说";
  status: string;
  title: string;
  genre: string;
  tagline: string;
  synopsis: string;
  cover: string;
  coverAlt: string;
  /** Replace with the real reading URL when available. */
  readUrl: string;
}

export const books: Book[] = [
  {
    index: "NO.01",
    platform: "番茄阅读",
    status: "连载中",
    title: "重生断亲后，假千金全家悔疯了",
    genre: "现代都市 · 重生 · 真假千金 · 断亲逆袭",
    tagline: "她把所有算计原路退回，把亲情这本账，一笔一笔清算。",
    synopsis:
      "重活一世，她不再是那个被豪门收养、努力讨好的乖顺假千金。撕破温情表象，她主动断亲，走出金丝笼；曾经辜负她、算计她的家族，从疑惑到崩溃，一步一步悔到发疯。都市豪门、家族棋局、职场翻身、感情克制——所有人都会看清：她值得的，从来不是残羹冷炙。",
    cover: novel1,
    coverAlt: "《重生断亲后，假千金全家悔疯了》封面",
    readUrl: "https://fanqienovel.com/",
  },
  {
    index: "NO.02",
    platform: "七猫小说",
    status: "连载中",
    title: "皇兄送我去和亲，我扶战损质子破局",
    genre: "古言 · 和亲 · 权谋 · 战损质子 · 乱世破局",
    tagline: "他被弃于风雪，她被送入敌国，两个残局，合成一盘活棋。",
    synopsis:
      "皇兄一道诏书，把她送去和亲，塞外风雪迎接她的，是一个满身战伤、被本国抛弃的年轻质子。她本应认命，他本应赴死；她偏要看看，两个被弃子的人，能不能在敌国的棋盘上，为自己扳回一局。宫阙、边塞、旌旗、暗涌——权谋徐徐展开，锋芒藏于袖间。",
    cover: novel2,
    coverAlt: "《皇兄送我去和亲，我扶战损质子破局》封面",
    readUrl: "https://www.qimao.com/",
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
  /** Layout weight on the gallery grid. */
  span: "full" | "wide" | "tall";
  ratio: string;
}

export const galleryItems: GalleryItem[] = [
  {
    src: photo1,
    alt: "雨夜霓虹街，独行者背影",
    meta: "CITY · NIGHT",
    span: "full",
    ratio: "aspect-[16/9]",
  },
  {
    src: photo2,
    alt: "舞台聚光下的孤独轮廓",
    meta: "STAGE · LIGHT",
    span: "tall",
    ratio: "aspect-[4/5]",
  },
  {
    src: photo3,
    alt: "雨夜车窗边的暖调人像",
    meta: "PORTRAIT · RAIN",
    span: "tall",
    ratio: "aspect-[4/5]",
  },
  {
    src: photo4,
    alt: "江南水乡与现代天际线的对望",
    meta: "JIANGNAN · SKYLINE",
    span: "full",
    ratio: "aspect-[16/9]",
  },
];

export const contact = {
  name: "Jiang",
  wechatQrSrc: "/images/wechat-qr-placeholder.png",
  wechatQrAlt: "Jiang 的微信二维码",
  socials: [
    { key: "douyin", label: "抖音", href: "#" },
    { key: "xiaohongshu", label: "小红书", href: "#" },
    { key: "github", label: "GitHub", href: "#" },
  ],
};

export const navSections = [
  { id: "novels", label: "番茄与七猫" },
  { id: "gallery", label: "光影与人间" },
  { id: "contact", label: "连接与共创" },
];