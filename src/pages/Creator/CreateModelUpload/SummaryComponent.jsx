const SummaryComponent = ({ heading, numberOfRows, numberOfUniqueBlocks }) => {
  return (
    <div className="flex flex-col">
      <div className="">
        <p className="heading">{heading}</p>
      </div>
      <div className="flex">
        <div className="">Number of Rows {numberOfRows}</div>
        <div className="">Number of Unique Blocks {numberOfUniqueBlocks}</div>
      </div>
    </div>
  );
};

export default SummaryComponent;
