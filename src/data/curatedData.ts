import { NasaImageItem, ApodData, MissionDossier, FieldNote } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_deep_cosmos_1794067187014.jpg';
export const JOURNAL_IMAGE = '/src/assets/images/observatory_journal_1794067187732.jpg';
export const ORBITAL_IMAGE = '/src/assets/images/earth_orbital_horizon_1794067188850.jpg';

export const FALLBACK_APOD: ApodData = {
  title: "Cosmic Cliffs in the Carina Nebula",
  date: "2026-11-07",
  explanation: "This landscape of 'mountains' and 'valleys' speckled with glittering stars is actually the edge of a nearby, young, star-forming region called NGC 3324 in the Carina Nebula. Captured in infrared light by NASA's James Webb Space Telescope, this image reveals for the first time previously invisible areas of star birth. The blistering ultraviolet radiation from giant, hot, young stars located above the area shown here is carving the cavernous wall.",
  url: HERO_IMAGE,
  hdurl: HERO_IMAGE,
  copyright: "NASA, ESA, CSA, STScI",
  media_type: "image"
};

export const INITIAL_CURATED_RECORDS: NasaImageItem[] = [
  {
    nasa_id: "PIA25438",
    title: "Cosmic Cliffs of NGC 3324 — Carina Nebula",
    description: "Captured by the James Webb Space Telescope NIRCam (Near-Infrared Camera), this dramatic vista reveals nascent stellar nurseries and individual stars that were completely hidden in optical wavelengths. The tallest 'peaks' in this image are approximately 7 light-years high.",
    date_created: "2022-07-12T00:00:00Z",
    center: "STScI",
    photographer: "NASA, ESA, CSA, and STScI",
    keywords: ["JWST", "Nebula", "Star Formation", "Infrared", "Carina"],
    previewUrl: "https://images-assets.nasa.gov/image/PIA25438/PIA25438~thumb.jpg",
    originalUrl: "https://images-assets.nasa.gov/image/PIA25438/PIA25438~orig.jpg",
    sourceUrl: "https://images.nasa.gov/details/PIA25438"
  },
  {
    nasa_id: "PIA21422",
    title: "Pillars of Creation in the Eagle Nebula (M16)",
    description: "These towering tendrils of cosmic dust and cool molecular hydrogen gas stand inside the heart of the Eagle Nebula, roughly 6,500 light-years from Earth. Inside the columns, active gravitational collapse creates new star systems.",
    date_created: "2015-01-05T00:00:00Z",
    center: "STScI",
    photographer: "NASA, ESA/Hubble and the Hubble Heritage Team",
    keywords: ["Hubble", "Deep Space", "M16", "Eagle Nebula", "Pillars"],
    previewUrl: "https://images-assets.nasa.gov/image/PIA21422/PIA21422~thumb.jpg",
    originalUrl: "https://images-assets.nasa.gov/image/PIA21422/PIA21422~orig.jpg",
    sourceUrl: "https://images.nasa.gov/details/PIA21422"
  },
  {
    nasa_id: "PIA24545",
    title: "Perseverance Rover at Jezero Crater Delta",
    description: "NASA's Mars Perseverance rover captures a panoramic portrait across the desiccated river delta of Jezero Crater. Billions of years ago, liquid water flowed into a lake here, depositing ancient mud and carbonates that may preserve biosignatures.",
    date_created: "2021-03-04T00:00:00Z",
    center: "JPL",
    photographer: "NASA/JPL-Caltech/ASU/MSSS",
    keywords: ["Mars", "Perseverance", "Jezero", "Delta", "Astrobiology"],
    previewUrl: "https://images-assets.nasa.gov/image/PIA24545/PIA24545~thumb.jpg",
    originalUrl: "https://images-assets.nasa.gov/image/PIA24545/PIA24545~orig.jpg",
    sourceUrl: "https://images.nasa.gov/details/PIA24545"
  },
  {
    nasa_id: "as11-40-5874",
    title: "Apollo 11: Lunar Surface & Astronaut Footprint",
    description: "Apollo 11 lunar module pilot Buzz Aldrin stands on the Tranquility Base regolith during humanity's first lunar landing expedition in July 1969. In the reflection of his gold visor, mission commander Neil Armstrong and the Lunar Module are clearly visible.",
    date_created: "1969-07-20T00:00:00Z",
    center: "JSC",
    photographer: "Neil A. Armstrong / NASA",
    keywords: ["Apollo 11", "Moon", "Lunar Surface", "Aldrin", "Historical"],
    previewUrl: "https://images-assets.nasa.gov/image/as11-40-5874/as11-40-5874~thumb.jpg",
    originalUrl: "https://images-assets.nasa.gov/image/as11-40-5874/as11-40-5874~orig.jpg",
    sourceUrl: "https://images.nasa.gov/details/as11-40-5874"
  },
  {
    nasa_id: "PIA12348",
    title: "Earth and Moon: The Delicate Balance",
    description: "Viewed from distant orbital perspective, the blue marbled oasis of Earth stands starkly contrasted against the dark vacuum, with our cratered Moon positioned in silent synchronous orbit.",
    date_created: "2010-09-15T00:00:00Z",
    center: "JPL",
    photographer: "NASA / JPL-Caltech",
    keywords: ["Earth", "Moon", "Planetary", "Orbital", "Astronomy"],
    previewUrl: "https://images-assets.nasa.gov/image/PIA12348/PIA12348~thumb.jpg",
    originalUrl: "https://images-assets.nasa.gov/image/PIA12348/PIA12348~orig.jpg",
    sourceUrl: "https://images.nasa.gov/details/PIA12348"
  },
  {
    nasa_id: "PIA22474",
    title: "Jupiter's Swirling Atmosphere and the Great Red Spot",
    description: "NASA's Juno spacecraft captured this stunning color-enhanced view of turbulent clouds and cyclones in Jupiter's southern hemisphere during its close flyby. Atmospheric ammonia-ice plumes create white swirls across the storm belt.",
    date_created: "2018-05-24T00:00:00Z",
    center: "JPL",
    photographer: "NASA/JPL-Caltech/SwRI/MSSS/Kevin M. Gill",
    keywords: ["Jupiter", "Juno", "Great Red Spot", "Gas Giant", "Planetary"],
    previewUrl: "https://images-assets.nasa.gov/image/PIA22474/PIA22474~thumb.jpg",
    originalUrl: "https://images-assets.nasa.gov/image/PIA22474/PIA22474~orig.jpg",
    sourceUrl: "https://images.nasa.gov/details/PIA22474"
  },
  {
    nasa_id: "PIA25555",
    title: "Tarantula Nebula (30 Doradus) in High Definition",
    description: "Located 161,000 light-years away in the Large Magellanic Cloud galaxy, 30 Doradus is the largest and brightest star-forming region in the Local Group. JWST's near-infrared instrumentation penetrates the dense shroud of interstellar dust.",
    date_created: "2022-09-06T00:00:00Z",
    center: "STScI",
    photographer: "NASA, ESA, CSA, STScI",
    keywords: ["Tarantula", "JWST", "Star Cluster", "Magellanic Cloud"],
    previewUrl: "https://images-assets.nasa.gov/image/PIA25555/PIA25555~thumb.jpg",
    originalUrl: "https://images-assets.nasa.gov/image/PIA25555/PIA25555~orig.jpg",
    sourceUrl: "https://images.nasa.gov/details/PIA25555"
  },
  {
    nasa_id: "GSFC_20171208_Archive_e001435",
    title: "Hubble's Panoramic View of the Andromeda Galaxy (M31)",
    description: "A colossal mosaic capturing over 100 million individual stars and thousands of star clusters residing within a section of our nearest major galactic neighbor, the Andromeda Galaxy, 2.5 million light-years away.",
    date_created: "2015-01-05T00:00:00Z",
    center: "GSFC",
    photographer: "NASA, ESA, J. Dalcanton, B. F. Williams",
    keywords: ["Andromeda", "M31", "Hubble", "Galaxy", "Stars"],
    previewUrl: "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001435/GSFC_20171208_Archive_e001435~thumb.jpg",
    originalUrl: "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001435/GSFC_20171208_Archive_e001435~orig.jpg",
    sourceUrl: "https://images.nasa.gov/details/GSFC_20171208_Archive_e001435"
  },
  {
    nasa_id: "PIA23645",
    title: "Artemis I: Orion Spacecraft Far Side Lunar Transit",
    description: "On flight day 20 of the Artemis I uncrewed mission, the Orion spacecraft captured this high-resolution portrait of Earth rising behind the crater-pocked lunar limb while traveling thousands of miles past the Moon.",
    date_created: "2022-11-28T00:00:00Z",
    center: "JSC",
    photographer: "NASA",
    keywords: ["Artemis", "Orion", "Moon", "Lunar Far Side", "Earth"],
    previewUrl: "https://images-assets.nasa.gov/image/PIA23645/PIA23645~thumb.jpg",
    originalUrl: "https://images-assets.nasa.gov/image/PIA23645/PIA23645~orig.jpg",
    sourceUrl: "https://images.nasa.gov/details/PIA23645"
  }
];

