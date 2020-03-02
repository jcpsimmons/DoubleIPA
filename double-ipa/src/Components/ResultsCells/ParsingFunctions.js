import React, { useState, useEffect } from "react";
import { Chip } from "@material-ui/core";

import axios from "axios";

function FormatUrl(props) {
  return <a href={props.url}>{props.url}</a>;
}

function FormatParentSkus(props) {
  const [skuData, setSkuData] = useState([]);

  const getSkuData = () => {
    axios
      .get(
        `https://www.livingspaces.com/api/restfulproducts?pid=${props.skuString}`
      )
      .then(res => {
        if (res.data.numFound !== 0) {
          console.log(res.data.products);
          setSkuData(res.data.products);
        }
      });
  };

  useEffect(() => {
    getSkuData();
  }, []);

  return skuData.map(sku => {
    return (
      <Chip
        label={sku.title}
        color="primary"
        component="a"
        href={sku.url}
        target="_blank"
        clickable
      />
    );
  });
}

function FormatRelatedCatPairs(props) {
  return props.pairs.map((pair, index) => {
    return (
      <Chip
        label={pair.title}
        color="primary"
        component="a"
        href={pair.url}
        target="_blank"
        clickable
      />
    );
  });
}

function FormatPrice(props) {
  return (
    <div>
      <Chip label={`MSRP: $${props.price.msrp}`} color="primary" />
      <Chip label={`Sale: $${props.price.salePrice}`} color="primary" />
    </div>
  );
}

function FormatImageTiles(props) {
  return props.imageArray.map(imageTile => {
    return <img src={imageTile.imageUrl} alt="" />;
  });
}

export {
  FormatImageTiles,
  FormatUrl,
  FormatRelatedCatPairs,
  FormatPrice,
  FormatParentSkus
};
