import React from 'react';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';
import Navbar from '../components/Navbar';

const SpecializationsPage = () => {
    const specializationsData = [
        { code: '122', title: "Комп'ютерні науки" },
        { code: '121', title: 'Інженерія програмного забезпечення' },
        { code: '081', title: 'Право' },
        { code: '035', title: 'Філологія' },
        { code: '073', title: 'Менеджмент' },
        { code: '075', title: 'Маркетинг' },
        { code: '033', title: 'Філософія' },
        { code: '053', title: 'Психологія' },
        { code: '051', title: 'Економіка' },
        { code: '052', title: 'Політологія' },
        { code: '054', title: 'Соціологія' },
        { code: '055', title: 'Міжнародні відносини' },
        { code: '061', title: 'Журналістика' },
        { code: '076', title: 'Підприємництво' },
        { code: '091', title: 'Екологія' },
        { code: '101', title: 'Біологія' },
        { code: '111', title: 'Математика' },
        { code: '113', title: "Прикладна математика" },
        { code: '125', title: 'Кібербезпека' },
        { code: '124', title: 'Системний аналіз' },
        { code: '171', title: 'Електроніка' },
        { code: '201', title: 'Астрономія' },
        { code: '222', title: 'Медицина' },
        { code: '023', title: 'Образотворче мистецтво' },
        { code: '222', title: 'Медицина' },
        { code: '222', title: 'Медицина' },
        { code: '222', title: 'Медицина' },
        { code: '222', title: 'Медицина' },
        { code: '133', title: 'Галузеве машинобудування' },

    ];

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Navbar />
            <Container
                sx={{
                    paddingTop: 4,
                    paddingBottom: 4,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    База спеціалізацій
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center', // Центрируем содержимое по горизонтали
                        gap: 2,
                    }}
                >
                    {specializationsData.map((specialization, index) => (
                        <Card key={index} sx={{ width: 300, marginBottom: 2 }}>
                            <CardContent>
                                <Typography variant="h6">{specialization.code}</Typography>
                                <Typography variant="body1">{specialization.title}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default SpecializationsPage;
