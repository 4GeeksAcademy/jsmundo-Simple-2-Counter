import React from 'react';


// este es el componente que se renderiza en la interfaz
function SecondsCounter() {
 let count = 0; // almacena el valor actual del contador
 let isCountingDown = false; //un booleano que indica si el contador esta en cuenta regresiva
 let inputValue = ''; // almacena el valor ingresado en el campo de entrada
 let interval = null; // referecia al temporizador que se establece mediante setinterval
 let displayElement = null; // usado para referirse al elemento dom donde se mostrata el contador


 // funcion  updateDisplay
 const updateDisplay = () => { // esta funcion actualiza el contenido'displayElement' con el valor actual de count
  if(displayElement) {     // asegurando que siempre tengamos 6 digitos
    displayElement.textContent = String(count).padStart(6, '0');
  }
 };
    // funcion startInterval      
   const startInterval = () => {//esta funcion inicia o reinicia el intervalo que actualiza el cntador cada segundo
    if(interval) clearInterval (interval);// y dependiendo del valor de isCountingDown,el contador se ingrementa o se decremente
    interval = setInterval(()=>{// llamando a updateDisplay para mostrar el nuevo valor en pantalla
      if(isCountingDown && count > 0) {
        count -= 1;
      }else{
        count += 1;
      }
      updateDisplay();
   if(isCountingDown && count === 0){
    clearInterval(interval);//detenemos el contador
    alert('¡El tiempo ha terminado!');
    inputValue = '';
    count = 0;
    updateDisplay();
   }

    }, 1000);

   };

   // funcion startCountdow          esta funcion detiene cualquier intervalo previo y convierte el valor del input en un numero
   const startCountdown = () => {    // si el valor es valido establece el contador count a este valor y cambia el modo a ascendente  isCountingDown = false;
    clearInterval(interval);         //ademas actualiza el display y comienza el intervalo
    const inputVal = parseInt(inputValue, 10);
    if(!isNaN(inputVal)) {
      count = inputVal;
      isCountingDown = false;
      updateDisplay();
      startInterval();
     
     
    }
   };

   // funcion reset               esta funcion detiene el intervalo activo,reinicia count acero y
   const reset = () => {       //  de forma acendente
    clearInterval(interval);
    count = 0;
    isCountingDown = false;
    updateDisplay();
    startInterval();
   
   };

   // funcion handleInputChange          esta funcion se llama cada vez que hay cambios en el input,actulizando inputvalue
   const handleInputChange = (e) =>{   // con el nuevo valor ingresado por el usuario
    inputValue = e.target.value;
   };

   // funcion toggleCountdown                 esta funcion de tiene cual quier intervalo previo, convierte el del input a un nuemero
      const toggleCountdown = () =>{      // y si es valido establese este valor en el count, cambiando isCountingDown a true
        clearInterval(interval);           //para activar el modo de cuenta
        const inputVal = parseInt(inputValue, 10);
        if(!isNaN(inputVal)){
          count = inputVal;
          isCountingDown = true;
          updateDisplay();
          startInterval();
         
        }
      };
       
      window.onload = () => {
        startInterval();
      }


  return (
    
    <div className="counter-container">
    <span className="clock-icon">🕒</span>
    <div
      className="counter"
      ref={(el) => (displayElement = el)} // Referencia al display
    >
      000000
    </div>
    
    <input
      type="number"
     
      placeholder="Número inicial"
      onChange={handleInputChange} // Actualizar valor del input
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



