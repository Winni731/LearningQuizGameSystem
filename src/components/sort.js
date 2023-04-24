import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    MenuItem,
    Menu,
    Typography,
} from "@mui/material";


import { Sort } from "@mui/icons-material";

const Sortbar = ({
    sortType,
    setSortType,
}) => {
    // const [sideBar, setSideBar] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [sortText, setSortText] = useState("Name: A to Z");
    const [sortAnchor, setSortAnchor] = useState(null);


    const closeSort = (e) => {
        setShowSort(false);
        setSortAnchor(null);
        console.log("this is currentTarget dataset: " + e.currentTarget.dataset.myValue);
        setSortType(e.currentTarget.dataset.myValue);
        if (e.currentTarget.outerText !== "") {
            setSortText(e.currentTarget.outerText);
        }
    };

    // console.log("show color: "+FormControlLabelProps.value)
    const optionBar = () => (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar
                    variant="dense"
                    sx={{ justifyContent: "space-between", backgroundColor: "#b3b1b1" }}
                >
                    <div>
                        <Button
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="sort"
                            aria-controls="sort-options"
                            aria-haspopup="true"
                            sx={{ mr: 2 }}
                            onClick={(e) => {
                                setShowSort(!showSort);
                                setSortAnchor(e.currentTarget);
                            }}
                            variant="text"
                        >
                            {sortText}&nbsp;
                            <Sort />
                        </Button>
                        <Menu
                            id="sort-options"
                            anchorEl={sortAnchor}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={showSort}
                            onClose={closeSort}
                        >
                            <MenuItem onClick={closeSort} data-my-value="ScoreAscending">
                                Score: Low to high
                            </MenuItem>
                            <MenuItem onClick={closeSort} data-my-value="ScoreDescending">
                                Score: High to low
                            </MenuItem>
                            <MenuItem onClick={closeSort} data-my-value="NameAscending">
                                Name: A to Z
                            </MenuItem>
                            <MenuItem onClick={closeSort} data-my-value="NameDescending">
                                Name: Z to A
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>

        </Box>
    );

    return <>{optionBar()}</>;
};

export default Sortbar;
