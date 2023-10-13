import "./App.css";
import StarRating from "./components/StarRating";
import { css } from "@emotion/css";
import { Table, useTheme2 } from "@grafana/ui";
import { useState, useEffect } from "react";
import {
  applyFieldOverrides,
  FieldType,
  MutableDataFrame,
  ThresholdsMode,
} from "@grafana/data";

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  const prepData = (data, theme) => {
    return applyFieldOverrides({
      data: data,
      fieldConfig: {
        overrides: [],
        defaults: {},
      },
      theme,
      replaceVariables: (value) => value,
    });
  };

  const defaultThresholds = {
    steps: [
      {
        color: "blue",
        value: 0,
      },
      {
        color: "green",
        value: 2.5,
      },
    ],
    mode: ThresholdsMode.Absolute,
  };

  const buildData = (theme) => {
    const data = new MutableDataFrame({
      fields: [
        {
          name: "Title",
          type: FieldType.string,
          values: [],
        },
        {
          name: "Description",
          type: FieldType.string,
          values: [],
          custom: {
            align: "center",
            width: 80,
          },
        },
        {
          name: "Price",
          type: FieldType.number,
          values: [],
          config: {
            unit: "currencyUSD",
            decimals: 0,
            custom: {
              align: "center",
              width: 100,
            },
          },
        },
        {
          name: "Discount",
          type: FieldType.number,
          values: [],
          config: {
            unit: "percent",
            decimals: 2,
            custom: {
              align: "center",
              width: 80,
            },
          },
        },
        {
          name: "Brand",
          type: FieldType.string,
          values: [],
          config: {
            custom: {
              align: "center",
            },
          },
        },
        {
          name: "Category",
          type: FieldType.string,
          values: [],
          config: {
            custom: {
              align: "center",
            },
          },
        },
        {
          name: "Rating",
          type: FieldType.string,
          values: [],
          config: {
            custom: {
              align: "center",
            },
          },
        },
        {
          name: "Stock",
          type: FieldType.number,
          values: [],
          config: {
            decimals: 0,
            custom: {
              align: "center",
              width: 100,
            },
          },
        },
      ],
    });

    function generateStarsHtml(ratingValue) {
      return <StarRating value={ratingValue} />;
    }

    products.forEach((product) => {
      const ratingValue = product.rating;
      const starsHtml = generateStarsHtml(ratingValue);

      data.appendRow([
        product.title,
        product.description,
        product.price,
        product.discountPercentage,
        product.brand,
        product.category,
        starsHtml,
        product.stock,
      ]);
    });

    return prepData([data], theme);
  };

  const theme = useTheme2();
  const data = buildData(theme);

  const style = css`
    width: 100%;
    height: 100%;
    padding: 30px;
    margin-left: 20px;
    background: #5d6d7e;
    color: #ffff;
  `;

  return (
    <div className={style}>
      <Table data={data[0]} height={800} width={1500} columnMinWidth={200} />
    </div>
  );
}
