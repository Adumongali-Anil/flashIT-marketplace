import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {

    return (

        <Box
            sx={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
                mt: 5,
                py: 3,
                textAlign: "center",

                /* ⭐ FULL WIDTH FIX */
                width: "100vw",
                position: "relative",
                left: 0,

                /* ⭐ OVER SIDEBAR */
                zIndex: 1300
            }}
        >

            <Typography fontWeight="bold" fontSize="18px">
                FLASHit Marketplace
            </Typography>

            <Box mt={1}>
                <Typography component="span" sx={{ mx: 1 }}>
                    About
                </Typography>
                <Typography component="span" sx={{ mx: 1 }}>
                    Contact
                </Typography>
                <Typography component="span" sx={{ mx: 1 }}>
                    Privacy Policy
                </Typography>
            </Box>

            <Typography mt={1} fontSize="14px">
                📧 flashIT@gmail.com | 📞 9441311833
            </Typography>

            <Typography mt={1} fontSize="13px">
                © 2026 FLASHIT. All rights reserved.
            </Typography>

        </Box>
    );
}

export default Footer;