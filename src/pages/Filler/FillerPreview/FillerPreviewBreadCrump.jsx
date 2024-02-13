import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const FillerPreviewBreadCrump = ({ system = null, block = null, variant = null, part = null }) => {
    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ color: 'var(--base-text-color)', fontSize: '14px', backgroundColor: '#f4f5f8' }}>

            <Link color="inherit" style={{ textDecoration: 'none' }} onClick={() => console.log("Navigate to block")}>
                {block ? (<p>System <span style={{ fontWeight: '700' }}>({system})</span></p>) : "Block"}
            </Link>
            <Link color="inherit" style={{ textDecoration: 'none' }} onClick={() => console.log("Navigate to variant")}>
                {block ? (<p>Block <span style={{ fontWeight: '700' }}>({block})</span></p>) : "Variant"}
            </Link>
        </Breadcrumbs>
    );
};

export default FillerPreviewBreadCrump;
