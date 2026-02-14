# TechMeOut

Sito web dello studio di sviluppo **TechMeOut** — design moderno, toni scuri e interfaccia pulita.

## 🌐 Struttura

Il progetto utilizza [Astro](https://astro.build/) per generare HTML statico con componenti riutilizzabili.

```
src/
  components/
    Header.astro        # Header/nav condiviso (gestisce link e active state)
    Footer.astro        # Footer condiviso (con neon divider)
  layouts/
    BaseLayout.astro    # Layout base: <head>, meta SEO, Header + Footer
  pages/
    index.astro         # Homepage — hero, servizi, chi siamo, processo, contatti
    lavori.astro        # Pagina progetti realizzati
    community.astro     # Pagina supporto alle community
public/
  style.css             # Foglio di stile completo (dark/light theme, responsive)
  script.js             # Animazioni, menu mobile, scroll effects, i18n IT/EN
  favicon.svg           # Favicon SVG con logo <T/>
  robots.txt            # Direttive per i crawler
  sitemap.xml           # Sitemap per indicizzazione SEO
```

Header e footer sono componenti unici: modificarli aggiorna automaticamente tutte le pagine.

## 🎨 Design

- **Tema scuro/chiaro** con toggle (dark default, texture fibra di carbonio)
- **Accent color** blu `#4f8fff`
- **Multilingua** IT/EN con switch bandiere
- Font: [Inter](https://fonts.google.com/specimen/Inter) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- Layout responsive (breakpoint: 1024px, 768px, 480px)
- Animazioni scroll-reveal con IntersectionObserver

## 🚀 Avvio locale

```bash
# Installare le dipendenze (solo la prima volta)
npm install

# Server di sviluppo con hot reload
npm run dev

# Build statico (output in dist/)
npm run build

# Preview della build
npm run preview
```

## 🚢 Deploy

Il progetto è collegato a **Vercel** tramite GitHub. Ogni push su `main` avvia automaticamente il build e il deploy.

Il contenuto della cartella `dist/` è HTML statico puro, compatibile con qualsiasi hosting.

## 📦 Tech Stack

- [Astro](https://astro.build/) — generatore di siti statici con componenti riutilizzabili
- HTML5 semantico
- CSS3 (custom properties, grid, flexbox)
- JavaScript vanilla (i18n, tema, animazioni)
- SEO: JSON-LD, Open Graph, Twitter Cards

## 📄 Licenza

Tutti i diritti riservati © TechMeOut
