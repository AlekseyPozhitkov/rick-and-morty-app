import { SxProps } from "@mui/material";

export const cardStyles: Record<string, SxProps> = {
  card: {
    // width: "100%",
    // maxWidth: "240px",
    boxShadow:
      "0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.20)"
  },
  cardMedia: {
    maxHeight: "196px"
  },
  cardContent: {
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  typography: {
    margin: "0",
    fontSize: "14px",
    color: "rgba(0, 0, 0, 0.6)"
  },
  typographyTitle: {
    color: "rgba(0, 0, 0, 0.9)",
    fontWeight: "700",
    fontSize: "20px"
  },
  arrow: {
    fontSize: "15px",
    color: "#8E8E93",
    position: "absolute",
    right: "10px",
    margin: "5px",
    top: "calc(50% - 5px)",
    transform: "translateY(-50%)"
  }
};
