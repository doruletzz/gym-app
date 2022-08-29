import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useId } from "react";

type PlanTableProps = {
  columns: Array<string>;
  rows: Array<Object>;
  caption?: string;
};

export const EnhancedTable = ({ columns, rows, caption }: PlanTableProps) => {
  const id = useId();

  return (
    <TableContainer>
      <Table aria-label="caption table right">
        {caption && <caption>{caption}</caption>}
        <TableHead>
          <TableRow>
            {columns.map((col, idx) => (
              <TableCell key={"col-" + id + idx}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={"row-" + id + idx}>
              {Object.entries(row).map(
                ([key, value]: [string, string], idx) => (
                  <TableCell key={"cell" + id + idx}>{value}</TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
            <TableRow>
              <TableCell align="right">{footing}</TableCell>
            </TableRow>
          </TableFooter> */}
      </Table>
    </TableContainer>
  );
};
