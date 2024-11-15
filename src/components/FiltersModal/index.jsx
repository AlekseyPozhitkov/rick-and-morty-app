import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { ItemSelect } from "../ItemSelect";
import { modalStyle } from "./styles";

export default function FiltersModal({ filterOptions, filters, handleFilterChange, filterTypes }) {
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Синхронизируем локальные фильтры с глобальными при открытии модалки
  useEffect(() => {
    if (open) {
      setLocalFilters(filters);
    }
  }, [open, filters]);

  // Обработчик для обновления локальных фильтров
  const handleLocalFilterChange = (filterType, value) => {
    setLocalFilters({
      ...localFilters,
      [filterType]: value || ""
    });
  };

  const applyFilters = () => {
    handleFilterChange(localFilters);
    handleClose();
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen} sx={{ ...modalStyle.button, height: "56px" }}>
        <FilterListIcon sx={modalStyle.icon} />
        Advanced filters
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle.modal}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Filters</Typography>
            <CloseIcon onClick={handleClose} sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
          </Box>
          {filterTypes.map((filterType) => (
            <ItemSelect
              key={filterType}
              label={filterType[0].toUpperCase() + filterType.slice(1)}
              options={filterOptions[filterType]}
              value={localFilters[filterType] || ""}
              onChange={(value) => handleLocalFilterChange(filterType, value)}
              sx={{ box: { display: "block" } }}
            />
          ))}
          <Button
            variant="contained"
            onClick={applyFilters}
            sx={{ ...modalStyle.button, width: "100%", mt: 2 }}
          >
            Apply
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
