const commonContainerStyles = {
  width: "100%",
  maxWidth: "1020px",
  display: "flex",
  justifyContent: "left",
  margin: "0 auto 40px",
  gap: "20px",
};

export const pageStyles = {
  image: {
    margin: "20px 0",
  },
  sorts: {
    ...commonContainerStyles,
    marginBottom: "60px",
  },
  items: {
    ...commonContainerStyles,
    flexWrap: "wrap",
  },
  characterDetails: {
    ...commonContainerStyles,
  },
  sortsLocations: {
    maxWidth: "846px",
  },
  sortsEpisodes: {
    maxWidth: "500px",
  },
  notFound: {
    fontSize: "4em",
    fontWeight: 500,
  },
};
