import React, { useState } from "react";
import { Button, Menu, MenuItem as MuiMenuItem, styled } from "@mui/material";
import { vectorImages } from "../../assets";
import { UseLangContext } from "../../hooks";

const MenuItem = styled(MuiMenuItem)({
    display: "flex",
    gap: "1rem",
    fontSize: "1.2rem",
    fontWeight: "700",
});

function MenuLang() {
    const { langSelected, setLangSelected } = UseLangContext();
    const [anchorEl, setAnchorEl] = useState(null);


    const open = Boolean(anchorEl);

    const flags = {
       "Português": vectorImages.flags.Pt_flag,
        "Inglês": vectorImages.flags.GB_flag,
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuItemClick = (lang) => {
        setLangSelected(lang);
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{
                        width: "1rem",
                        minWidth: "5rem",
                        height: "5rem",
                        borderRadius: "50%",
                    }}
                >
                    <img
                        src={flags[langSelected]}
                        alt={langSelected}
                        width={27}
                    />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => handleMenuItemClick(langSelected)}
                    slotProps={{
                        list: {
                            "aria-labelledby": "basic-button",
                        },
                    }}
                >
                    <MenuItem onClick={() => handleMenuItemClick("Português")}>
                        <img
                            src={flags["Português"]}
                            alt={langSelected}
                            width={27}
                        />
                        Português
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("Inglês")}>
                        <img
                            src={flags["Inglês"]}
                            alt={langSelected}
                            width={27}
                        />
                        Inglês
                    </MenuItem>
                </Menu>
            </div>
        </React.Fragment>
    );
}

export { MenuLang };
