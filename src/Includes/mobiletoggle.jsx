import * as React from "react";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { FilterForm } from "./FilterForm";
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
export function AnchorTemporaryDrawer(props) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const stopPropagation = (event) => {
    event.stopPropagation();
  };
  const DrawerList = (
    <Box sx={{ width: 1 }} role="presentation" onClick={toggleDrawer(false)} >
      <List onClick={stopPropagation}>
        <FilterForm />
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
    {!open && (
      <Button onClick={toggleDrawer(true)} endIcon={<SearchIcon />} className="bg-blue color-white mobile-search-icon"></Button>
    )}
    {open && (
        <Button onClick={toggleDrawer(false)} endIcon={<CloseIcon />} className="bg-red color-white mobile-search-icon"></Button>
      )}
    <Drawer open={open} onClose={toggleDrawer(false)}  className="mobile-drawer" >
      {DrawerList}
    </Drawer>
  </div>
  );
}