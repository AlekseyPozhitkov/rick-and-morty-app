export const selectStyles = {
  backdrop: {
    zIndex: (theme) => theme.zIndex.drawer + 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  box: {
    width: "100%",
    maxWidth: "240px"
  },
  select: {
    textAlign: "left"
  },
  menuProps: {
    PaperProps: {
      style: {
        maxHeight: "200px",
        overflowY: "auto"
      }
    }
  },
  menuItem: {
    textAlign: "left"
  }
};
