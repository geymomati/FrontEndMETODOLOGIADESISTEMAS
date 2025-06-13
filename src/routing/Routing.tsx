import PrivateGuard from '@/routing/PrivateGuard';
import RedirectGuard from '@/routing/RedirectGuard';
import Layout from '@layout/Layout';
import Admin from '@screens/Admin/Admin';
import Home from '@screens/Home/Home';
import Profesionales from '@screens/Profesionales/Profesionales';
import Professional from '@screens/Professional/Professional';
import Reservar from '@screens/Reservar/Reservar';
import Reservas from '@screens/Reservas/Reservas';
import Servicios from '@screens/Servicios/Servicios';
import Tratamientos from '@screens/Tratamientos/Tratamientos';
import { Route, Routes } from 'react-router';

const Routing = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<RedirectGuard />}>
          <Route index element={<Home />} />

          <Route path='servicios' element={<Servicios />} />
          <Route path='servicios/:categoria' element={<Profesionales />} />
          <Route
            path='servicios/:categoria/:professionalId'
            element={<Tratamientos />}
          />
          <Route
            path='servicios/:categoria/:professionalId/:servicioId'
            element={<Reservar />}
          />

          <Route element={<PrivateGuard />}>
            <Route element={<RedirectGuard />}>
              <Route path='mis-reservas/:idUser' element={<Reservas />} />

              <Route path='admin' element={<Admin />} />
              <Route path='professional' element={<Professional />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Routing;
