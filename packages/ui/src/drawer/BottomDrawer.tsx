"use client";
import { Borders } from "@cllgnotes/types";
import Colors from "@cllgnotes/types/colors";
import { useState } from "react";
// import { ShowInDevice } from "@cllgnotes/lib";
// import { DeviceTypeEnum } from "@cllgnotes/types";
import { Fab, FilterAltRounded, Box, Skeleton, SwipeableDrawer } from "ui";
const drawerBleeding = 56;
const BottomDrawer = ({
  icon = <FilterAltRounded />,
  children,
  ...props
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const fabStyle = {
    position: "fixed",
    bottom: 30,
    right: 30,
    zIndex: 2000,
  };
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window?.document.body : undefined;
  return (
    <>
      {/* <ShowInDevice devices={[DeviceTypeEnum.mobile]}> */}
      <Fab
        sx={fabStyle}
        color="primary"
        style={{
          color: Colors.dark,
          border: Borders.dark,
          backgroundColor: Colors.bg,
        }}
        aria-label="add"
        onClick={toggleDrawer(!open)}
      >
        {icon}
      </Fab>
      {open && (
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              padding: 3,
            },
          }}
        >
          {/* <StyledBox
              sx={{
                position: 'absolute',
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: 'visible',
                right: 0,
                left: 0,
              }}
            >
            </StyledBox> */}
          {children}
          <Box
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            <Skeleton variant="rectangular" height="100%" />
          </Box>
        </SwipeableDrawer>
      )}
      {/* </ShowInDevice> */}
    </>
  );
};

export default BottomDrawer;
