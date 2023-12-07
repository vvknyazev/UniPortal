import React from 'react';
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid} from '@mui/material';
import Footer from "../components/Footer";


const coursesRecomended = [
    {
        title: "Комп'ютерні науки",
        category: '122',
        image: '/spec/122.jpg',
    },
    {
        title: "Інженерія програмного забезпечення",
        category: '121',
        image: '/spec/121.jpg',
    },
    {
        title: "Кіберпезпека",
        category: '125',
        image: '/spec/125.jpg',
    },
];


const CourseCard = ({ course, recomended }) => {
    return (
        <Card
            sx={{
                width: 350,
                m: 2,
                height: '320px',
                position: 'relative',
                border: '2px solid transparent',
                boxShadow: recomended ? '0 0 10px rgba(0, 255, 0, 0.7)' : "none", // Зеленая тень, создающая эффект свечения
            }}
        >
            <CardActionArea>
                <CardMedia component="img" height="140" image={course.image} alt={course.title} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {course.category}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button color="primary" sx={{ position: 'absolute', bottom: '3%' }}>
                    Обрати
                </Button>
            </CardActions>
        </Card>
    );
};

// const CourseGrid = ({ category }) => {
//     // Фільтруємо курси за категорією
//     const filteredCourses = courses.filter(course => course.category === category);
//
//     return (
//         <Grid container alignItems="center" justifyContent="center" gap={5}>
//             {filteredCourses.map((e) => <CourseCard course={e}/>)}
//         </Grid>
//     );
// };

const CourseSelection = () => {
    return (
        <div >
            <Navbar />
            <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
                <Typography variant="h4" component="div" sx={{ mb: 2, textAlign: "center" }}>
                    Рекомендовано для вас
                </Typography>
            </Box>
            <Grid container alignItems="center" justifyContent="center" >
                {coursesRecomended.map((e) => <CourseCard course={e} recomended={true}/>)}
            </Grid>

        </div>
    );
};



export default CourseSelection;