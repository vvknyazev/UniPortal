import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Grid,
    List,
    ListItem, ListItemText
} from '@mui/material';
import Footer from "../components/Footer";
import axios from "axios";
import {useNavigate} from "react-router-dom";


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
const specialties = [
    {code: '122', ukr: "Комп'ютерні науки", eng: "computer science", image: '/spec/122.jpg'},
    {code: '122', ukr: "Комп'ютерні науки", eng: "computers science", image: '/spec/122.jpg'},
    {code: '122', ukr: "Комп'ютерні науки", eng: "computer science engineering", image: '/spec/122.jpg'},
    {code: '122', ukr: "Комп'ютерні науки", eng: "coding", image: '/spec/122.jpg'},
    {code: '122', ukr: "Комп'ютерні науки", eng: "cse", image: '/spec/122.jpg'},
    {code: '126', ukr: "Інформаційні системи та технології", eng: "computer applications", image: '/spec/126.jpg'},
    {code: '126', ukr: "Інформаційні системи та технології", eng: "computer application", image: '/spec/126.jpg'},
    {code: '121', ukr: "Інженерія програмного забезпечення", eng: "computer science engineering", image: '/spec/121.jpg'},
    {code: '121', ukr: "Інженерія програмного забезпечення", eng: "c programming", image: '/spec/121.jpg'},
    {
        code: '121',
        ukr: "Інженерія програмного забезпечення",
        eng: "c, c++, java, sql, mysql, unix, html, mathematics, statistics",
        image: '/spec/121.jpg'
    },
    {code: '121', ukr: "Інженерія програмного забезпечення", eng: "computer science  engineering", image: '/spec/121.jpg'},
    {code: '121', ukr: "Інженерія програмного забезпечення", eng: "computer software engineer", image: '/spec/121.jpg'},
    {code: '121', ukr: "Інженерія програмного забезпечення", eng: "computer software engineer", image: '/spec/121.jpg'},
    {code: '121', ukr: "Інженерія програмного забезпечення", eng: "java", image: '/spec/121.jpg'},
    {code: '125', ukr: "Інформаційні технології", eng: "information technology", image: '/spec/126.jpg'},
    {code: '125', ukr: "Інформаційні технології", eng: "information technalogy", image: '/spec/126.jpg'},
    {code: '53', ukr: "Психологія", eng: "psychology", image: '/spec/53.jpg'},
    {code: '76', ukr: "Підприємництво та торгівля", eng: "commerce", image: '/spec/76.png'},
    {code: '51', ukr: "Економіка", eng: "commerce", image: '/spec/51.jpg'},
    {code: '51', ukr: "Економіка", eng: "econamics", image: '/spec/51.jpg'},
    {code: '73', ukr: "Менеджмент", eng: "management", image: '/spec/73.jpg'},
    {code: '75', ukr: "Маркетинг", eng: "marketing", image: '/spec/75.jpg'},
    {code: '75', ukr: "Маркетинг", eng: "sales and marketing", image: '/spec/75.jpg'},
    {code: '75', ukr: "Маркетинг", eng: "sales & marketing", image: '/spec/75.jpg'},
    {code: '106', ukr: "Географія", eng: "geography", image: '/spec/106.jpg'},
    {code: '131', ukr: "Прикладна механіка", eng: "instrumentation engineering", image: '/spec/131.jpg'},
    {code: '131', ukr: "Прикладна механіка", eng: "instrumentation", image: '/spec/131.jpg'},
    {code: '104', ukr: "Фізика та астрономія", eng: "physics", image: '/spec/104.jpg'},
    {code: '105', ukr: "Прикладна фізика та наноматеріали", eng: "physics", image: '/spec/104.jpg'},
    {code: '72', ukr: "Фінанси, банківська справа, страхування та фондовий ринок", eng: "accountancy", image: '/spec/72.jpg'},
    {code: '72', ukr: "Фінанси, банківська справа, страхування та фондовий ринок", eng: "accounts", image: '/spec/72.jpg'},
    {code: '72', ukr: "Фінанси, банківська справа, страхування та фондовий ринок", eng: "accounting", image: '/spec/72.jpg'},
    {code: '72', ukr: "Фінанси, банківська справа, страхування та фондовий ринок", eng: "accounting&finance", image: '/spec/72.jpg'},
    {code: '133', ukr: "Галузеве машинобудування", eng: "automobile engineering", image: '/spec/133.jpg'},
    {code: '13', ukr: "Механічна інженерія", eng: "mechanical engineering", image: '/spec/13.jpg'},
    {code: '14', ukr: "Електрична інженерія", eng: "electrical and electronics engineering", image: '/spec/14.jpg'},
    {code: '14', ukr: "Електрична інженерія", eng: "electrical and electronics", image: '/spec/14.jpg'},
    {code: '14', ukr: "Електрична інженерія", eng: "electrical engineering", image: '/spec/14.jpg'},
    {code: '14', ukr: "Електрична інженерія", eng: "electrical, electronics and power engineering", image: '/spec/14.jpg'},
    {code: '18', ukr: "Виробництво та технології", eng: "mining", image: '/spec/133.jpg'},
    {code: '121', ukr: "Інженерія програмного забезпечення", eng: "c language", image: '/spec/121.jpg'},
    {code: '192', ukr: "Будівництво та цивільна інженерія", eng: "civil engineering", image: '/spec/192.jpg'},
    {code: '192', ukr: "Будівництво та цивільна інженерія", eng: "civil", image: '/spec/192.jpg'},
    {code: '192', ukr: "Будівництво та цивільна інженерія", eng: "engineering", image: '/spec/192.jpg'},
    {
        code: '17',
        ukr: "Електроніка, автоматизація та електронні комунікації",
        eng: "electronics and communication engineering",
        image: '/spec/17.jpg'
    },
    {code: '17', ukr: "Електроніка, автоматизація та електронні комунікації", eng: "electronics and telecommunication", image: '/spec/17.jpg'},
    {
        code: '17',
        ukr: "Електроніка, автоматизація та електронні комунікації",
        eng: "electronics and instrumentation engineering",
        image: '/spec/17.jpg'
    },
    {code: '17', ukr: "Електроніка, автоматизація та електронні комунікації", eng: "electronics & telecommunications", image: '/spec/17.jpg'},
    {
        code: '17',
        ukr: "Електроніка, автоматизація та електронні комунікації",
        eng: "electronics & telecommunications engineering",
        image: '/spec/17.jpg'
    },
    {code: '51', ukr: "Економіка", eng: "economics", image: '/spec/51.jpg'},
    {code: '22', ukr: "Охорона здоровя", eng: "pharmacy", image: '/spec/22.jpg'},
    {code: '102', ukr: "Хімія", eng: "chemistry", image: '/spec/102.jpg'},
    {code: '111', ukr: "Математика", eng: "mathematics", image: '/spec/111.jpg'},
    {code: '111', ukr: "Математика", eng: "maths", image: '/spec/111.jpg'},
    {code: '20', ukr: "Аграрні науки та продовольство", eng: "agriculture", image: '/spec/20.jpeg'},
    {code: '72', ukr: "Фінанси, банківська справа, страхування та фондовий ринок", eng: "finance", image: '/spec/72.jpg'},
    {code: '91', ukr: "Біологія та біохімія", eng: "microbiology", image: '/spec/91.jpg'},
    {code: '91', ukr: "Біологія та біохімія", eng: "zoology", image: '/spec/91.jpg'},
    {code: '71', ukr: "Облік і оподаткування", eng: "taxation", image: '/spec/71.jpg'},
    {code: '76', ukr: "Підприємництво та торгівля", eng: "business administration", image: '/spec/76.png'},
    {code: '76', ukr: "Підприємництво та торгівля", eng: "business", image: '/spec/76.png'},
    {code: '28', ukr: "Публічне управління та адміністрування", eng: "business administration", image: '/spec/28.png'},
    {code: '28', ukr: "Публічне управління та адміністрування", eng: "business management", image: '/spec/28.png'},
    {code: '16', ukr: "Хімічна інженерія та біоінженерія", eng: "biotechnology", image: '/spec/102.jpg'},
    {code: '16', ukr: "Хімічна інженерія та біоінженерія", eng: "biotechnalogy", image: '/spec/102.jpg'},
    {code: '123', ukr: "Комп'ютерна інженерія", eng: "data structures & algorithm", image: '/spec/123.jpg'},
    {code: '81', ukr: "Право", eng: "law", image: '/spec/81.jpg'},
    {code: '293', ukr: "Міжнародне право", eng: "law", image: '/spec/81.jpg'},
    {code: '24', ukr: "Сфера обслуговування", eng: "hospitality", image: '/spec/24.jpg'},
    {code: '52', ukr: "Політологія", eng: "political science", image: '/spec/52.jpg'},
    {code: '52', ukr: "Політологія", eng: "communication & political science", image: '/spec/52.jpg'},
    {code: '7', ukr: "Управління та адміністрування", eng: "human resource", image: '/spec/28.png'},
    {code: '7', ukr: "Управління та адміністрування", eng: "human resources", image: '/spec/28.png'},
    {code: '52', ukr: "Політологія", eng: "human resources", image: '/spec/52.jpg'},
    {code: '122', ukr: "Комп'ютерні науки", eng: "computer science and engineering", image: '/spec/122.jpg'},
    {code: '121', ukr: "Інженерія програмного забезпечення", eng: "computer science and engineering", image: '/spec/121.jpg',},
    {code: '125', ukr: "Кібербезпека та захист інформації", eng: "computer science and engineering", image: '/spec/125.jpg'},
    {code: '13', ukr: "Механічна інженерія", eng: "mechanical", image: '/spec/13.jpg'},
    {code: '1', ukr: "Освіта/Педагогіка", eng: "general", image: '/spec/1.webp'},
    {code: '12', ukr: "Інформаційні технології", eng: "computers", image: '/spec/126.jpg'},
    {code: '12', ukr: "Інформаційні технології", eng: "computer", image: '/spec/126.jpg'},
    {code: '2', ukr: "Культура і мистецтво", eng: "english", image: '/spec/2.jpg'},
    {code: '2', ukr: "Культура і мистецтво", eng: "arts", image: '/spec/2.jpg'},
    {code: '3', ukr: "Гуманітарні науки", eng: "english", image: '/spec/3.jpg'},
    {code: '61', ukr: "Журналістика", eng: "journalism", image: '/spec/61.jpg'},
    {code: '123', ukr: "Комп'ютерна інженерія", eng: "computer engineering", image: '/spec/123.jpg'},
    {code: '112', ukr: "Статистика", eng: "statistics", image: '/spec/112.jpg'},
    {code: '16', ukr: "Хімічна інженерія та біоінженерія", eng: "chemical engineering", image: '/spec/102.jpg'},
    {code: '124', ukr: "Системний аналіз", eng: "data science", image: '/spec/124.jpg'},
    {code: '27', ukr: "Транспорт", eng: "automobile", image: '/spec/27.jpg'},
    {code: '22', ukr: "Дизайн", eng: "design", image: '/spec/27.jpeg'},
    {code: '134', ukr: "Авіаційна та ракетно-космічна техніка", eng: "aerospace engineering", image: '/spec/134.jpg'},
    {code: '54', ukr: "Соціологія", eng: "sociology", image: '/spec/54.jpg'},
    {code: '1', ukr: "Освіта/Педагогіка", eng: "literature", image: '/spec/1.webp'},
    {code: '10', ukr: "Природничі науки", eng: "science", image: '/spec/10.jpg'},
    {code: '21', ukr: "Аудіовізуальне мистецтво та виробництво", eng: "animation & visual effects", image: '/spec/21.jpg'},
]



