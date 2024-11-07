const commonContainerStyles = {
  width: "100%",
  maxWidth: "1020px",
  display: "flex",
  margin: "0 auto 40px",
  gap: "20px"
};

export const pageStyles = {
  image: {
    marginBottom: "20px"
  },
  sorts: {
    ...commonContainerStyles,
    marginBottom: "60px",
    justifyContent: "center"
  },
  items: {
    ...commonContainerStyles,
    flexWrap: "wrap",
    justifyContent: "left"
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
    textAlign: "left"
  }
};
