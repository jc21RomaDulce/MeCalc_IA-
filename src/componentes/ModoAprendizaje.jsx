import React, { useState } from 'react';

const ModoAprendizaje = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <div>
            <button onClick={toggleVisibility} className="toggle-button">
                {visible ? 'Cerrar Modo de Aprendizaje' : 'Abrir Modo de Aprendizaje'}
            </button>
            {visible && (
                <div className="modo-aprendizaje emergente">
                    <h2>Modo de Aprendizaje</h2>
                    <p>Características clave de las calculadoras básicas:
                        Operaciones básicas: Suma, resta, multiplicación y división. 
                        Porcentajes: Cálculo de porcentajes de un número. 
                        Memoria: Permiten almacenar y recuperar valores para facilitar cálculos más complejos. 
                        Simplicidad: Tienen una interfaz sencilla y pocos botones, lo que las hace fáciles de usar. 
                        Uso cotidiano: Son ideales para realizar cálculos rápidos en tareas diarias.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ModoAprendizaje;