const CourseCard = ({course}) => {
    return (
        <Card
            sx={{
                width: 350,
                m: 2,
                height: '320px',
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

const CourseSelection = ({matchingSpecialties, personality}) => {

    let navigate;
    navigate = useNavigate();
    const { avatarAlt, avatarSrc, niceName, profileUrl, traits, role, strategy } = personality;
    const mbti = avatarAlt.substring(0, 4);
    const saveRecommend = async () => {
        let user = localStorage.getItem('user')
        const parsedUser = JSON.parse(user);
        console.log("parsedUser: ", parsedUser.access_token);
        const token = parsedUser.access_token
        const saveResponse = await axios.post('http://localhost:5000/save_recommendations', { recommendations: matchingSpecialties }, {
            headers: {
                'Authorization': `Bearer ${token}`, // Assuming you store the token in localStorage
                'Content-Type': 'application/json' // Ensure the content type is set
            }
        });
        navigate('/')
    }

    return (
        <div>
            <Navbar/>
            <Box sx={{maxWidth: 600, mx: "auto", mt: 4}}>
                <Typography variant="h4" component="div" sx={{mb: 2, textAlign: "center"}}>
                    Рекомендовано для вас
                </Typography>
            </Box>
            <Grid container alignItems="center" justifyContent="center" gap={5}>
                {matchingSpecialties.map((specialty, index) => (
                    <CourseCard course={specialty}/>
                ))}
            </Grid>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100px"
            >
                <Button onClick={saveRecommend} variant="contained" color="primary" sx={{
                    padding: '12px 28px',
                    fontSize: '1rem',
                }}>
                    Зберегти результати
                </Button>
            </Box>
            <Card sx={{ maxWidth: 600, margin: 'auto', marginBottom: 20, marginTop: 10 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={avatarSrc}
                    alt={avatarAlt}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {niceName} - {role} ({mbti})
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        <b>Strategy:</b> {strategy}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        <b>Personality Traits:</b>
                    </Typography>
                    <Grid container spacing={2}>
                        {traits.map(trait => (
                            <Grid item xs={6} key={trait.key}>
                                <Typography variant="body2" color="text.secondary">
                                    <b>{trait.label}:</b> {trait.snippet}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>

        </div>
    );
};


export default CourseSelection;