export const MISSIONS_LIST: MissionDossier[] = [
  {
    id: "jwst",
    name: "James Webb Space Telescope",
    acronym: "JWST",
    status: "Operational · Halo Orbit at Sun-Earth L2",
    launchDate: "Dec 25, 2021",
    destination: "Second Lagrange Point (1.5M km from Earth)",
    primaryInstrument: "NIRCam, MIRI, NIRSpec, FGS/NIRISS",
    description: "Webb is NASA's flagship infrared observatory. With its 6.5-meter gold-coated beryllium primary mirror and cryogenically cooled detectors, it perceives cosmic dawn, peering back over 13.5 billion years to witness the first stars and infant galaxies.",
    keyDiscovery: "Detection of carbon dioxide on exoplanet WASP-39 b and spectroscopic confirmation of primordial galaxies in JADES deep field.",
    searchQuery: "James Webb",
    imageUrl: HERO_IMAGE,
    catalogCount: "4,200+ plates"
  },
  {
    id: "hubble",
    name: "Hubble Space Telescope",
    acronym: "HST",
    status: "Operational · 540 km Low Earth Orbit",
    launchDate: "Apr 24, 1990",
    destination: "Low Earth Orbit (LEO)",
    primaryInstrument: "WFC3, ACS, STIS, COS",
    description: "For more than three decades, the venerable Hubble telescope has transformed astrophysics. Operating beyond Earth's turbulent atmosphere, it has delivered iconic deep-field surveys, measured cosmic expansion rates, and mapped dark matter distributions.",
    keyDiscovery: "Determined the precise rate of cosmic acceleration led by dark energy and captured the seminal 10-day Hubble Deep Field survey.",
    searchQuery: "Hubble Space Telescope",
    imageUrl: "https://images-assets.nasa.gov/image/PIA21422/PIA21422~thumb.jpg",
    catalogCount: "18,400+ plates"
  },
  {
    id: "perseverance",
    name: "Mars 2020 Perseverance Rover",
    acronym: "M2020",
    status: "Active Exploration · Jezero Crater Margin",
    launchDate: "Jul 30, 2020",
    destination: "Jezero Crater, Mars (18.38°N, 77.58°E)",
    primaryInstrument: "Mastcam-Z, SuperCam, PIXL, SHERLOC, MOXIE",
    description: "Equipped with advanced coring drills, high-magnification Raman spectrometers, and the Ingenuity scout helicopter, Perseverance investigates Martian astrobiology, paleolake sediment deposition, and seals rock cores for future sample return missions.",
    keyDiscovery: "Extracted pristine sedimentary delta cores bearing ancient silica and organic matter molecules; demonstrated oxygen production from Martian CO2 via MOXIE.",
    searchQuery: "Perseverance Mars",
    imageUrl: "https://images-assets.nasa.gov/image/PIA24545/PIA24545~thumb.jpg",
    catalogCount: "6,800+ plates"
  },
  {
    id: "voyager",
    name: "Voyager Interstellar Mission",
    acronym: "VIM",
    status: "Interstellar Medium Exploration",
    launchDate: "Sep 5, 1977",
    destination: "Beyond the Heliopause into Interstellar Space",
    primaryInstrument: "Plasma Wave Subsystem, Magnetometer, Cosmic Ray Subsystem",
    description: "The twin Voyager probes completed the historic grand tour of Jupiter, Saturn, Uranus, and Neptune before crossing the heliopause into true interstellar space. They carry the Golden Records: humanity's cultural time capsules into the deep void.",
    keyDiscovery: "First in-situ measurements of interstellar galactic cosmic rays outside our Sun's protective heliosphere bubble.",
    searchQuery: "Voyager interstellar",
    imageUrl: JOURNAL_IMAGE,
    catalogCount: "2,100+ plates"
  }
];

