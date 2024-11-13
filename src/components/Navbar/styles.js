export const navbarStyles = {
  appBar: {
    background: "#FFF",
    color: "#000",
    boxShadow: "-2px 0px 8px 2px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    position: "sticky"
  },
  toolbar: {
    height: "64px",
    width: "90%",
    maxWidth: "1020px",
    padding: "0",
    margin: "0 auto",
    justifyContent: "space-between"
  },
  navBox: {
    gap: { xs: "48px", sm: "24px" },
    flexDirection: { xs: "column", sm: "row" },
    position: { xs: "fixed", sm: "static" },
    top: "64px",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: { xs: "48px", sm: 0 },
    backgroundColor: { xs: "#FFF" },
    boxShadow: { xs: "inset -2px 0px 8px 2px rgba(0, 0, 0, 0.1)", sm: "none" }
  },
  navLink: {
    fontFamily: '"Karla", serif',
    fontOpticalSizing: "auto",
    fontWeight: "700",
    fontSize: "18px",
    textTransform: "capitalize",
    fontStyle: "normal"
  },
  burger: {
    display: { xs: "block", sm: "none" },
    padding: "0",
    margin: "0"
  }
};
