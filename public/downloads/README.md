# Downloads Structure

Esta carpeta contiene los archivos descargables completos para cada hero video.

## 📁 Estructura

```
downloads/
  ├── {category}/
  │   └── {slug}/
  │       ├── page.tsx      ← Next.js App Router code
  │       ├── app.jsx       ← React component code
  │       ├── index.html    ← HTML + Tailwind CDN
  │       └── video.mp4     ← Video final (alta calidad)
```

## 🎯 Dos tipos de videos

### 1. Videos de Preview (`public/videos/`)
- Mostrados en las cards y modal de la galería
- Pueden ser versiones ligeras/comprimidas para web
- Solo para visualización

### 2. Videos Descargables (`public/downloads/`)
- **Ubicación**: `public/downloads/{category}/{slug}/video.mp4`
- Incluidos en el archivo ZIP cuando el usuario descarga
- **Alta calidad** - para uso en producción
- Los archivos de código referencian `./video.mp4` (ruta relativa)

## 🔄 Flujo de descarga

Cuando un usuario descarga un hero (ej: `dark-forest-misty-morning` en formato Next.js):

1. **Se genera un ZIP** con:
   ```
   dark-forest-misty-morning-nextjs/
     ├── page.tsx       ← Código del componente
     └── video.mp4      ← Video de alta calidad
   ```

2. **Prioridad del video**:
   - ✅ Primero busca: `downloads/{category}/{slug}/video.mp4`
   - ⚠️ Fallback: `videos/{category}/{slug}.mp4` (video de preview)
   - ❌ Si ninguno existe: incluye README.txt con instrucciones

## 📝 Ejemplo

Para `nature/dark-forest-misty-morning`:

```bash
# Video de preview (mostrado en la UI)
public/videos/nature/dark-forest-misty-morning.mp4  # 5MB, comprimido

# Archivos descargables
public/downloads/nature/dark-forest-misty-morning/
  ├── page.tsx          # Código Next.js
  ├── app.jsx           # Código React
  ├── index.html        # Código HTML
  └── video.mp4         # 50MB, alta calidad 4K
```

## ✅ Ventajas de esta estructura

- ✨ Previews rápidos en la galería (videos ligeros)
- 🎁 Descargas con videos de producción (alta calidad)
- 📦 Todo organizado por categoría y slug
- 🔗 Código con rutas relativas (`./video.mp4`) - listo para usar
- 🚀 Fácil de mantener y escalar

## 🛠️ Para agregar un nuevo hero

1. **Agregar video de preview**:
   ```bash
   public/videos/{category}/{slug}.mp4
   ```

2. **Crear carpeta de descargas**:
   ```bash
   mkdir public/downloads/{category}/{slug}
   ```

3. **Agregar archivos**:
   ```bash
   public/downloads/{category}/{slug}/
     ├── page.tsx       # Componente Next.js
     ├── app.jsx        # Componente React
     ├── index.html     # HTML con Tailwind CDN
     └── video.mp4      # Video de alta calidad
   ```

4. **Actualizar el catálogo** en `lib/videos.ts`:
   ```typescript
   {
     name: "My New Hero",
     slug: "my-new-hero",
     category: "nature",
     videoSrc: "/videos/nature/my-new-hero.mp4",
     hasDownloads: true  // ← Indica que tiene archivos en downloads/
   }
   ```
