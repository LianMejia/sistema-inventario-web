import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppBarComponent } from '../components/AppBar/AppBarComponent';
import { CreateCatgory } from '../pages/CreateCatgory';
import { ViewsProducts } from '../pages/ViewsProducts';
export const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <AppBarComponent />
                <Routes>
                    <Route path='crearProducto/' element={<CreateCatgory />} />
                    <Route path='listaProductos/' element={<ViewsProducts />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}