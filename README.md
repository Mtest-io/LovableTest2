# MMC Digital Labs v4

Sitio estático minimalista listo para GitHub Pages.

## Editar header y footer
- `components/header.html` → menú de navegación (aplica a TODAS las páginas)
- `components/footer.html` → redes sociales, contacto, links legales

## Agregar un producto nuevo
1. Copia cualquier archivo de producto (ej: ebook1.html → ebook7.html)
2. Edita título, precio y descripción
3. Agrega el link en la página de categoría (ebooks.html)

## Prueba local
Requiere servidor local para el fetch() de componentes:
- VS Code → clic derecho en index.html → "Open with Live Server"
- Terminal → python3 -m http.server 8000

En GitHub Pages funciona directamente sin configuración.

## Estructura
components/header.html   ← EDITA AQUÍ el menú
components/footer.html   ← EDITA AQUÍ redes y contacto
css/styles.css
js/main.js
index.html
ebooks / apps / accesorios / colecciones / otros .html
ebook1-6 / app1-4 / accesorio1-4 / coleccion1-4 / otro1-4 .html
