function checkSubmitModelData(modelData) {
    // const modelData = json.modelData;
    console.log("checker hitted", modelData?.modelData);
    const generalInfo = modelData?.modelData?.General_info;
    console.log("checker hitted", generalInfo);
    for (const property in generalInfo) {
      if (
        generalInfo.hasOwnProperty(property) &&
        typeof generalInfo[property] !== "string" &&
        typeof generalInfo[property] !== "number"
      ) {
        console.log(`Error: "${property}" should not be Empty.`);
        if (property == "Type") {
          return { check: false, message: `Error: Level should not be empty.` };
        } else {
          return {
            check: false,
            message: `Error: "${property}" should not be empty.`,
          };
        }
      }
    }
    const milestones = modelData?.modelData?.Milestones;
    for (const milestone in milestones) {
     
      if (milestones.hasOwnProperty(milestone)) {
        // Check Deadline
        if (
          !milestones[milestone].hasOwnProperty("Deadline") ||
          !milestones[milestone]["Deadline"]
        ) {
          console.log(
            `Error: Milestone "${milestone}" is empty.`
          );
          return {
            check: false,
            message: `Error: Milestone "${milestone}" is empty.`,
          };
        }
      }
    }
    console.log("All checks passed successfully.");
    return { check: true, message: "All checks passed successfully." };
  }
  
  export { checkSubmitModelData };
  