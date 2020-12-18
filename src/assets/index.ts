let cdn = "https://cdn.yryz.com/lovelorn/image/fatecard/";
let local = "/assets/images/";
/**
 * 线下码扫码id前缀
 */
export let qrcode_base = "https://m.yryz.com/applet/yuancome?id=";
/**
 * 嘉宾分享二维码 id前缀
 */
export const guest_qrcode = "https://m.yryz.com/applet/yuancome/homepage?kid=";

//
// mark: 图片资源 images/ 目录下面的路径和cdn保持一致 最好图片命名和导出保持一致
// ex:
// export const diary = {
//   // cdn
//   publish_diary_icon: realpath("diary/publish_diary_icon.png"),
//   // local
//   publish_diary_icon: realpath("diary/publish_diary_icon.png", true)
// };
// 引用：import { diary } from "@/assets/index";

/**
 *
 * @param path 相对路径
 * @param loc 不传或者传false取cdn，传true取local
 */
const realpath = (path: string, loc?: boolean) => {
  let res = loc ? local + path : cdn + path;
  console.log(res);
  if (loc) {
    require("@/assets/images/" + path);
  }
  return res;
};

const bgurl = {
  guest_default: "https://cdn.yryz.com/lovelorn/image/fatecard/common/guest-default-img.png",
}

export const steppagepng = {
  femalepng: realpath("steppagepng/female.png"),
  malepng: realpath("steppagepng/male.png"),
  guestOwn: realpath("steppagepng/guestOwn.png"),
  mother: realpath("steppagepng/mother.png"),
  friend: realpath("steppagepng/friend.png"),
  xuanze: realpath("steppagepng/xuanze.png"),
  steppage_bg: realpath("steppagepng/steppage-bg.png"),
  complete_ok: realpath("steppagepng/complete-ok.png"),
  complete_centbg: realpath("steppagepng/complete-centbg.png"),
  complete_bg: realpath("steppagepng/complete-bg.png"),
};

export const bindcode = {
  store_01: realpath("bindcode/store_01.png"),
  store_02: realpath("bindcode/store_02.png"),
  store_03: realpath("bindcode/store_03.png"),
  store: realpath("bindcode/store.png"),
  user: realpath("bindcode/user.png"),
  user_03: realpath("bindcode/user_03.png"),
  user_02: realpath("bindcode/user_02.png"),
  user_01: realpath("bindcode/user_01.png"),
};

export const register = {
  register: realpath("register/register.png"),
  register_01: realpath("register/register_01.png"),
  register_03: realpath("register/register_03.png"),
  register_02: realpath("register/register_02.png"),
};

export const common = {
  no_data_location: realpath("common/no_data_location.png"),
  weixin_logo: realpath("common/weixin-logo.png"),
  login_logo: realpath("common/logo.png"),
  login_bg: realpath("common/login-bg.png"),
  login_back: realpath("common/login-back.png"),
  bind_code_bg: realpath("common/bind-code-bg.png"),
  no_data: realpath("common/no-data.png"),
  no_scan: realpath("common/no-scan.png"),
  share: realpath("common/share.jpg"),
  add_img: realpath("common/add-img.png"),
  noMoreImage: realpath("common/no-more.png"),
  male_normal: realpath("common/male_normal.png"),
  male_selected: realpath("common/male_selected.png"),
  female_normal: realpath("common/female_normal.png"),
  female_selected: realpath("common/female_selected.png"),
  lineImg: realpath("common/line.png"),
  successIcon: realpath("common/successIcon.jpg"),
  headerBg: realpath("common/top-bg.png"),
  boy_icon_white: realpath("common/boy-icon-white.png"),
  girl_icon_white: realpath("common/girl-icon-white.png"),
  back_icon: realpath("common/back-icon.png"),
  watermark: realpath("common/watermark.png"),
  authenticationBg: realpath("common/authentication-bg.png"),
  authenticationImg1: realpath("common/authentication-img1.png"),
  authenticationImg2: realpath("common/authentication-img2.png"),
  authenticationImg3: realpath("common/authentication-img3.png"),
  authenticationImg4: realpath("common/authentication-img4.png"),
  authenticationImg5: realpath("common/authentication-img5.png"),
  authenticationImg6: realpath("common/authentication-img6.png"),
  caricon: realpath("common/car-icon.png"),
  cariconAcive: realpath("common/car-iconActive.png"),
  divorceicon: realpath("common/divorce-icon.png"),
  divorceiconActive: realpath("common/divorce-iconActive.png"),
  educationicon: realpath("common/education-icon.png"),
  educationiconActive: realpath("common/education-iconActive.png"),
  houseicon: realpath("common/house-icon.png"),
  houseiconActive: realpath("common/house-iconActive.png"),
  identityicon: realpath("common/identity-icon.png"),
  identityiconActive: realpath("common/identity-iconActive.png"),
};

