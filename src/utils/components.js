export async function loadComponent(id, componentPath) {
  try {
    // En desarrollo, siempre hacer fetch
    if (import.meta.env.DEV) {
      const response = await fetch(componentPath);
      const html = await response.text();
      document.getElementById(id).innerHTML = html;
      return;
    }
    
    // Intentar obtener sessionStorage
    // Esto es para que no importe si se recarga la pagina, no volver a llamarnos
    let html = sessionStorage.getItem(componentPath);

    if (!html) {
      const response = await fetch(componentPath);
      html = await response.text();
      // Guardar en sessionStorage para futuras cargas
      sessionStorage.setItem(componentPath, html);
    }

    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error(`Error al cargar ${componentPath}:`, error);
  }
}