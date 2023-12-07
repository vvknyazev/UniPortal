import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NewsPage = () => {
    // Пример даты для новостей
    const currentDate = new Date().toLocaleDateString();

    return (
        <Box>
            <Navbar />
            <Container
                sx={{
                    paddingTop: 4,
                    paddingBottom: 4,
                }}
            >

                <Typography variant="h4" gutterBottom>
                    Новини для випускників
                </Typography>

                <Paper
                    sx={{
                        padding: 3,
                        marginBottom: 2,
                    }}
                    elevation={3}
                >
                    <Typography variant="h6" gutterBottom>
                        В Україні завершений набір вступників до вишів
                    </Typography>
                    <Typography sx={{marginBottom: "5px"}}>
                        30 листопада завершено роботу електронних кабінетів та можливість подання заяв
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        01.12.2023
                    </Typography>
                </Paper>

                <Paper
                    sx={{
                        padding: 3,
                        marginBottom: 2,
                    }}
                    elevation={3}
                >
                    <Typography variant="h6" gutterBottom>
                        Умови прийому до вишів МОН планує оприлюднити в січні
                    </Typography>
                    <Typography  sx={{marginBottom: "5px"}}>
                        Відомство планує провести консультації щодо порядку проведення вступної кампанії у січні
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        29.11.2023
                    </Typography>
                </Paper>
                <Paper
                    sx={{
                        padding: 3,
                        marginBottom: 2,
                    }}
                    elevation={3}
                >
                    <Typography variant="h6" gutterBottom>
                        Цьогорічні абітурієнти здебільшого задоволені організацією вступу
                    </Typography>
                    <Typography  sx={{marginBottom: "5px"}}>
                        Понад 70% вступників відзначають високий рівень задоволеності організацією вступної кампанії-2023
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        29.11.2023
                    </Typography>
                </Paper>
                <Paper
                    sx={{
                        padding: 3,
                        marginBottom: 2,
                    }}
                    elevation={3}
                >
                    <Typography variant="h6" gutterBottom>
                        Вступна кампанія 2022: оцінювання відбувалося у 250 населених пунктах України і 20 містах ЄС
                    </Typography>
                    <Typography  sx={{marginBottom: "5px"}}>
                        У поточному році через війну з Росією вступна кампанія тривала значно довше, ніж зазвичай – з 23 червня до 31 жовтня включно.
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        03.11.2022
                    </Typography>
                </Paper>
            </Container>
            <Footer/>
        </Box>
    );
};

export default NewsPage;
