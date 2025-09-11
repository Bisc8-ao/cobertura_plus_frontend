
import * as React from "react";
import {
    Box,
    styled,
    Drawer as MuiDrawer,
    Button,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";


import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
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
 function AnchorTemporaryDrawer({ anchor, icon }) {
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
                 width: 320,
             }}
             role="presentation"
             onClick={toggleDrawer( false)}
             onKeyDown={toggleDrawer( false)}
         >
             <List>
                 {["Inbox", "Starred", "Send email", "Drafts"].map(
                     (text, index) => (
                         <ListItem key={text} disablePadding>
                             <ListItemButton>
                                 <ListItemIcon>
                                     {index % 2 === 0 ? (
                                         <InboxIcon />
                                     ) : (
                                         <MailIcon />
                                     )}
                                 </ListItemIcon>
                                 <ListItemText primary={text} />
                             </ListItemButton>
                         </ListItem>
                     )
                 )}
             </List>
             <Divider />
             <List>
                 {["All mail", "Trash", "Spam"].map((text, index) => (
                     <ListItem key={text} disablePadding>
                         <ListItemButton>
                             <ListItemIcon>
                                 {index % 2 === 0 ? (
                                     <InboxIcon />
                                 ) : (
                                     <MailIcon />
                                 )}
                             </ListItemIcon>
                             <ListItemText primary={text} />
                         </ListItemButton>
                     </ListItem>
                 ))}
             </List>
         </Box>
     );

     return (
         <div>
             <React.Fragment key={anchor}>
                 <Button
                     onClick={toggleDrawer(true)}
                     sx={{
                         width: "1rem",
                         minWidth: "3rem",
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
