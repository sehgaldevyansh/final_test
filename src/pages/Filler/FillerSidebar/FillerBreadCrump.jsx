import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const FillerBreadCrump = ({ system, block, variant, part }) => {
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ color: 'var(--base-text-color)', fontSize: '14px' }}>

      <Link color="inherit" style={{ textDecoration: 'none' }} onClick={() => console.log("Navigate to block")}>
        {block ? (<p>General Information for Block <span style={{ fontWeight: '700' }}>({block.blockName})</span></p>) : "Block"}
      </Link>
      <Link color="inherit" style={{ textDecoration: 'none' }} onClick={() => console.log("Navigate to variant")}>
        {variant ? (<p>Variant <span style={{ fontWeight: '700' }}>({variant.variantName})</span></p>) : "Variant"}
      </Link>
      <Typography sx={{ fontSize: '14px' }}>{part ? <p>Part :<span style={{ fontWeight: '700' }}> ({part})</span></p> : "Part"}</Typography>
    </Breadcrumbs>
  );
};

export default FillerBreadCrump;
