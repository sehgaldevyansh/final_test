import PropTypes from "prop-types";

const LegendComponent = ({ mainText, legendItems }) => {
  console.log("Legend Items", legendItems);
  return (
    <div
      className="flex"
      style={{
        fontSize: "12px",
        padding: "4px 12px",
        gap: "10px",
        backgroundColor: "#fff",
        borderRadius: "20px",
      }}
    >
      <div className="">{mainText}</div>
      <div className="flex gap-2">
        {legendItems.map((legendItem, index) => {
          return (
            <p className="flex gap-1 items-center" key={index}>
              <div
                className=""
                style={{
                  background: legendItem.color,
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  border: legendItem.border ? legendItem.border : "none",
                }}
              ></div>
              <span>{legendItem.legendText}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
};

LegendComponent.propTypes = {
  mainText: PropTypes.string,
  legendItems: PropTypes.array,
};

export default LegendComponent;
