import { Select } from "@mui/material";
import PropTypes from "prop-types";
import "./SingleRowTable.css";
import { useState } from "react";
const keysToInclude = [
  "bdmgName",
  "block",
  "level",
  "parentsPartNo",
  "dwgType",
  "partName",
  "qty",
  "sumQty",
  "aar",
];
const SingleRowTable = ({
  baseModel,
  headings,
  type,
  block,
  dataDetails,
  handleInputChange,
}) => {
  const [createNewPart, setCreateNewPart] = useState({
    baseModel: "",
    variantName: "",
    partNo: "",
    level: "",
    applicable: true,
    bdmgName: baseModel,
    block: block,
    parentsPartNo: "",
    dwgType: "",
    partName: "",
    qty: "",
    // "sumQty":"",
    aar: "",
  });

  const internalHandleInputChange = (e, key) => {
    setCreateNewPart((prevObject) => {
      const updatedObject = { ...prevObject, [key]: e?.target?.value };
      console.log("createnew", updatedObject);
      handleInputChange(updatedObject);
      return updatedObject;
    });
  };

  console.log("type in single row", dataDetails);
  return (
    <div className="p-4 w-full flex">
      <table className="w-full" style={{ borderCollapse: "separate" }}>
        <thead>
          <tr>
            {headings?.map((heading, index) => (
              <th
                style={{
                  paddingRight: "50px",
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "12px",
                  color: "#343536",
                }}
                key={index}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            {keysToInclude?.map((key, index) => (
              <td
                key={index}
                style={{
                  paddingRight: "50px",
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#9ea1a7",
                  height: type === "tpl" ? "20px" : "",
                  minHeight: "20px",
                }}
              >
                {dataDetails && dataDetails[key] !== undefined ? (
                  dataDetails[key] === "" ? (
                    type === "tpl" ? (
                      <Select
                        sx={{ height: "20px" }}
                        className="single-row-select-component"
                      ></Select>
                    ) : (
                      <input
                        value={createNewPart[key] || ""}
                        onChange={(e) => internalHandleInputChange(e, key)}
                        className="single-row-select-component"
                      />
                    )
                  ) : (
                    dataDetails[key]
                  )
                ) : type === "tpl" ? (
                  <Select className="single-row-select-component"></Select>
                ) : (
                  <input
                    value={createNewPart[key] || ""}
                    onChange={(e) => internalHandleInputChange(e, key)}
                    className="single-row-select-component"
                  />
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

SingleRowTable.propTypes = {
  headings: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  type: PropTypes.string,
};

export default SingleRowTable;
