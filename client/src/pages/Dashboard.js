import React, {useState} from 'react';
import { Box, Container, Typography, Paper, Grid, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";

const dash = [
    {
        title: "Наша Місія",
        description: "Ми прагнемо допомогти випускникам шкіл обрати відповідне професійне напрямок."
    },
    {
        title: 'Про Нас',
        description: "Наш портал ґрунтується на кращих практиках супроводу випускників у їхньому кар'єрному шляху.",
    },
    {
        title: 'Що Ми Пропонуємо',
        description: 'Ми надаємо персоналізовані рекомендації з професійних напрямків.',
    },
    {
        title: 'Як Це Працює',
        description: 'Опис того, як працює ваш портал або як надаються рекомендації.',
    },
];

const CenteredCard = ({ title, content }) => (
    <Grid item xs={12} md={6} style={{ marginBottom: '20px' }}>
        <Paper elevation={3} style={{ textAlign: 'center', padding: '20px', minHeight: '200px', width: "230px", backgroundColor: '#f5f5f5', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "10px" }}>
            <Typography variant="h5" color="primary">{title}</Typography>
            <Typography color="textSecondary">{content}</Typography>
        </Paper>
    </Grid>
);


function Dashboard() {

    const [recommendations, setRecommendations] = useState([]);
    const fetchData = async () => {
        try {
            const userFeatures = [1, 276, 162, 6];
            const response = await axios.post('http://localhost:5000/recommend', { user_features: userFeatures });
            console.log("response: ", response);
            // setRecommendations(response.data.recommended_specializations);
            // console.log("recommendations: ", recommendations);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    return (
        <Box
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                position: 'relative', // Додаємо position: relative
            }}
        >
            {/* NavBar Component */}
            <Navbar />

            {/* Content */}
            <Container maxWidth="lg" style={{ paddingTop: '40px' }}>
                <Grid container spacing={5} justify="center" alignItems="center">
                    {/* Left side */}
                    <Grid item xs={12} md={6} >
                        <Paper style={{ padding: '70px', backgroundColor: '#f5f5f5', borderRadius: '10px', textAlign: "center" }}>
                            <Typography variant="h4" color="primary" gutterBottom>Ласкаво просимо!</Typography>
                            <Typography paragraph>
                                Знаходимо найкращі напрямки та спеціалізації для вашого майбутнього.
                            </Typography>
                            <Button variant="contained" color="primary" onClick={fetchData}>Отримати рекомендацію</Button>
                        </Paper>
                    </Grid>

                    {/* Right side */}
                    <Grid item xs={12} md={6} container spacing={2}>
                        {dash.map((item, index) => (
                            <CenteredCard key={index} title={item.title} content={item.description} />
                        ))}
                    </Grid>
                </Grid>
            </Container>

            {/* Footer Component */}
            <Footer />
        </Box>
    );
}

export default Dashboard;
