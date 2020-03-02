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
import LaunchIcon from "@material-ui/icons/Launch";

import {
  FormatRelatedCatPairs,
  FormatUrl,
  FormatImageTiles,
  FormatPrice,
  FormatParentSkus
} from "./ResultsCells/ParsingFunctions";

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
    <div style={{ marginTop: "3rem" }}>
      <h1>
        {skuData.title}{" "}
        <a href={skuData.url} target="_blank">
          <LaunchIcon />
        </a>
      </h1>
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
              let content = "";

              if (skuData[data]) {
                switch (data) {
                  case "url":
                  case "brandfolder360":
                    content = <FormatUrl url={skuData[data]} />;
                    break;

                  case "relatedCategoryPairs":
                    content = <FormatRelatedCatPairs pairs={skuData[data]} />;
                    break;

                  case "images":
                    content = <FormatImageTiles imageArray={skuData[data]} />;
                    break;

                  case "price":
                    content = <FormatPrice price={skuData[data]} />;
                    break;

                  case "height":
                  case "width":
                  case "depth":
                    content = skuData[data] + " in";
                    break;

                  case "parentSkus":
                    content = <FormatParentSkus skuString={skuData[data]} />;
                    break;

                  case "weight":
                    content = skuData[data] + " lbs";
                    break;

                  default:
                    content = skuData[data].toString();
                }
              }

              // Format the return
              return (
                <TableRow hover={true} key={index}>
                  <TableCell>{_.startCase(data)}</TableCell>
                  <TableCell> {content}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
