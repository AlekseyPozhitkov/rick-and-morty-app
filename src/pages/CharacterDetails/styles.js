export const detailsStyles = {
  stack: {
    width: "100%",
    maxWidth: "413px",
    textAlign: "start"
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    borderRadius: "5px",
    "&:hover": { backgroundColor: "#f6f6f6" }
  },
  image: {
    borderRadius: "50%",
    maxWidth: { xs: "200px", sm: "300px" },
    marginTop: { xs: "0", sm: "-50px" }
  },
  date: {
    fontWeight: "500",
    fontSize: "10px",
    textTransform: "uppercase",
    color: "#8E8E93",
    letterSpacing: "1.5px"
  },
  episodes: {
    maxHeight: "352px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  },
  arrow: {
    color: "#8E8E93",
    margin: "5px",
    fontSize: "15px"
  },
  name: {
    marginBottom: { xs: "32px", sm: "42px" },
    fontSize: { xs: "32px", sm: "48px" }
  },
  informations: {
    justifyContent: "center",
    gap: { xs: "50px" }
  }
};
