// Referencias DOM
const tbodyCursos = document.getElementById("tbodyCursos");

const misCursos = [
  { nombre: "Virtualización", profesor: "Carlos Vega", nota: 90 },
  { nombre: "Redes", profesor: "Pablo Jose", nota: 85 },
  { nombre: "Lenguaje C#", profesor: "Fernando Ramirez", nota: 95 },
  {
    nombre: "Lenguaje de Consulta de Base de Datos",
    profesor: "Richard García",
    nota: 100,
  },
];

misCursos.forEach((curso) => {
  const tr = document.createElement("tr");

  // Obtiene SOLO los valores del objeto y crea una celda para cada uno
  // Si quisieramos obtener las claves, usaríamos Object.keys(curso)
  // Si quisieramos obtener pares clave-valor, usaríamos Object.entries(curso)
  Object.values(curso).forEach((valor) => {
    const td = document.createElement("td");
    td.textContent = valor;
    tr.append(td);
  });

  tbodyCursos.append(tr);
});
