import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import tableStyle from 'assets/jss/material-dashboard-pro-react/components/tableStyle';
import { classesType } from 'types/global';

function CustomTable({ ...props }) {
  const {
    classes,
    tableHead,
    tableData,
    tableHeaderColor,
    hover,
    colorsColls,
    coloredColls,
    customCellClasses,
    customClassesForCells,
    striped,
    tableShopping,
    customHeadCellClasses,
    customHeadClassesForCells,
  } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead && tableHead.length > 0 ? (
          <TableHead className={classes[tableHeaderColor]}>
            <TableRow className={classes.tableRow}>
              {tableHead.map((prop, key) => {
                const tableCellClasses = `${classes.tableHeadCell} ${classes.tableCell} ${
                  cx({
                    [customHeadCellClasses[customHeadClassesForCells.indexOf(key)]]:
                      customHeadClassesForCells.indexOf(key) !== -1,
                    [classes.tableShoppingHead]: tableShopping,
                    [classes.tableHeadFontSize]: !tableShopping,
                  })}`;
                return (
                  <TableCell className={tableCellClasses} key={prop}>
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((tData, key) => {
            let rowColor = '';
            let rowColored = false;
            let prop = { ...tData };
            if (prop.color !== undefined) {
              rowColor = prop.color;
              rowColored = true;
              prop = prop.data;
            }
            const tableRowClasses = cx({
              [classes.tableRowHover]: hover,
              [classes[`${rowColor}Row`]]: rowColored,
              [classes.tableStripedRow]: striped && key % 2 === 0,
            });
            if (prop.total) {
              return (
                <TableRow key={`${prop.amount}-${prop.total}`} hover={hover} className={tableRowClasses}>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  />
                  <TableCell className={`${classes.tableCell} ${classes.tableCellTotal}`}>
                    Total
                  </TableCell>
                  <TableCell
                    className={`${classes.tableCell} ${classes.tableCellAmount}`}
                  >
                    {prop.amount}
                  </TableCell>
                  {tableHead.length - (prop.colspan - 0 + 2) > 0 ? (
                    <TableCell
                      className={classes.tableCell}
                      colSpan={tableHead.length - (prop.colspan - 0 + 2)}
                    />
                  ) : null}
                </TableRow>
              );
            }
            if (prop.purchase) {
              return (
                <TableRow key={`${prop.col.text}-${prop.purchase}`} hover={hover} className={tableRowClasses}>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  />
                  <TableCell
                    className={`${classes.tableCell} ${classes.right}`}
                    colSpan={prop.col.colspan}
                  >
                    {prop.col.text}
                  </TableCell>
                </TableRow>
              );
            }
            return (
              <TableRow
                key={prop}
                hover={hover}
                className={`${classes.tableRow} ${tableRowClasses}`}
              >
                {prop.map((childProp, idx) => {
                  const tableCellClasses = `${classes.tableCell} ${
                    cx({
                      [classes[colorsColls[coloredColls.indexOf(idx)]]]:
                        coloredColls.indexOf(idx) !== -1,
                      [customCellClasses[customClassesForCells.indexOf(idx)]]:
                        customClassesForCells.indexOf(idx) !== -1,
                    })}`;
                  return (
                    <TableCell className={tableCellClasses} key={childProp}>
                      {childProp}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
  hover: false,
  colorsColls: [],
  coloredColls: [],
  striped: false,
  customCellClasses: [],
  customClassesForCells: [],
  customHeadCellClasses: [],
  customHeadClassesForCells: [],
  tableShopping: false,
  tableHead: [],
  tableData: [],
};

CustomTable.propTypes = {
  classes: classesType.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
  tableData: PropTypes.arrayOf(PropTypes.node),
  hover: PropTypes.bool,
  coloredColls: PropTypes.arrayOf(PropTypes.number),
  colorsColls: PropTypes.arrayOf(PropTypes.number),
  customCellClasses: PropTypes.arrayOf(PropTypes.string),
  customClassesForCells: PropTypes.arrayOf(PropTypes.number),
  customHeadCellClasses: PropTypes.arrayOf(PropTypes.string),
  customHeadClassesForCells: PropTypes.arrayOf(PropTypes.number),
  striped: PropTypes.bool,
  tableShopping: PropTypes.bool,
};

export default withStyles(tableStyle)(CustomTable);
