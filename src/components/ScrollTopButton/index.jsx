import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fab, Zoom } from "@mui/material";
import { useEffect, useState } from "react";

import { scrollTopStyles } from "./styles";

export const ScrollTopButton = () => {
  const [show, setShow] = useState(false);

  // Показать кнопку при прокрутке вниз на 300px
  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Функция для прокрутки страницы наверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Zoom in={show}>
      <Fab sx={scrollTopStyles.fab} color="success" onClick={scrollToTop}>
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};
