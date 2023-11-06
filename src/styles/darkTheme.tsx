import image from "../assets/images/bg-desktop-dark.jpg";
import imgTheme from "../assets/images/icon-sun.svg";
import imgChecker from "../assets/images/icon-check.svg";
import bgImgMobil from "../assets/images/bg-mobile-dark.jpg";

export default function darkTheme() {
  return {
    bg: "hsl(240, 20%, 12%)",
    bg_image: image,
    bg_image_mobil: bgImgMobil,
    card_bg: "hsl(235, 24%, 19%)",
    acitve_link: "hsl(220, 98%, 61%)",
    active_link_hover: "hsl(0, 0%, 100%)",
    text_clr: "hsl(234, 39%, 85%)",
    shadow: "hsl(0, 0%, 0%)",
    text_line_through: "hsl(237, 13%, 30%)",
    scrollbar: "#8389be",
    gradient_check: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
    image_theme: imgTheme,
    image_checker: imgChecker,
  };
}
