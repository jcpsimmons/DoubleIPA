import React, { useState, useEffect } from "react";

import _ from "lodash";

import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function ResultsBlock(props) {
  const classes = useStyles();

  const [skuData, setSkuData] = useState("");
  const [skuFound, setSkuFound] = useState(false);

  const getSkuData = () => {
    axios
      .get(`https://www.livingspaces.com/api/restfulproducts?pid=${props.sku}`)
      .then(res => {
        if (res.data.numFound !== 0) {
          setSkuFound(true);
          setSkuData(res.data.products[0]);
        }
      });
  };

  useEffect(() => {
    getSkuData();
  }, []);

  // mapSkus = () => {};

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row">
                Item
              </TableCell>
              <TableCell component="th" scope="row">
                Data
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(skuData).map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{_.startCase(data)}</TableCell>
                  <TableCell>
                    {skuData[data] ? skuData[data].toString() : ""}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
