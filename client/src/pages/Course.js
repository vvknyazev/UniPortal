import React, {useEffect, useState} from 'react';
import {CardMedia, Container, Radio, RadioGroup, Rating} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Navbar from '../components/Navbar';
import CourseSelection from './CourseSelection';
import StarIcon from '@mui/icons-material/Star';
import FormControlLabel from "@mui/material/FormControlLabel";
import {TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Button, Box} from '@mui/material';
import axios from "axios";

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
    {
        ukr:'Хмарні обчислення',
        eng:'Cloud computing'
    },
    {
        ukr:'Технології',
        eng:'Technology'
    },
    {
        ukr:'Розуміння людської поведінки',
        eng:'Understand human behaviour'
    },
    {
        ukr:'Продажі/Маркетинг',
        eng:'Sales/Marketing'
    },
    {
        ukr:'Торгівля',
        eng:'Trading'
    },
    {
        ukr:'Дизайн домашнього інтер\'єру',
        eng:'Home interior design'
    },
    {
        ukr:'Дослідження',
        eng:'Research'
    },
    {
        ukr:'Навчання',
        eng:'Teaching'
    },
    {
        ukr:'Розуміння людського тіла',
        eng:'Understand human body'
    },
    {
        ukr:'Написання контенту',
        eng:'Content Writing'
    },
    {
        ukr:'Державна служба',
        eng:'Govt. Job'
    },
    {
        ukr:'Служба',
        eng:'Service'
    },
    {
        ukr:'Інфраструктура',
        eng:'Infrastructure'
    },
    {
        ukr:'Фінансовий аналіз',
        eng:'Financial Analysis'
    },
    {
        ukr:'Ризик заради прибутку',
        eng:'Take risk for Profits'
    },
    {
        ukr:'Підприємництво',
        eng:'Entrepreneurship'
    },
    {
        ukr:'Цифровий маркетинг',
        eng:'Digital marketing'
    },
    {
        ukr:'Дослідження ринку',
        eng:'Market research'
    },
    {
        ukr:'Сільське господарство',
        eng:'Agriculture'
    },
    {
        ukr:'Будівництво',
        eng:'Construction'
    },
    {
        ukr:'Аналітика даних',
        eng:'Data analytics'
    },
    {
        ukr:'Обробка даних',
        eng:'Data scientist'
    },
    {
        ukr:'Industries',
        eng:'Construction'
    },
    {
        ukr:'Інформаційні технології',
        eng:'Information Technology'
    },
    {
        ukr:'Огляд новин',
        eng:'News Coverage'
    },
    {
        ukr:'Соціальна справедливість',
        eng:'Social Justice'
    },
    {
        ukr:'Аналіз ланцюга поставок',
        eng:'Supply Chain Analysis'
    },
    {
        ukr:'Ігрова промисловість',
        eng:'Game industry'
    },
    {
        ukr:'Дизайн',
        eng:'Design'
    },
    {
        ukr:'Веб-дизайн',
        eng:'Web Designing'
    },
    {
        ukr:'Веб-розробка',
        eng:'Web development'
    },
    {
        ukr:'Соціальні справи',
        eng:'Social causes'
    },
    {
        ukr:'Блокчейн',
        eng:'Blockchain'
    },
    {
        ukr:'Машинне навчання',
        eng:'Machine Learning'
    },
    {
        ukr:'Ексель',
        eng:'Excel'
    },
    {
        ukr: 'Спорт',
        eng: 'Sports Industry',
    },
    {
        ukr:'Управління життєвим циклом продукту',
        eng:'Product Life cycle'
    },
    {
        ukr:'Управління проектами',
        eng:'Project Management'
    },
    {
        ukr:"Пов'язане з військово-морським оборонним",
        eng:'Navy Defence related'
    },
    {
        ukr:'Нафта та газ',
        eng:'Oil and Gas'
    },
    {
        ukr:'Біотехнології',
        eng:'BioTechnology'
    },
    {
        ukr:'Розробник програмного забезпечення',
        eng:'Software developer'
    },
    {
        ukr:'Гостинність',
        eng:'Hospitality'
    },
    {
        ukr:'Маркетинг у соціальних мережах',
        eng:'Admin Social media marketing'
    },
    {
        ukr:'Робота в програмному забезпеченні',
        eng:'Software Job'
    },
    {
        ukr:'ІТ',
        eng:'IT'
    },
    {
        ukr:'Міське планування',
        eng:'Urban Planning'
    },
    {
        ukr:'Введення даних або телефонна робота',
        eng:'Data entry or telecalling work'
    },
    {
        ukr:'Розробка мобільних додатків',
        eng:'Mobile App Development'
    },
    {
        ukr:'Географія',
        eng:'Geography'
    },
    {
        ukr:'Геологія',
        eng:'Geology'
    },
    {
        ukr:'Статистичне програмування',
        eng:'Statistical Programmer'
    },
    {
        ukr:'Програмна інженерія',
        eng:'Software Engineering'
    },
    {
        ukr:'Садівництво',
        eng:'Gardening'
    },
    {
        ukr:'Операції',
        eng:'Operations'
    },
    {
        ukr:'Кібербезпека',
        eng:'Cyber Security'
    },
    {
        ukr:'Розробка додатків',
        eng:'Application Development'
    },
    {
        ukr:'Вищі студії',
        eng:'Higher Studies'
    },
    {
        ukr:'Судове розгляд та юридичний сервіс',
        eng:'Retailer Litigation & Legal service'
    },
];


