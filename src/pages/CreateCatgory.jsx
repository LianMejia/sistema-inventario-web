import { Container, TextField, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { db, storage } from '../firebase';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export const CreateCatgory = () => {

    const [file, setFile] = useState(null);

    const [open, setOpen] = useState(false);
    const [ref, setRef] = useState(null);
    const useStorage = storage;
    const [Imagen, setImagen] = useState(null);

    const [codigoProducto, setCodigoProducto] = useState('')

    const handleCodigoProducto = (e) => {
        setCodigoProducto(e)
    }

    const [costoVentaProducto, setCostoVentaProducto] = useState('')

    const handleCostoVentaProducto = (e) => {
        setCostoVentaProducto(e)
    }

    const [nombreProducto, setNombreProducto] = useState('')

    const handleNombreProducto = (e) => {
        setNombreProducto(e)
    }

    const [cantidadProducto, setCantidadProducto] = useState('')

    const handleCantidadProducto = (e) => {
        setCantidadProducto(e)
    }

    const [pvpProducto, setPvpProducto] = useState('')

    const handlePvpProducto = (e) => {
        setPvpProducto(e)
    }

    const [fechaCompraProducto, setFechaCompraProducto] = useState('')

    const handleFechaCompraProducto = (e) => {
        setFechaCompraProducto(e)
    }

    var imagenUrl;

    const crearProducto = async () => {
        try {
            const newRef = useStorage.ref('images').child(nombreProducto); // nombre del archivo
            setRef(newRef);
            await newRef.put(Imagen);
            const urlImagen = await newRef.getDownloadURL()
            imagenUrl = urlImagen;
            console.log('la url de la imagen es' + urlImagen);
        } catch (error) {
            alert(error);
        }

        await db.collection("productos").doc(nombreProducto.toUpperCase()).set({
            codigoProducto: codigoProducto,
            nombreProducto: nombreProducto.toUpperCase(),
            costoVentaProducto: costoVentaProducto,
            pvpProducto: pvpProducto,
            fechaCompraProducto: fechaCompraProducto,
            imagenProducto: imagenUrl
        }).then(() => {
            setOpen(false)
            Swal.fire({ icon: "success", text: "Se ha creado el nuevo producto con exito", });
        })
            .catch((error) => { console.error("Error adding document: ", error); });
        console.log('ok');
    }

    //OBTENIENDO LA IMAGEN
    

    useEffect(() => {
        setFile(Imagen)
    }, [])

    const [image, setImage] = useState(null)

    const [viewImagen, setViewImagen] = useState(null)

    const changeImagen = async (e) => {
        setImagen(e.target.files[0]);
        setViewImagen(URL.createObjectURL(e.target.files[0]));
        console.log(Imagen);
    }

const onImageChange = (event) => {
 if (event.target.files && event.target.files[0]) {
   setImagen(URL.createObjectURL(event.target.files[0]));
 }
}

    return (
        <>
            <Container maxWidth="md" style={{ height: '100vh' }}>

                <Card>
                    <CardContent>
                        <h2>NUEVO PRODUCTO</h2>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            direction="row"
                            justifyContent="center"
                            alignItems="center">
                            <Grid item xs={6}>
                                <TextField fullWidth label="CODIGO PRODUCTO" variant="filled" type='number' value={codigoProducto} onChange={(e) => handleCodigoProducto(e.target.value)} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="NOMBRE" variant="filled" value={nombreProducto} onChange={(e) => handleNombreProducto(e.target.value)} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="COSTO DE VENTA" variant="filled" type='number' value={costoVentaProducto} onChange={(e) => handleCostoVentaProducto(e.target.value)} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="PVP" variant="filled" type='number' value={pvpProducto} onChange={(e) => handlePvpProducto(e.target.value)} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="FECHA COMPRA" variant="filled" type='number' value={fechaCompraProducto} onChange={(e) => handleFechaCompraProducto(e.target.value)} />
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    onChange={changeImagen}
                                    variant="contained"
                                    component="label"
                                >
                                    AGREGAR FOTO
                                    <input
                                        type="file"
                                        hidden
                                    />
                                </Button>
                                {/* <Button onChange={changeImagen} >
                                    <input
                                        type="file"
                                        hidden
                                    />
                                    <AddAPhotoIcon />
                                </Button> */}
                            </Grid>
                        </Grid>
                        {/* <aside id="modal" className="modal">
                            <div className="content-modal">
                                <header>
                                    <input type="file" name="imagen" onChange={changeImagen} />
                                </header>
                            </div>
                        </aside> */}
                        <br/>
                       <img width={200} src={viewImagen}/>
                    </CardContent>
                    <CardActions>
                        <Button disabled={!codigoProducto || !nombreProducto || !costoVentaProducto
                            || !pvpProducto || !fechaCompraProducto || !Imagen} onClick={() => crearProducto()} fullWidth variant="contained">CREAR PRODUCTO</Button>
                    </CardActions>
                </Card>
                
            </Container>

        </>
    )
}
