# Nicholas Woo Portfolio - Implementation Guide

## 🚀 Quick Start

1. Place all files in your project directory
2. Replace placeholder images with your actual assets
3. Edit `content.json` with your actual content
4. Deploy to any static hosting service (Vercel, Netlify, GitHub Pages, etc.)

## 📁 File Structure

```
/
├── index.html       # Main HTML structure
├── styles.css       # All styling (no build step needed)
├── script.js        # Vanilla JS interactions
├── content.json     # All editable content
├── hero.jpg         # Hero background image
├── marketing-*.jpg  # Marketing section images
├── web3-*.jpg       # Web3 section images
└── ai-*.jpg         # AI section images
```

## 🎨 Customizing the Design

### Color Palette
Edit CSS variables in `styles.css`:

```css
:root {
    --bg: #121417;        /* Background */
    --ink: #FFFFFF;       /* Primary text */
    --ink-2: #E6E9EB;     /* Secondary text */
    --blue: #3F598C;      /* Primary accent */
    --blue-2: #91C4D9;    /* Secondary accent */
    --blue-3: #C9EBF2;   /* Tertiary accent */
    --card: #0F1215;      /* Card backgrounds */
    --stroke: #1A2128;    /* Borders */
    --muted: #B8C0C7;     /* Muted text */
}
```

### Typography
The portfolio uses Google Fonts. To change fonts, update both the HTML link tags and CSS variables:

```css
--font-headline: 'Bebas Neue', sans-serif;    /* Condensed headlines */
--font-serif: 'Playfair Display', serif;      /* Elegant subheads */
--font-body: 'Inter', sans-serif;             /* Body text */
--font-mono: 'JetBrains Mono', monospace;     /* Metadata */
```

## 🖼️ Managing Images

### Hero Image
- Recommended: 1920x1080px minimum
- Format: JPG for photos, WebP for better compression
- Name: `hero.jpg`
- Location: Root directory

### Card Images
- Recommended: 800x600px
- Format: JPG or WebP
- Naming: `[section]-[number].jpg` (e.g., `marketing-1.jpg`)
- Add actual image paths in `content.json`

### Image Optimization Tips
```bash
# Using ImageMagick
convert original.jpg -quality 85 -resize 1920x1080 hero.jpg

# Using WebP
cwebp -q 80 original.jpg -o hero.webp
```

## ✏️ Editing Content

All text content is stored in `content.json`. Here's how to edit each section:

### Hero Section
```json
"hero": {
    "kicker": "YOUR TAGLINE HERE",
    "headline": "YOUR MAIN HEADLINE",
    "deck": "Your subheadline or value proposition.",
    "ctas": [
        {
            "label": "Primary CTA",
            "href": "#contact",
            "variant": "primary"
        }
    ]
}
```

### Adding Work Items
```json
"items": [
    {
        "title": "Project Title",
        "date": "DEC 2024",
        "tags": ["TAG1", "TAG2"],
        "insight": "A compelling one-liner about this work.",
        "image": "path/to/image.jpg",
        "href": "/project-link"
    }
]
```

### Adding Blog Posts
```json
"blog": [
    {
        "date": "DEC 20, 2024",
        "title": "Your Blog Post Title",
        "deck": "A brief description of the post.",
        "href": "/blog/post-url"
    }
]
```

### Updating Contact Links
```json
"links": {
    "telegram": "@yourusername",
    "x": "https://x.com/yourusername",
    "email": "your.email@domain.com"
}
```

## 🎭 Animations & Interactions

### Disable Animations
The site respects `prefers-reduced-motion`. Users with this setting enabled will see no animations.

To disable animations manually, add this to your CSS:
```css
* {
    animation: none !important;
    transition: none !important;
}
```

### Reveal Animation Timing
Adjust reveal delays by adding `data-delay` attribute:
```html
<div data-reveal data-delay="200">Content</div>
```

## 🔧 Advanced Customization

### Adding New Sections
1. Add HTML structure in `index.html`:
```html
<section id="new-section" class="section">
    <div class="container">
        <header class="section-header" data-reveal>
            <h2 class="section-title">SECTION TITLE</h2>
            <span class="section-accent"></span>
        </header>
        <div id="new-section-cards" class="card-grid"></div>
    </div>
</section>
```

2. Add content in `content.json`:
```json
"newSection": {
    "title": "Section Title",
    "items": [...]
}
```

3. Render in `script.js`:
```javascript
this.renderCards('new-section-cards', this.content.newSection.items);
```

### Custom Card Icons
Add SVG icons to cards by modifying the `getCardIcon()` method in `script.js`:
```javascript
getCardIcon() {
    return `
        <svg class="card-icon" viewBox="0 0 24 24">
            <!-- Your SVG path here -->
        </svg>
    `;
}
```

## 📱 Responsive Breakpoints

The design adapts at these breakpoints:
- **Mobile**: 360-639px
- **Tablet**: 640-1023px
- **Desktop**: 1024-1439px
- **Large**: 1440px+

Sidebar appears at 1200px+ width.

## 🚢 Deployment

### Vercel
```bash
vercel --prod
```

### Netlify
1. Drag and drop folder to Netlify
2. Or use CLI: `netlify deploy --prod`

### GitHub Pages
1. Push to `gh-pages` branch
2. Enable Pages in repository settings

### Custom Domain
Add a `CNAME` file with your domain:
```
portfolio.yourdomain.com
```

## 🐛 Troubleshooting

### Content not loading
- Check `content.json` for valid JSON syntax
- Ensure file is in same directory as `index.html`
- Check browser console for errors

### Images not showing
- Verify image paths in `content.json`
- Check that image files exist
- Use relative paths (e.g., `./images/hero.jpg`)

### Animations not working
- Check if `prefers-reduced-motion` is enabled
- Verify elements have `data-reveal` attribute
- Check console for JavaScript errors

## 📄 License

This template is provided as-is for personal and commercial use.

## 🤝 Support

For questions about implementation, reach out via:
- Telegram: @nikolei666
- Email: nicholas.woojw@gmail.com

---

Built with editorial precision for Web3 narratives.