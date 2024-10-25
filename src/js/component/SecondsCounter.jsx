import React from 'react';

function SecondsCounter() {
  let count = 0; // Almacena el valor actual del contador
  let isCountingDown = false; // Booleano para indicar si está en cuenta regresiva
  let inputValue = ''; // Valor ingresado en el campo de entrada
  let interval = null; // Referencia al temporizador de setInterval
  let displayElement = null; // Referencia al elemento de display
  let inputElement = null; // Referencia directa al elemento de entrada

  // Función que actualiza el display
  const updateDisplay = () => {
    if (displayElement) {
      displayElement.textContent = String(count).padStart(6, '0'); // Asegura siempre 6 dígitos en el contador
    }
  };

  // Función para iniciar el intervalo
  const startInterval = () => {
    if (interval) clearInterval(interval); // Limpia cualquier intervalo previo
    interval = setInterval(() => {
      if (isCountingDown && count > 0) {
        count -= 1;
      } else {
        count += 1;
      }
      updateDisplay();

      if (isCountingDown && count === 0) {
        clearInterval(interval); // Detenemos el contador
        alert('¡El tiempo ha terminado!');
        inputElement.value = ''; // Limpia el input cuando termina
        count = 0;
        updateDisplay();
      }
    }, 1000);
  };

  // Función para iniciar la cuenta
  const startCountdown = () => {
    clearInterval(interval); // Detenemos cualquier intervalo previo
    const inputVal = parseInt(inputValue, 10);
    if (!isNaN(inputVal)) {
      count = inputVal;
      isCountingDown = false;
      updateDisplay();
      startInterval();
      inputElement.value = ''; // Limpia el campo de entrada después de iniciar
    }
  };

  // Función para reiniciar
  const reset = () => {
    clearInterval(interval);
    count = 0;
    isCountingDown = false;
    updateDisplay();
    startInterval();
  };

  // Función para capturar el valor del input
  const handleInputChange = (e) => {
    inputValue = e.target.value;
  };

  // Función para activar la cuenta regresiva
  const toggleCountdown = () => {
    clearInterval(interval);
    const inputVal = parseInt(inputValue, 10);
    if (!isNaN(inputVal)) {
      count = inputVal;
      isCountingDown = true;
      updateDisplay();
      startInterval();
      inputElement.value = ''; // Limpia el campo de entrada después de activar cuenta regresiva
    }
  };

  // Inicia el temporizador al cargar la página
  window.onload = () => {
    startInterval();
  };

  return (
    <div className="counter-container">
      <span className="clock-icon">🕒</span>
      <div
        className="counter"
        ref={(el) => (displayElement = el)} // Referencia directa al display
      >
        000000
      </div>

      <input
        type="number"
        placeholder="Número inicial"
        onChange={handleInputChange} // Captura del input
        ref={(el) => (inputElement = el)} // Asigna inputElement directamente
        className="input-countdown"
      />
      <button onClick={startCountdown} className="reset-buttton">
        Iniciar
      </button>
      <button onClick={reset} className="reset-buttton">
        Reiniciar
      </button>
      <button onClick={toggleCountdown} className="button">
        Cuenta Regresiva
      </button>
    </div>
  );
}

export default SecondsCounter;




