# Acrooosverse

**Explore Beyond. Discover Everything.**

Acrooosverse is a space imagery discovery platform and observatory field journal. It brings NASA imagery, mission records, curated collections, and astronomy notes into one place for exploration and research.

- **Live site:** [acrooosverse.ai.studio](https://acrooosverse.ai.studio)
- **Repository:** [brainrotmilindexe/acrooosverse](https://github.com/brainrotmilindexe/acrooosverse)

## Features

- Search and browse NASA Image and Video Library records.
- Explore curated collections for deep space, Mars, the Moon, and Earth from orbit.
- Open imagery, collection, mission, and field-note cards in an expanded detail view.
- Review available descriptions, dates, NASA IDs, credits, and source links.
- Open original image assets and official NASA records when available.
- Save records to a personal Field Book stored in the browser.
- Copy direct links, share records, and download available image assets.
- Browse the Astronomy Picture of the Day feature, mission dossiers, and astronomy field notes.
- Use the responsive interface on desktop, tablet, and mobile.

Saved records use browser storage, so they are specific to the browser and device where they were saved.

## Data sources

Acrooosverse uses NASA public data services, including:

- [NASA Image and Video Library](https://images.nasa.gov/) and its [API](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf)
- [Astronomy Picture of the Day (APOD)](https://apod.nasa.gov/) through [NASA Open APIs](https://api.nasa.gov/)

Mars, lunar, and other subject collections organize imagery returned by the archive. The app preserves links to source records when available. Image credits and usage terms vary by item; check the original record before reusing an image.

## Technology

- React and TypeScript
- Vite
- Tailwind CSS
- Motion
- Lucide React
- Google GenAI SDK for Gemini-powered features, where configured

## Run locally

### Requirements

- Node.js and npm
- Internet access for NASA data

### Setup

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/brainrotmilindexe/acrooosverse.git
   cd acrooosverse
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local`.

   PowerShell:

   ```powershell
   Copy-Item .env.example .env.local
   ```

   macOS or Linux:

   ```bash
   cp .env.example .env.local
   ```

4. Configure the environment values in `.env.local`:

   ```env
   GEMINI_API_KEY=your_gemini_api_key
   APP_URL=http://localhost:3000
   ```

   `GEMINI_API_KEY` is needed only for Gemini-powered features. Never commit a real API key. Google AI Studio can provide runtime secrets through its Secrets settings. `APP_URL` is the app's base URL; for local development, use the local address shown by Vite.

5. Start the development server:

   ```bash
   npm run dev
   ```

   Open the URL printed by Vite. The development script uses port `3000`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview a production build locally |
| `npm run lint` | Run the TypeScript check with `tsc --noEmit` |

## Project structure

```text
.
├── src/
│   ├── assets/images/   # Image assets
│   ├── components/      # User interface components
│   ├── data/            # Curated content and records
│   ├── hooks/            # Reusable React hooks
│   ├── services/         # NASA and other service integrations
│   ├── App.tsx           # Main application
│   ├── index.css         # Global styles
│   ├── main.tsx          # Application entry point
│   └── types.ts          # TypeScript types
├── .env.example          # Environment variable template
├── index.html
├── package.json
└── vite.config.ts
```

## Attribution and usage

Acrooosverse is an independent project and is not affiliated with or endorsed by NASA. NASA imagery and data remain subject to the credits, terms, and usage conditions listed with their original records. Some material may have third-party credits or restrictions. Editorial notes in Acrooosverse are separate from NASA publications; consult official records and scientific publications for research use.

## Deployment

The current live version is hosted by Google AI Studio at [acrooosverse.ai.studio](https://acrooosverse.ai.studio). Source changes are synchronized with the GitHub repository.

## License

No open-source license is currently included in this repository. Until a license is added, reuse of the project's code is not granted by this README.
