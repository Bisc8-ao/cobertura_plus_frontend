import React,{useState} from 'react'
import { Backdrop, Button, Divider, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";


const Container = styled("div")({
    width: "30%",
    background:"#fff",
    borderRadius: "1.5rem",
    padding: "2rem 0",
    display: "flex",
    flexDirection: "column",
    gap:"1rem"
});

function Search() {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
  return (
      <React.Fragment>
          <div>
              <Button
                  onClick={handleOpen}
                  sx={(theme) => ({
                      background:
                          theme.palette.mode === "dark"
                              ? "#1d242c"
                              : "#919eab1c",

                      color:
                          theme.palette.mode === "dark"
                              ? "#75808a"
                              : "#1d1b208f",
                      borderRadius: "1.2rem",
                  })}
              >
                  <SearchIcon sx={{ fontSize: "2rem" }} />
              </Button>
              <Backdrop
                  sx={(theme) => ({
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: theme.zIndex.drawer + 1,
                  })}
                  open={open}
                  onClick={handleClose}
              >
                  <Container onClick={(e) => e.stopPropagation()}>
                      <Paper
                          component="form"
                          sx={{
                              p: "2px 4px",
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              boxShadow: "none",
                          }}
                      >
                          <IconButton
                              type="button"
                              sx={{ p: "10px" }}
                              aria-label="search"
                          >
                              <SearchIcon sx={{ fontSize: "2.4rem" }} />
                          </IconButton>
                          <InputBase
                              sx={{
                                  ml: 1,
                                  flex: 1,
                                  fontSize: "1.4rem",
                                  fontWeight: "800",
                              }}
                              placeholder="Search... "
                              inputProps={{
                                  "aria-label": "search ",
                              }}
                          />
                      </Paper>

                      <Divider />
                  </Container>
              </Backdrop>
          </div>
      </React.Fragment>
  );
}

export {Search}
