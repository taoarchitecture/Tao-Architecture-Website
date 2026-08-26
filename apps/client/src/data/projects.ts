export interface Project {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  image: string;
  link: string;
  description?: string;
}

export const workCategories = [
  { id: 'luxuryvillas', label: 'Luxury Villas' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'cozyhomes', label: 'Cozy Homes' },
  { id: 'apartments', label: 'Luxury Apartments' },
  { id: 'housing', label: 'Housing' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'institutional', label: 'Institutional' },
  { id: 'products', label: 'Products' },
  { id: 'installations', label: 'Installations' },
];

export const projects: Project[] = [
    {
        id: 'anand-villa',
        title: 'Anand Villa',
        category: 'cozyhomes',
        image: '/img/villa/anandvilla/anandvilla-bg.jpg',
        link: '/projects/anand-villa',
        description: 'SPIRITUAL SYMPHONY'
    },
    {
        id: 'bhansali-landmarks',
        title: 'Bhansali Landmarks',
        category: 'corporate',
        image: '/img/corporate/bhansali-landmarks/bhansali-landmarks-bg.jpg',
        link: '/projects/bhansali-landmarks',
        description: 'Modular office at Suyog Platinum'
    },
    {
        id: 'blue-bird',
        title: 'Blue Bird',
        category: 'cozyhomes',
        image: '/img/cozy_homes/blue-bird/blue-bird-bg.jpg',
        link: '/projects/blue-bird',
        description: 'Cozy sanctuary'
    },
    {
        id: 'corporate-office-at-kolhapur',
        title: 'Corporate office at Kolhapur',
        category: 'corporate',
        image: '/img/corporate/corporate-office-at-kolhapur/corporate-office-at-kolhapur-bg.jpg',
        link: '/projects/corporate-office-at-kolhapur',
        description: 'Transition for Innovation'
    },
    {
        id: 'deshpande-durg',
        title: 'Deshpande Durg',
        category: 'apartments',
        image: '/img/luxuryappartments/deshpande-durg/deshpande-durg-bg.jpg',
        link: '/projects/deshpande-durg',
        description: 'Ethnic Abode'
    },
    {
        id: 'garden-villa',
        title: 'Garden Villa',
        category: 'cozyhomes',
        image: '/img/cozy_homes/garden-villa/garden-villa-bg.jpg',
        link: '/projects/garden-villa',
        description: 'Courtyard house at Ahmedabad'
    },
    {
        id: 'goyal-group',
        title: 'Goyal Group, Pune',
        category: 'corporate',
        image: '/img/corporate/goyal-group/goyal-group-bg.jpg',
        link: '/projects/goyal-group',
        description: 'COMPACT OFFICE INTERIORS'
    },
    {
        id: 'k-f-bioplant',
        title: 'K. F. Bioplant',
        category: 'corporate',
        image: '/img/corporate/k-f-bioplant/k-f-bioplant-bg.jpg',
        link: '/projects/k-f-bioplant',
        description: 'Harmonious working…'
    },
    {
        id: 'konark',
        title: 'Konark',
        category: 'apartments',
        image: '/img/luxuryappartments/konark/konark-bg.jpg',
        link: '/projects/konark',
        description: 'Zen Den'
    },
    {
        id: 'mahalaxmi-hospital',
        title: 'Mahalaxmi Hospital',
        category: 'institutional',
        image: '/img/institution/mahalaxmi-hospital/mahalaxmi-hospital-bg.jpg',
        link: '/projects/mahalaxmi-hospital',
        description: 'Healing Architecture'
    },
    {
        id: 'manhattan',
        title: 'Manhattan',
        category: 'apartments',
        image: '/img/luxuryappartments/manhattan/manhattan-bg.jpg',
        link: '/projects/manhattan',
        description: 'Downtown chic'
    },
    {
        id: 'manikchand-plaza',
        title: 'Manikchand Plaza, Pune',
        category: 'commercial',
        image: '/img/commercial/manikchand-plaza/manikchand-plaza-bg.jpg',
        link: '/projects/manikchand-plaza',
        description: 'Mixed Use commercial Plaza'
    },
    {
        id: 'napier-road-bungalow',
        title: 'Napier Road Bungalow',
        category: 'luxuryvillas',
        image: '/img/villa/napier-road-bungalow/napier-road-bungalow-bg.jpg',
        link: '/projects/napier-road-bungalow',
        description: 'Colonial Grandeur'
    },
    {
        id: 'one-suhana',
        title: 'One Suhana, Pune',
        category: 'corporate',
        image: '/img/corporate/one-suhana/one-suhana-bg.jpg',
        link: '/projects/one-suhana',
        description: 'A tale of the Great Indian Gourmet...'
    },
    {
        id: 'palkhi',
        title: 'Palkhi',
        category: 'luxuryappartments',
        image: '/img/luxuryappartments/palkhi/palkhi-bg.jpg',
        link: '/projects/palkhi',
        description: 'Life as an everyday Pilgrimage'
    },
    {
        id: 'pbap-credai-office',
        title: 'PBAP Credai Office, Pune',
        category: 'corporate',
        image: '/img/corporate/pbap-credai-office/pbap-credai-office-bg.jpg',
        link: '/projects/pbap-credai-office',
        description: 'SENSE AND SYNERGY'
    },
    {
        id: 'pinewood',
        title: 'Pinewood',
        category: 'housing',
        image: '/img/housing/pinewood/pinewood-bg.jpg',
        link: '/projects/pinewood',
        description: 'Luxurious High Rise Apartments'
    },
    {
        id: 'suzlon-corporate-learning-centre',
        title: 'Suzlon Corporate Learning Centre',
        category: 'institutional',
        image: '/img/institution/suzlon-corporate-learning-centre/suzlon-corporate-learning-centre-bg.jpg',
        link: '/projects/suzlon-corporate-learning-centre',
        description: 'Residential Facility'
    },
    {
        id: 'suyog-kinder-brook-high-school',
        title: 'Suyog Kinder Brook High School',
        category: 'institutional',
        image: '/img/institution/suyog-kinder-brook-high-school/suyog-kinder-brook-high-school-bg.jpg',
        link: '/projects/suyog-kinder-brook-high-school',
        description: 'Modern Lego inspired School'
    },
    {
        id: 'veerayatan',
        title: 'Veerayatan',
        category: 'institutional',
        image: '/img/institution/veerayatan/veerayatan-bg.jpg',
        link: '/projects/veerayatan',
        description: 'ContemporaryJain Memorial'
    },
    {
        id: 'azaan',
        title: 'Azaan',
        category: 'luxuryvillas',
        image: '/img/villa/azaan/azaan-bg.jpg',
        link: '/projects/azaan',
        description: 'Seamlessly blending tradition and modernity'
    },
    {
        id: 'vrindavan',
        title: 'Vrindavan',
        category: 'luxuryvillas',
        image: '/img/villa/vrindavan/vrindavan-bg.jpg',
        link: '/projects/vrindavan',
        description: 'A Harmonious Blend of Nature and Architecture'
    },
    {
        id: 'nest-residence',
        title: 'Nest Residence, Pune',
        category: 'luxuryvillas',
        image: '/img/villa/Nest/nest-bg.jpg',
        link: '/projects/nest-residence',
        description: 'A LUXURY ECO-ABODE'
    },
    {
        id: 'shunyam-jodhpur',
        title: 'Shunyam, Jodhpur',
        category: 'luxuryvillas',
        image: '/img/villa/shunyam/shunyam-bg.jpg',
        link: '/projects/shunyam-jodhpur',
        description: 'A VERNACULAR RETREAT'
    },
    {
        id: 'paradiso',
        title: 'Paradiso, Pune',
        category: 'luxuryvillas',
        image: '/img/villa/paradiso/paradiso-bg.jpg',
        link: '/projects/paradiso',
        description: 'A SUBURBAN PARADISE'
    },
    {
        id: 'onella',
        title: 'O’nella Residence, Pune',
        category: 'luxuryvillas',
        image: '/img/villa/onella/onella-bg.jpg',
        link: '/projects/onella',
        description: 'STYLE & SUSTAINABILITY'
    },
    {
        id: 'queens-garden',
        title: 'Queens Garden Bunglow, Pune',
        category: 'luxuryvillas',
        image: '/img/villa/queen-garden/queen-bg.jpg',
        link: '/projects/queens-garden',
        description: 'A ROYAL RETREAT'
    },
    {
        id: 'vitaan',
        title: 'Vitaan',
        category: 'luxuryvillas',
        image: '/img/villa/vitaan/vitaan-bg.jpg',
        link: '/projects/vitaan',
        description: 'Luxury in the lap of nature…'
    },
    {
        id: 'villa-at-wagholi',
        title: 'Villa At Wagholi',
        category: 'luxuryvillas',
        image: '/img/villa/villa-at-wagholi/villa-at-wagholi-bg.jpg',
        link: '/projects/villa-at-wagholi',
        description: 'Asian Aura'
    },
    {
        id: 'villa-at-forest-trails',
        title: 'Villas At Forest Trails',
        category: 'luxuryvillas',
        image: '/img/villa/villa-at-forest-trails/villa-at-forest-trails-bg.jpg',
        link: '/projects/villa-at-forest-trails',
        description: 'Woodland Estates'
    },
    {
        id: 'swastik',
        title: 'Swastik - Holistic Wellness Center',
        category: 'hospitality',
        image: '/img/hospitality/swastik/swastik-bg.jpg',
        link: '/projects/swastik',
        description: 'A Luxury Eco-abode'
    },
    {
        id: 'courtyard-house',
        title: 'Courtyard House, Ahmednagar',
        category: 'luxuryvillas',
        image: '/img/villa/courtyard-house/conyard-bg.jpg',
        link: '/projects/courtyard-house',
        description: 'OUTSIDE IN'
    },
    {
        id: 'shunyam-pune',
        title: 'Shunyam, Pune',
        category: 'luxuryvillas',
        image: '/img/villa/shunyam-pune/shunyam-pune.jpg',
        link: '/projects/shunyam-pune',
        description: 'AN URBAN OASIS'
    },
    {
        id: 'aapulki',
        title: 'Aapulki Residence, Pune',
        category: 'luxuryvillas',
        image: '/img/villa/aapulki/aapulki-bg.jpg',
        link: '/projects/aapulki',
        description: 'A RUSTIC FARMHOUSE'
    },
    {
        id: 'saj',
        title: 'Saj Villa , Pune',
        category: 'luxuryvillas',
        image: '/img/villa/saj/saj-bg.jpg',
        link: '/projects/saj',
        description: 'SCENIC GETAWAY'
    },
    {
        id: 'bungalow-at-national-society',
        title: 'Bungalow at National Society',
        category: 'cozyhomes',
        image: '/img/cozy_homes/bungalow-at-national-society/bungalow-at-national-society-bg.jpg',
        link: '/projects/bungalow-at-national-society',
        description: 'Minimalism and elegance...'
    },
    {
        id: 'sujin-residence',
        title: 'Sujin Residence',
        category: 'cozyhomes',
        image: '/img/cozy_homes/sujin-residence/sujin-residence-bg.jpg',
        link: '/projects/sujin-residence',
        description: 'Extraordinary embodiment of opulent living'
    },
    {
        id: 'aurum',
        title: 'Aurum',
        category: 'apartments',
        image: '/img/luxuryappartments/aurum/aurum-bg.jpg',
        link: '/projects/aurum',
        description: 'A Bungalow in the sky...'
    },
    {
        id: 'ajmera-aria',
        title: 'Ajmera Aria',
        category: 'apartments',
        image: '/img/luxuryappartments/ajmera-aria/ajmera-aria-bg.jpg',
        link: '/projects/ajmera-aria',
        description: 'Luxury Show Apartment'
    },
    {
        id: 'gods-blessing',
        title: "God's Blessing",
        category: 'apartments',
        image: '/img/luxuryappartments/gods-blessing/gods-blessing-bg.jpg',
        link: '/projects/gods-blessing',
        description: 'Luxury Riverfront Apartment'
    },
    {
        id: 'kumar-platinum',
        title: 'Kumar Platinum',
        category: 'apartments',
        image: '/img/luxuryappartments/kumar-platinum/kumar-platinum-bg.jpg',
        link: '/projects/kumar-platinum',
        description: 'Cross-cultural Charm'
    },
    {
        id: 'suyog-navkaar',
        title: 'Suyog Navkar',
        category: 'commercial',
        image: '/img/commercial/suyog-navkaar/suyog-navkaar-bg.jpg',
        link: '/projects/suyog-navkaar',
        description: 'Mixed-use development at Swargate'
    },
    {
        id: 'suyog-navkaar-housing',
        title: 'Suyog Navkar',
        category: 'housing',
        image: '/img/commercial/suyog-navkaar/suyog-navkaar-bg.jpg',
        link: '/projects/suyog-navkaar-housing',
        description: 'Mixed-use development at Swargate'
    },
    {
        id: 'kumar-platinum-housing',
        title: 'Kumar Platinum',
        category: 'housing',
        image: '/img/housing/kumar-platinum/kumar-platinum-bg.jpg',
        link: '/projects/kumar-platinum-housing',
        description: 'Living amidst heritage'
    },
    {
        id: 'shiloh',
        title: 'Shiloh',
        category: 'housing',
        image: '/img/housing/shiloh/shiloh-bg.jpg',
        link: '/projects/shiloh',
        description: 'Luxury 4BHK apartments at Model Colony'
    },
    {
        id: 'kumar-pacific',
        title: 'kumar pacific',
        category: 'housing',
        image: '/img/housing/kumar-pacific/kumar-pacific-thumb.jpg',
        link: '/projects/kumar-pacific',
        description: 'Modern Residential Complex'
    },
    {
        id: 'kumar-papillon',
        title: 'kumar papillon',
        category: 'housing',
        image: '/img/housing/kumar-papillon/kumar-papillon-thumb.jpg',
        link: '/projects/kumar-papillon',
        description: 'A Linear neighborhood'
    },
    {
        id: 'nyati-unitree',
        title: 'Nyati Unitree Corporate Office, Pune',
        category: 'corporate',
        image: '/img/corporate/nyati-unitree/nyati-bg.jpg',
        link: '/projects/nyati-unitree',
        description: 'WEAVING NATURE INTO STRUCTURE'
    },
    {
        id: 'suzlon-excellence-academy',
        title: 'Suzlon One Earth Excellence Academy, Pune',
        category: 'corporate',
        image: '/img/corporate/suzlon-one-earth/suzlon-one-earth-bg.jpg',
        link: '/projects/suzlon-excellence-academy',
        description: 'GREEN CORPORATE CAMPUS'
    },
    {
        id: 'manisha-constructions',
        title: 'Manisha Constructions Corporate Office, Pune',
        category: 'corporate',
        image: '/img/corporate/manisha-constructions/manisha-constructions-bg.jpg',
        link: '/projects/manisha-constructions',
        description: 'WORKING IN A GARDEN'
    },
    {
        id: 'design-studio',
        title: 'Design Studio',
        category: 'corporate',
        image: '/img/corporate/design-studio/design-studio-bg.jpg',
        link: '/projects/design-studio',
        description: 'An Architectural Design Studio'
    },
    {
        id: 'nyati-unitree-commercial',
        title: 'Nyati Unitree Commercial Development',
        category: 'commercial',
        image: '/img/commercial/nyati-unitree-commercial/nyati-unitree-commercial-bg.jpg',
        link: '/projects/nyati-unitree-commercial',
        description: 'Leasable commercial offices at Yerawada'
    },
    {
        id: 'sky-max',
        title: 'Sky Max',
        category: 'commercial',
        image: '/img/commercial/sky-max/sky-max-bg.jpg',
        link: '/projects/sky-max',
        description: 'Commercial Hub'
    },
    {
        id: 'sky-station',
        title: 'Sky Station',
        category: 'commercial',
        image: '/img/commercial/sky-station/sky-station-bg.jpg',
        link: '/projects/sky-station',
        description: 'Multi occupancy commercial offices at Viman Nagar'
    },
    {
        id: 'suzlon-one-earth',
        title: 'Suzlon One Earth Excellence Academy',
        category: 'institutional',
        image: '/img/corporate/suzlon-one-earth/suzlon-one-earth-bg.jpg',
        link: '/projects/suzlon-one-earth',
        description: 'Green Corporate Training Academy'
    },
    {
        id: 'wind-dunes',
        title: 'Wind Dunes',
        category: 'institutional',
        image: '/img/institution/wind-dunes/wind-dunes-bg.jpg',
        link: '/projects/wind-dunes',
        description: 'Technology Centre for Composites'
    },
    {
        id: 'gujarati-bandhu-samaj-campus',
        title: 'Gujarati Bandhu Samaj Campus',
        category: 'institutional',
        image: '/img/institution/gujarati-bandhu-samaj-campus/gujarati-bandhu-samaj-campus-bg.jpg',
        link: '/projects/gujarati-bandhu-samaj-campus',
        description: 'Celebrating Gujarat in Pune!'
    },
    {
        id: 'desking-and-tables',
        title: 'Tables And Counters',
        category: 'products',
        image: '/img/products/desking-and-tables/desking-and-tables-bg.jpg',
        link: '/projects/desking-and-tables',
        description: 'Productive and social surfaces'
    },
    {
        id: 'sleeping-unit',
        title: 'Sleeping Units',
        category: 'products',
        image: '/img/products/sleeping-unit/sleeping-unit-bg.jpg',
        link: '/projects/sleeping-unit',
        description: 'Restful refuges'
    },
    {
        id: 'wall-unit',
        title: 'Wall Units',
        category: 'products',
        image: '/img/products/wall-unit/wall-unit-bg.jpg',
        link: '/projects/wall-unit',
        description: 'Versatility in verticality'
    },
    {
        id: 'doors',
        title: 'Doors',
        category: 'products',
        image: '/img/products/doors/doors-bg.jpg',
        link: '/projects/doors',
        description: 'Magnificent portals'
    },
    {
        id: 'entrance-gates',
        title: 'Entrance Gates',
        category: 'installations',
        image: '/img/installations/entrance-gates/entrance-gates-bg.jpg',
        link: '/projects/entrance-gates',
        description: 'Artistic Entryways'
    },
    {
        id: 'staircases',
        title: 'Staircase',
        category: 'installations',
        image: '/img/installations/staircases/staircases-bg.jpg',
        link: '/projects/staircases',
        description: 'FEATURE FLIGHTS'
    },
    {
        id: 'lighting',
        title: 'Lighting',
        category: 'installations',
        image: '/img/installations/lighting/lighting-bg.jpg',
        link: '/projects/lighting',
        description: 'Charismatic Luminaires'
    },
    {
        id: 'sculpture',
        title: 'Sculpture',
        category: 'installations',
        image: '/img/installations/sculpture/sculpture-bg.jpg',
        link: '/projects/sculpture',
        description: 'Frozen Symphony'
    },
    {
        id: 'seating',
        title: 'Seating',
        category: 'installations',
        image: '/img/installations/seating/seating-bg.jpg',
        link: '/projects/seating',
        description: 'Comfy Couches'
    },
    {
        id: 'artwork',
        title: 'Artwork',
        category: 'installations',
        image: '/img/installations/artwork/artwork-bg.jpg',
        link: '/projects/artwork',
        description: 'Connotative Compositions'
    },
    {
        id: 'murals',
        title: 'Murals',
        category: 'installations',
        image: '/img/installations/murals/murals-bg.jpg',
        link: '/projects/murals',
        description: 'Eclectic Creations'
    },
    {
        id: 'water-features',
        title: 'Water Features',
        category: 'installations',
        image: '/img/installations/water-features/water-features-bg.jpg',
        link: '/projects/water-features',
        description: 'Fluid Landscape'
    }
];

