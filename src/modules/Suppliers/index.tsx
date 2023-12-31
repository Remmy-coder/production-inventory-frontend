import { LocalShippingRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import SupplierTable from "./SupplierList";
import CreateSupplier from "./SupplierForm/CreateSupplier";

const Suppliers = () => {
  const [openCreateDialog, setOpenCreateDialog] =
    React.useState<boolean>(false);

  const [isEditingSupplier, setIsEditingSupplier] =
    React.useState<boolean>(false);

  const handleClickOpenCreateDialog = (): void => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
    setIsEditingSupplier(false);
  };

  const handleStartIsEditingSupplier = () => {
    setIsEditingSupplier(true);
    setOpenCreateDialog(true);
  };

  return (
    <Box component="main">
      <Typography
        fontWeight="bold"
        component="h2"
        variant="h5"
        sx={{
          letterSpacing: "5px",
        }}
      >
        Suppliers
      </Typography>
      <Button
        sx={{
          mt: 3,
          backgroundColor: "slateblue",
          float: "right",
        }}
        variant="contained"
        size="medium"
        startIcon={<LocalShippingRounded />}
        onClick={handleClickOpenCreateDialog}
      >
        Add Supplier
      </Button>
      <SupplierTable
        handleStartIsEditingSupplier={handleStartIsEditingSupplier}
      />
      <CreateSupplier
        openCreateDialog={openCreateDialog}
        isEditingSupplier={isEditingSupplier}
        handleCloseCreateDialog={handleCloseCreateDialog}
      />
    </Box>
  );
};

export default Suppliers;
