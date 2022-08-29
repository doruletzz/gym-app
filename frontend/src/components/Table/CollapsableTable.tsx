import { jsx } from "@emotion/react";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { ReactFragment, useState } from "react";

type CollapsableTableProps = {
  columns: Array<string>;
  rowsExpanded: Array<JSX.Element>;
  rowsCollapsed: Array<JSX.Element>;

  //   rows: Array<{
  //     expanded: JSX.Element;
  //     collapsed: JSX.Element;
  //   }>;
};

type CollapsableRowProps = {
  expanded: JSX.Element;
  collapsed: JSX.Element;
};

export const CollapsableRow = ({
  expanded,
  collapsed,
}: CollapsableRowProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ height: 12 }}>
        <TableCell width={24}>
          <Stack direction="row" gap={3}>
            <IconButton onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "<" : ">"}
            </IconButton>
            {collapsed}
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isOpen}>{expanded}</Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const CollapsableTable = ({
  columns,
  rowsCollapsed,
  rowsExpanded,
}: CollapsableTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        {/* <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead> */}
        <TableBody>
          {rowsCollapsed.map((rowC, idx) => (
            <CollapsableRow
              expanded={rowsExpanded[idx]}
              collapsed={rowC}
              key={idx}
            />
            // <TableRow>
            //   {rowsExpanded[idx]}
            //   <Collapse >{rowC}</Collapse>
            // </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
