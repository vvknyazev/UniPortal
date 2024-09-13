import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Typography,
    Box,
    Paper,
    Rating,
    IconButton,
    Card,
    CardActionArea,
    CardMedia,
    CardContent, Grid
} from '@mui/material';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {useCookies} from "react-cookie";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from "axios";
import authService from '../services/authService';

const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    profilePicture: '/user/user-photo.jpg',
};

// const courses = [
//     { id: 1, name: 'Філософія', rating: 5 },
//     { id: 2, name: 'Вища математика', rating: 4 },
//     { id: 3, name: 'Основи програмування', rating: 5 },
//     { id: 4, name: 'Фізика', rating: 3 },
//     { id: 5, name: 'Дискретні структури', rating: 4 },
//     { id: 6, name: "Комп'ютерні мережі", rating: 5 },
//     { id: 7, name: 'Основи обислювального інтелекту', rating: 5 },
// ];

const CourseCard = ({course}) => {
    return (
        <Card
            sx={{
                width: 250,
                m: 2,
                height: '300px',
                position: 'relative',
                border: '2px solid transparent',
                boxShadow:'0 0 10px rgba(0, 255, 0, 0.7)', // Зеленая тень, создающая эффект свечения
            }}
        >
            <CardActionArea>
                <CardMedia component="img" height="140" image={course.image} alt={course.ukr}/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {course.ukr}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {course.code}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};


const Settings = ({setLoggedIn}) => {
    // const [, removeCookie] = useCookies(["user"]);
    // const [courses, setCourses] = useState([]);
    console.log("courses")
    // useEffect(() => {
    //     const storedData = localStorage.getItem('courseData');
    //     if (storedData) {
    //         try {
    //             const parsedData = JSON.parse(storedData);
    //
    //             // Проверяем, является ли parsedData объектом или массивом
    //             if (parsedData.length > 0) {
    //                 setCourses(parsedData);
    //                 console.log("Data from localStorage:", parsedData);
    //             } else {
    //                 console.error("Invalid data format in localStorage");
    //             }
    //         } catch (error) {
    //             console.error("Error parsing data from localStorage:", error);
    //         }
    //     }
    // }, []);

    const [matchingSpecialties, setMatchingSpecialties] = useState([]);

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        try {
            let user = localStorage.getItem('user')
            const parsedUser = JSON.parse(user);
            console.log("parsedUser: ", parsedUser.access_token);
            const token = parsedUser.access_token
            console.log("token: " ,token)
            const response = await axios.get('http://localhost:5000/get_recommendations', {
                headers: {
                    'Authorization': `Bearer ${token}` // Assuming you store the token in localStorage
                }
            });

            const recommendations = response.data.recommendations;
            console.log("Fetched recommendations:", recommendations);

            // Update state or do something with the recommendations
            setMatchingSpecialties(recommendations);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    const handleLogout = async () => {
        localStorage.removeItem('user');


        // removeCookie("user", { path: "/" });
        setLoggedIn(false);
    };

    return (
        <div>
            <Navbar/>
            <Box p={3} display="flex" justifyContent="center" alignItems="center">
                <Paper elevation={3} style={{ padding: '20px', width: '50%', position: "relative" }}>
                    <IconButton color="inherit" onClick={handleLogout} sx={{position: "absolute", right: "5%"}}>
                        <ExitToAppIcon />
                    </IconButton>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar alt="User Avatar" src={user.profilePicture} sx={{ width: 100, height: 100, marginBottom: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            {`${user.firstName} ${user.lastName}`}
                        </Typography>
                        <Typography color="textSecondary">{user.email}</Typography>
                    </Box>
                    <Grid container alignItems="center" justifyContent="center" gap={5} mt={5}>
                        {matchingSpecialties.map((specialty, index) => (
                            <CourseCard course={specialty}/>
                        ))}
                    </Grid>
                    {/*<Box mt={5}>*/}
                    {/*    {courses && courses?.length > 0 && courses.map((course) => (*/}
                    {/*        <Box key={course.id} mb={2} display="flex" justifyContent="space-between" alignItems="center">*/}
                    {/*            <Typography>{course.name}</Typography>*/}
                    {/*            <Rating value={course.rating} precision={0.1} max={12} readOnly />*/}
                    {/*        </Box>*/}
                    {/*    ))}*/}
                    {/*</Box>*/}
                </Paper>
            </Box>
        </div>
    );
};

export default Settings;