const questions = [
    "Ви регулярно заводите нових друзів",
    "Складні та нові ідеї захоплюють вас більше, ніж прості та зрозумілі.",
    "Зазвичай вас більше переконує те, що резонує з вами емоційно, ніж фактичні аргументи.",
    "Ваш житловий і робочий простір чистий і організований.",
    "Зазвичай ви зберігаєте спокій, навіть під великим тиском.",
    "Ви вважаєте ідею налагодження контактів або просування себе перед незнайомими людьми дуже лякаючою.",
    "Ви ефективно розставляєте пріоритети та плануєте завдання, часто виконуючи їх задовго до дедлайну.",
    "Історії та емоції людей для вас звучать голосніше, ніж числа чи дані.",
    "Вам подобається використовувати організаційні інструменти, такі як розклади і списки",
    "Навіть незначна помилка може викликати у вас сумніви у ваших здібностях і знаннях.",
    "Ви відчуваєте себе комфортно, просто підходячи до когось, кого вважаєте цікавим, і розпочинаючи розмову.",
    "Ви не дуже зацікавлені в обговоренні різних інтерпретацій творів мистецтва.",
    "Ви віддаєте перевагу фактам понад почуття людей при визначенні курсу дії.",
    "Ви часто дозволяєте дню розгортатися без будь-якого розкладу.",
    "Ви рідко переймаєтеся тим, чи справляєте гарне враження на людей, яких зустрічаєте.",
    "Вам подобається брати участь у групових заходах.",
    "Вам подобається експериментувати з новими та неперевіреними підходами.",
    "Ви віддаєте перевагу бути чутливим ніж бути абсолютно чесним.",
    "Ви активно шукаєте нові досвіди та області знань для дослідження.",
    "Ви схильні хвилюватися через те, що все може стати гірше.",
    "Вам більше подобаються самотні хобі чи заняття, ніж групові.",
    "Ви не можете уявити, що пишете вигадані історії, щоб заробляти на життя",
    "Ви віддаєте перевагу ефективності у прийнятті рішень, навіть якщо це означає ігнорування деяких емоційних аспектів",
    "Ви волієте виконувати свої обов'язки, перш ніж дозволити собі розслабитися.",
    "У суперечках ви більше зосереджені на тому, щоб довести свою думку, аніж на збереженні почуттів інших.",
    "Зазвичай ви чекаєте, поки інші першими познайомляться на зустрічах.",
    "Ваш настрій може змінюватися дуже швидко.",
    "На вас нелегко вплинути емоційними аргументами.",
    "Ви часто робите щось в останній можливий момент.",
    "Вам подобається обговорювати етичні дилеми.",
    "Зазвичай ви віддаєте перевагу спілкуванню з іншими, аніж самотності.",
    "Ви починаєте нудьгувати або втрачаєте інтерес, коли дискусія стає надто теоретичною.",
    "Коли факти та почуття  вступають у конфлікт, ви зазвичай слухаєте своє серце.",
    "Вам важко підтримувати  стабільний робочий або навчальний графік.",
    "Ви рідко ставите під сумнів зроблений вибір.",
    "Ваші друзі описали б вас як живого та товариського.",
    "Вас тягне до різних форм творчого самовираження, таких як письмо.",
    "Зазвичай ви робите свій вибір на основі об'єктивних фактів, а не емоційних вражень.",
    "Вам подобається мати список справ на кожен день.",
    "Ви рідко відчуваєте невпевненість.",
    "Ви уникаєте телефонних дзвінків.",
    "Вам подобається досліджувати незнайомі ідеї та точки зору.",
    "Ви легко можете спілкуватися з людьми, яких щойно зустріли.",
    "Якщо ваші плани порушуються, ви перш за все прагнете якнайшвидше їх налагодити.",
    "Вас досі турбують помилки, які ви зробили давно.",
    "Вам не дуже цікаво обговорювати, як світ міг би виглядати в майбутньому.",
    "Ваші емоції керують вами більше, ніж ви ними.",
    "Приймаючи рішення, ви більше зосереджуєтеся на тому, як почуватимуться люди, ніж на тому, що є найбільш логічним чи ефективним.",
    "Ваш особистий стиль роботи ближчий до спонтанних вибухів енергії, ніж до організованих і послідовних зусиль.",
    "Коли хтось високо вас цінує, ви подумки питаєте себе, скільки часу знадобиться цій людині, щоб розчаруватися в вас.",
    "Вам подобається діяльність, яка вимагає від вас роботи на самоті більшу частину часу.",
    "Ви вважаєте, що міркувати над абстрактними філософськими питаннями — це марна трата часу.",
    "Вас більше тягне до місць із жвавою, гамірною атмосферою, ніж до тихих, інтимних місць.",
    "Якщо рішення здається вам правильним, ви часто дієте відповідно до нього, не потребуючи додаткових доказів.",
    "Ви часто відчуваєте себе пригніченим.",
    "Ви виконуєте все методично, не пропускаючи жодного кроку.",
    "Ви віддаєте перевагу завданням, які потребують від вас творчих рішень, а не дотримання конкретних кроків.",
    "Приймаючи рішення, ви більше покладаетесь на інтуїцію, ніж на логіку.",
    "Ви боретеся з дедлайнами",
    "Ви відчуваєте впевненість у тому, що вам усе вдасться.",
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
    {code: '13', ukr: "Механічна інженерія", eng: "mechanical engineering", image: '/spec/131.jpg'},
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
    {code: '91', ukr: "Біологія та біохімія", eng: "botany", image: '/spec/91.jpg'},
    {code: '91', ukr: "Біологія та біохімія", eng: "biology", image: '/spec/91.jpg'},
    {code: '71', ukr: "Облік і оподаткування", eng: "taxation", image: '/spec/71.jpg'},
    {code: '76', ukr: "Підприємництво та торгівля", eng: "business administration", image: '/spec/76.png'},
    {code: '76', ukr: "Підприємництво та торгівля", eng: "business", image: '/spec/76.png'},
    {code: '28', ukr: "Публічне управління та адміністрування", eng: "business administration", image: '/spec/28.jpg'},
    {code: '28', ukr: "Публічне управління та адміністрування", eng: "business management", image: '/spec/28.jpg'},
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
    {code: '1', ukr: "Освіта/Педагогіка", eng: "home science", image: '/spec/1.webp'},
    {code: '12', ukr: "Інформаційні технології", eng: "computers", image: '/spec/126.jpg'},
    {code: '12', ukr: "Інформаційні технології", eng: "computer", image: '/spec/126.jpg'},
    {code: '2', ukr: "Культура і мистецтво", eng: "english", image: '/spec/2.jpg'},
    {code: '2', ukr: "Культура і мистецтво", eng: "arts", image: '/spec/2.jpg'},
    {code: '2', ukr: "Культура і мистецтво", eng: "kathak dance", image: '/spec/2.jpg'},
    {code: '3', ukr: "Гуманітарні науки", eng: "english", image: '/spec/3.jpg'},
    {code: '61', ukr: "Журналістика", eng: "journalism", image: '/spec/61.jpg'},
    {code: '123', ukr: "Комп'ютерна інженерія", eng: "computer engineering", image: '/spec/123.jpg'},
    {code: '112', ukr: "Статистика", eng: "statistics", image: '/spec/112.jpg'},
    {code: '16', ukr: "Хімічна інженерія та біоінженерія", eng: "chemical engineering", image: '/spec/102.jpg'},
    {code: '124', ukr: "Системний аналіз", eng: "data science", image: '/spec/124.jpg'},
    {code: '27', ukr: "Транспорт", eng: "automobile", image: '/spec/27.jpg'},
    {code: '22', ukr: "Дизайн", eng: "design", image: '/spec/27.jpeg'},
    {code: '22', ukr: "Дизайн", eng: "interior design", image: '/spec/27.jpeg'},
    {code: '22', ukr: "Дизайн", eng: "fashion designing", image: '/spec/27.jpeg'},
    {code: '134', ukr: "Авіаційна та ракетно-космічна техніка", eng: "aerospace engineering", image: '/spec/134.jpg'},
    {code: '54', ukr: "Соціологія", eng: "sociology", image: '/spec/54.jpg'},
    {code: '1', ukr: "Освіта/Педагогіка", eng: "literature", image: '/spec/1.webp'},
    {code: '10', ukr: "Природничі науки", eng: "science", image: '/spec/10.jpg'},
    {code: '21', ukr: "Аудіовізуальне мистецтво та виробництво", eng: "animation & visual effects", image: '/spec/21.jpg'},
    {code: '21', ukr: "Аудіовізуальне мистецтво та виробництво", eng: "animation", image: '/spec/21.jpg'},
    {code: '21', ukr: "Аудіовізуальне мистецтво та виробництво", eng: "vedio editing", image: '/spec/21.jpg'},
    {code: '32', ukr: "Історія та археологія", eng: "history", image: '/spec/3.jpg'},
]


