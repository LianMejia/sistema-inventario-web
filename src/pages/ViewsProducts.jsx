import {
    IconButton,
    Table,
    Button,
    Typography,
    TableContainer,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    Paper,
    Chip,
    Box,
    Collapse,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";

import { db, firebase } from "../firebase";

export const ViewsProducts = () => {




    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [data, setData] = useState()
    const [search, setSearch] = useState('')
    const [isLastPage, setIsLastPage] = useState(0);
    const [queryDoc, setQueryDocqueryDoc] = useState([]);
    var current = new Date();
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date(current.getTime() + 86400000))
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    useEffect(() => {
        LoadData()
    }, []);

    const LoadData = (startAfterDoc, persistMessages = []) => {
        let ref = db.collection("productos");

        ref.onSnapshot((snapshot) => {
            const totalCount = snapshot.size;
            const data = [
                ...persistMessages,
                ...snapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id: doc.id,
                    };
                }),
            ];

            setData(data);
            setQueryDocqueryDoc(snapshot.docs[totalCount - 1]);
            setIsLastPage(totalCount < 1);
        });

    };

    return (
        <>
            

            <Container maxWidth="xl">
            <Box pt={1} pl={1}>
                <h2 >
                    <strong>({data && data.length})</strong> PRODUCTOS
                </h2 >
            </Box>
            <br />
                <Paper sx={{ maxWidth: { xs: 340, sm: '100%' }, overflow: 'hidden' }} >
                    <TableContainer sx={{ maxHeight: 540 }}>
                        <Table size="small" stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>CODIGO PRODUCTO</TableCell>
                                    <TableCell>NOMBRE PRODUCTO</TableCell>
                                    <TableCell>COSTO VENTA</TableCell>
                                    <TableCell>FECHA COMPRA</TableCell>
                                    <TableCell>PVP</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data && data.map((row, key) => (
                                    <TableRow hover key={key}>

                                        <TableCell component="th" scope="row">
                                            {row.codigoProducto}
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            {row.nombreProducto}
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            {row.costoVentaProducto}
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            {row.fechaCompraProducto}
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            {row.pvpProducto}
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>|
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </>
    );
};