
import * as React from "react";
import {
    Box,
    styled,
    Drawer as MuiDrawer,
    Button,

} from "@mui/material";

import { DrawerSettings } from "../drawerSettings";


import { useState } from "react";


const Drawer = styled(MuiDrawer)(({ anchor }) => ({
    display: anchor === "left" && "none",
    "& .MuiBackdrop-root": {
        background: anchor !== "left" && "transparent",
    },
    "@media (max-width: 1024px)": {
        display: anchor === "left" && "flex",
    },
}));
 function AnchorTemporaryDrawer({ anchor, icon, children,width }) {
     const [state, setState] = useState({
         left: false,
         right: false,
     });

     const toggleDrawer = (open) => (event) => {

         if (
             event.type === "keydown" &&
             (event.key === "Tab" || event.key === "Shift")
         ) {
             return;
         }

         setState({ ...state, [anchor]: open });
     };

     const list = () => (
         <Box
             sx={{
                 width: width,
             }}
             role="presentation"
             onClick={toggleDrawer(false)}
             onKeyDown={toggleDrawer(false)}
         >
             {children}
         </Box>
     );

     return (
         <div>
             <React.Fragment key={anchor}>
                 <Button
                     onClick={toggleDrawer(true)}
                     sx={{
                         width: "1rem",
                         minWidth: "19rem",
                         height: "3rem",
                         borderRadius: "50%",
                         color: "#637381",
                         fontSize: "2rem",
                         display: anchor === "left" && "none",
                         "@media (max-width: 1024px)": {
                             display: anchor === "left" && "flex",
                         },
                     }}
                 >
                     {icon}
                 </Button>
                 <Drawer
                     anchor={anchor}
                     open={state[anchor]}
                     onClose={toggleDrawer(false)}
                     sx={{ zIndex: "1300" }}
                 >
                     {list()}
                 </Drawer>
             </React.Fragment>
         </div>
     );
 }

export { AnchorTemporaryDrawer };