const CourseCard = ({setAllCoursesRated, allCoursesRated, course, onRate, value, setValue, MBTI, recom, setRecom, matchingSpecialties, setMatchingSpecialties}) => {
    const [gender, setGender] = useState('');
    const [interests, setInterests] = useState([]);
    const [gpa, setGpa] = useState('');

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    console.log("interests: ", interests);
    const handleInterestsChange = (event) => {
        const selectedInterests = event.target.value;

        console.log("englishInterests: ", selectedInterests);
        setInterests(selectedInterests);
        // setInterests(event.target.value);
    };

    const handleGpaChange = (event) => {
        setGpa(event.target.value);
    };
    const getRecommend = async () => {
        try {
            const englishInterests = interests.map(ukrInterest => {
                const match = interestsList.find(item => item.ukr === ukrInterest);
                return match ? match.eng : ukrInterest;
            });
            const interestsString = englishInterests.join(';');

            const convertedGrade = Math.round((gpa / 12) * 100);
            const inputData = {
                mbti: MBTI,
                grade: convertedGrade,
                gender: gender,
                interests: interestsString,
            }
            // const userFeatures = [1, 276, 162, 6];
            const response = await axios.post('http://localhost:5000/recommend', {inputData: inputData});
            console.log("response: ", response.data.recommend);
            setRecom(response.data.recommend);

            if (response.data.recommend) {
                const matching = specialties.filter((specialty) => {
                    return response.data.recommend.includes(specialty.eng.toLowerCase());
                });

                const uniqueMatching = [...new Set(matching)];

                const getUniqueData = (data) => {
                    const uniqueCodes = new Set();
                    return data.filter(item => {
                        if (!uniqueCodes.has(item.code)) {
                            uniqueCodes.add(item.code);
                            return true;
                        }
                        return false;
                    });
                };

                const uniqueData = getUniqueData(uniqueMatching);

                console.log("uniqueData: ", uniqueData)

                setMatchingSpecialties(uniqueData);
                // // console.log("localstorage userToken: ", localStorage.getItem('user'));
                // let user = localStorage.getItem('user')
                // const parsedUser = JSON.parse(user);
                // console.log("parsedUser: ", parsedUser.access_token);
                // const token = parsedUser.access_token
                // const saveResponse = await axios.post('http://localhost:5000/save_recommendations', { recommendations: uniqueData }, {
                //     headers: {
                //         'Authorization': `Bearer ${token}`, // Assuming you store the token in localStorage
                //         'Content-Type': 'application/json' // Ensure the content type is set
                //     }
                // });
                //
                // console.log("Recommendations saved successfully", saveResponse.data);
            }

            // console.log("recommendations: ", recommendations);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };
    console.log("recom: ", recom);
    console.log("matchingSpecialties: ", matchingSpecialties);


    const handleSubmit = (event) => {
        event.preventDefault();
        getRecommend();

        console.log('Gender:', gender);
        console.log('Interests:', interests);
        console.log('GPA:', gpa);
        setAllCoursesRated(true);
        // Добавьте вашу логику обработки отправки формы здесь
    };
    const isButtonDisabled = !gender || gpa < 1 || gpa > 12;
    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{marginBottom: 2}}>
                <FormControl fullWidth>
                    <InputLabel id="gender-label">Стать</InputLabel>
                    <Select
                        labelId="gender-label"
                        id="gender"
                        value={gender}
                        onChange={handleGenderChange}
                    >
                        <MenuItem value={'Male'}>Чоловік</MenuItem>
                        <MenuItem value={'Female'}>Жінка</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{marginBottom: 2}}>
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
                            <MenuItem key={interest.ukr} value={interest.ukr}>
                                <Checkbox checked={interests.includes(interest.ukr)} />
                                <ListItemText primary={interest.ukr} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{marginBottom: 2}}>
                <TextField
                    fullWidth
                    id="gpa"
                    label="Середній бал у табелі"
                    type="number"
                    value={gpa}
                    onChange={handleGpaChange}
                />
            </Box>
            <Button variant="contained" type="submit" disabled={isButtonDisabled}>Отримати рекомендацію</Button>
        </form>
    );
};

