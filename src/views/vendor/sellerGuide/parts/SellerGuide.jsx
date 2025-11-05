import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';

const IntroSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5faff",
        minHeight: "100vh",
        py: 8,
        pt: 12,
        px: 2,
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        sx={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* Left Section: Text */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h5"
            sx={{
              color: "#0073e6",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Start here
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 3,
              lineHeight: "1.3",
            }}
          >
            How to sell on [NegroMart]: <br />
            A guide for beginners
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", mb: 4 }}>
            Get an overview of how to create a selling account, list products,
            fulfill customer orders, and more. Learn how to sell—whether you’re
            new to online retail or just new to selling on [NegroMart].
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              textTransform: "none",
              borderRadius: "8px",
            }}
            onClick={() => alert("Redirecting to registration!")}
          >
            Learn More
          </Button>
        </Grid>

        {/* Right Section: Image */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://i.pinimg.com/736x/95/60/fc/9560fc898da1cb06a5eb36a2002e8504.jpg"
              alt="Seller Boxes"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container 
        sx={{ 
                // minHeight: "100vh",
                py: 2,
                px: 1,
            }}
        >
        <Grid 
            container
            spacing={2}
                sx={{
                    backgroundColor: "#f9f9f9", // Light background
                    borderRadius: "12px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)",
                    padding: 2,
                }}
            >
            {/* Left Section: Image */}
            <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4 }} sx={{ flex: "0 0 auto" }}>
                <img
                    src="https://i.pinimg.com/736x/13/1e/09/131e09bbfb445ca2004d5c4a2a154f65.jpg"
                    alt="Boxes"
                    style={{
                        borderRadius: "8px",
                        // width: '100%',
                        height: 'auto',
                    }}
                />
            </Grid>

            {/* Right Section: Text */}
            <Grid size={{ xs: 12, sm: 8, md: 8, lg: 8 }}>
                <Typography
                    variant="h5"
                    sx={{
                    fontWeight: "bold",
                    mb: 2,
                    }}
                    >   
                    How to sell with [NegroMart]
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                    color: "#555",
                    mb: 3,
                    lineHeight: "1.6",
                    }}
                >
                    Our newly revised beginner's guide provides an overview of how to
                    create a selling account, list products, fulfill customer orders, and
                    more. Learn how to succeed with [NegroMart]—whether you’re new to
                    online retail or just new to the store.
                </Typography>
                <Button
                    variant="text"
                    color="primary"
                    sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "16px",
                    }}
                    onClick={() => alert("Read the beginner's guide!")}
                >
                    Read the beginner's guide →
                </Button>
            </Grid>
        </Grid>
      </Grid>


    </Box>
  );
};

export default IntroSection;
