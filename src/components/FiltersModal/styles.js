export const modalStyle = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "312px",
    width: "90%",
    maxHeight: "350px",
    height: "100%",
    bgcolor: "background.paper",
    borderRadius: "4px",
    boxShadow: 24,
    p: 2,
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  button: {
    display: { xs: "block", sm: "none" },
    position: "relative",
    width: "100%",
    backgroundColor: "#E3F2FD",
    color: "#2196F3",
    font: "Roboto",
    fontWeight: "500",
    fontSize: "14px"
  },
  icon: {
    position: "absolute",
    left: "16px",
    color: "#676e74"
  }
};