export const main_index = {
  male_icon: realpath("main_index/male-icon.png"),
  famale_icon: realpath("main_index/famale-icon.png"),
  main_active: realpath("main_index/main-active.png"),
  main_unactive: realpath("main_index/main-unactive.png"),
  mine_active: realpath("main_index/mine-active.png"),
  mine_unactive: realpath("main_index/mine-unactive.png"),
  rank_list_selected: realpath("main_index/rank_list_selected.png"),
  rank_list_normal: realpath("main_index/rank_list_normal.png"),
  rec_in: realpath("main_index/rec_in.png"),
  rec_out: realpath("main_index/rec_out.png"),
  down_arrow: realpath("main_index/down-arrow.png"),
  mine_account: realpath("main_index/mine_account.png"),
  icon_shaixuan: realpath("main_index/icon-shaixuan.png"),

  icon_search: realpath("main_index/icon-search.png"),
  icon_search_grey: realpath("main_index/icon-search-grey.png"),
  icon_cancel: realpath("main_index/icon-cancel.png"),
  boy: realpath("main_index/boy.png"),
  girl: realpath("main_index/girl.png"),
  boy_icon: realpath("main_index/boy-icon.png"),
  girl_icon: realpath("main_index/girl-icon.png"),
  boy_icon_white: realpath("main_index/boy-icon-white.png"),
  girl_icon_white: realpath("main_index/girl-icon-white.png"),
  shade_bg: realpath("main_index/shade-bg.png"),
  banner: realpath("main_index/banner.jpg"),
  icon_filter: realpath("main_index/icon-filter.png"),
  fork: realpath("main_index/fork.png"),
  collect: realpath("main_index/collect.png"),
  add_icon: realpath("main_index/add-icon.png"),
  delect_icon: realpath("main_index/delect-icon.png"),
};

// 个人主页
export const homePage = {
  home: realpath("homepage/home.png"),
  ziliao: realpath("homepage/ziliao.png"),
  lib: realpath("homepage/lib.png"),
  apply_hong: realpath("homepage/apply_hong.png"),
  bianji: realpath("homepage/bianji.png"),
  my_right: realpath("homepage/my_right.png"),
  code: realpath("homepage/code.png"),
  code_logo: realpath("homepage/code_logo.png"),
  icon_phone: realpath("homepage/ic_phone.png"),
  gerenzhongxin: realpath("homepage/gerenzhongxin.png"),
  weixuanzhong: realpath("homepage/weixuanzhong.png"),
  xuanzhong: realpath("homepage/xuanzhong.png"),
  empty: realpath("homepage/ic_empty.png"),
  phone_white: realpath("homepage/phone-white.png"),
  share_wechat: realpath("homepage/share_wechat.png"),
  share_wechat_moment: realpath("homepage/share_wechat_moment.png"),
  recommend_left: realpath("homepage/recommend_left.png"),
  recommend_right: realpath("homepage/recommend_right.png"),
  marriage: realpath("homepage/marriage.png"),
  income: realpath("homepage/income.png"),
  height: realpath("homepage/height.png"),
  gender_male: realpath("homepage/gender_male.png"),
  gender_female: realpath("homepage/gender_female.png"),
  birthday: realpath("homepage/birthday.png"),
  poster_logo: realpath("homepage/poster_logo1.png"),
  prompt_selected: realpath("homepage/prompt_selected.png"),
  poster_bg_1: realpath("homepage/poster_bg_1.png"),
  poster_bg_2: realpath("homepage/poster_bg_2.png"),
  poster_location: realpath("homepage/poster_location.png"),
  share_guide_moment: realpath("homepage/share_guide_moment.png"),
  guide_in_moment: realpath("homepage/guide_in_moment.png"),
  poster_rectBg1: realpath("homepage/poster_rectBg1.png"),
  poster_rectBg2: realpath("homepage/poster_rectBg2.png"),
  poster_rectBigBg: realpath("homepage/poster_rectBigBg.png"),
};

export const mine = {
  applyBgImg: realpath("mine/bg.png"),
  c_leftIcon: realpath("mine/header-left.png"),
  c_rightIcon: realpath("mine/header-right.png"),
};
