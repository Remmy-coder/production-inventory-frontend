import React from "react";
import { ISupplierObject } from "../../../interfaces/supplier";
import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: keyof ISupplierObject;
  label: string;
  numeric: boolean;
}

interface SupplierTableHeadProps {
  numberSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ISupplierObject
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name of Supplier",
  },
  {
    id: "country",
    numeric: false,
    disablePadding: false,
    label: "Country",
  },
  {
    id: "state",
    numeric: false,
    disablePadding: false,
    label: "State",
  },
  {
    id: "website",
    numeric: false,
    disablePadding: false,
    label: "Website",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Registration Date",
  },
];

function SupplierTableHead(props: SupplierTableHeadProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numberSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler =
    (property: keyof ISupplierObject) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numberSelected > 0 && numberSelected < rowCount}
            checked={rowCount > 0 && numberSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default SupplierTableHead;
