import React, {useEffect, useState} from 'react';
import {CardMedia, Rating} from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Navbar from '../components/Navbar';
import CourseSelection from './CourseSelection';
import StarIcon from '@mui/icons-material/Star';

const courses = [
    {id: 1, name: 'Алгебра'},
    {id: 2, name: 'Українська мова'},
    {id: 3, name: 'Українська література'},
    {id: 4, name: 'Фізика'},
    {id: 5, name: 'Іноземна мова'},
    {id: 6, name: "Зарубіжна література"},
    {id: 7, name: 'Історія України'},
    {id: 8, name: 'Всесвітня історія'},
    {id: 9, name: 'Геометрія'},
    {id: 10, name: 'Біологія і екологія'},
    {id: 10, name: 'Географія'},
    {id: 11, name: 'Хімія'},
];

const CourseCard = ({course, onRate, value, setValue}) => {
    return (
        <div>
            <Card sx={{maxWidth: 600, mx: 'auto', transform: 'scale(2)'}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant="h5" component="div" sx={{mb: 2, textAlign: 'center'}}>
                        {course.name}
                    </Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        size="large"
                        max={12 }
                    />
                    <Button variant="contained" sx={{mt: 2}} onClick={() => onRate(course.id, value)}>
                        Оцінити
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

const Course = () => {
    const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
    const [value, setValue] = useState(0);
    const [courseData, setCourseData] = useState([]);
    const [allCoursesRated, setAllCoursesRated] = useState(false);

    useEffect(() => {
        const storedData = localStorage.getItem('courseData');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);

                // Проверяем, является ли parsedData объектом или массивом
                if (parsedData.length > 0) {
                    setAllCoursesRated(true);
                    setCourseData(parsedData);
                    console.log("Data from localStorage:", parsedData);
                } else {
                    console.error("Invalid data format in localStorage");
                }
            } catch (error) {
                console.error("Error parsing data from localStorage:", error);
            }
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('courseData', JSON.stringify(courseData));
    }, [courseData]);

    const handleRate = (courseId, rating) => {
        console.log(`Course ${courseId} rated with ${rating}`);
        const currentCourse = courses[currentCourseIndex];

        setCourseData(prevData => [
            ...prevData,
            {
                id: currentCourse.id,
                name: currentCourse.name,
                rating: rating,
            },
        ]);

        if (currentCourseIndex < courses.length - 1) {
            setCurrentCourseIndex(currentCourseIndex + 1);
            setValue(0);
        } else {
            console.log('All courses rated', courseData);
            localStorage.setItem('courseData', JSON.stringify(courseData));
            setAllCoursesRated(true);
        }
    };

    if (allCoursesRated) {
        return <CourseSelection/>;
    }

    return (
        <div>
            <Navbar/>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '400px',
                }}
            >
                {courses.length > 0 && (
                    <CourseCard course={courses[currentCourseIndex]} onRate={handleRate} value={value}
                                setValue={setValue}/>
                )}
            </Box>
        </div>
    );
};
export default Course;
