# Assets Directory

This directory contains the frontend assets for the Vim Snake game.

## Tech Stack

- **React 18** - UI library
- **Redux** - State management
- **React Router** - Routing
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Accessible component library built on Radix UI
- **Phaser 3** - Game engine for snake game
- **Webpack 5** - Module bundler

## Project Structure

````
assets/
├── css/
│   └── app.css           # Main CSS file with Tailwind directives
├── js/
│   ├── actions/          # Redux actions
│   ├── components/       # React components
│   │   ├── ui/          # Shadcn/UI components
│   │   ├── Home/        # Home page
│   │   ├── Play/        # Game page
│   │   └── ...
│   ├── game/            # Phaser game logic
│   ├── lib/             # Utility functions
│   ├── reducers/        # Redux reducers
│   ├── store/           # Redux store
│   ├── utils/           # Helper utilities
│   └── index.js         # Entry point
├── static/              # Static assets (images, favicon)
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── components.json      # Shadcn/UI configuration
└── webpack.config.js    # Webpack configuration

## Development

### Install Dependencies

```bash
npm install
````

### Development Mode (with hot reload)

```bash
npm run watch
```

This will watch for changes and automatically rebuild the assets.

### Production Build

```bash
npm run deploy
```

This creates optimized, minified builds in `../priv/static/`.

## Shadcn/UI Components

The project uses a custom implementation of shadcn/ui components located in `js/components/ui/`:

- **button.jsx** - Buttons with multiple variants
- **input.jsx** - Form input fields
- **label.jsx** - Form labels
- **card.jsx** - Card containers
- **dialog.jsx** - Modal dialogs
- **table.jsx** - Data tables
- **loading.jsx** - Loading spinner
- **toast.jsx** - Toast notifications

### Adding New Components

To add more shadcn/ui components, visit [ui.shadcn.com](https://ui.shadcn.com) and copy the component code into `js/components/ui/`.

## Styling

### Tailwind CSS

The project uses Tailwind CSS for styling. Utility classes can be used directly in JSX:

```jsx
<div className="flex items-center justify-center bg-primary text-white p-4">
  Content
</div>
```

### Theme Customization

Modify `tailwind.config.js` to customize colors, spacing, fonts, etc.

CSS variables are defined in `css/app.css` and can be changed to adjust the theme:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --background: 0 0% 100%;
  /* ... */
}
```

### Dark Mode

The project is set up for dark mode. To enable it, add the `dark` class to the root element:

```js
document.documentElement.classList.add("dark");
```

## Game Controls

The snake game uses Vim keybindings:

- **h** - Move left
- **j** - Move down
- **k** - Move up
- **l** - Move right

## Build Output

The build process generates:

- `../priv/static/js/index.js` - Bundled JavaScript
- `../priv/static/css/app.css` - Compiled CSS
- `../priv/static/` - Copied static assets

## Troubleshooting

### Module Not Found Errors

Make sure all dependencies are installed:

```bash
npm install
```

### Build Failures

Try cleaning and rebuilding:

```bash
rm -rf node_modules
npm install
npm run deploy
```

### CSS Not Applying

Make sure Tailwind directives are at the top of `css/app.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
