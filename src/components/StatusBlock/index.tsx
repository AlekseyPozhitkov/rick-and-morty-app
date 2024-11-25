import { Typography } from "@mui/material";

interface StatusBlockProps {
  isLoading: boolean;
  error: string | null;
  dataLength: number;
  noDataMessage: string;
}

export const StatusBlock = ({ isLoading, error, dataLength, noDataMessage }: StatusBlockProps) => {
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!isLoading && dataLength === 0) {
    return <Typography>{noDataMessage}</Typography>;
  }

  return null;
};
