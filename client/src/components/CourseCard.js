import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia, Box } from '@mui/material';

const CourseCard = ({ course }) => {
    return (
        <Card
            sx={{
                width: 350,
                m: 2,
                transition: 'transform 0.3s', // добавлено для плавного перехода
                '&:hover': {
                    transform: 'scale(1.05)', // увеличение размера при наведении
                    cursor: 'pointer', // изменение курсора при наведении
                },
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={course.image}
                alt={course.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Срок здачі
                </Typography>
                <Typography variant="body1" color="text.primary">
                    {course.deadline}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CourseCard;
