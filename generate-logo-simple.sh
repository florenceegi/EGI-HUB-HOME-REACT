#!/bin/bash

# Script per generare PNG del logo FlorenceEGI usando ImageMagick o rsvg-convert

echo "Generazione PNG del logo FlorenceEGI..."

# Verifica se ImageMagick è installato
if command -v convert &> /dev/null; then
    echo "Uso ImageMagick..."
    
    # Genera PNG in varie dimensioni
    for size in 64 128 256 512 1024; do
        convert -density 300 -background transparent -resize ${size}x${size} \
            public/florence-egi-logo-filled.svg \
            public/florence-egi-logo-${size}x${size}.png
        echo "✅ Generato: florence-egi-logo-${size}x${size}.png"
    done
    
    # Versione con sfondo bianco per GitHub
    convert -density 300 -background white -resize 512x512 \
        public/florence-egi-logo-filled.svg \
        public/florence-egi-logo-github.png
    echo "✅ Generato: florence-egi-logo-github.png (con sfondo bianco)"
    
# Verifica se rsvg-convert è installato
elif command -v rsvg-convert &> /dev/null; then
    echo "Uso rsvg-convert..."
    
    for size in 64 128 256 512 1024; do
        rsvg-convert -w $size -h $size \
            public/florence-egi-logo-filled.svg > \
            public/florence-egi-logo-${size}x${size}.png
        echo "✅ Generato: florence-egi-logo-${size}x${size}.png"
    done
    
else
    echo "❌ Né ImageMagick né rsvg-convert sono installati."
    echo "Installa uno di questi:"
    echo "  sudo apt-get install imagemagick"
    echo "  sudo apt-get install librsvg2-bin"
fi