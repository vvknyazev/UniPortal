import React, {useEffect, useState} from 'react';
import {CardMedia, Container, Radio, RadioGroup, Rating} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Navbar from '../components/Navbar';
import CourseSelection from './CourseSelection';
import StarIcon from '@mui/icons-material/Star';
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Button, Box } from '@mui/material';

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

const interestsList = [
    'Хмарні обчислення',
    'Технології',
    'Розуміння людської поведінки',
    'Продажі/Маркетинг',
    'Торгівля',
    "Дизайн домашнього інтер'єру",
    'Дослідження',
    'Навчання',
    'Розуміння людського тіла',
    'Написання контенту',
    'Державна служба',
    'Служба',
    'Інфраструктура',
    'Фінансовий аналіз',
    'Ризик заради прибутку',
    'Підприємництво',
    'Цифровий маркетинг',
    'Дослідження ринку',
    'Сільське господарство',
    'Управління будівництвом',
    'Аналітика даних',
    'Спеціаліст з обробки даних',
    'Промисловість',
    'Інформаційні технології',
    'Огляд новин',
    'Соціальна справедливість',
    'Аналіз ланцюга поставок',
    'Ігрова промисловість',
    'Дизайн',
    'Веб-дизайн',
    'Веб-розробка',
    'Соціальні справи',
    'Блокчейн',
    'Машинне навчання',
    'Ексель',
    'Спортивна промисловість',
    'Управління життєвим циклом продукту',
    'Консультант SAP у MM',
    'Управління проектами',
    "Пов'язане з військово-морським оборонним",
    'Нафта та газ',
    'Біотехнології',
    'Розробник програмного забезпечення',
    'Гостинність',
    'Адміністратор Salesforce',
    'Маркетинг у соціальних мережах',
    'Робота в програмному забезпеченні',
    'ІТ',
    'Міське планування',
    'Введення даних або телефонна робота',
    'Розробка мобільних додатків',
    'Географія',
    'Геологія',
    'Статистичний програміст',
    'Програмна інженерія',
    'Садівництво',
    'Операції',
    'Кібербезпека',
    'Розробка додатків',
    'Вищі студії',
    'Роздрібники',
    'Судове розгляд та юридичний сервіс'
];


const questions = [
    "Ви регулярно заводите нових друзів",
    "Ви витрачаєте багато вільного часу на вивчення різних не пов‘язаних між собою тем, які вас цікавлять.",
    "Побачивши, як інші люди плачуть, ви легко можете відчути, що вам теж хочеться плакати.",
    "Ви часто дбаєте про резервний план для резервного плану.",
    "Зазвичай ви зберігаєте спокій, навіть під сильним тиском.",
    "На суспільних заходах ви рідко намагаєтеся представитися новим людям і переважно розмовляєте з тими, кого вже знаєте.",
    "Вам більше до вподоби спочатку завершити один проєкт, а вже потім починати наступний.",
    "Ви дуже сентиментальні.",
    "Вам подобається користуватися інструментами організації, такими як розклади та списки.",
    "Навіть незначна помилка може викликати у вас сумніви у ваших здібностях і знаннях.",
    "Ви легко можете підійти до людини, яка вам цікава, і почати з нею розмову.",
    "Вам не надто цікаво обговорювати різноманітні інтерпретації та аналізи творчих робіт.",
    "Ви більше схильні довіряти своєму розуму, ніж своєму серцю.",
    "Зазвичай ви волієте просто робити те, що вам хочеться в будь-який момент, замість того, щоб складати певний розпорядок дня.",
    "Ви рідко переймаєтеся тим, чи справляєте гарне враження на людей, яких зустрічаєте.",
    "Вам подобається брати участь у групових заходах.",
    "Вам подобаються книги та фільми, які змушують вас придумати власну інтерпретацію їхнього завершення.",
    "Ви частіше почуваєтеся щасливим від того, що допомагаєте іншим досягати чогось, ніж від власних досягнень.",
    "Вас цікавить так багато речей, що вам важко вибрати, що спробувати далі.",
    "Ви схильні хвилюватися через те, що все може стати гірше.",
    "Ви уникаєте лідерських ролей у групах.",
    "Ви безперечно не людина артистичного типу.",
    "Ви вважаєте, що світ був би кращим, якби люди більше покладалися на розсудливість, а не на свої почуття.",
    "Ви волієте закінчити повсякденні справи, перш ніж дозволити собі розслабитися.",
    "Вам подобається спостерігати, як люди сперечаються.",
    "Ви схильні уникати зайвої уваги.",
    "Ваш настрій може змінитися дуже швидко.",
    "Ви втрачаєте терпіння, працюючи з людьми, менш продуктивними за вас.",
    "Ви часто робите щось в останню хвилину.",
    "Вас завжди цікавило питання про життя у потойбіччі, якщо воно існує.",
    "Зазвичай ви волієте бути поруч з іншими, а не наодинці.",
    "Ви починаєте нудьгувати або втрачаєте інтерес, коли дискусія стає надто теоретичною.",
    "Вам легко співчувати людині, чий досвід дуже відрізняється від вашого.",
    "Ви зазвичай відкладаєте остаточне прийняття рішень якомога надовше.",
    "Ви рідко переосмислюєте свій вибір.",
    "Жвава світська подія після довгого та виснажливого тижня — саме те, що вам потрібно.",
    "Вам подобається ходити в художні музеї.",
    "Найчастіше вам складно зрозуміти чуттєвий стан інших людей.",
    "Вам подобається мати список справ на кожен день.",
    "Ви рідко відчуваєте невпевненість.",
    "Ви уникаєте телефонних дзвінків.",
    "Ви часто витрачаєте багато часу, намагаючись зрозуміти погляди, які дуже відрізняються від ваших власних.",
    "У вашому колі спілкування ви найчастіше є ініціатором розмов та спільних занять зі своїми друзями.",
    "Якщо ваші плани порушуються, ви перш за все прагнете якнайшвидше їх налагодити.",
    "Ви рідко замислюєтеся над причинами людського існування чи сенсом життя.",
    "Ваші емоції керують вами більше, ніж ви ними.",
    "Ви дуже дбаєте про те, щоб не виставляти людей у поганому світлі, навіть якщо це повністю їхня провина.",
    "Ваш особистий стиль роботи ближчий до спонтанних вибухів енергії, ніж до організованих і послідовних зусиль.",
    "Коли хтось високо вас цінує, ви подумки питаєте себе, скільки часу знадобиться цій людині, щоб розчаруватися в вас.",
    "Вам подобається діяльність, яка вимагає від вас роботи на самоті більшу частину часу.",
    "Ви вважаєте, що міркувати над абстрактними філософськими питаннями — це марна трата часу.",
    "Вас більше тягне до місць із жвавою, гамірною атмосферою, ніж до тихих, інтимних місць.",
    "Ви з першого погляду розумієте, як себе почуває людина.",
    "Ви часто відчуваєте себе пригніченим.",
    "Ви виконуєте все методично, не пропускаючи жодного кроку.",
    "Вас дуже цікавлять речі, які вважаються суперечливими.",
    "Ви б відмовилися від хорошої можливістю, якби вважали, що хтось інший потребує її більше.",
    "Ви відчуваєте впевненість у тому, що вам усе вдасться.",
];


