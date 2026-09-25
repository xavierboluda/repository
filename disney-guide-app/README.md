# Guia Familiar Disneyland Paris · Familia Boluda

App de viatge (web app mobile-first) per al viatge de la familia Boluda a
Disneyland Paris, 8-12 de novembre. Pensada per obrir-se al mobil i consultar-se
dia a dia durant el viatge, amb funcionament offline.

## Com obrir-la

**Opcio rapida (local):** obre `index.html` directament al navegador del mobil
o l'ordinador.

**Opcio recomanada (per a us real durant el viatge):** puja aquesta carpeta a
un hoste estatic gratuit perque funcioni com una app instal·lable (PWA) amb
icona propia i us offline:

- [GitHub Pages](https://pages.github.com/) (activa "Pages" en aquest
  repositori, carpeta `disney-guide-app/`)
- [Netlify Drop](https://app.netlify.com/drop) (arrossega la carpeta)
- [Vercel](https://vercel.com/) o qualsevol hoste de fitxers estatics

Un cop publicada, des de Safari/Chrome al mobil: **Compartir → Afegir a
l'inici**. Aixo crea una icona a la pantalla d'inici que obre l'app a pantalla
completa, com qualsevol altra app.

## Estructura del projecte

```
disney-guide-app/
  index.html            App shell (totes les vistes)
  styles.css            Sistema de disseny
  app.js                Navegacio, checklists persistents, lightbox de mapes
  manifest.json         Metadades PWA (icona, colors, mode standalone)
  sw.js                 Service worker (cache offline)
  assets/
    icons/              Icona original de l'app (castell + estrella)
    illustrations/       Emblema original del passaport
    maps/                4 mapes esquematics originals (resort, Disneyland
                          Park, Adventure World, Disney Village)
```

## Funcionalitats

- **Navegacio per pestanyes**: Inici · Dies · Mapes · Guia · Passaport.
- **Dia a dia**: selector de dies (8-12 nov) amb la carta del dia, la
  timeline horaria i qui fa que.
- **Mapes**: 4 mapes esquematics originals, ampliables amb un toc.
- **Guia rapida**: restaurants, matriu d'espectacles, atraccions
  prioritaries, trucs i kit de viatge.
- **Passaport deluxe de la Bruna**: personatges per marcar com a "trobats",
  missions i segells de cada terra, i un diploma final — tot interactiu.
- **Checklists persistents**: qualsevol casella marcada (arribada, kit,
  missions, segells...) es guarda al mobil amb `localStorage`, aixi que
  l'app recorda el progres encara que la tanquis.
- **Funciona sense connexio**: un cop carregada una vegada (i publicada en un
  hoste, vegeu dalt), el service worker deixa l'app disponible sense wifi ni
  dades — util dins del parc.

## Nota sobre el disseny i la marca

Aquesta app s'inspira en l'estetica de disneylandparis.com (blaus, lila i
rosa, targetes arrodonides, tipografia amistosa), pero **tot el disseny es
original**:

- El logotip, la icona de l'app i els mapes son il·lustracions propies,
  fetes des de zero — no son els de Disney.
- Les tipografies son obertes (Google Fonts: Baloo 2, Nunito, Grand Hotel),
  no la tipografia corporativa d'The Walt Disney Company.
- No s'hi reprodueix cap personatge amb dret d'autor: al passaport, cada
  personatge es representa amb una icona tematica original (per exemple, un
  floc de neu per l'Elsa, una llanterna per la Rapunzel) i el seu nom com a
  text, no com a il·lustracio del personatge.

Aixo es per evitar qualsevol us no autoritzat de marques i propietat
intel·lectual de Disney, mantenint alhora l'esperit "premium, com si fos
comprat a la botiga".

## Contingut

Tota la informacio (horaris, restaurants, reserves, atraccions) prove
directament de la planificacio original de la familia Boluda — no s'hi ha
inventat cap dada.
