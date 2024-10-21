import React from 'react'

function Seconds() {
  // variabale fuera del render para mantener el estado
  let count = 0; // variable para el contador
  let isCountingDown = false // mdodo cuenta regresiva
  let inputValue = ''; // valor del input
  let interval = null; // referencia al intervalo
  let displayElement = null; //referencia manual


  // funcion para actualizar el display manualmente
  const updateDisplay = () => {
   
    if (displayElement) {
      displayElement.textContent = String(count).padStart(6, '0');
    }
  };

  // funcion para iniciar el intervalo de conteo
  const startInterval = () => {
    if (interval) clearInterval(interval) // limpia intervalo si lla esiste


    interval = setInterval(() => {
      if (isCountingDown && count > 0) {
        count -= 1; // decrementar en modo cuenta regresiva
      } else {
        count += 1; // incrementar si no esta en cuenta regresiva
      }
      updateDisplay(); // actualiza visualmente el contador
    }, 1000);
  };

  // funcion para iniciar la cuenta regresiva
  const startCountdown = () => {
    const inputVal = parseInt(inputValue, 10); // convertir el valor del input
    if (!isNaN(inputVal)) {
      count = inputVal; // establecer el valor del contador
      isCountingDown = true; // cambiar a modo cuenta regresiva
      startInterval(); // iniciar el intervalo
    }
  };

  // funcion para iniciar el contador
  const reset = () => {
    clearInterval(interval); // detener el intervalo
    count = 0; // reiniciar el contador
    isCountingDown = false; // desactivar la cuenta regresiva
    updateDisplay(); // actualizar el display a "0"
  };

  const handleInputChange = (e) => {
    inputValue = e.target.value;
  };

  return (
    <div className="counter-container">
      <span className="clock-icon">🕒</span>
      <div className="counter" ref={(el) => (displayElement = el)}
      >
        000000
      </div>
      <input type="number"
        placeholder="Numero inicial"
        onChange={handleInputChange}
        className="input-countdown"
      />
      <button onClick={startCountdown} className="reset-buttton">
        Reiniciar
      </button>

    </div>
  )
}

export default Seconds