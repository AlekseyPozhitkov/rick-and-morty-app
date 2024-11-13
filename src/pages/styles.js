const commonContainerStyles = {
  width: "90%",
  maxWidth: "1020px",
  display: "flex",
  margin: "0 auto 40px",
  gap: "20px"
};

export const pageStyles = {
  image: {
    margin: "0 auto 20px",
    maxWidth: "90%"
  },
  sorts: {
    ...commonContainerStyles,
    justifyContent: "center",
    marginBottom: { xs: "35px", sm: "60px" },
    gap: { xs: "16px", sm: "20px" }
  },
  items: {
    ...commonContainerStyles,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
    justifyContent: "center"
  },
  details: {
    ...commonContainerStyles,
    color: "#081f32",
    marginBottom: "0"
  },
  notFound: {
    fontSize: "4em",
    fontWeight: "500"
  },
  stackItem: {
    padding: "12px 16px",
    borderBottom: "1px solid rgba(33, 33, 33, 0.08)"
  },
  stackTitle: {
    fontWeight: "700",
    fontSize: "16px",
    marginBottom: "5px",
    margin: "0"
  },
  stackName: {
    fontWeight: "400",
    fontSize: "14px",
    color: "#6E798C",
    margin: "0"
  },
  header: {
    fontWeight: "500",
    fontSize: "20px",
    color: "#8e8e93",
    textAlign: "left",
    marginBottom: { xs: "16px", sm: "35px" }
  }
};
