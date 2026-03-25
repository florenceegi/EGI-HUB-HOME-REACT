# Guida all'uso del Logo FlorenceEGI

## File disponibili

1. **florence-egi-logo.svg** - Versione outline/stroke
2. **florence-egi-logo-filled.svg** - Versione filled con livelli opacity (CONSIGLIATA)
3. **florence-egi-logo-master.svg** - Versione master ad alta risoluzione (dopo aver eseguito lo script)

## Come usare il logo su GitHub

### Per l'Organization Profile:
1. Vai su Settings → Organization profile
2. Carica `florence-egi-logo-filled.svg` o uno dei PNG generati
3. GitHub ridimensionerà automaticamente l'immagine

### Per repository README:
```markdown
![FlorenceEGI](https://raw.githubusercontent.com/[tua-org]/[tuo-repo]/main/public/florence-egi-logo-filled.svg)
```

## Generare varianti PNG

Se hai bisogno di versioni PNG:

```bash
# Installa dipendenza
npm install sharp

# Genera tutte le varianti
node generate-logo-variants.js
```

Questo creerà:
- PNG in varie dimensioni (64x64 fino a 1024x1024)
- Versione con sfondo bianco
- Favicon.ico

## Colori ufficiali

- **Oro Fiorentino**: `#D4AF37`
- **Background scuro**: `#0A0A0F`
- **Testo chiaro**: `#FFFFFF`

## Best practices

1. **Su sfondi scuri**: usa il logo con colore oro `#D4AF37`
2. **Su sfondi chiari**: usa il logo con colore scuro `#0A0A0F` o nero
3. **Dimensione minima**: non scendere sotto i 32x32 pixel
4. **Spazio intorno**: lascia sempre uno spazio pari ad almeno 1/4 dell'altezza del logo

## Incorporare in altri progetti

### HTML
```html
<img src="florence-egi-logo-filled.svg" alt="FlorenceEGI" width="48" height="48">
```

### CSS Background
```css
.logo {
  background-image: url('florence-egi-logo-filled.svg');
  background-size: contain;
  background-repeat: no-repeat;
}
```

### React (copia il componente)
```tsx
const FlorenceEgiLogo = ({ size = 24, color = "#D4AF37" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <g fill={color}>
      <path d="M12 2L2 7l10 5 10-5z"/>
      <path d="M2 12l10 5 10-5-10-5z" opacity="0.8"/>
      <path d="M2 17l10 5 10-5-10-5z" opacity="0.6"/>
    </g>
  </svg>
);
```