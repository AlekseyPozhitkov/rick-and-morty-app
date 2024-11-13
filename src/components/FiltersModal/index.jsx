import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";

import { ItemSelect } from "../ItemSelect";
import { modalStyle } from "./styles";

export default function FiltersModal({ filterOptions, filters, handleFilterChange, filterTypes }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button
        color="primary"
        variant="contained"
        onClick={handleOpen}
        sx={{ ...modalStyle.button, height: "56px" }}
      >
        Advanced filters
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle.modal}>
          <Typography align="left" variant="h6">
            Filters
          </Typography>
          {filterTypes.map((filterType) => (
            <ItemSelect
              key={filterType}
              label={filterType[0].toUpperCase() + filterType.slice(1)}
              options={filterOptions[filterType]}
              value={filters[filterType] || ""}
              onChange={(value) => handleFilterChange(filterType, value)}
              sx={{ box: { display: "block" } }}
            />
          ))}
          <Button variant="contained" onClick={handleOpen} sx={{ ...modalStyle.button, mt: 2 }}>
            Apply
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
