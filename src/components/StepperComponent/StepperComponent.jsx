import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@mui/material';

const StepperComponent = ({ variantList, baseModelList, onChange, keyRefresh }) => {
  const [selectedButton, setSelectedButton] = useState(0);
  console.log("dont hit me", variantList, "-", baseModelList);
  const handleVariantStepClick = (index) => {
    setSelectedButton(index);
    // console.log("keyRefresh",index);
    onChange && onChange(variantList[index]); // Trigger the onChange callback with the selected variant
  };
  const getBaseModel = (index) => {
    console.log("baseModelList", baseModelList)
    return baseModelList?.[index] || 'N/A'; // Provide a default value if baseModelList is undefined
  };

  useEffect(() => {
    // console.log("keyRefresh",keyRefresh);
    if (!isNaN(keyRefresh) && Number.isInteger(keyRefresh)) {//&& keyRefresh !== 0
      setSelectedButton(keyRefresh);
      console.log("keyRefresh", `${keyRefresh} is a string representation of an integer.`);
    }

  }, [keyRefresh])


  return (
    <Tabs
      value={selectedButton}
      onChange={(event, newValue) => setSelectedButton(newValue)}
      variant="scrollable"
      scrollButtons
      aria-label="visible arrows tabs example"
      TabIndicatorProps={{ hidden: true }}

      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: 0,
        maxWidth: '40%',
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        marginBottom: "8px",

        // flexWrap: "wrap",
        "& .MuiTabs-root": {
          justifyContent: "space-between",
          marginBottom: "4px",

        }

      }}
    >
      {variantList?.map((variant, index) => (
        <Tab

          key={index}
          // label={`${variant} (${getBaseModel(variant)})`}
          label={
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: '12px',
                  color: selectedButton === index ? '#fff' : '#484848',
                }}
              >
                {variant}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  color: selectedButton === index ? '#CECECE' : '#8F8F8F',
                }}
              >
                ({getBaseModel(index)})
              </span>
            </div>
          }
          value={variant}
          onClick={() => handleVariantStepClick(index)}
          style={{
            // borderRadius: '50%',
            width: '79px',
            height: '38px',
            backgroundColor: selectedButton === index ? '#171c8f' : '#e6e9f0',
            // color: selectedButton === index ? '#fff' : '#a7a7a7',
            padding: '10px',
            fontSize: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '30px',
            border: selectedButton === index ? `2px solid #171c8f` : "none",
            borderBottom: selectedButton === index ? "none" : "0px solid #e0e0e0",
            borderRadius: "8px 8px 0 0",

            minHeight: 0,
            // padding: "8px 8px"
          }}
        />
      ))}
    </Tabs>
  );
};

StepperComponent.propTypes = {
  variantList: PropTypes.array.isRequired,
  baseModelList: PropTypes.array.isRequired,
  onChange: PropTypes.func, // Add prop type for onChange callback
};

export default StepperComponent;
