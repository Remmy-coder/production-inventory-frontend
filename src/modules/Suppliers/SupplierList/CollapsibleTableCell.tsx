import { DeleteTwoTone, ModeEditTwoTone } from "@mui/icons-material";
import { Avatar, Collapse, Grid, IconButton, TableCell } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ISupplierObject } from "../../../interfaces/supplier";

interface ICollapsibleTableCell {
  row: ISupplierObject;
  expandedRowId: {
    [key: string]: boolean;
  };
  handleStartIsEditingSupplier: () => void;
}

const CollapsibleTableCell: React.FC<ICollapsibleTableCell> = (props) => {
  const handleClickEditIcon = () => {
    props.handleStartIsEditingSupplier()
  };
  return (
    <React.Fragment>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
        <Collapse
          in={props.row.id !== undefined && props.expandedRowId[props.row?.id]}
          timeout="auto"
          unmountOnExit
        >
          <Box
            sx={{
              margin: 1,
              paddingX: 4,
              paddingY: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p>
                  <span style={{ fontWeight: "bold" }}>
                    Contact's Firstname:
                  </span>{" "}
                  {props.row.supplierContact.firstName}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>
                    Contact's Lastname:
                  </span>{" "}
                  {props.row.supplierContact.lastName}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Contact's Email:</span>{" "}
                  {props.row.supplierContact.email}
                </p>
              </Grid>
              <Grid
                item
                xs={5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p>
                  <span style={{ fontWeight: "bold" }}>
                    Contact's Phone Number:
                  </span>{" "}
                  {`${props.row.supplierContact.dialcode} ${props.row.supplierContact.phoneNumber}`}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>
                    Supplier's Address:
                  </span>{" "}
                  {props.row.address}
                </p>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="settings"
                  onClick={handleClickEditIcon}
                >
                  <Avatar
                    sx={{
                      marginRight: 0,
                      backgroundColor: "white",
                      color: "slateblue",
                      height: 35,
                      width: 35,
                    }}
                  >
                    <ModeEditTwoTone fontSize="small" />
                  </Avatar>
                </IconButton>

                <IconButton color="inherit" aria-label="settings">
                  <Avatar
                    sx={{
                      marginRight: 0,
                      backgroundColor: "white",
                      color: "slateblue",
                      height: 35,
                      width: 35,
                    }}
                  >
                    <DeleteTwoTone fontSize="small" />
                  </Avatar>
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </TableCell>
    </React.Fragment>
  );
};

export default CollapsibleTableCell;
