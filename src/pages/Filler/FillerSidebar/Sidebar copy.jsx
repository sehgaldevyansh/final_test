/* v8 ignore start */

// Sidebar.jsx
import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, Collapse, Badge, Box } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Sidebar = ({ data, onPartClick }) => {
    const [open, setOpen] = useState(true);
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
  
    const handleBlockClick = (block) => {
      setSelectedBlock(selectedBlock === block ? null : block);
      setSelectedVariant(null);
    };
  
    const handleVariantClick = (variant) => {
      setSelectedVariant(selectedVariant === variant ? null : variant);
    };
  
    const handlePartClick = (part) => {
      onPartClick(part);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  
    return (
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' } }} open={open}>
        <List>
          {data?.map((block) => (
            <div key={block.baseModel}>
              {block.blocks.map((blockItem) => (
                <div key={blockItem.blockCode}>
                  <ListItem button onClick={() => handleBlockClick(blockItem)}>
                    <ListItemText primary={blockItem.blockCode} />
                    {selectedBlock === blockItem ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={selectedBlock === blockItem} timeout="auto" unmountOnExit>
                    <List style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" ,justifyContent:'space-around'}}>
                      {blockItem.variants.map((variant) => (
                        <Badge
                          key={variant.variant}
                          badgeContent={variant.variant}
                          color="primary"
                          sx={{ marginRight: 1, cursor: "pointer" }}
                          onClick={() => handleVariantClick(variant)}
                        />
                      ))}
                    </List>
                    <Collapse in={selectedVariant !== null} timeout="auto" unmountOnExit>
                      <List>
                        {selectedVariant &&
                          selectedVariant.levels[0].parentPart.childParts.map((part) => (
                            <ListItem key={part.partNo} button onClick={() => handlePartClick(part)}>
                              {part.partNo}
                            </ListItem>
                          ))}
                      </List>
                    </Collapse>
                  </Collapse>
                </div>
              ))}
            </div>
          ))}
        </List>
      </Drawer>
    );
  };
  
  export default Sidebar;
/* v8 ignore stop */
