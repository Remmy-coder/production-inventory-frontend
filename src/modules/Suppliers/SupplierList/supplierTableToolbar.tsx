import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { alpha } from "@mui/material/styles";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";

interface SupplierTableToolbarProp {
  numberSelected: number;
}

const SupplierTableToolbar = (props: SupplierTableToolbarProp) => {
  const { numberSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numberSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numberSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%", fontSize: 15 }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numberSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%", fontSize: 15, fontWeight: "bold" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          List of suppliers
        </Typography>
      )}
      {numberSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteRoundedIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListRoundedIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default SupplierTableToolbar;