const Course = () => {
    const [matchingSpecialties, setMatchingSpecialties] = useState([]);

    const [recom, setRecom] = useState([]);
    const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
    const [value, setValue] = useState(0);
    const [courseData, setCourseData] = useState([]);
    const [allCoursesRated, setAllCoursesRated] = useState(false);
    const [testPass, setTestPass] = useState(false);

    const [questionsFromApi, setQuestionsFromApi] = useState([]);
    const [updatedQuestions, setUpdatedQuestions] = useState([]);

    const [MBTI, setMBTI] = useState('');

    const [answers, setAnswers] = useState(Array(questions.length).fill('0'));
    console.log("allCoursesRated: ", allCoursesRated)

    const handleAnswerChange = (questionIndex, value) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = value;
        setAnswers(newAnswers);
    };

    useEffect(() => {
        axios.get('https://16personalities-api.com/api/personality/questions')
            .then(response => {
                setQuestionsFromApi(response.data);
                console.log("response.data: ", response.data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
                setMBTI("INTJ");
            });
    }, []);

    useEffect(() => {
        const storedData = localStorage.getItem('courseData');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);


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

    const [isRecommended, setIsRecommended] = useState(false);

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
            if (recommendations.length > 0){
                setAllCoursesRated(true);
            }

            // Update state or do something with the recommendations
            setMatchingSpecialties(recommendations);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };
    const [personality, setPersonality] = useState({});
    const updateQuestionsWithId = () => {
        const updated = questions.map((question, index) => {
            return {
                id: questionsFromApi[index]?.id,
                text: question,
            };
        });
        const formattedAnswers = answers.filter(answer => answer !== undefined).map((answer, index) => ({
            id: updated[index]?.id,
            value: parseInt(answer)
        }));

        const formattedData = {
            answers: formattedAnswers,
            gender: "Male"
        };
        setUpdatedQuestions(updated);

        console.log("formattedData: ", formattedData);

        axios.post('https://16personalities-api.com/api/personality/submit', formattedData)
            .then(response => {
                console.log('Response data:', response.data);
                setPersonality(response.data);
                const avatarAlt = response.data.avatarAlt;
                setMBTI(avatarAlt.substring(0, 4));
            })
            .catch(error => {
                console.error('There was an error with the axios request:', error);
            });
    };

    console.log("YOUR MBTI IS: ", MBTI);

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
        updateQuestionsWithId();


        setTestPass(true)
    };

console.log("matchingSpecialties: ", matchingSpecialties);
    if (allCoursesRated) {
        return <CourseSelection matchingSpecialties={matchingSpecialties} personality={personality}/>;
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

                                        <FormControlLabel value="3" control={<Radio/>}
                                                          labelPlacement="start" sx={{marginRight: '15px'}}/>
                                        <FormControlLabel value="2" control={<Radio/>}/>
                                        <FormControlLabel value="1" control={<Radio/>}/>
                                        <FormControlLabel value="0" control={<Radio/>}/>
                                        <FormControlLabel value="-1" control={<Radio/>}/>
                                        <FormControlLabel value="-2" control={<Radio/>}/>
                                        <FormControlLabel value="-3" control={<Radio/>}/>

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
                                    setValue={setValue} setAllCoursesRated={setAllCoursesRated}
                                    allCoursesRated={allCoursesRated}
                                    MBTI={MBTI}
                                    recom={recom}
                                    setRecom={setRecom}
                                    setMatchingSpecialties={setMatchingSpecialties}
                                    matchingSpecialties={matchingSpecialties}
                        />
                    )}
                </Box>
            }

            {/*<Navbar/>*/}

        </div>
    );
};
export default Course;
