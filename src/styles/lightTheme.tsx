import image from "../assets/images/bg-desktop-light.jpg";
import imgTheme from "../assets/images/icon-moon.svg";
import imgChecker from "../assets/images/icon-check.svg";
import bgImgMobil from "../assets/images/bg-mobile-light.jpg";

export default function lightTheme() {
  return {
    bg: "hsl(0, 0%, 98%)",
    bg_image: image,
    bg_image_mobil: bgImgMobil,
    card_bg: "hsl(0, 0%, 100%)",
    acitve_link: "hsl(220, 98%, 61%)",
    active_link_hover: "hsl(233, 14%, 35%)",
    text_clr: "hsl(0, 0%, 0%)",
    shadow: "hsl(0, 0%, 0%)",
    text_line_through: "#8389beb9",
    scrollbar: "#8389be",
    gradient_check: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
    image_theme: imgTheme,
    image_checker: imgChecker,
  };
}
