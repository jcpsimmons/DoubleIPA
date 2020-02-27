import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ResultsBlock(props) {
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
      <ul>
        {skuFound
          ? Object.keys(skuData).map((data, index) => {
              return (
                <li key={index}>
                  {data}:{skuData[data] ? skuData[data].toString() : ""}
                </li>
              );
            })
          : "sku not found"}
      </ul>
    </div>
  );
}
