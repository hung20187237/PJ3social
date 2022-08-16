import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

function BasicStar() {

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="simple-controlled"
        defaultValue={0}
        max={1} 
        sx ={{fontSize: 20}}
      />
    </Box>
  );
}

export default BasicStar;