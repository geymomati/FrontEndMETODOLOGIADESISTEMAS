import styles from '@screens/Reservar/components/Calendario/Calendario.module.css';
import React, { useState } from 'react';

interface ICalendario {
  fechaSeleccionada: string;
  setFechaSeleccionada: React.Dispatch<React.SetStateAction<string>>;
  setHoraSeleccionada: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const diasSemana = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

const Calendario = ({
  fechaSeleccionada,
  setFechaSeleccionada,
  setHoraSeleccionada,
}: ICalendario) => {
  const hoy = new Date();
  const fechaMinima = new Date(hoy);
  fechaMinima.setDate(hoy.getDate() + 4);
  const fechaMaxima = new Date(fechaMinima);
  fechaMaxima.setDate(fechaMinima.getDate() + 30);

  const [mesActual, setMesActual] = useState(
    new Date(hoy.getFullYear(), hoy.getMonth())
  );

  const avanzarMes = () => {
    const siguienteMes = new Date(
      mesActual.getFullYear(),
      mesActual.getMonth() + 1
    );
    const primerDiaDelSiguienteMes = new Date(
      siguienteMes.getFullYear(),
      siguienteMes.getMonth(),
      1
    );

    if (primerDiaDelSiguienteMes <= fechaMaxima) {
      setMesActual(siguienteMes);
    }
  };

  const retrocederMes = () => {
    const anteriorMes = new Date(
      mesActual.getFullYear(),
      mesActual.getMonth() - 1
    );
    const ultimoDiaMesAnterior = new Date(
      anteriorMes.getFullYear(),
      anteriorMes.getMonth() + 1,
      0
    );

    if (ultimoDiaMesAnterior >= fechaMinima) {
      setMesActual(anteriorMes);
    }
  };

  const mesEsMinimo = () => {
    const primerDiaMesActual = new Date(
      mesActual.getFullYear(),
      mesActual.getMonth(),
      1
    );
    return primerDiaMesActual <= fechaMinima;
  };

  const mesEsMaximo = () => {
    const ultimoDiaMesActual = new Date(
      mesActual.getFullYear(),
      mesActual.getMonth() + 1,
      0
    );
    return ultimoDiaMesActual >= fechaMaxima;
  };

  const obtenerDiasDelMes = () => {
    const inicioMes = new Date(
      mesActual.getFullYear(),
      mesActual.getMonth(),
      1
    );
    const finMes = new Date(
      mesActual.getFullYear(),
      mesActual.getMonth() + 1,
      0
    );
    const dias = [];

    for (let i = 0; i < inicioMes.getDay(); i++) {
      dias.push(
        <span key={`empty-${i}`} className={styles['calendario-vacio']}></span>
      );
    }

    for (let d = 1; d <= finMes.getDate(); d++) {
      const fecha = new Date(mesActual.getFullYear(), mesActual.getMonth(), d);
      const fechaStr = fecha.toISOString().split('T')[0];
      const esSeleccionado = fechaStr === fechaSeleccionada;
      const estaDentroDeRango =
        fecha >= new Date(fechaMinima.toDateString()) &&
        fecha <= new Date(fechaMaxima.toDateString());
      const esFinDeSemana = fecha.getDay() === 0;

      dias.push(
        <span
          key={d}
          className={`${styles['calendario-dia']} ${!estaDentroDeRango || esFinDeSemana ? styles.pasado : ''} ${esSeleccionado ? styles.seleccionado : ''}`}
          onClick={() => {
            if (estaDentroDeRango) {
              setFechaSeleccionada(fechaStr);
              setHoraSeleccionada(undefined);
            }
          }}
        >
          {d}
        </span>
      );
    }

    return dias;
  };

  const nombreMes = mesActual.toLocaleDateString('es-ES', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles['calendario-spa']}>
      <div className={styles['calendario-header']}>
        <button onClick={retrocederMes} disabled={mesEsMinimo()}>
          ◀
        </button>
        <h3>{nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1)}</h3>
        <button onClick={avanzarMes} disabled={mesEsMaximo()}>
          ▶
        </button>
      </div>
      <div className={styles['calendario-dias-semana']}>
        {diasSemana.map((dia) => (
          <span key={dia}>{dia}</span>
        ))}
      </div>
      <div className={styles['calendario-grid']}>{obtenerDiasDelMes()}</div>
    </div>
  );
};

export default Calendario;
