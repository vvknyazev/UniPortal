import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Container, Typography} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function createData(subject, name, type, year, date, grade) {
    return {subject, name, type, year, date, grade};
}

const rows = [
    createData('Філософія', 'Шевченко Т. С.', 'Залік', '2021-2022',   '12/14/2021', 100),
    createData('Основи програмування', 'Кузьменко А.М.', 'Залік', '2021-2022', '12/8/2021', 95),
    createData('Вища математика', 'Коваленко О.П. ', 'Іспит', '2021-2022', '12/12/2021', 97),
    createData('Фізика', 'Білоус О.А. ', 'Іспит', '2021-2022',  '12/19/2021', 68),
    createData('Дискретні стурктури', 'Павлюк О.О.', 'Іспит', '2021-2022', '12/17/2021', 78),
    createData("Компютерні мережі", 'Степаненко Л.О.', 'Залік', '2021-2022', '12/10/2021', 85),
    createData('Основи обислювального інтелекту', 'Гончарук Н.В.', 'Іспит', '2021-2022', '12/8/2021', 91),

];

export default function Grades() {
    return (
        <div>
            <Navbar/>
            <Container maxWidth="xl" height="100vh">

                <Typography variant={"h1"} mt={3} mb={2} sx={{fontFamily: "'Balsamiq Sans', sans-serif", textAlign: "center"}}>Grades</Typography>

                <TableContainer component={Paper}
                                sx={{borderRadius: 2, margin: 'auto', width: 'auto', overflow: 'hidden'}}>
                    <Table sx={{ minWidth: 650, borderCollapse: 'collapse', fontSize: "20px"}} aria-label="simple table">

                    <TableHead>
                            <TableRow sx={{
                                '& th': {
                                    fontSize: '17px',
                                    fontWeight: 'bold',
                                    backgroundColor: 'primary.main',
                                    color: 'common.white',
                                    borderRight: '1px solid rgba(224, 224, 224, 1)', // Вертикальные разделители для заголовков
                                },
                                '& th:last-child': {
                                    borderRight: 'none',
                                }
                            }}>
                                <TableCell sx={{
                                    '& th': {
                                        fontWeight: 'bold',
                                        backgroundColor: 'primary.light',
                                        color: 'common.white',
                                        fontSize: '16px',
                                        borderRight: '1px solid rgba(224, 224, 224, 1)', // Вертикальные разделители для заголовков
                                    }}}>Назва дисципліни</TableCell>
                                <TableCell align="right">ПІБ Викладача</TableCell>
                                <TableCell align="right">Тип контролю</TableCell>
                                <TableCell align="right">Навчальний рік</TableCell>
                                <TableCell align="right">Дата складання</TableCell>
                                <TableCell align="right">Оцінка</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    key={row.name}
                                    sx={{
                                        backgroundColor: index % 2 ? 'action.hover' : 'common.white',
                                        '& td': {
                                            borderRight: '1px solid rgba(224, 224, 224, 1)', // Вертикальные разделители для ячеек
                                            fontSize: '16px', // Размер шрифта для ячеек
                                            fontFamily: "'Roboto', sans-serif;"
                                        },
                                        '& td:last-child': {
                                            borderRight: 'none',
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row" sx={{ borderRight: '1px solid rgba(224, 224, 224, 1)',  fontSize: '16px' }}>
                                        {row.subject}
                                    </TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.type}</TableCell>
                                    <TableCell align="right">{row.year}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">{row.grade}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

        </div>
    );
}