export const FIELD_NOTES: FieldNote[] = [
  {
    id: "fn-01",
    catalogId: "OBS-NOTE-4029",
    title: "The Architecture of Cosmic Nurseries",
    subtitle: "Spectroscopic insights from the Carina Nebula's cliff wall",
    date: "Observed Autumn 2026",
    author: "Dr. K. Vance, Senior Optical Analyst",
    readTime: "4 min read",
    previewSnippet: "When observing NGC 3324 through infrared diffraction filters, the apparent solidity of dust clouds dissolves into filaments of warm molecular gas sculpted by stellar winds.",
    fullEssay: `Astronomical cartography underwent a fundamental transformation with the commissioning of long-wave infrared arrays. For over a century, traditional photographic plates rendered dark molecular clouds like the Carina Nebula as impenetrable black voids—apparent absences of matter against the luminous starry backdrop.

In reality, these voids are dense stellar nurseries. Inside NGC 3324, high-mass O-type stars emit ionizing ultraviolet radiation that physically erodes the cooler gas cloud. This photolysis process creates supersonic shockfronts, compressing nearby pocket densities until gravitational collapse triggers the ignition of new protostars.

By measuring the subtle thermal emissions of polycyclic aromatic hydrocarbons (PAHs) at 3.3 and 11.3 micrometers, we are able to chart the exact velocity gradients of these stellar outflows. What appears to the naked eye as a static, serene mountain range in the southern sky is in truth an energetic crucible forging hundreds of future solar systems simultaneously.`,
    coordinates: "RA 10h 37m 24s | Dec -58° 38' 00\"",
    telescope: "JWST NIRCam / MIRI Composite",
    imageUrl: HERO_IMAGE
  },
  {
    id: "fn-02",
    catalogId: "OBS-NOTE-4033",
    title: "Pale Blue Dot & Cosmic Perspective",
    subtitle: "Reflections on humanity's planetary boundary from 3.7 billion miles",
    date: "Archival Record #1990-VOY",
    author: "Carl Sagan Memorial Working Group",
    readTime: "5 min read",
    previewSnippet: "Look again at that dot. That's here. That's home. That's us. On it everyone you love, everyone you know, everyone you ever heard of lived out their lives.",
    fullEssay: `On February 14, 1990, as Voyager 1 was completing its primary planetary exploration objectives and crossing the orbit of Neptune, flight engineers sent a radio command across 3.7 billion miles of empty space. The spacecraft rotated its narrow-angle camera back toward the inner solar system and took a final 60-frame mosaic.

In one frame, suspended directly in the center of a scattered beam of sunlight reflected off the camera baffle, sits a tiny cyan speck occupying less than 0.12 pixels. That speck is Earth.

In this observatory field archive, every high-resolution galaxy cluster, lunar crater, and Martian dune we index serves as a reminder of our vantage point. We do not study the universe as detached spectators peering into a glass case; we are a rare manifestation of that very cosmos observing its own vast, silent architecture.`,
    coordinates: "Solar Distance: 40.5 AU (3.76 Billion Miles)",
    telescope: "Voyager 1 Narrow-Angle Imaging Camera",
    imageUrl: ORBITAL_IMAGE
  },
  {
    id: "fn-03",
    catalogId: "OBS-NOTE-4048",
    title: "The Sedimentary Stratigraphy of Jezero Delta",
    subtitle: "Astrobiological clues preserved in ancient Martian mudstone",
    date: "Sol 842 Mission Brief",
    author: "Dr. A. Chen, Planetary Geochemist",
    readTime: "6 min read",
    previewSnippet: "The rhythmic layering of Jezero Crater's delta deposits bears the undeniable signature of sustained, quiet lacustrine sedimentation under an early denser atmosphere.",
    fullEssay: `From orbital spectroscopy, we knew Jezero crater hosted a fan-shaped delta deposit. But rover-level scrutiny has delivered decisive evidence: alternating cross-bedded sandstone layers deposited during energetic flood stages, capped by fine-grained mudstones laid down in a tranquil standing body of water.

These fine mudstones are prime candidates for preserving fossil organic molecules. In aquatic environments on Earth, clay minerals act as geochemical sponges, adsorbing organic compounds onto their crystal surfaces before oxidation can destroy them.

As the coring mechanism seals these cylindrical samples into ultra-clean titanium tubes, we are preparing the first direct geochemical chain of custody between two worlds. The rocks currently resting in the Perseverance sample carousel will soon be inspected in terrestrial synchrotron facilities.`,
    coordinates: "Jezero Crater 18.38°N, 77.58°E",
    telescope: "Perseverance Mastcam-Z & SuperCam",
    imageUrl: "https://images-assets.nasa.gov/image/PIA24545/PIA24545~thumb.jpg"
  }
];
