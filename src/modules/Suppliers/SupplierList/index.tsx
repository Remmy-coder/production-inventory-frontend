import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import SupplierTableToolbar from "./supplierTableToolbar";
import SupplierTableHead from "./supplierTableHead";
import { ISupplierObject } from "../../../interfaces/supplier";
import { useGetAllSuppliersQuery } from "../../../services/supplierApi";
import stableSort from "../../../utils/stableSortFunction";
import descendingComparator from "../../../utils/descendingComparatorFunction";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { DeleteTwoTone, ModeEditTwoTone } from "@mui/icons-material";

type Order = "asc" | "desc";

function getComparator<Key extends keyof ISupplierObject>(
  order: Order,
  orderBy: Key
): (a: ISupplierObject, b: ISupplierObject) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const SupplierTable = () => {
  const [expandedRowId, setExpandedRowId] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] =
    React.useState<keyof ISupplierObject>("createdAt");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [supplierData, setSupplierData] = React.useState<
    Required<ISupplierObject[]>
  >([]);

  const { data: allSuppliersData } = useGetAllSuppliersQuery();

  React.useEffect(() => {
    if (allSuppliersData?.success) {
      setSupplierData(allSuppliersData.payload);
    }
  }, [allSuppliersData?.payload, allSuppliersData?.success]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ISupplierObject
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = supplierData.map((n) => n.id || "");
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleExpand = (rowId: string) => {
    setExpandedRowId((prevExpandedItems) => {
      if (prevExpandedItems[rowId]) {
        return { ...prevExpandedItems, [rowId]: false };
      }
      const updatedItems = { ...prevExpandedItems };
      Object.keys(updatedItems).forEach((key) => {
        updatedItems[key] = false;
      });
      updatedItems[rowId] = true;
      return updatedItems;
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const visibleRows = React.useMemo(
    () =>
      stableSort(supplierData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, supplierData]
  );

  return (
    <Box sx={{ marginTop: 10, width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <SupplierTableToolbar numberSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <SupplierTableHead
              numberSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              order={order}
              orderBy={orderBy}
              rowCount={supplierData.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id || "");
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <React.Fragment>
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{
                        cursor: "pointer",
                        "& > *": { borderBottom: "unset" },
                      }}
                    >
                      <TableCell
                        padding="checkbox"
                        onClick={(event) => handleClick(event, row.id || "")}
                      >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleClick(event, row.id || "")}
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleClick(event, row.id || "")}
                      >
                        {row.country}
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleClick(event, row.id || "")}
                      >
                        {row.state}
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleClick(event, row.id || "")}
                      >
                        <a>{row.website}</a>
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleClick(event, row.id || "")}
                      >
                        {new Date(row.createdAt).toDateString()}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() =>
                            row.id !== undefined && handleExpand(row.id)
                          }
                        >
                          {row.id !== undefined && expandedRowId[row?.id] ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={8}
                      >
                        <Collapse
                          in={row.id !== undefined && expandedRowId[row?.id]}
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
                                  {row.supplierContact.firstName}
                                </p>
                                <p>
                                  <span style={{ fontWeight: "bold" }}>
                                    Contact's Lastname:
                                  </span>{" "}
                                  {row.supplierContact.lastName}
                                </p>
                                <p>
                                  <span style={{ fontWeight: "bold" }}>
                                    Contact's Email:
                                  </span>{" "}
                                  {row.supplierContact.email}
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
                                  {`${row.supplierContact.dialcode} ${row.supplierContact.phoneNumber}`}
                                </p>
                                <p>
                                  <span style={{ fontWeight: "bold" }}>
                                    Supplier's Address:
                                  </span>{" "}
                                  {row.address}
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

                                <IconButton
                                  color="inherit"
                                  aria-label="settings"
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
                                    <DeleteTwoTone fontSize="small" />
                                  </Avatar>
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20, 25]}
          component="div"
          count={supplierData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default SupplierTable;