const CourseCard = ({setAllCoursesRated, allCoursesRated, course, onRate, value, setValue}) => {
    const [gender, setGender] = useState('');
    const [interests, setInterests] = useState([]);
    const [gpa, setGpa] = useState('');

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleInterestsChange = (event) => {
        setInterests(event.target.value);
    };

    const handleGpaChange = (event) => {
        setGpa(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Gender:', gender);
        console.log('Interests:', interests);
        console.log('GPA:', gpa);
        setAllCoursesRated(true);
        // Добавьте вашу логику обработки отправки формы здесь
    };
console.log("allCoursesRated: ", allCoursesRated)
    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ marginBottom: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="gender-label">Стать</InputLabel>
                    <Select
                        labelId="gender-label"
                        id="gender"
                        value={gender}
                        onChange={handleGenderChange}
                    >
                        <MenuItem value={'male'}>Чоловік</MenuItem>
                        <MenuItem value={'female'}>Жінка</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="interests-label">Інтереси</InputLabel>
                    <Select
                        labelId="interests-label"
                        id="interests"
                        multiple
                        value={interests}
                        onChange={handleInterestsChange}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {interestsList.map((interest) => (
                            <MenuItem key={interest} value={interest}>
                                <Checkbox checked={interests.includes(interest)} />
                                <ListItemText primary={interest} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <TextField
                    fullWidth
                    id="gpa"
                    label="Середній бал у табелі"
                    type="number"
                    value={gpa}
                    onChange={handleGpaChange}
                />
            </Box>
            <Button variant="contained" type="submit">Отримати рекомендацію</Button>
        </form>
    );
};

const Course = () => {
    const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
    const [value, setValue] = useState(0);
    const [courseData, setCourseData] = useState([]);
    const [allCoursesRated, setAllCoursesRated] = useState(false);
    const [testPass, setTestPass] = useState(false);

    const [answers, setAnswers] = useState(Array(questions.length).fill('5'));
console.log("allCoursesRated: ", allCoursesRated)
    const handleAnswerChange = (questionIndex, value) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = value;
        setAnswers(newAnswers);
    };

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


    const handleSubmit = () => {
        setTestPass(true)
    };


    if (allCoursesRated) {
        return <CourseSelection/>;
    }


    return (
        <div>
            <Navbar/>
            {!testPass && !allCoursesRated ?
                <Container style={{marginTop: "20px", textAlign: "center", maxWidth: "1600px"}}>
                    <Typography variant="h3" gutterBottom>
                        Оцінка особистості
                    </Typography>

                    {questions.map((question, index) => (
                        <>
                            <FormControl key={index} component="fieldset" style={{marginBottom: 20}}>
                                <Typography variant="h5" gutterBottom>
                                    {question}
                                </Typography>
                                <Box display="flex" justifyContent="center">
                                <RadioGroup
                                    row
                                    aria-label={`question${index}`}
                                    name={`question${index}`}
                                    value={answers[index]}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                >

                                        <FormControlLabel value="5" control={<Radio/>} label="Згоден"
                                                          labelPlacement="start" sx={{marginRight: '15px'}}/>
                                        <FormControlLabel value="4" control={<Radio/>}/>
                                        <FormControlLabel value="3" control={<Radio/>}/>
                                        <FormControlLabel value="2" control={<Radio/>}/>
                                        <FormControlLabel value="1" control={<Radio/>} label="Не згоден"/>

                                </RadioGroup>
                                </Box>
                            </FormControl>
                            <br/>
                        </>
                    ))}

                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Далі
                    </Button>
                </Container>
                :
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
                                    setValue={setValue} setAllCoursesRated={setAllCoursesRated} allCoursesRated={allCoursesRated}/>
                    )}
                </Box>
            }

            {/*<Navbar/>*/}

        </div>
    );
};
export default Course;
