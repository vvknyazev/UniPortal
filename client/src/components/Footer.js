import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                mt: 5,
                p: 3,
                backgroundColor: '#202E48',
                color: "#FFFFFF",
                textAlign: 'center',
                display: 'flex',
                justifyContent: "space-around",
                alignItems: 'center',
            }}
        >
            <Typography variant="body2" color="text.secondary" sx={{color: "#FFFFFF", fontSize: "23px"}}>
                © {new Date().getFullYear()} UniPortal
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{color: "#FFFFFF", fontSize: "23px"}}>
               Веб портал допомоги абітурієнтам
            </Typography>
        </Box>
    );
};

export default Footer;
