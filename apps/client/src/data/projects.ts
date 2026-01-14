export interface Project {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  image: string;
  link: string;
  description?: string;
}

export interface ProjectDetail {
    id: string;
    title: string;
    subtitle?: string;
    category: string;
    heroImage: string;
    description: string[]; // Array of paragraphs
    details: {
        location?: string;
        status: string;
        plotArea?: string;
        builtUpArea?: string;
        carpetArea?: string;
        totalDevelopmentArea?: string;
        totalPlotArea?: string;
        area?: string;
    };
    gallery: {
        src: string;
        thumb: string;
        title?: string;
        description?: string;
    }[];
    relatedProjects?: string[]; // IDs of related projects
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

export const projectDetails: Record<string, ProjectDetail> = {
    'azaan': {
        id: 'azaan',
        title: 'Azaan',
        subtitle: 'Seamlessly blending tradition and modernity',
        category: 'ARCHITECTURE + INTERIORS + LANDSCAPE',
        heroImage: '/img/villa/azaan/azaan-bg.jpg',
        description: [
            "Azaan is conceived as a residence for a family rooted in Islamic culture. The design reflects an inward focus, encapsulating its own space within a vast garden nestled between two primary blocks. One block comprises a home, office, and recreational areas, while the other serves as a residence for the joint family.",
            "This project marked Tao’s first ever venture with a young client embracing Islamic traditions. The aim was to forge an architectural language that seamlessly merged contemporary elements with the traditional Persian essence, addressing climatic challenges. The solution involved the age-old architectural phenomenon of jaali screens.",
            "The jaali in architecture acts as a screen, regulating light and air. The use of a Jaali screen not only minimizes glare but also allows the flow of illumination, maintaining the intensity of light.",
            "Additionally, it preserves a seamless view across the aperture, enhancing convenience according to Indian notions of privacy. From within, the Jaali holes provide clear visibility of the outside world, while from the outside, the stark contrast in light prevents any insights into the interior.",
            "This architectural design beautifully balances aesthetics, functionality, and cultural sensibilities, creating a truly impressive and captivating experience.",
            "Symbolically, its intricate designs represent Islamic art’s geometric patterns, calligraphy, and abstract motifs, embodying the balance between openness and privacy, light and shade, within this architectural masterpiece.",
            "The Interior spaces are magnificently enhanced by exquisite domes, further amplifying the architectural grandeur.",
            "The design showcases a masterful blend of traditional elements, such as intricate jaali arches, domes and other captivating facets of architectural craftsmanship, seamlessly intertwining with the modern living spaces.",
            "Azaan stands as a testament to the power of architectural language, seamlessly blending tradition and modernity."
        ],
        details: {
            location: 'Khajrana, Indore',
            status: 'Completed',
            plotArea: '40000 Sq Mt.',
            builtUpArea: '17600 Sq Mt.'
        },
        gallery: [
            { src: '/img/villa/azaan/1-bg.jpg', thumb: '/img/villa/azaan/1-thumb.jpg' },
            { src: '/img/villa/azaan/2-bg.jpg', thumb: '/img/villa/azaan/2-thumb.jpg' },
            { src: '/img/villa/azaan/3-bg.jpg', thumb: '/img/villa/azaan/3-thumb.jpg' },
            { src: '/img/villa/azaan/4-bg.jpg', thumb: '/img/villa/azaan/4-thumb.jpg' },
            { src: '/img/villa/azaan/5-bg.jpg', thumb: '/img/villa/azaan/5-thumb.jpg' },
            { src: '/img/villa/azaan/6-bg.jpg', thumb: '/img/villa/azaan/6-thumb.jpg' },
            { src: '/img/villa/azaan/7-bg.jpg', thumb: '/img/villa/azaan/7-thumb.jpg' },
            { src: '/img/villa/azaan/8-bg.jpg', thumb: '/img/villa/azaan/8-thumb.jpg' },
            { src: '/img/villa/azaan/9-bg.jpg', thumb: '/img/villa/azaan/9-thumb.jpg' },
            { src: '/img/villa/azaan/10-bg.jpg', thumb: '/img/villa/azaan/10-thumb.jpg' }
        ],
        relatedProjects: ['suzlon-one-earth', 'nyati-unitree', 'goyal-group']
    },
    'nyati-unitree': {
        id: 'nyati-unitree',
        title: 'Nyati Unitree Corporate Office',
        subtitle: 'Weaving nature into Structure',
        category: 'ARCHITECTURE + INTERIORS + FURNITURE DESIGN + ART INSTALLATION',
        heroImage: '/img/corporate/nyati-unitree/nyati-bg.jpg',
        description: [
            "The Nyati Unitree is a progressive mixed-use development venture of the Nyati Group, a top real estate, construction and hospitality firm; located at Ahmednagar Road, Yerwada, Pune.",
            "The project was envisioned as a sustainable, iconic, marketable real estate; expressing through its design, confidence and comfort; while establishing the client’s corporate identity as a modern, responsible steward for mixed-use development. As per project brief, the building would house leasable modular offices & showrooms on lower floors, with the client’s corporate office accommodating a staff strength of over 200 on upper 4 floors. In addition, the design solution was to integrate green building technology for environment-conscious construction and maintenance, along with an impactful visitor experience, generated through a contemporary structure, free flowing interiors and a breathing façade envelope.",
            "The design process started with extensive discussion and understanding of the client’s vision for their workspace, and a collaborative effort at establishing a set of design criteria. A value addition to the design brief involved setting up a contemporary work culture, ensuring a pleasant and energetic work environment for the 200+ ‘asset- squad’ of the company.",
            "The design is composed of a pair of functionally distinct, yet interconnected buildings. The corporate offices for Nyati Group lie in a cuboidal RCC structure with a glass façade, enclosed by a cylindrical perforated MS envelope. The commercial building is a horizontal glass façade structure, incorporating modular commercial offices and showroom space. The planning of the ground floor ensures interconnection between the commercial and business wings, incorporating an entry plaza, a shopping plaza, showrooms and recreational zones, accessed by strategically segregated vehicular, user and visitor circulation patterns. The building orientation exploits natural light while blocking thermal radiation through energy efficient double glazing on the North, South and East, with terracotta cladding for insulation on the West façade. On the upper levels of the Corporate building, main work areas are supported by extending terraces, balconies, collaborative work zones and breathing green zones, to create a seamless fusion between indoor and outdoor spaces. Terrace levels of both buildings are composed of rooftop restaurants covered by a branching canopy; together with green balconies and collaborative green spaces promoting a balance between work zones and breakout zones.",
            "The visual consistency on the outside flows into the interior, reflecting angular branching elements in ceiling panels, wall cladding, lighting systems and art installations. Rhythmic patterns add a dynamic energy to the work areas, while integrating the entire office into one unified entity. Angular branching forms employed in ceiling, wall panels, carpets and furniture, as a homogenous continuation of the of the ‘Unitree’ concept, set up a brand image and unify the aesthetic of the entire office; while infusing a dynamic energy flowing consistently throughout workspaces.",
            "A central atrium has been carved out as a key feature to ensure visual connectivity among corporate floors. Circulation corridors are dotted with semi private and open collaborative workspaces, resulting in chance interaction and impromptu exchange. Custom designed workstations promote collaboration and teamwork through open planning.",
            "Weaving nature into interiors, the building attempts to unmechanize employees’ daily routines, providing them flexible, breathing spaces; optimizing their natural creativity and enhancing productivity; while raising levels of work-satisfaction.",
            "<strong>SUSTAINABLE DESIGN</strong>",
            "Environmentally responsible strategies were incorporated in the early stages of design; Pollution preventive construction & efficient waste management during execution, along with environment-conscious features and energy efficient design strategies, have helped the building obtain the prestigious LEED Platinum Certification, apart from being featured amongst top 50 shortlisted projects for Award for Excellence in Architecture by the IIA in 2016. The project has also received the prestigious Asia Pacific Property Award 2018, for Best Office Architecture, India; as well as the AESA Beharey Rathi Award for Best Commercial Architecture, in addition to the AESA President’s Award 2018 for adding to the aesthetics of Pune city’s skyline; and the IIID Design Excellence National Award for Furniture Design, 2016."
        ],
        details: {
            location: 'Pune, Maharashtra',
            status: 'Completed',
            plotArea: '7825 Sq mt./ 84227.6 Sq ft.',
            builtUpArea: '25230 Sq mt./ 271573.46 Sq ft.'
        },
        gallery: [
            { src: '/img/corporate/nyati-unitree/1street-view-bg.jpg', thumb: '/img/corporate/nyati-unitree/1street-view-thumb.jpg', title: 'Street View', description: 'Describe About Image' },
            { src: '/img/corporate/nyati-unitree/2breakout-Balcony-bg.jpg', thumb: '/img/corporate/nyati-unitree/2breakout-Balcony-thumb.jpg', title: 'Breakout Balcony as extended workspace', description: 'Describe About Image' },
            { src: '/img/corporate/nyati-unitree/3unitree-facade-bg.jpg', thumb: '/img/corporate/nyati-unitree/3unitree-facade-thumb.jpg', title: 'Unitree Facade', description: 'Describe About Image' },
            { src: '/img/corporate/nyati-unitree/4shopping-plaza-bg.jpg', thumb: '/img/corporate/nyati-unitree/4shopping-plaza-thumb.jpg', title: 'Shopping Plaza', description: 'Describe About Image' },
            { src: '/img/corporate/nyati-unitree/5northeast-view-bg.jpg', thumb: '/img/corporate/nyati-unitree/5northeast-view-thumb.jpg', title: 'Northeast View', description: 'Describe About Image' },
            { src: '/img/corporate/nyati-unitree/6entrance-lobby-bg.jpg', thumb: '/img/corporate/nyati-unitree/6entrance-lobby-thumb.jpg', title: 'Entrance Lobby', description: 'Describe About Image' },
            { src: '/img/corporate/nyati-unitree/7interactive-atrium-space-bg.jpg', thumb: '/img/corporate/nyati-unitree/7interactive-atrium-space-thumb.jpg', title: 'Interactive Atrium Space', description: 'Describe About Image' },
            { src: '/img/corporate/nyati-unitree/8open-plan-workspace-bg.jpg', thumb: '/img/corporate/nyati-unitree/8open-plan-workspace-thumb.jpg', title: 'Open Plan Workspace', description: 'Describe About Image' },
            { src: '/img/corporate/nyati-unitree/9md-cabin-bg.jpg', thumb: '/img/corporate/nyati-unitree/9md-cabin-thumb.jpg', title: 'MD Cabin', description: 'Describe About Image' },
            { src: '/img/corporate/nyati-unitree/10private-cabin-bg.jpg', thumb: '/img/corporate/nyati-unitree/10private-cabin-thumb1.jpg', title: 'Private Cabin', description: 'Nestled amidst Green Canopies and vast skies' }
        ],
        relatedProjects: ['suzlon-one-earth', 'manisha-constructions', 'goyal-group']
    },
    'aurum': {
        id: 'aurum',
        title: 'Aurum',
        subtitle: 'A Bungalow in the sky...',
        category: 'INTERIOR DESIGN',
        heroImage: '/img/luxuryappartments/aurum/aurum-bg.jpg',
        description: [
            "A luxurious duplex penthouse sitting atop a residential tower in Koregaon Park, Aurum is the epitome of ‘modern-chic’. A staggered 478 sq. m. floorplate abounding semi covered and open-to-sky spaces, opened the possibility of a play of interior volumes and the introduction of ample daylight into the 6-bedroom home. The layout of the apartment emphasizes a central circulation axis flanked by habitable spaces, opening up to balconies and terraces towards the outer edges.",
            "A sophisticated lift lobby, rendered in wood and brass, arouses a sense of awe, giving initial glimpses into the sheer opulence of the residence beyond. The entrance foyer sits on the central circulation axis, designated by a distinctive flooring pathway, leading to the various residential and living zones on the lower level. To the left of the foyer, a plush formal living space is marked off by the use of customized screens, used to prop the family’s enviable collection of striking artwork; while providing functional storage space through inbuilt cabinets and drawers. A full scale abstract oil painting matches the hues of the furnishings and hanging lights, to create a bright, eclectic vocabulary for the drawing area, its elegance accentuated by a petrified wood coffee table as an element of visual interest.",
            "Opposite the formal living lies a dramatic double height family room opening into an outdoor deck. Flooded with daylight, the lounge forms a versatile space, bright and airy, with a relaxed, cozy vibe. The landscaped balcony acts as an extension of the family room, providing scenic views of the city, and establishing an interaction between the inhabitants and their natural environment; despite being perched twelve story’s above the ground. The day lit dining room is a mealtime haven, its pastel green and yellow chairs and pale blonde onyx table providing a peaceful setting, complemented by an eclectic brass light fixture and beige floor tiles. An ornate powder room services the formal drawing space, with a glass bowl sitting on an elegant caramel veined stone counter.",
            "Beyond the drawing room, the central axis leads one toward the sanctified puja room, minimally styled in muted tones, with shelving units articulated in backlit marble. At the eastern edge of the axis, the bedrooms for the two daughters are arranged symmetrically, each furnished with an elegant customized TV console accommodating storage and shelving on one side and extending into a study table on the other. A unique color theme flows through each of the bedrooms and into their respective bathrooms, uniting the private spaces for each individual unit. A common hallway runs along the circulation axis, leading to the son’s bedroom; its veneer ceilings and beige marble floors giving off subtle, earthy vibes.",
            "Furnished in blue and grey, this spacious bachelor suite incorporates customized console table and a study niche, along with a roomy walk-in wardrobe and a private seating area. The son’s bathroom exudes elegance through a striking stone countertop and a wood framed translucent backlit ceiling. A beige built-in bench and glass shelved niches integrated with the bathing area allow functionality with minimalistic styling.",
            "The master bedroom, set in the classy hues of gold and champagne, incorporates sleeping, lounging, wardrobe and bath as separate private zones. The bedroom opens out to a private deck, allowing a flexible usage of open-to-sky space. The usage of pastel green onyx stone on countertops as well as the shower enclosure, adds a touch of softness and warmth to the master bathroom. The steel and wood spiral staircase leading to the terrace level forms an arresting visual feature in the circulation lobby. Combined with a graceful dressing counter, the feature lends a ‘spa-like’ feel to the entry of the recreational level above. The terrace floor incorporates a flexible lounge cum home theatre area, openable outward, to integrate a party deck. The upper level also houses a guest bedroom, servant’s quarters and a hobby room, apart from an expansive open terrace deck with outdoor seating space. Beyond the deck lies an infinity pool adjoining a lofty salon and spa.",
            "Continuous glazing along the exterior allows panoramic views of the Pune skyline, imparting dramatic visual accents to the recreational space. Planted borders of balconies and the outdoor terrace enclose the space with natural elements, creating an ‘indoor-outdoor- living environment within the high-rise apartment. A neutral color palette adorns the stylistic simplicity and minimalism of this lofty abode, contrasting and complementing the bright sprays of daylight filtered through glazed openings. A variety of habitable spaces, changing levels of enclosure and light, combined with customized décor elements, convert the living experience into one full of surprise, excitement and delight."
        ],
        details: {
            location: 'Pune',
            status: 'Completed',
            plotArea: '',
            builtUpArea: 'Carpet Area : 5145 ft.'
        },
        gallery: [
            { src: '/img/luxuryappartments/aurum/1-bg.jpg', thumb: '/img/luxuryappartments/aurum/1-thumb.jpg', title: 'Double Height Family Living', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/2-bg.jpg', thumb: '/img/luxuryappartments/aurum/2-thumb.jpg', title: 'Entrance Foyer', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/3-bg.jpg', thumb: '/img/luxuryappartments/aurum/3-thumb.jpg', title: 'Plush Formal Living', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/4-bg.jpg', thumb: '/img/luxuryappartments/aurum/4-thumb.jpg', title: 'Landscaped Balcony: Extended Living space', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/5-bg.jpg', thumb: '/img/luxuryappartments/aurum/5-thumb.jpg', title: 'Daylit Dining', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/6-bg.jpg', thumb: '/img/luxuryappartments/aurum/6-thumb.jpg', title: 'Free standing storage units', description: 'Free standing storage units within the living areas act as visual divisions and create space for large artworks' },
            { src: '/img/luxuryappartments/aurum/7-bg.jpg', thumb: '/img/luxuryappartments/aurum/7-thumb.jpg', title: 'Puja Room', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/8-bg.jpg', thumb: '/img/luxuryappartments/aurum/8-thumb.jpg', title: 'Central Hallway', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/9-bg.jpg', thumb: '/img/luxuryappartments/aurum/9-thumb.jpg', title: '09.Daughter\'s Bedroom', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/10-bg.jpg', thumb: '/img/luxuryappartments/aurum/10-thumb.jpg', title: 'Daughter\'s Bedroom - 2', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/11-bg.jpg', thumb: '/img/luxuryappartments/aurum/11-thumb.jpg', title: 'Daughter\'s Bedroom - study', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/12-bg.jpg', thumb: '/img/luxuryappartments/aurum/12-thumb.jpg', title: 'Son\'s Bedroom', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/13-bg.jpg', thumb: '/img/luxuryappartments/aurum/13-thumb.jpg', title: 'Son\'s Suite', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/14-bg.jpg', thumb: '/img/luxuryappartments/aurum/14-thumb.jpg', title: 'Master Suite', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/15-bg.jpg', thumb: '/img/luxuryappartments/aurum/15-thumb.jpg', title: 'Master Lounge', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/16-bg.jpg', thumb: '/img/luxuryappartments/aurum/16-thumb.jpg', title: 'Master Bathroom', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/17-bg.jpg', thumb: '/img/luxuryappartments/aurum/17-thumb.jpg', title: 'Spiral staircase', description: 'Spiral staircase made of metal and wood leads to the terrace floor.' },
            { src: '/img/luxuryappartments/aurum/18-bg.jpg', thumb: '/img/luxuryappartments/aurum/18-thumb.jpg', title: 'Transformable Home Theatre', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/19-bg.jpg', thumb: '/img/luxuryappartments/aurum/19-thumb.jpg', title: 'Home Theatre / Party Space', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/20-bg.jpg', thumb: '/img/luxuryappartments/aurum/20-thumb.jpg', title: 'Spa and Salon', description: 'Spa and Salon overlooking the Pune Skyline' },
            { src: '/img/luxuryappartments/aurum/21-bg.jpg', thumb: '/img/luxuryappartments/aurum/21-thumb.jpg', title: 'Outdoor Terrace with infinity pool', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/aurum/24-bg.jpg', thumb: '/img/luxuryappartments/aurum/24-thumb.jpg', title: 'Section A-A’', description: 'Describe About Image' }
        ],
        relatedProjects: ['ajmera-aria', 'gods-blessing', 'konark']
    },
    'vrindavan': {
        id: 'vrindavan',
        title: 'Vrindavan',
        subtitle: 'A Harmonious Blend of Nature and Architecture',
        category: 'ARCHITECTURE + INTERIORS + LANDSCAPE',
        heroImage: '/img/villa/vrindavan/vrindavan-bg.jpg',
        description: [
            "Unveiling Vrindavan: Where Nature and Luxury Embrace in Architectural Splendor",
            "In the heart of an ethereal landscape, where whispers of nature entwine with opulent dreams, stands Vrindavan. Its ivory towers reach for the heavens, a testament to architectural ingenuity, while its glistening façade mirrors the brilliance of the cosmos above. As if plucked from the canvas of a reverie, this sanctuary of innovation beckons—a symphony of elegance and visionary design.",
            "Step across the threshold, where time itself surrenders to the allure of Vrindavan’s enchantment. The corridors, adorned with the artistry of a thousand tales, guide one through a labyrinth of wonder. Each archway is a passage to a new realm, each room a canvas painted with the hues of possibility.",
            "Here, luxury Is not just an indulgence; it’s a communion with nature’s symphony. The gardens, an ode to serenity, weave seamlessly with the opulent interiors, inviting sunlight to dance upon marble floors. In this symphony of design, every detail—a chandelier cascading like a waterfall of diamonds, windows framing vistas of unspoiled beauty—whispers tales of lavish grandeur and tranquil harmony.",
            "Vrindavan doesn’t merely stand—it breathes, pulses with life, and weaves an enchanting narrative where the boundaries between the tangible and the sublime dissolve. It’s a story whispered in the rustle of leaves, echoed in the gentle sway of curtains kissed by the breeze.",
            "And as twilight paints the sky with its celestial brushstrokes, Vrindavan casts its spell, a celestial poem etched in stone, offering an escape into a realm where luxury meets the celestial, and architecture dances with the divine. “In Vrindavan’s embrace, the soul finds refuge, and the heart discovers the artistry of existence."
        ],
        details: {
            location: 'Amanora Park, Pune',
            status: 'Completed',
            plotArea: '70794.00 Sq Mt.',
            builtUpArea: '29666.40 Sq Mt.'
        },
        gallery: [
            { src: '/img/villa/vrindavan/1-bg.jpg', thumb: '/img/villa/vrindavan/1-thumb.jpg' },
            { src: '/img/villa/vrindavan/2-bg.jpg', thumb: '/img/villa/vrindavan/2-thumb.jpg' },
            { src: '/img/villa/vrindavan/3-bg.jpg', thumb: '/img/villa/vrindavan/3-thumb.jpg' },
            { src: '/img/villa/vrindavan/4-bg.jpg', thumb: '/img/villa/vrindavan/4-thumb.jpg' },
            { src: '/img/villa/vrindavan/5-bg.jpg', thumb: '/img/villa/vrindavan/5-thumb.jpg' },
            { src: '/img/villa/vrindavan/6-bg.jpg', thumb: '/img/villa/vrindavan/6-thumb.jpg' },
            { src: '/img/villa/vrindavan/7-bg.jpg', thumb: '/img/villa/vrindavan/7-thumb.jpg' },
            { src: '/img/villa/vrindavan/8-bg.jpg', thumb: '/img/villa/vrindavan/8-thumb.jpg' },
            { src: '/img/villa/vrindavan/9-bg.jpg', thumb: '/img/villa/vrindavan/9-thumb.jpg' },
            { src: '/img/villa/vrindavan/10-bg.jpg', thumb: '/img/villa/vrindavan/10-thumb.jpg' },
            { src: '/img/villa/vrindavan/11-bg.jpg', thumb: '/img/villa/vrindavan/11-thumb.jpg' }
        ],
        relatedProjects: ['azaan', 'paradiso', 'nest-residence']
    },
    'vitaan': {
        id: 'vitaan',
        title: 'VITAAN',
        subtitle: 'Luxury in the lap of nature…',
        category: 'ARCHITECTURE + INTERIOR DESIGN',
        heroImage: '/img/villa/vitaan/vitaan-bg.jpg',
        description: [
            "Cited in Indore, Vitaan is a luxurious courtyard house, catering to a joint business family spanning 3 generations. The main entrance to the house is through a shaded deck floating above a water body, welcoming visitors and residents with joyful water fountains. Appending the deck, is a path to the floating temple, fronted by a lotus pond. The semi covered deck guides one into the main house along a lush front lawn overlooking a verandah seating. The residence, built in pink sandstone, is laid out along a central courtyard housing a semi covered private swimming pool. Living spaces are designed to capture views of the lively landscape in the interior as well as exterior of the house. Bedrooms, designed toward the periphery, are connected to their own private gardens, integrating interesting seating and landscape elements. The upper level of the residence accommodates a home theatre lounge flanked by bedrooms overlooking the pool below. Cudappa stone flooring, combined with earthy wooden furniture and pink sandstone walls lend the space a raw, rustic appeal. Combined with the flood of daylight and by natural cross ventilation, the house is successful in connecting residents with nature during their day to day activities."
        ],
        details: {
            location: 'Indore, Madhya Pradesh',
            status: 'Completed',
            plotArea: '3053 Sq mt.',
            builtUpArea: '1504 Sq mt.'
        },
        gallery: [
            { src: '/img/villa/vitaan/1-bg.jpg', thumb: '/img/villa/vitaan/1-thumb.jpg' },
            { src: '/img/villa/vitaan/2-bg.jpg', thumb: '/img/villa/vitaan/2-thumb.jpg' },
            { src: '/img/villa/vitaan/3-bg.jpg', thumb: '/img/villa/vitaan/3-thumb.jpg' },
            { src: '/img/villa/vitaan/4-bg.jpg', thumb: '/img/villa/vitaan/4-thumb.jpg' },
            { src: '/img/villa/vitaan/5-bg.jpg', thumb: '/img/villa/vitaan/5-thumb.jpg' },
            { src: '/img/villa/vitaan/6-bg.jpg', thumb: '/img/villa/vitaan/6-thumb.jpg' },
            { src: '/img/villa/vitaan/7-bg.jpg', thumb: '/img/villa/vitaan/7-thumb.jpg' },
            { src: '/img/villa/vitaan/8-bg.jpg', thumb: '/img/villa/vitaan/8-thumb.jpg' },
            { src: '/img/villa/vitaan/9-bg.jpg', thumb: '/img/villa/vitaan/9-thumb.jpg' },
            { src: '/img/villa/vitaan/10-bg.jpg', thumb: '/img/villa/vitaan/10-thumb.jpg' },
            { src: '/img/villa/vitaan/11-bg.jpg', thumb: '/img/villa/vitaan/11-thumb.jpg' },
            { src: '/img/villa/vitaan/12-bg.jpg', thumb: '/img/villa/vitaan/12-thumb.jpg' },
            { src: '/img/villa/vitaan/13-bg.jpg', thumb: '/img/villa/vitaan/13-thumb.jpg' },
            { src: '/img/villa/vitaan/14-bg.jpg', thumb: '/img/villa/vitaan/14-thumb.jpg' },
            { src: '/img/villa/vitaan/15-bg.jpg', thumb: '/img/villa/vitaan/15-thumb.jpg' },
            { src: '/img/villa/vitaan/16-bg.jpg', thumb: '/img/villa/vitaan/16-thumb.jpg' },
            { src: '/img/villa/vitaan/17-bg.jpg', thumb: '/img/villa/vitaan/17-thumb.jpg' },
            { src: '/img/villa/vitaan/18-bg.jpg', thumb: '/img/villa/vitaan/18-thumb.jpg' },
            { src: '/img/villa/vitaan/19-bg.jpg', thumb: '/img/villa/vitaan/19-thumb.jpg' },
            { src: '/img/villa/vitaan/20-bg.jpg', thumb: '/img/villa/vitaan/20-thumb.jpg' },
            { src: '/img/villa/vitaan/21-bg.jpg', thumb: '/img/villa/vitaan/21-thumb.jpg' },
            { src: '/img/villa/vitaan/22-bg.jpg', thumb: '/img/villa/vitaan/22-thumb.jpg' },
            { src: '/img/villa/vitaan/23-bg.jpg', thumb: '/img/villa/vitaan/23-thumb.jpg' },
            { src: '/img/villa/vitaan/24-bg.jpg', thumb: '/img/villa/vitaan/24-thumb.jpg' },
            { src: '/img/villa/vitaan/25-bg.jpg', thumb: '/img/villa/vitaan/25-thumb.jpg' },
            { src: '/img/villa/vitaan/26-bg.jpg', thumb: '/img/villa/vitaan/26-thumb.jpg' },
            { src: '/img/villa/vitaan/27-bg.jpg', thumb: '/img/villa/vitaan/27-thumb.jpg' },
            { src: '/img/villa/vitaan/28-bg.jpg', thumb: '/img/villa/vitaan/28-thumb.jpg' },
            { src: '/img/villa/vitaan/29-bg.jpg', thumb: '/img/villa/vitaan/29-thumb.jpg' }
        ],
        relatedProjects: ['azaan', 'nest-residence', 'paradiso']
    },
    'anand-villa': {
        id: 'anand-villa',
        title: 'Anand Villa',
        subtitle: 'Spiritual Symphony',
        category: 'ARCHITECTURE + INTERIOR DESIGN',
        heroImage: '/img/villa/anandvilla/anandvilla-bg.jpg',
        description: [
            "The rectangular site is approached by a road towards it’s north side. The design is based on a simple square grid placed at an angle of 45° to plot boundary, thus welcoming the south-west breeze and opening up the view on either side of the house. Adjoining the plot, on the east is the common society space, and to the south is a multistory apartment block. The idea was to open up the view on the north-east and north-west and place the service block towards south. The entrance gate is placed at 45° to the plot boundary, parallel to the building grid, to widen the approach to house, thus giving a welcoming feel. Rooms are oriented in a manner, so as to catch the southwest breeze, This, along with the diagonal grid of the house makes the entrance gate visible from all the rooms, thereby supplementing the function of security.",
            "The semi private spaces are zoned on the ground level, well integrated with the lush garden; with private spaces occupying the first floor, and the terrace housing a silent, contemplative meditation room roofed by an Egyptian style pyramidal canopy, to capture cosmic energy.",
            "The prime consideration for design was to integrate the house with the nature from the inside to the outside. The important aspect was to build a structure, which was rooted and in harmony with nature. The proportions of the building relate to human scale, with the interior spaces and the structural massing in accordance with this proportion. The first impression of the house is that of a floating solid mass! This has been achieved with the use of black painted steel columns and wooden framed tinted glass windows. Natural stone masonry on the lower floor, is used as filler material between the structural and functional requirement; which together gives the illusion of the structure being grounded. The blue and white china mosaic on the roof merges with the sky.",
            "The functions within the spaces in the house are differentiated with the use of furniture and other elements like rocks of various sizes. The elimination of unnecessary wall not only saves spaces but also adds a level of transparency. Cavity walls have been provided on the east and west side, which functions as insulation, tempering the microclimate inside the house.",
            "Free-standing structural columns, built-in furniture, skylights, wind catchers, stone masonry, waterfalls, plants, rockery, bay windows, vibrant & lively colors, white & blue china mosaic pattern on roof top, are a few elements enhancing the design. Large verandas, balconies and terraces are created to enjoy the beautiful view of garden. Continuous windows of tinted glass extend the room beyond the window for view of the abundant greenery outside. The corner windows in the bedroom provide cross ventilation and open the view at various angles to the outside. Walls of exposed stone of different shapes and sizes, and potted plants create a unity and harmony of the ground from within, borrowing the surrounding landscape inside. With the lush, natural greenery outside, the sound of water and breeze, the spontaneous play of natural elements, Anandvilla is a picture of peace and harmony."
        ],
        details: {
            location: 'Kalyani Nagar, Pune',
            status: 'Completed',
            plotArea: '4500 Sq. m.',
            builtUpArea: '3670 Sq. m.'
        },
        gallery: [
            { src: '/img/villa/anandvilla/1anandvilla.jpg', thumb: '/img/villa/anandvilla/1anandvilla.jpg', title: 'A solid floating mass amid the neighboring landscape', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/2anandvilla.jpg', thumb: '/img/villa/anandvilla/2anandvilla.jpg', title: 'Living Lounge segregated by a lightweight floating staircase', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/3anandvilla.jpg', thumb: '/img/villa/anandvilla/3anandvilla.jpg', title: 'Dining Nook', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/4anandvill.jpg', thumb: '/img/villa/anandvilla/4anandvill.jpg', title: 'Transitional Space', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/5anandvilla.jpg', thumb: '/img/villa/anandvilla/5anandvilla.jpg', title: 'Earthy Outdoors', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/6anandvilla.jpg', thumb: '/img/villa/anandvilla/6anandvilla.jpg', title: 'Serene Verandah', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/7anandvilla.jpg', thumb: '/img/villa/anandvilla/7anandvilla.jpg', title: 'Natural landscape features', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/8anandvilla.jpg', thumb: '/img/villa/anandvilla/8anandvilla.jpg', title: 'Natural landscape features', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/9anandvilla.jpg', thumb: '/img/villa/anandvilla/9anandvilla.jpg', title: 'Corner windows enhance views and bring in daylight', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/10anandvilla.jpg', thumb: '/img/villa/anandvilla/10anandvilla.jpg', title: 'Material Palette of exposed rubble and wood', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/11anandvilla.jpg', thumb: '/img/villa/anandvilla/11anandvilla.jpg', title: 'Peaceful meditation hall capturing cosmic energy', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/12anandvilla.jpg', thumb: '/img/villa/anandvilla/12anandvilla.jpg', title: 'Faceted Balconies', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/13anandvilla.jpg', thumb: '/img/villa/anandvilla/13anandvilla.jpg', title: 'Pyramid roof above meditation hall', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/14anadvilla.jpg', thumb: '/img/villa/anandvilla/14anadvilla.jpg', title: 'Conceptual planning Ground Floor', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/15anandvilla.jpg', thumb: '/img/villa/anandvilla/15anandvilla.jpg', title: 'Conceptual planning First Floor', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/16anandvilla.jpg', thumb: '/img/villa/anandvilla/16anandvilla.jpg', title: 'Conceptual planning Second Floor', description: 'Describe About Image' }
        ],
        relatedProjects: ['shunyam', 'aapulki', 'saj']
    },
    'goyal-group': {
        id: 'goyal-group',
        title: 'Corporate Office for Goyal Group',
        subtitle: 'Compact office Interiors',
        category: 'INTERIOR DESIGN',
        heroImage: '/img/corporate/goyal-group/goyal-group-bg.jpg',
        description: [
            "This small office, with its pragmatic layout, caters to the general functions of the client company, while achieving an elegant, luxurious finish. A simple segregation of functions places the reception and waiting lounge toward the center of the space, housing the waiting lounge and informal meeting room. On one side of the central zone, lies the staff workstations and administrative office space, while the other end is occupied by executive cabins; ensuring daylight and views to every workdesk in the office. Service and utility areas are zoned behind the welcome zone.",
            "A louvered false ceiling design allows easy access to overhead services, while giving the office an industrial look. Eco friendly Medium Density Fiber boards are used in the creation of bespoke furniture, to complement natural stone flooring and leather furnishings. Large graphics incorporated on glass partitions allow privacy to the otherwise visually integrated executive cabins. Customized graphic design lends the brand a corporate identity while uplifting the ambiance of the office. On large window surfaces, these graphics efficiently diffuse direct daylight and prevent glare into the workspaces. The office aims to achieve efficiency and productivity in its compact layout."
        ],
        details: {
            location: 'J. M. Road, Pune, Maharashtra',
            status: 'Completed',
            plotArea: '',
            builtUpArea: 'Carpet Area : 2400 ft.'
        },
        gallery: [
            { src: '/img/corporate/goyal-group/01.jpg', thumb: '/img/corporate/goyal-group/01.jpg', title: 'Reception lounge', description: 'Describe About Image' },
            { src: '/img/corporate/goyal-group/02.jpg', thumb: '/img/corporate/goyal-group/02.jpg', title: 'Meeting Room', description: 'Describe About Image' },
            { src: '/img/corporate/goyal-group/03.jpg', thumb: '/img/corporate/goyal-group/03.jpg', title: 'Staff Workstations', description: 'Describe About Image' },
            { src: '/img/corporate/goyal-group/04.jpg', thumb: '/img/corporate/goyal-group/04.jpg', title: 'Executive cabin', description: 'Describe About Image' }
        ],
        relatedProjects: ['suzlon-one-earth', 'manisha-constructions', 'nyati-unitree']
    },
    'castel-royale': {
        id: 'castel-royale',
        title: 'Duplex Apartment at Castel Royale',
        subtitle: 'Contemporary traditional home',
        category: 'INTERIOR DESIGN',
        heroImage: '/img/luxuryappartments/castel-royale/apartment-at-castel-royale-bg.jpg',
        description: [
            "This duplex apartment integrates traditional architectural heritage within the everyday lives of a modern Maharashtrian family. Occupying the 11th and 12th floors of one of Pune’s tallest apartment complexes, the lofty home incorporates greenery and nature in every element, ensuring for its residents, a spiritual connection with their environment. Full height glazing in the large double height living space facilitates soothing views of the greenery around. River finish kota stone creates the ambience of a transitional verandah, its outdoor feel heightened by the copper vessel waterfall adorning a floating staircase, while filing the house with the soft music of flowing water. Curvilinear room divisions ensure freely flowing spaces, integrating the various rooms into one unified living entity. Typical Marathi motifs adorn the home at every scale, right from hand carved door frames, to floor inlay patterns and ‘paithani’ metal screen doors. Custom designed furniture and furnishings, like the ‘vasant’ series of rugs, give each room a unique identity, while still united in their rich ethnic vocabulary. A juxtaposition of traditional and modern, outdoor and indoor, bright yet private, the home has been an exciting design and execution challenge, awaiting completion…"
        ],
        details: {
            location: 'Pune',
            status: 'Ongoing',
            plotArea: '',
            builtUpArea: 'Carpet Area : 7288 Sq.ft.'
        },
        gallery: [
            { src: '/img/luxuryappartments/castel-royale/1-thumb.jpg', thumb: '/img/luxuryappartments/castel-royale/1-thumb.jpg', title: 'Master bedroom lounge', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/castel-royale/2-thumb.jpg', thumb: '/img/luxuryappartments/castel-royale/2-thumb.jpg', title: 'Master bedroom', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/castel-royale/3-thumb.jpg', thumb: '/img/luxuryappartments/castel-royale/3-thumb.jpg', title: 'Master bath', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/castel-royale/4-thumb.jpg', thumb: '/img/luxuryappartments/castel-royale/4-thumb.jpg', title: 'Guest bedroom', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/castel-royale/5-thumb.jpg', thumb: '/img/luxuryappartments/castel-royale/5-thumb.jpg', title: 'Guest bathroom', description: 'Describe About Image' }
        ],
        relatedProjects: ['ajmera-aria', 'gods-blessing', 'konark']
    },
    'manhattan': {
        id: 'manhattan',
        title: 'Manhattan',
        subtitle: 'Downtown chic',
        category: 'INTERIOR DESIGN',
        heroImage: '/img/luxuryappartments/manhattan/manhattan-bg.jpg',
        description: [
            "A contemporary single-family home in the posh Manhattan development of Baner, this 4-bedroom pad sets an urban chic vibe for its modern residents. The flat opens into a formal living cum dining hall, overlooking an open terrace with a luxurious swimming pool. Spacious bedrooms, to the rear of the apartment, capture stunning views of the green surrounds. Minimalistic grey and brown finishes, combined with soft neutral furnishings, laser cut jali patterns and colourful artwork create a luxurious, yet homely ambience for this urban apartment."
        ],
        details: {
            location: 'Baner, Pune',
            status: 'Completed',
            plotArea: '',
            builtUpArea: 'Carpet Area : 4700 Sq. Ft.'
        },
        gallery: [
            { src: '/img/luxuryappartments/manhattan/1-thumb.jpg', thumb: '/img/luxuryappartments/manhattan/1-thumb.jpg', title: 'Entrance Lobby', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/manhattan/2-thumb.jpg', thumb: '/img/luxuryappartments/manhattan/2-thumb.jpg', title: 'Welcoming jhoola seating', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/manhattan/3-thumb.jpg', thumb: '/img/luxuryappartments/manhattan/3-thumb.jpg', title: 'Foyer', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/manhattan/4-thumb.jpg', thumb: '/img/luxuryappartments/manhattan/4-thumb.jpg', title: 'Custom Storage partition', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/manhattan/5-thumb.jpg', thumb: '/img/luxuryappartments/manhattan/5-thumb.jpg', title: 'Daylit formal living', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/manhattan/6-thumb.jpg', thumb: '/img/luxuryappartments/manhattan/6-thumb.jpg', title: 'Multi-utility storage partition running through the length of the home', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/manhattan/7-thumb.jpg', thumb: '/img/luxuryappartments/manhattan/7-thumb.jpg', title: 'Reflected views – recreational terrace', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/manhattan/8-thumb.jpg', thumb: '/img/luxuryappartments/manhattan/8-thumb.jpg', title: 'Family living overlooking splash pool', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/manhattan/9-thumb.jpg', thumb: '/img/luxuryappartments/manhattan/9-thumb.jpg', title: 'Cozy seating', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/manhattan/10-thumb.jpg', thumb: '/img/luxuryappartments/manhattan/10-thumb.jpg', title: 'Powder toilet', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/manhattan/11-thumb.jpg', thumb: '/img/luxuryappartments/manhattan/11-thumb.jpg', title: 'Serene Puja Alcove', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/manhattan/12-thumb.jpg', thumb: '/img/luxuryappartments/manhattan/12-thumb.jpg', title: 'Custom Door Knobs', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/manhattan/13-thumb.jpg', thumb: '/img/luxuryappartments/manhattan/13-thumb.jpg', title: 'Connected living spaces', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/manhattan/14-thumb.jpg', thumb: '/img/luxuryappartments/manhattan/14-thumb.jpg', title: 'Recreational terrace', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/manhattan/15-thumb.jpg', thumb: '/img/luxuryappartments/manhattan/15-thumb.jpg', title: 'Manhattan – a minimalistic chic apartment', description: 'Describe About Image' }
        ],
        relatedProjects: ['palkhi', 'ajmera-aria', 'gods-blessing']
    },
    'k-f-bioplant': {
        id: 'k-f-bioplant',
        title: 'K. F. Bioplant',
        subtitle: 'Harmonious working…',
        category: 'ARCHITECTURE + INTERIORS',
        heroImage: '/img/corporate/k-f-bioplant/k-f-bioplant-bg.jpg',
        description: [
            "The project is a corporate extension to the K.F. Bioplant facility at Mundhwa. The design intervention comprised of a reception area, conference halls, an MD cabin, a lounge, services and recreational areas. The front office is designed as a glass cylinder, opening out to the soothing green views of vegetation on the plot. Keeping with the nature of the activities of the K.F. lab, the design focusses on enhancing the work experience through a harmonious indoor-outdoor interconnection. Glass walls between the meeting rooms, lounge and private cabin ensure visual transparency, and smooth interconnection between all employees."
        ],
        details: {
            location: 'Mundhwa, Pune, Maharashtra',
            status: 'Completed',
            plotArea: '59398 Sq Mt.',
            builtUpArea: '1481 Sq Mt.'
        },
        gallery: [
            { src: '/img/corporate/k-f-bioplant/1-thumb.jpg', thumb: '/img/corporate/k-f-bioplant/1-thumb.jpg', title: 'Project Overview', description: 'Describe About Image' },
            { src: '/img/corporate/k-f-bioplant/2-thumb.jpg', thumb: '/img/corporate/k-f-bioplant/2-thumb.jpg', title: 'Entrance passage', description: 'Describe About Image' },
            { src: '/img/corporate/k-f-bioplant/3-thumb.jpg', thumb: '/img/corporate/k-f-bioplant/3-thumb.jpg', title: 'MD cabin', description: 'Describe About Image' },
            { src: '/img/corporate/k-f-bioplant/4-thumb.jpg', thumb: '/img/corporate/k-f-bioplant/4-thumb.jpg', title: 'Meeting room', description: 'Describe About Image' },
            { src: '/img/corporate/k-f-bioplant/5-thumb.jpg', thumb: '/img/corporate/k-f-bioplant/5-thumb.jpg', title: 'Meeting area', description: 'Describe About Image' }
        ],
        relatedProjects: ['suzlon-one-earth', 'nyati-unitree', 'goyal-group']
    },
    'shunyam-pune': {
        id: 'shunyam-pune',
        title: 'Shunyam, Pune',
        subtitle: 'An Urban Oasis',
        category: 'Cozy Homes',
        heroImage: '/img/cozy_homes/shunyam.jpg',
        description: [
            "Gentle sounds of lapping water and twittering birds create a ‘zen’ like ambience for this urban oasis in Mundhwa, Pune. Sitting on a 400-sq. m. plot amidst dense residential structures, Shunyam houses a void of spiritual ‘nothingness’; enclosed by a screen of green plants. Self-generated views and a lack of direct openings toward the outside allow inhabitants to cut off from external clutter, and engage in a peaceful, meditative lifestyle.",
            "The 297 sq.m. of built-up area caters to a joint family, incorporating natural elements of earth, fire, water, sky and space; within a myriad of functional zones such as a prayer area, a meditation room, a kid’s playroom and common family spaces.",
            "Detached solid floating walls allow natural light and cross ventilation into the interiors, through light passages, skylights, glazed flooring strips, and clerestory windows. At the same time, a lack of direct openings toward the outside allow privacy to inhabitants, cutting out any intrusion from the external world. Light is administered into private spaces through crevice-like strips made by offsetting walls and rendering the gaps in glass blocks. Structural elements lie exposed through canopies, staircases, grills and skylights, lending the building a minimalistic elegance.",
            "The entire residence uses passive technologies for optimum utilization of daylight and solar energy. Natural cross ventilation is facilitated by the use of monitor windows to facilitate stack effect. Solar panels and vermicompost pits allow environment sensitive maintenance. A kitchen garden plantation on the terrace reduces solar heat gain while reclaiming the displaced landscape during construction. Rapidly renewable materials like MDF, cane, wood, paper and cotton, minimize the environmental impact of construction.",
            "The design allows a seamless interaction between man and nature, by strategically generating views of bamboo curtains and water features all along the plot boundary. A transitional living room opens out to the elements by the flexible modulation of rolling screens and sliding doors. The double height dining space receives pre-cooled westerly breezes tempered by a landscaped water body along the plot line. Natural materials used in their raw forms, fuse the interiors with nature, creating a dynamic indoor-outdoor sensory experience. Shunyam embodies a spiritual oasis in the humdrum of urban life, a place to enjoy the sunrise, relish the sounds of chirping birds, experience the change of seasons, and connect with one’s inner self."
        ],
        details: {
            location: 'Pune, Maharashtra',
            status: 'Completed',
            plotArea: '400 Sq. m.',
            builtUpArea: '297 Sq. m.'
        },
        gallery: [
            { src: '/img/villa/shunyam-pune/1shunyam.jpg', thumb: '/img/villa/shunyam-pune/1shunyam.jpg', title: 'Shunyam Pune', description: 'Describe About Image' },
            { src: '/img/villa/shunyam-pune/2shunyam.jpg', thumb: '/img/villa/shunyam-pune/2shunyam.jpg', title: 'Shunyam Pune', description: 'Describe About Image' },
            { src: '/img/villa/shunyam-pune/3shunyam.jpg', thumb: '/img/villa/shunyam-pune/3shunyam.jpg', title: 'Shunyam Pune', description: 'Describe About Image' },
            { src: '/img/villa/shunyam-pune/4shunyam.jpg', thumb: '/img/villa/shunyam-pune/4shunyam.jpg', title: 'Shunyam Pune', description: 'Describe About Image' },
            { src: '/img/villa/shunyam-pune/5shunyam.jpg', thumb: '/img/villa/shunyam-pune/5shunyam.jpg', title: 'Shunyam Pune', description: 'Describe About Image' },
            { src: '/img/villa/shunyam-pune/6shunyam.jpg', thumb: '/img/villa/shunyam-pune/6shunyam.jpg', title: 'Shunyam Pune', description: 'Describe About Image' },
            { src: '/img/villa/shunyam-pune/7shunyam.jpg', thumb: '/img/villa/shunyam-pune/7shunyam.jpg', title: 'Shunyam Pune', description: 'Describe About Image' },
            { src: '/img/villa/shunyam-pune/8shunyam.jpg', thumb: '/img/villa/shunyam-pune/8shunyam.jpg', title: 'Shunyam Pune', description: 'Describe About Image' },
            { src: '/img/villa/shunyam-pune/9shunyam.jpg', thumb: '/img/villa/shunyam-pune/9shunyam.jpg', title: 'Shunyam Pune', description: 'Describe About Image' },
            { src: '/img/villa/shunyam-pune/10shunyam.jpg', thumb: '/img/villa/shunyam-pune/10shunyam.jpg', title: 'Shunyam Pune', description: 'Describe About Image' },
            { src: '/img/villa/shunyam-pune/11shunyam.jpg', thumb: '/img/villa/shunyam-pune/11shunyam.jpg', title: 'Shunyam Pune', description: 'Describe About Image' },
            { src: '/img/villa/shunyam-pune/13shunyam.jpg', thumb: '/img/villa/shunyam-pune/13shunyam.jpg', title: 'Shunyam Pune', description: 'Describe About Image' },
            { src: '/img/villa/shunyam-pune/14shunyam.jpg', thumb: '/img/villa/shunyam-pune/14shunyam.jpg', title: 'Shunyam Pune', description: 'Describe About Image' },
            { src: '/img/villa/shunyam-pune/15shunyam.jpg', thumb: '/img/villa/shunyam-pune/15shunyam.jpg', title: 'Shunyam Pune', description: 'Describe About Image' }
        ],
        relatedProjects: ['shunyam-jodhpur', 'courtyard-house', 'aapulki']
    },
    'shunyam-jodhpur': {
        id: 'shunyam-jodhpur',
        title: 'Shunyam Jodhpur',
        subtitle: 'A Vernacular Retreat',
        category: 'Luxury Villas',
        heroImage: '/img/villa/shunyam.jpg',
        description: [
            "Jodhpur city is replete with specimens of artistic and cultural heritage, its older extents dotted with majestic forts and palaces housing royal intricate pieces of art. Set on a 2-acre plot in the outskirts of the ‘blue city’, Shunyam is a stately single-family retirement home, reflecting the grandeur of Jodhpur’s historic palaces while justifying the family’s necessities through an explorative integration of the vernacular with the contemporary. The project is the result of unrelenting teamwork and collaboration between the design team, skilled local artisans, understanding clients and a well-meaning team of passive cooling experts.",
            "The central focus of thedesign was an architectural solution responding to local culture, aesthetics and climate through incorporation of traditional construction techniques to fulfil modern living requirements. Semi-private living areas like the living room, kitchen, hobby room and family rooms are essentially free flowing spaces enclosing a set of twin courtyards. Private living areas are seamlessly integrated with their outdoor environment through independent verandahs and sit-outs. Utilities and service areas are planned along the boundary as an insulating barrier against the elements.Separate built masses are segregated by jaalis and opened up to the outside through arches in sandstone.",
            "Strategic placement of traditional elements like- stone jaalis, courtyards, recessed circular openings, arches and skylights breathes fresh air and daylight into the living spaces, interlacing the built elements with their site and surroundings. Evaporative cooling towers and stack ventilation towers with turbo vents set up an active cross ventilation system responding aptly to the extreme desert climate of the city.Passive ventilation techniques and traditional architectural language have been utilized with a contemporary approach, creating a statement that blends style with sustainability. Local pink and red sandstone has been used for walls and ceilings to prevent heat transmission on account of its thermally insulative properties. The roof is insulated using clay pots loaded with lime mortar over sandstone slabs.Locally available makrana marble Is used for flooring in living spaces, whereas shisham wood flooring is used for warmth in the private spaces. Printed and woven textiles used as carpets and tapestry, add a splash of colour to the monochromatic hues of exposed local materials.",
            "Colored glass mosaic, integrated with door panels transmit lively beams of daylight into the minimalistic interiors. Traditional architectural elements like carved brackets, jaali screens, arches, furniture and accessories; expressed in natural materials, synchronous with the local architectural vocabulary of Jodhpur, impart a homogeneity to the spaces; creating a single unified, interrelated composition.The green environs of the building, combined with preserved fruit orchards and picturesque views of hilly landscapes to the north and west; give the home the character of a contemplative retreat."
        ],
        details: {
            location: 'Jodhpur, Rajasthan',
            status: 'Completed',
            plotArea: '2 Acres',
            builtUpArea: ''
        },
        gallery: [
            { src: '/img/villa/shunyam/1shuyam.jpg', thumb: '/img/villa/shunyam/1shuyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/2shunyam.jpg', thumb: '/img/villa/shunyam/2shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/3shunyam.jpg', thumb: '/img/villa/shunyam/3shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/4shunyam.jpg', thumb: '/img/villa/shunyam/4shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/5shunyam.jpg', thumb: '/img/villa/shunyam/5shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/6shunyam.jpg', thumb: '/img/villa/shunyam/6shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/7shunyam.jpg', thumb: '/img/villa/shunyam/7shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/8shunyam.jpg', thumb: '/img/villa/shunyam/8shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/9shunyam.jpg', thumb: '/img/villa/shunyam/9shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/10shunyam.jpg', thumb: '/img/villa/shunyam/10shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/11shunyam.jpg', thumb: '/img/villa/shunyam/11shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/12shunyam.jpg', thumb: '/img/villa/shunyam/12shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/13shunyam.jpg', thumb: '/img/villa/shunyam/13shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/14shunyam.jpg', thumb: '/img/villa/shunyam/14shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/15shunyam.jpg', thumb: '/img/villa/shunyam/15shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/16shunyam.jpg', thumb: '/img/villa/shunyam/16shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/17shunyam.jpg', thumb: '/img/villa/shunyam/17shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/18shumyam.jpg', thumb: '/img/villa/shunyam/18shumyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/19shunyam.jpg', thumb: '/img/villa/shunyam/19shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/20shunyam.jpg', thumb: '/img/villa/shunyam/20shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/21shunyam.jpg', thumb: '/img/villa/shunyam/21shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/22shunyam.jpg', thumb: '/img/villa/shunyam/22shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/23shunyam.jpg', thumb: '/img/villa/shunyam/23shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/24shunyam.jpg', thumb: '/img/villa/shunyam/24shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/25shunyam.jpg', thumb: '/img/villa/shunyam/25shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/26shunyam.jpg', thumb: '/img/villa/shunyam/26shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/30shunyam.jpg', thumb: '/img/villa/shunyam/30shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/33shunyam.jpg', thumb: '/img/villa/shunyam/33shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' },
            { src: '/img/villa/shunyam/36shunyam.jpg', thumb: '/img/villa/shunyam/36shunyam.jpg', title: 'Shunyam Jodhpur', description: 'Describe About Image' }
        ],
        relatedProjects: ['shunyam-pune', 'azaan', 'vrindavan']
    },
    'design-studio': {
        id: 'design-studio',
        title: 'Design Studio',
        subtitle: 'An Architectural Design Studio',
        category: 'Corporate',
        heroImage: '/img/corporate/design-studio/design-studio-bg.jpg',
        description: [
            "Architectural Formation of the design studio revolves around generating Porosity to the built form. The perforated metal skin facade being wrapped around form-finish RCC structure facilitates naturally ventilated, glare-free functional spaces with privacy from the outside. Orientation of the built form further strengthens its climate-responsive design keeping the east and west sides having buffered service spaces while inviting consistent quality of sunlight from north and south to main functional areas on all floors.",
            "The built form houses four Layers of floors including the basement and terrace floor, which are physically and visually interlinked through an atrium as an interactive hub. The atrium also acts as a segregator of all regular functional activities while formulating occasional and accidental events through its various options of sitting arrangements like an amphitheater, meeting tables, library, pantry, ways for washrooms, stairs, lunch rooms, etc, further facilitated with audio-video and screening options. Being a breather, the atrium as an ever-green solution, forms a passive ventilation system while receiving and celebrating the daily drama of ever-changing sunlight and natural breeze.",
            "Interiority of naturally lit and ventilated spaces are simply by-products generated through juxtaposed sets of stacked spaces accessed through the atrium as a circulation space. Honest expression of each material, while meeting their functional need, plays a vital role to bind visual and energetic characteristics of spaces within and without.",
            "Use of indigenous natural materials like Tandoor and Kadappa stone flooring, teak wood framed glass doors, and Furniture made of Ply and High-density fiber boards flows throughout composed with weathered steel and Concrete as dominating architectural material palate. The material composition further enhances the rawness of textures and natural colors in the presence of sunlight throughout the day.",
            "Built-in and Integrated Use of sustainable technology like evaporative cooling system, solar PV panels, glare-free natural light, cross ventilation, integrated vegetation generating micro-climate, careful orientation, and Placement of various primary and support functions generates autonomous and self-breathing Built from, ready-to-receive human intervention.",
            "The architecture carefully demonstrates its purpose of keeping sustainability as a core concern while celebrating Nature as a source to inspire living day to day life."
        ],
        details: {
            location: 'Mundhwa, Pune',
            status: 'Completed',
            plotArea: '635 Sq Mt.',
            builtUpArea: '490 Sq Mt.'
        },
        gallery: [
            { src: '/img/corporate/design-studio/1-thumb.jpg', thumb: '/img/corporate/design-studio/1-thumb.jpg', title: 'Front view', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/2-thumb.jpg', thumb: '/img/corporate/design-studio/2-thumb.jpg', title: 'Rear View', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/3-thumb.jpg', thumb: '/img/corporate/design-studio/3-thumb.jpg', title: 'Entry porch', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/4-thumb.jpg', thumb: '/img/corporate/design-studio/4-thumb.jpg', title: 'Upper lobby', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/5-thumb.jpg', thumb: '/img/corporate/design-studio/5-thumb.jpg', title: 'Cabin lobby', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/6-thumb.jpg', thumb: '/img/corporate/design-studio/6-thumb.jpg', title: 'Boardroom', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/7-thumb.jpg', thumb: '/img/corporate/design-studio/7-thumb.jpg', title: 'MD cabin top view', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/8-thumb.jpg', thumb: '/img/corporate/design-studio/8-thumb.jpg', title: 'MD cabin – view of lounge', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/9-thumb.jpg', thumb: '/img/corporate/design-studio/9-thumb.jpg', title: 'MD cabin – view of lounge from MD table', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/10-thumb.jpg', thumb: '/img/corporate/design-studio/10-thumb.jpg', title: 'MD cabin anteroom', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/11-thumb.jpg', thumb: '/img/corporate/design-studio/11-thumb.jpg', title: 'Director Cabin – top view', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/12-thumb.jpg', thumb: '/img/corporate/design-studio/12-thumb.jpg', title: 'View of Director table and lounge', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/13-thumb.jpg', thumb: '/img/corporate/design-studio/13-thumb.jpg', title: 'Director lounge', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/14-thumb.jpg', thumb: '/img/corporate/design-studio/14-thumb.jpg', title: 'Integration of gourmet as décor', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/15-thumb.jpg', thumb: '/img/corporate/design-studio/15-thumb.jpg', title: 'Plan: Ground Floor', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/16-thumb.jpg', thumb: '/img/corporate/design-studio/16-thumb.jpg', title: 'Plan: Typical Floor', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/17-thumb.jpg', thumb: '/img/corporate/design-studio/17-thumb.jpg', title: 'Sketch: design approach', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/18-thumb.jpg', thumb: '/img/corporate/design-studio/18-thumb.jpg', title: 'Sketch: design approach', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/19-thumb.jpg', thumb: '/img/corporate/design-studio/19-thumb.jpg', title: 'Sketch: design approach', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/20-thumb.jpg', thumb: '/img/corporate/design-studio/20-thumb.jpg', title: 'Sketch: design approach', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/21-thumb.jpg', thumb: '/img/corporate/design-studio/21-thumb.jpg', title: 'Sketch: design approach', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/22-thumb.jpg', thumb: '/img/corporate/design-studio/22-thumb.jpg', title: 'Sketch: design approach', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/23-thumb.jpg', thumb: '/img/corporate/design-studio/23-thumb.jpg', title: 'Sketch: design approach', description: 'Describe About Image' },
            { src: '/img/corporate/design-studio/24-thumb.jpg', thumb: '/img/corporate/design-studio/24-thumb.jpg', title: 'Sketch: design approach', description: 'Describe About Image' }
        ],
        relatedProjects: ['tao-office', 'k-f-bioplant', 'bhansali-landmarks']
    },
    'villa-at-wagholi': {
        id: 'villa-at-wagholi',
        title: 'Villa at Wagholi',
        subtitle: 'Asian Aura',
        category: 'Luxury Villas',
        heroImage: '/img/villa/villa-at-wagholi/1-thumb.jpg',
        description: [
            "This luxurious villa is designed as a connected set of built blocks spread out on an expansive, densely vegetated contoured plot, mimicking an Indonesian style nature resort. Spacious courtyards separate linearly arranged dwelling units for members of the large joint family, each harmoniously connected with surrounding landscape. The entry of the villa is at the highest point, sloping downward as one moves toward the covered parking and entrance foyer. The central block houses the main entrance through a sky lit lobby court, leading into the common spaces beyond. Family spaces, in the form of a cozy den, a lavish formal living room, a spacious dining area and an open kitchen allow for bonding and interaction, while private suites, accommodated in the North and south blocks, ensure quiet contemplation. Individual suites are interconnected by means of interactive open courts and daylit passages, supported by their own private sit outs and lounges, and subjected to ample cross ventilation, daylight and views capturing the movement of the sun over the course of the day. The entire eastern façade overlooks the green lawns and infinity pool appending the structure, and the fruit orchards beyond. Open air recreational facilities like tennis courts and leisure open space are housed along the rugged forest toward the lower eastern slopes forming serene views for the entire home.",
            "Soaked in luxury, the living units evoke the relaxed vibe of an Indonesian resort. Courtyards, sloping roofs and skylights connect residents with their natural surroundings, while organic materials used in interior surfaces enhance the indoor-outdoor connection. The built structure seems to invite the surrounding shrubbery and farmland into its premises, guaranteeingindulgence in the lap of nature."
        ],
        details: {
            location: 'Wagholi, Pune',
            status: 'Completed',
            plotArea: '',
            builtUpArea: ''
        },
        gallery: [
            { src: '/img/villa/villa-at-wagholi/1-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/1-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' },
            { src: '/img/villa/villa-at-wagholi/2-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/2-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' },
            { src: '/img/villa/villa-at-wagholi/3-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/3-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' },
            { src: '/img/villa/villa-at-wagholi/4-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/4-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' },
            { src: '/img/villa/villa-at-wagholi/5-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/5-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' },
            { src: '/img/villa/villa-at-wagholi/6-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/6-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' },
            { src: '/img/villa/villa-at-wagholi/7-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/7-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' },
            { src: '/img/villa/villa-at-wagholi/8-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/8-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' },
            { src: '/img/villa/villa-at-wagholi/9-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/9-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' },
            { src: '/img/villa/villa-at-wagholi/10-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/10-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' },
            { src: '/img/villa/villa-at-wagholi/11-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/11-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' },
            { src: '/img/villa/villa-at-wagholi/12-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/12-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' },
            { src: '/img/villa/villa-at-wagholi/13-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/13-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' },
            { src: '/img/villa/villa-at-wagholi/14-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/14-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' },
            { src: '/img/villa/villa-at-wagholi/15-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/15-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' },
            { src: '/img/villa/villa-at-wagholi/16-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/16-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' },
            { src: '/img/villa/villa-at-wagholi/17-thumb.jpg', thumb: '/img/villa/villa-at-wagholi/17-thumb.jpg', title: 'Villa at Wagholi', description: 'Describe About Image' }
        ],
        relatedProjects: ['shunyam-jodhpur', 'azaan', 'vrindavan']
    },
    'aapulki': {
        id: 'aapulki',
        title: 'Aapulki Residence, Pune',
        subtitle: 'A Rustic Farmhouse',
        category: 'ARCHITECTURE + INTERIOR DESIGN + LANDSCAPE',
        heroImage: '/img/villa/aapulki/aapulki-bg.jpg',
        description: [
            "Set amidst green farmlands in Paud Village, on the outskirts of Pune, Aapulki is a rustic retreat, posing as ‘a place of belonging’ among its nature-loving family of inhabitants.",
            "The planning of the house generates layers of varying levels of privacy whist allowing modular gathering spaces for occasional events. The main house is centrally placed with views towards manicured lawns and a natural thickeningof a vegetable garden. A self-sufficient guest house is planned with an independent access, to avoid disturbing the functions of the main house.",
            "The driveway and parking zones are hidden by a screen wall so that is does not hamper the natural feel of the designed spaces. Sloping roofs are used to allow natural cross ventilation and daylight throughout the house. Radiant cooling is used below the floors to lower internal temperatures during peak summers. The inclusive composition of the house is designed to suit the native context of farms situated around the site. Earthy tones, exposed materials and an open design theme gives the residence, a contemplative feel, allowing residents to get in touch with themselves and their natural surroundings."
        ],
        details: {
            location: 'Pune, Maharashtra',
            status: 'Completed',
            plotArea: '2228 Sq. m.',
            builtUpArea: '1001 Sq. m.'
        },
        gallery: [
            { src: '/img/villa/aapulki/1apulki.jpg', thumb: '/img/villa/aapulki/1apulki.jpg', title: 'Colourful composition of Architectural Elements', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/2apulki.jpg', thumb: '/img/villa/aapulki/2apulki.jpg', title: 'Entry Court', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/3apulaki.jpg', thumb: '/img/villa/aapulki/3apulaki.jpg', title: 'Lush Landscape', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/4apulaki.jpg', thumb: '/img/villa/aapulki/4apulaki.jpg', title: 'Built mass set around manicured gardens', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/5apulki.jpg', thumb: '/img/villa/aapulki/5apulki.jpg', title: 'Windows and private courts overlooking green lawns', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/6apulki.jpg', thumb: '/img/villa/aapulki/6apulki.jpg', title: 'Private sitout', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/7apulki.jpg', thumb: '/img/villa/aapulki/7apulki.jpg', title: 'Earthy living spaces overlooking natural greenery', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/8apulki.jpg', thumb: '/img/villa/aapulki/8apulki.jpg', title: 'Floating feature staircase', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/9apulki.jpg', thumb: '/img/villa/aapulki/9apulki.jpg', title: 'Earthy tones interrupted by bursts of colour', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/10apulaki.jpg', thumb: '/img/villa/aapulki/10apulaki.jpg', title: 'Daylight filtering into living space', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/11apulki.jpg', thumb: '/img/villa/aapulki/11apulki.jpg', title: 'Evening view towards the outside greens', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/12apulki.jpg', thumb: '/img/villa/aapulki/12apulki.jpg', title: 'Cozy Private spaces', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/13apluki.jpg', thumb: '/img/villa/aapulki/13apluki.jpg', title: 'Bay windows overlooking the garden', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/14apulki.jpg', thumb: '/img/villa/aapulki/14apulki.jpg', title: 'Master Bathroom space', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/15apulki.jpg', thumb: '/img/villa/aapulki/15apulki.jpg', title: 'Soft Furnishings and raw finishes', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/16apulki.jpg', thumb: '/img/villa/aapulki/16apulki.jpg', title: 'Cutouts and openings', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/17apulki.jpg', thumb: '/img/villa/aapulki/17apulki.jpg', title: 'View from access road', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/18aplulki.jpg', thumb: '/img/villa/aapulki/18aplulki.jpg', title: 'Concept sketch 1', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/19apulki.jpg', thumb: '/img/villa/aapulki/19apulki.jpg', title: 'Concept sketch 2', description: 'Describe About Image' },
            { src: '/img/villa/aapulki/20apulki.jpg', thumb: '/img/villa/aapulki/20apulki.jpg', title: 'Concept sketch 3', description: 'Describe About Image' }
        ],
        relatedProjects: ['shunyam-pune', 'courtyard-house', 'saj']
    },
    'ajmera-aria': {
        id: 'ajmera-aria',
        title: 'Ajmera Aria',
        subtitle: 'Luxury Show Apartment',
        category: 'INTERIOR DESIGN',
        heroImage: '/img/luxuryappartments/ajmera-aria/ajmera-aria-bg.jpg',
        description: [
            "Designed as a show apartment in a luxury residential complex, the Aria Penthouse is an indulgent four-bedroom flat, exuding sophistication in its finishes, while allowing flexibility for usage. A clear circulation pattern divides the floorplan into living, private and service zones. The interiors have been minimally partitioned for flexible space utilization, allowing a free flow of space throughout the house, while giving the impression of a larger overall volume. Ambient lighting accentuates the warmth of walnut finish wood to impart a cozy, welcoming feel to the entrance lobby. Custom designed furniture and artwork set against a contrast of material textures, sneak a peak into the elegance and sophistication of the living spaces beyond. The design cashes in on the double height volume in the living area, using full height glazing and sheer curtains to brighten the entire home with diffused daylight. Beige marble contrasts with wooden accents and a contemporary steel chandelier, lending an eclectic vibe to the breezy double height living room. An outdoor terrace acts as an extended family room, equipped with a plunge pool and arresting views of the greenery in the distance. A play of volumes ensues as the living space merges with a cozy, low-height dining niche rendered in leather and wood. Ambient lighting and warm material tones establish a snug mealtime setting, while an extended open air balcony allows the outside environment to penetrate the interior space.",
            "A backlit vanity, minimal décor and an industrial steel faucet set against a refreshing teal background make up the chic powder room, apt for a moment of quiet rejuvenation. In the private rooms, beige marble flooring and wooden ceiling elements contrast with white walls, allowing a perfect setting for the introduction of colours through furniture, furnishings and artwork. Strip lighting and customized wood paneling, work toward highlighting linear elements and clean cuts; creating a visual rhythm within the living space, while allowing spatial continuity across various residential zones. Customized wall units and furniture provide a holistic design aesthetic, while meeting individual functional requirements and adding a personal touch to each room. Individual bathrooms are laid out as extended bedroom space, establishing visual and physical continuity across the private ‘suite’. The free-flowing layout enhances the spatial quality of the bedrooms; while vanishing blinds allow flexible modulation of visual privacy.A spacious kitchen with an island counter satisfies all contemporary culinary requirements, housing handy organizational elements, storage and workspace, within its plush setting. The minimalistic, yet classy interiors subtly accentuate the existing architecture of the penthouse, resonating with the developer’s vision of establishing luxury living space.",
            "In its functional simplicity and visual sophistication, the apartment proves an irresistible prospect for the developer’s potential clients."
        ],
        details: {
            location: 'Koregaon Park, Pune',
            status: 'Completed',
            plotArea: '',
            builtUpArea: 'Carpet Area : 4000 ft.'
        },
        gallery: [
            { src: '/img/luxuryappartments/ajmera-aria/1-bg.jpg', thumb: '/img/luxuryappartments/ajmera-aria/1-thumb.jpg', title: 'Double Height formal living', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/ajmera-aria/2-bg.jpg', thumb: '/img/luxuryappartments/ajmera-aria/2-thumb.jpg', title: 'Welcoming Entrance Lobby', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/ajmera-aria/3-bg.jpg', thumb: '/img/luxuryappartments/ajmera-aria/3-thumb.jpg', title: 'Transitional Verandah', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/ajmera-aria/4-bg.jpg', thumb: '/img/luxuryappartments/ajmera-aria/4-thumb.jpg', title: 'Cozy low height Dining', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/ajmera-aria/5-bg.jpg', thumb: '/img/luxuryappartments/ajmera-aria/5-thumb.jpg', title: 'Powder room', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/ajmera-aria/6-bg.jpg', thumb: '/img/luxuryappartments/ajmera-aria/6-thumb.jpg', title: 'Master Bedroom', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/ajmera-aria/7-bg.jpg', thumb: '/img/luxuryappartments/ajmera-aria/7-thumb.jpg', title: 'Guest Bedroom: A sanctuary of solitude', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/ajmera-aria/8-bg.jpg', thumb: '/img/luxuryappartments/ajmera-aria/8-thumb.jpg', title: 'Guest Bathroom: extended bedroom space', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/ajmera-aria/9-bg.jpg', thumb: '/img/luxuryappartments/ajmera-aria/9-thumb.jpg', title: 'Guest Bathroom: extended bedroom space', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/ajmera-aria/10-bg.jpg', thumb: '/img/luxuryappartments/ajmera-aria/10-thumb.jpg', title: 'Spacious kitchen with island counter', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/ajmera-aria/11-bg.jpg', thumb: '/img/luxuryappartments/ajmera-aria/11-thumb.jpg', title: 'Common spaces: Luxe Living', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/ajmera-aria/12-bg.jpg', thumb: '/img/luxuryappartments/ajmera-aria/12-thumb.jpg', title: 'Private spaces: contemplative nooks', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/ajmera-aria/13-bg.jpg', thumb: '/img/luxuryappartments/ajmera-aria/13-thumb.jpg', title: 'Circulation hallway: a playful palette in neutral tones', description: 'Describe About Image' }
        ],
        relatedProjects: ['aurum', 'gods-blessing', 'konark']
    },
    'courtyard-house': {
        id: 'courtyard-house',
        title: 'Courtyard House, Ahmednagar',
        subtitle: 'Outside In',
        category: 'ARCHITECTURE + INTERIOR DESIGN + LANDSCAPE DESIGN',
        heroImage: '/img/villa/courtyard-house/conyard-bg.jpg',
        description: [
            "Airy, scenic, spacious and landscaped; seemed like unimaginable attributes for a residence on a tight, gloomy, 3400 sq.ft. plot in the dense residential locales of Ahmednagar. To counter opposing site conditions, the living space was conceived as an inward facing structure enclosing a central landscaped courtyard. What resulted, was a light filled, spacious, living, breathing abode with striking visual elements and contemplative open spaces.",
            "The Courtyard House is planned with two parallel double storey blocks on either side of an open-to-sky court; connected at the upper level, by a 10’ wide terrace bridge. The entire structure is united by a long sloping Mangalore tiled roof. A rough Nevada stone clad loggia forms an inviting foyer for the home, its warli painted masonry and square openings giving a ‘wada’ like feel to the space.",
            "Inside the house, a cozy living room is illuminated by a large glazed wall overlooking a serene landscaped court. Semi private spaces like the dining room and kitchen flow into the family room, with services strategically concealed toward the back of the house.The courtyard acts as the pivotal element, forming the connecting link between primary functional spaces; and essentially, between all family members, its attractive ambience encouraging outdoor living, and promoting a spiritual connection between the residents and their natural environment.",
            "A central mango tree along with a seated Buddha sculpture lends the open space a sense of calm, transforming the semi open verandah into a contemplative retreat, complete with a rustic wooden swing. Towards the east, the greenery filters into the grandparents’ room, to fuse with a private semi-covered verandah; beyond which, a vehicular entry allows a car parking space. A red stucco finished staircase forms a lightwell, illuminating the living spaces through a skylight, as it connects to the basement and the first floor. The first-floor lobby houses a library and study, linking the guest and master bedroom on the west block with the terrace bridge leading to the east block. The suspended connecting lobby overlooks the courtyard below, forming a breezy sit out for the first floor. Bedrooms are provided with bay windows and private sit outs; a hierarchy of private, semi-private and family open spaces ensuring varying degrees of privacy to all inhabitants. Apart from tempering the microclimate of the living spaces through its greenery, the courtyard, helps set up a passive ventilation system for the house, along with the stack ventilation shaft of the staircase, and turbo vents on the roof. Skylights and windows allow natural daylighting while photovoltaic panels help produce green energy. Combined with LED lights and natural materials, such strategies ensure a minimal carbon footprint for the building. Terracotta pots on the roof provide natural thermal insulation.",
            "A creative blend of traditional and contemporary, the Courtyard House incorporates vernacular architectural elements not only as sustainable strategies, but also as aesthetic features, connecting the residents with their roots, while ensuring the convenience of a modern lifestyle. Yellow painted external walls and red Mangalore roof tiles impart a vibrant exterior colour scheme complementing the earthy tones of the natural materials. The raw greys of the local Nevada and kota stones in the courtyard, dotted with splashes of greenery and lined with teak wood doors and pebble filled channels, complete the aesthetic appeal of a rustic retreat.",
            "All in all, the courtyard house, with its tranquil beauty and traditional appeal, emphasizes the importance of time tested vernacular techniques and a sensitive approach toward the environment as effective design solutions for today’s architectural problems."
        ],
        details: {
            location: 'Ahmednagar, Pune',
            status: 'Completed',
            plotArea: '3400 Sq. m.',
            builtUpArea: '2800 Sq. m.'
        },
        gallery: [
            { src: '/img/villa/courtyard-house/1-bg.jpg', thumb: '/img/villa/courtyard-house/1-thumb.jpg', title: 'Outdoor Living', description: 'Describe About Image' },
            { src: '/img/villa/courtyard-house/2-bg.jpg', thumb: '/img/villa/courtyard-house/2-thumb.jpg', title: 'Entrance Loggia', description: 'Describe About Image' },
            { src: '/img/villa/courtyard-house/3-bg.jpg', thumb: '/img/villa/courtyard-house/3-thumb.jpg', title: 'Cozy Living Room', description: 'Describe About Image' },
            { src: '/img/villa/courtyard-house/4-bg.jpg', thumb: '/img/villa/courtyard-house/4-thumb.jpg', title: 'Living and Dining', description: 'Describe About Image' },
            { src: '/img/villa/courtyard-house/5-bg.jpg', thumb: '/img/villa/courtyard-house/5-thumb.jpg', title: 'Transitional Space', description: 'Describe About Image' },
            { src: '/img/villa/courtyard-house/6-bg.jpg', thumb: '/img/villa/courtyard-house/6-thumb.jpg', title: 'A contemplative retreat', description: 'Describe About Image' },
            { src: '/img/villa/courtyard-house/7-bg.jpg', thumb: '/img/villa/courtyard-house/7-thumb.jpg', title: 'Parents room', description: 'Describe About Image' },
            { src: '/img/villa/courtyard-house/8-bg.jpg', thumb: '/img/villa/courtyard-house/8-thumb.jpg', title: 'Connecting bridge sitout', description: 'Describe About Image' },
            { src: '/img/villa/courtyard-house/9-bg.jpg', thumb: '/img/villa/courtyard-house/9-thumb.jpg', title: 'Enclosed Room', description: 'Describe About Image' },
            { src: '/img/villa/courtyard-house/10-bg.jpg', thumb: '/img/villa/courtyard-house/10-thumb.jpg', title: 'Breezy Sitout', description: 'Describe About Image' },
            { src: '/img/villa/courtyard-house/11-bg.jpg', thumb: '/img/villa/courtyard-house/11-thumb.jpg', title: 'Cozy Jhoola Seating', description: 'Describe About Image' },
            { src: '/img/villa/courtyard-house/12-bg.jpg', thumb: '/img/villa/courtyard-house/12-thumb.jpg', title: 'Luxury in the Lap of nature', description: 'Describe About Image' },
            { src: '/img/villa/courtyard-house/13-bg.jpg', thumb: '/img/villa/courtyard-house/13-thumb.jpg', title: 'Serene Enclosure', description: 'Describe About Image' },
            { src: '/img/villa/courtyard-house/14-bg.jpg', thumb: '/img/villa/courtyard-house/14-thumb.jpg', title: 'Traditional elements and materials', description: 'Describe About Image' },
            { src: '/img/villa/courtyard-house/15-bg.jpg', thumb: '/img/villa/courtyard-house/15-thumb.jpg', title: 'Exterior', description: 'Describe About Image' }
        ],
        relatedProjects: ['shunyam-pune', 'aapulki', 'saj']
    },
    'gods-blessing': {
        id: 'gods-blessing',
        title: "God's Blessing",
        subtitle: 'Luxury Riverfront Apartment',
        category: 'INTERIOR DESIGN',
        heroImage: '/img/luxuryappartments/gods-blessing/gods-blessing-bg.jpg',
        description: [
            "A luxurious apartment overlooking the Mula Mutha River, God’s Blessing allows a functional segregation of private, family and entertainment areas; apt for the occupant family’s contemporary lifestyle.",
            "A continuous drop ceiling, highlighted by floor to ceiling doors and curtains, unifies various living spaces while enhancing volumetric contrast. A soothing colour palette, combined with rustic accents and rich finishes, gives the interiors a homely ambience, combined with a royal touch. Commissioned artwork adds a splash of color to the entrance lobby, bedroom lobby and dining area, contrasting against rich veneers and grey flooring. Glare-free daylight and stunning views make up the boundaries of the plot, as it sits delicately above the green environs of Koregaon Park."
        ],
        details: {
            location: 'Koregaon Park Annexe, Pune',
            status: 'Completed',
            plotArea: '',
            builtUpArea: 'Carpet Area : 6235 ft.'
        },
        gallery: [
            { src: '/img/luxuryappartments/gods-blessing/1-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/1-thumb.jpg', title: 'Welcoming entrance lobby', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/2-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/2-thumb.jpg', title: 'Entrance lobby', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/3-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/3-thumb.jpg', title: 'Artworks add a splash of colour to minimalistic monochrome interiors', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/4-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/4-thumb.jpg', title: 'A reclining Buddha Artifact adds a sense of serenity to the dining room', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/5-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/5-thumb.jpg', title: 'Plush bar with attached dining room', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/6-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/6-thumb.jpg', title: 'Family room with attached outdoor terrace', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/7-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/7-thumb.jpg', title: 'Luxurious formal hall', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/8-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/8-thumb.jpg', title: 'Poolside seating with a view of surrounding greens', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/9-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/9-thumb.jpg', title: 'Terrace pool with high bar table', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/10-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/10-thumb.jpg', title: 'Dining and bar unit with distant views over the adjoining the poolside terrace ', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/11-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/11-thumb.jpg', title: 'Rusty red niches and artwork add warmth to the formal dining area', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/12-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/12-thumb.jpg', title: 'Powder room adorned with luxurious eclectic artifacts', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/13-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/13-thumb.jpg', title: 'Minimalistic kitchen island', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/14-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/14-thumb.jpg', title: 'Lobby to bedrooms', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/15-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/15-thumb.jpg', title: 'Cozy Bedroom finished in rich veneer', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/16-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/16-thumb.jpg', title: 'Bedroom 2', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/17-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/17-thumb.jpg', title: 'Wardrobe and Door detail', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/18-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/18-thumb.jpg', title: 'Master Bedroom', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/19-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/19-thumb.jpg', title: 'Functional elements integrated into doors and storage units', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/20-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/20-thumb.jpg', title: 'Typical toilet rendered in granite and wood', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/gods-blessing/21-bg.jpg', thumb: '/img/luxuryappartments/gods-blessing/21-thumb.jpg', title: 'Lavish master toilet', description: 'Describe About Image' }
        ],
        relatedProjects: ['ajmera-aria', 'aurum', 'konark']
    },
    'saj': {
        id: 'saj',
        title: 'Saj Villa',
        subtitle: 'Scenic Getaway',
        category: 'ARCHITECTURE + INTERIOR DESIGN',
        heroImage: '/img/villa/saj/saj-bg.jpg',
        description: [
            "Located at Khadakwasla,Kudje, the charming villa captures the most captivating vistas of the natural beauty of the area. It perches atop its own hillock to gaze peacefully at the serene horizon in the distance.",
            "This weekend house attempts to fuse the ethnic aesthetic of traditional wadas, with the contemporary accents of a modern home. It explores the inherent richness of rustic materials, setting a statement in its old-school charm.",
            "The use of traditional Warli paintings, traditional handicrafts and colourful fabrics, glorify the interior spaces with artistic heritage. Whereas, use of materials like leather, copper, brass antiques and wood, hold contemporary pieces of furniture, furnishings and finishes against the vernacular settings of Maratha art and folklore."
        ],
        details: {
            location: 'Khadakwasla, Kudje, Pune, Maharashtra',
            status: 'Completed',
            plotArea: '2146 Sq. m.',
            builtUpArea: '713 Sq. m.'
        },
        gallery: [
            { src: '/img/villa/saj/1saj.jpg', thumb: '/img/villa/saj/1saj.jpg', title: 'Approach road adorned with welcoming arches', description: 'Describe About Image' },
            { src: '/img/villa/saj/2saj.jpg', thumb: '/img/villa/saj/2saj.jpg', title: 'Exteriors - rustic visual language', description: 'Describe About Image' },
            { src: '/img/villa/saj/3saj.jpg', thumb: '/img/villa/saj/3saj.jpg', title: 'Temple adorned with Warli Art', description: 'Describe About Image' },
            { src: '/img/villa/saj/4saj.jpg', thumb: '/img/villa/saj/4saj.jpg', title: 'Interior Layouts celebrate and orient toward scenic surrounding views', description: 'Describe About Image' },
            { src: '/img/villa/saj/5saj.jpg', thumb: '/img/villa/saj/5saj.jpg', title: 'Living spaces A blend of ethnic and contemporary', description: 'Describe About Image' },
            { src: '/img/villa/saj/6saj.jpg', thumb: '/img/villa/saj/6saj.jpg', title: 'Borrowing the external landscape', description: 'Describe About Image' },
            { src: '/img/villa/saj/7saj.jpg', thumb: '/img/villa/saj/7saj.jpg', title: 'Juxtaposition of Crafts and Culture into modern space', description: 'Describe About Image' },
            { src: '/img/villa/saj/8saj.jpg', thumb: '/img/villa/saj/8saj.jpg', title: 'Rajasthani camel wool dhaga as railin an artistic feature in the stairwell', description: 'Describe About Image' },
            { src: '/img/villa/saj/9saj.jpg', thumb: '/img/villa/saj/9saj.jpg', title: 'Stained glass embedded in doors allows a play of light and colour', description: 'Describe About Image' },
            { src: '/img/villa/saj/10saj.jpg', thumb: '/img/villa/saj/10saj.jpg', title: 'Cozy Bedroom space with a traditional vibe', description: 'Describe About Image' },
            { src: '/img/villa/saj/11saj.jpg', thumb: '/img/villa/saj/11saj.jpg', title: 'Bedroom windows oriented to capture scenic views', description: 'Describe About Image' },
            { src: '/img/villa/saj/12saj.jpg', thumb: '/img/villa/saj/12saj.jpg', title: 'Of textiles and textures', description: 'Describe About Image' },
            { src: '/img/villa/saj/13saj.jpg', thumb: '/img/villa/saj/13saj.jpg', title: 'Private spaces - A touch of Tradition', description: 'Describe About Image' },
            { src: '/img/villa/saj/14saj.jpg', thumb: '/img/villa/saj/14saj.jpg', title: 'Infinity pool - overlooking the Khadakwasla Dam', description: 'Describe About Image' },
            { src: '/img/villa/saj/15saj.jpg', thumb: '/img/villa/saj/15saj.jpg', title: 'Swimming pool deck', description: 'Describe About Image' },
            { src: '/img/villa/saj/16saj.jpg', thumb: '/img/villa/saj/16saj.jpg', title: 'Twillight charm', description: 'Describe About Image' },
            { src: '/img/villa/saj/17saj.jpg', thumb: '/img/villa/saj/17saj.jpg', title: 'Evening Landscape', description: 'Describe About Image' }
        ],
        relatedProjects: ['shunyam-pune', 'aapulki', 'courtyard-house']
    },

    'bungalow-at-baner': {
        id: 'bungalow-at-baner',
        title: 'Villa at Baner',
        subtitle: 'Linear luxury',
        category: 'ARCHITECTURE + INTERIOR DESIGN',
        heroImage: '/img/cozy_homes/bungalow-at-baner/bungalow-at-baner-bg.jpg',
        description: [
            "Situated on a linear plot in an upcoming suburb in Pune, this 4 storey bungalow houses a large joint family. A modern vocabulary and efficient planning ensure optimum usage of space and landscape, while ensuring opportunities for indoor-outdoor connection. The ground floor houses family spaces including an informal living, dining and kitchen, apart from two landscaped outdoor sitouts.",
            "The staircase has been employed as an architectural feature connecting the floors across the house. Glass partitions act as railings, allowing visual transparency and passive air circulation. On the first floor, the staircase landing acts as a casual lobby, leading upto a large formal living, overlooking the busy front road, bathed in daylight through full height glazing. The master bedroom lies on the same floor, supported by a walk-in wardrobe and toilet.",
            "The second floor accommodates a study cum library, along with 3 bedrooms. The terrace features a quaint rooftop garden and jacuzzi overlooking the children’s play area outside, effectively connecting the residents with their surrounding landscape. The interiors reflect tones of white, widening out the linear built mass. Bright accents of colour add vibrance to the furnishings, complementing occasional artwork and decorative elements."
        ],
        details: {
            location: 'Abhimanshri Society, Baner, Pune',
            status: 'Ongoing',
            plotArea: '504 Sq mt.',
            builtUpArea: '510 Sq mt.'
        },
        gallery: [
            { src: '/img/cozy_homes/bungalow-at-baner/1-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-baner/1-thumb.jpg', title: 'East View across main road', description: 'Describe About Image' },
            { src: '/img/cozy_homes/bungalow-at-baner/2-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-baner/2-thumb.jpg', title: 'South View', description: 'Describe About Image' },
            { src: '/img/cozy_homes/bungalow-at-baner/3-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-baner/3-thumb.jpg', title: 'Bird’s eye view', description: 'Describe About Image' },
            { src: '/img/cozy_homes/bungalow-at-baner/4-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-baner/4-thumb.jpg', title: 'Formal Living', description: 'Describe About Image' },
            { src: '/img/cozy_homes/bungalow-at-baner/5-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-baner/5-thumb.jpg', title: 'Staircase lobby', description: 'Describe About Image' },
            { src: '/img/cozy_homes/bungalow-at-baner/6-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-baner/6-thumb.jpg', title: 'Son’s Toilet', description: 'Describe About Image' },
            { src: '/img/cozy_homes/bungalow-at-baner/7-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-baner/7-thumb.jpg', title: 'Ground Floor Plan', description: 'Describe About Image' },
            { src: '/img/cozy_homes/bungalow-at-baner/8-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-baner/8-thumb.jpg', title: 'First Floor Plan', description: 'Describe About Image' },
            { src: '/img/cozy_homes/bungalow-at-baner/9-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-baner/9-thumb.jpg', title: 'Second Floor Plan', description: 'Describe About Image' },
            { src: '/img/cozy_homes/bungalow-at-baner/10-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-baner/10-thumb.jpg', title: 'Longitudinal Section', description: 'Describe About Image' }
        ],
        relatedProjects: ['courtyard-house', 'shunyam-pune', 'aapulki']
    },
    'deshpande-durg': {
        id: 'deshpande-durg',
        title: 'Deshpande Durg',
        subtitle: 'Ethnic Abode',
        category: 'INTERIOR DESIGN',
        heroImage: '/img/luxuryappartments/deshpande-durg/deshpande-durg-bg.jpg',
        description: [
            "The design exercise entailed the vertical integration of two apartment units into one, through the creation of a central feature staircase. A central double height dining space draws natural light into the heart of the residence, brightening up the ethnic themed finishes and furniture. Custom furniture like the traditional bench-jhoola; adds a personal touch to the cozy living room, while the feature staircase incorporates storage units supporting the dining room.",
            "A formal living room provides an entertainment space for the residents’ corporate lifestyle. The upper floor incorporates private spaces and attached terraces, allowing each family member their own space for quiet repose. The master bedroom has been designed to view the Chaturshingi Temple.",
            "Beige flooring and walls, complemented by red sapeli wood and flame finished Cadbury brown granite make up the material palette for this fusion apartment, representing a contemporary interpretation of traditional aesthetics."
        ],
        details: {
            location: 'Bhosle Nagar, Pune, Maharashtra',
            status: 'Completed',
            plotArea: '',
            builtUpArea: 'Carpet Area : 520 Sq.ft.'
        },
        gallery: [
            { src: '/img/luxuryappartments/deshpande-durg/1-bg.jpg', thumb: '/img/luxuryappartments/deshpande-durg/1-thumb.jpg', title: 'Ethnic Living Room', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/deshpande-durg/2-bg.jpg', thumb: '/img/luxuryappartments/deshpande-durg/2-thumb.jpg', title: 'Serene Jhoola Seating', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/deshpande-durg/3-bg.jpg', thumb: '/img/luxuryappartments/deshpande-durg/3-thumb.jpg', title: 'Dining Room', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/deshpande-durg/4-bg.jpg', thumb: '/img/luxuryappartments/deshpande-durg/4-thumb.jpg', title: 'Double Height Dining', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/deshpande-durg/5-bg.jpg', thumb: '/img/luxuryappartments/deshpande-durg/5-thumb.jpg', title: 'Daylit Dining', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/deshpande-durg/6-bg.jpg', thumb: '/img/luxuryappartments/deshpande-durg/6-thumb.jpg', title: 'Cozy Family Living', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/deshpande-durg/7-bg.jpg', thumb: '/img/luxuryappartments/deshpande-durg/7-thumb.jpg', title: 'Kitchen', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/deshpande-durg/8-bg.jpg', thumb: '/img/luxuryappartments/deshpande-durg/8-thumb.jpg', title: 'View from top of staircase', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/deshpande-durg/9-bg.jpg', thumb: '/img/luxuryappartments/deshpande-durg/9-thumb.jpg', title: 'Master bedroom', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/deshpande-durg/10-bg.jpg', thumb: '/img/luxuryappartments/deshpande-durg/10-thumb.jpg', title: 'Custom Wardrobe', description: 'Describe About Image' }
        ],
        relatedProjects: ['ajmera-aria', 'gods-blessing', 'konark']
    },
    'garden-villa': {
        id: 'garden-villa',
        title: 'Garden Villa',
        subtitle: 'Courtyard house at Ahmedabad',
        category: 'ARCHITECTURE + INTERIOR DESIGN',
        heroImage: '/img/cozy_homes/garden-villa/garden-villa-bg.jpg',
        description: [
            "Greenery, quite literally, encloses all living spaces within this bungalow situated in the harsh locales of Ahmedabad. Designed in earthy accents of exposed red brick, the house assumes a ‘grounded’ earthy identity, overlapped with projecting green walls, tempering the interior climate and lending the residence a striking ‘living’ facade.",
            "Planning of living spaces revolves around facilitating indoor-outdoor connections, some visual, while others physical. The floorplate is faceted, creating green nooks and semi open courts, used as shaded sitouts. Faceted planning also lends green views to all interior spaces, creating the ambience of a garden home.",
            "Bedrooms at the ground floor, look out to their own private outdoor courts, connected through stepping stones, along the periphery of the built mass. On the first floor, the staircase lobby opens into an informal lounge, with private bedrooms arranged about the double height courtyard below. Vertical gardens shield the interior spaces by preventing thermal gain though insulation. Wind turbines on the terrace harness green energy, while a jacuzzi and multipurpose hall allow picturesque views of the city."
        ],
        details: {
            location: 'Ahmedabad',
            status: 'Ongoing',
            plotArea: '617.64 Sq mt.',
            builtUpArea: '544.22 Sq mt.'
        },
        gallery: [
            { src: '/img/cozy_homes/garden-villa/1-bg.jpg', thumb: '/img/cozy_homes/garden-villa/1-thumb.jpg', title: 'Front View: Green wall façade', description: 'Describe About Image' },
            { src: '/img/cozy_homes/garden-villa/2-bg.jpg', thumb: '/img/cozy_homes/garden-villa/2-thumb.jpg', title: 'North-east view: living spaces shielded by a vertical garden', description: 'Describe About Image' },
            { src: '/img/cozy_homes/garden-villa/3-bg.jpg', thumb: '/img/cozy_homes/garden-villa/3-thumb.jpg', title: 'South West view: Earthy brick wall', description: 'Describe About Image' },
            { src: '/img/cozy_homes/garden-villa/4-bg.jpg', thumb: '/img/cozy_homes/garden-villa/4-thumb.jpg', title: 'Open sitout shielded by floating vertical garden', description: 'Describe About Image' },
            { src: '/img/cozy_homes/garden-villa/5-bg.jpg', thumb: '/img/cozy_homes/garden-villa/5-thumb.jpg', title: 'Private garden courts connected by stepping stones', description: 'Describe About Image' },
            { src: '/img/cozy_homes/garden-villa/8-bg.jpg', thumb: '/img/cozy_homes/garden-villa/8-thumb.jpg', title: 'Longitudinal section', description: 'Describe About Image' }
        ],
        relatedProjects: ['courtyard-house', 'shunyam-pune', 'aapulki']
    },
    'konark': {
        id: 'konark',
        title: 'Konark',
        subtitle: 'Luxury Show Apartment',
        category: 'INTERIOR DESIGN',
        heroImage: '/img/luxuryappartments/konark/konark-bg.jpg',
        description: [
            "The brief for this show apartment was to create a luxurious and aspirational living space that would appeal to the high-end market. The design concept was to create a contemporary and elegant space with a touch of opulence. The use of rich materials like marble, wood and leather, combined with metallic accents, creates a sophisticated ambience.",
            "The living room is a large, open space with a double height ceiling, which adds to the grandeur of the apartment. The furniture is custom designed and upholstered in plush fabrics. The dining area is adjacent to the living room and features a large dining table with a statement chandelier. The bedrooms are designed as private sanctuaries, with comfortable beds and ample storage. The master bedroom has a walk-in wardrobe and a luxurious ensuite bathroom. The apartment also has a home theatre and a study, catering to the lifestyle needs of the target audience."
        ],
        details: {
            location: 'Koregaon Park, Pune',
            status: 'Completed',
            plotArea: '',
            builtUpArea: 'Carpet Area : 4500 sq. ft.'
        },
        gallery: [
            { src: '/img/luxuryappartments/konark/1-bg.jpg', thumb: '/img/luxuryappartments/konark/1-thumb.jpg', title: 'Formal Living', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/konark/2-bg.jpg', thumb: '/img/luxuryappartments/konark/2-thumb.jpg', title: 'Dining', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/konark/3-bg.jpg', thumb: '/img/luxuryappartments/konark/3-thumb.jpg', title: 'Family Living', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/konark/4-bg.jpg', thumb: '/img/luxuryappartments/konark/4-thumb.jpg', title: 'Master Bedroom', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/konark/5-bg.jpg', thumb: '/img/luxuryappartments/konark/5-thumb.jpg', title: 'Bedroom 2', description: 'Describe About Image' }
        ],
        relatedProjects: ['ajmera-aria', 'gods-blessing', 'deshpande-durg']
    },
    'kumar-platinum': {
        id: 'kumar-platinum',
        title: 'Kumar Platinum',
        subtitle: 'Clubhouse',
        category: 'INTERIOR DESIGN',
        heroImage: '/img/luxuryappartments/kumar-platinum/kumar-platinum-bg.jpg',
        description: [
            "The clubhouse for Kumar Platinum is designed as a social hub for the residents of the housing society. The design intent was to create a space that is welcoming and functional, catering to people of all age groups. The clubhouse houses a gymnasium, a multipurpose hall, a games room and a swimming pool.",
            "The interiors are designed with a contemporary aesthetic, using a palette of warm colours and natural materials. The gymnasium is equipped with state-of-the-art equipment and has a view of the swimming pool. The multipurpose hall is a large, flexible space that can be used for parties and events. The games room is designed as a fun and vibrant space for children and teenagers. The swimming pool is located outdoors, surrounded by a landscaped deck."
        ],
        details: {
            location: 'Kharadi, Pune',
            status: 'Completed',
            plotArea: '',
            builtUpArea: 'Carpet Area : 2500 sq. ft.'
        },
        gallery: [
            { src: '/img/luxuryappartments/kumar-platinum/1-bg.jpg', thumb: '/img/luxuryappartments/kumar-platinum/1-thumb.jpg', title: 'Gymnasium', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/kumar-platinum/2-bg.jpg', thumb: '/img/luxuryappartments/kumar-platinum/2-thumb.jpg', title: 'Multipurpose Hall', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/kumar-platinum/3-bg.jpg', thumb: '/img/luxuryappartments/kumar-platinum/3-thumb.jpg', title: 'Games Room', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/kumar-platinum/4-bg.jpg', thumb: '/img/luxuryappartments/kumar-platinum/4-thumb.jpg', title: 'Swimming Pool', description: 'Describe About Image' }
        ],
        relatedProjects: ['forest-trails', 'blue-bird', 'tao-office']
    },
    'suyog-kinder-brook-high-school': {
        id: 'suyog-kinder-brook-high-school',
        title: 'Suyog Kinder Brook High School',
        subtitle: 'Modern Lego inspired School',
        category: 'ARCHITECTURE',
        heroImage: '/img/institution/suyog-kinder-brook-high-school/suyog-kinder-brook-high-school-bg.jpg',
        description: [
            "The concept transpires from Lego blocks, every child’s favorite toy combining creativity and physics. Proposed on a triangular site, the design incorporates precast block technology for ease of construction and execution. The façade plays on the concept of colorful Lego blocks, bringing vibrancy and enthusiasm into the school. Precast block technology has been incorporated in the design to allow easy construction and execution. A central atrium acts as the indoor recreational facility, linking educational facilities, cultural and extracurricular facilities, while lighting up the interior spaces through the glass skylight.",
            "Adequate parking and staff quarters are fitted on the lower and upper ground levels. A double height multipurpose hall with a stage forms the central core on the first and second floors allowing all students, teachers and staff to gather in this central space, surrounded by classrooms located at the periphery of the building. A large playground is also zoned along with a temple to the rear of the school. A swimming pool and open air recreational facilities on the terrace add to the charm of the school."
        ],
        details: {
            location: 'Wagholi, Pune',
            status: 'Design Proposal',
            plotArea: '7476 Sq mt.',
            builtUpArea: '8266 Sq mt.'
        },
        gallery: [
            { src: '/img/institution/suyog-kinder-brook-high-school/4-bg.jpg', thumb: '/img/institution/suyog-kinder-brook-high-school/4-thumb.jpg', title: 'Central Atrium', description: 'Describe About Image' },
            { src: '/img/institution/suyog-kinder-brook-high-school/5-bg.jpg', thumb: '/img/institution/suyog-kinder-brook-high-school/5-thumb.jpg', title: 'Aerial View', description: 'Describe About Image' },
            { src: '/img/institution/suyog-kinder-brook-high-school/6-bg.jpg', thumb: '/img/institution/suyog-kinder-brook-high-school/6-thumb.jpg', title: 'Lego facade', description: 'Describe About Image' },
            { src: '/img/institution/suyog-kinder-brook-high-school/7-bg.jpg', thumb: '/img/institution/suyog-kinder-brook-high-school/7-thumb.jpg', title: 'Bird’s eye view', description: 'Describe About Image' },
            { src: '/img/institution/suyog-kinder-brook-high-school/8-bg.jpg', thumb: '/img/institution/suyog-kinder-brook-high-school/8-thumb.jpg', title: 'View across playground', description: 'Describe About Image' },
            { src: '/img/institution/suyog-kinder-brook-high-school/9-bg.jpg', thumb: '/img/institution/suyog-kinder-brook-high-school/9-thumb.jpg', title: 'Circulation passage', description: 'Describe About Image' },
            { src: '/img/institution/suyog-kinder-brook-high-school/10-bg.jpg', thumb: '/img/institution/suyog-kinder-brook-high-school/10-thumb.jpg', title: 'Terrace swimming pool', description: 'Describe About Image' },
            { src: '/img/institution/suyog-kinder-brook-high-school/11-bg.jpg', thumb: '/img/institution/suyog-kinder-brook-high-school/11-thumb.jpg', title: 'Project overview', description: 'Describe About Image' }
        ],
        relatedProjects: ['suzlon-corporate-learning-centre', 'wind-dunes', 'gujarati-bandhu-samaj-campus']
    },
    'manikchand-plaza': {
        id: 'manikchand-plaza',
        title: 'Manikchand Plaza',
        subtitle: 'Mixed Use commercial Plaza',
        category: 'COMMERCIAL',
        heroImage: '/img/commercial/manikchand-plaza/manikchand-plaza-bg.jpg',
        description: [
            "The design for a mixed-use mega project integrating commercial, residential, retail and entertainment facilities, was sought in an open national level competition by the Manikchand Group. the proposed mixed use hub by TAO Studio, utilized the open public space as a central social gathering spot as the binding element for the entire campus. A commercial plaza, housing development, large showrooms, smaller shops, offices with recreational facilities like 12 screen multiplex, cultural activities like drama theatre, art institute, exhibition galleries and an aquarium; were some of the activities proposed as part of the value added program.",
            "The design was shortlisted among the top 6 finalists in the competition, based on the emphasis on human centric spaces, segregation of vehicular and pedestrian circulation, central open piazza acting as a social gathering space, and the concept of ‘urban’ walkable streets linking all facilities together. Gentle steps along the paved piazza act as an amphitheatre, infusing the culture of public gathering and interaction within the interactive ‘work-live-play’ campus."
        ],
        details: {
            location: 'Pune, Maharashtra',
            status: 'Competition Entry, Unbuilt',
            plotArea: '44028 sq mt.',
            builtUpArea: '61595 sq mt.'
        },
        gallery: [
            { src: '/img/commercial/manikchand-plaza/1-bg.jpg', thumb: '/img/commercial/manikchand-plaza/1-thumb.jpg', title: 'Sketch: Site Analysis', description: 'Describe About Image' },
            { src: '/img/commercial/manikchand-plaza/2-bg.jpg', thumb: '/img/commercial/manikchand-plaza/2-thumb.jpg', title: 'Sketch: Site Planning', description: 'Describe About Image' },
            { src: '/img/commercial/manikchand-plaza/3-bg.jpg', thumb: '/img/commercial/manikchand-plaza/3-thumb.jpg', title: 'Conceptual zoning', description: 'Describe About Image' },
            { src: '/img/commercial/manikchand-plaza/4-bg.jpg', thumb: '/img/commercial/manikchand-plaza/4-thumb.jpg', title: 'Conceptual circulation', description: 'Describe About Image' },
            { src: '/img/commercial/manikchand-plaza/6-bg.jpg', thumb: '/img/commercial/manikchand-plaza/6-thumb.jpg', title: 'Scale Model: View from North', description: 'Describe About Image' },
            { src: '/img/commercial/manikchand-plaza/7-bg.jpg', thumb: '/img/commercial/manikchand-plaza/7-thumb.jpg', title: 'North-East View', description: 'Describe About Image' },
            { src: '/img/commercial/manikchand-plaza/8-bg.jpg', thumb: '/img/commercial/manikchand-plaza/8-thumb.jpg', title: 'Model: view of central plaza', description: 'Describe About Image' },
            { src: '/img/commercial/manikchand-plaza/9-bg.jpg', thumb: '/img/commercial/manikchand-plaza/9-thumb.jpg', title: 'North East Elevation', description: 'Describe About Image' },
            { src: '/img/commercial/manikchand-plaza/10-bg.jpg', thumb: '/img/commercial/manikchand-plaza/10-thumb.jpg', title: 'Elevations: North East and South West', description: 'Describe About Image' },
            { src: '/img/commercial/manikchand-plaza/11-bg.jpg', thumb: '/img/commercial/manikchand-plaza/11-thumb.jpg', title: 'Entrance Foyer: South Corner', description: 'Describe About Image' },
            { src: '/img/commercial/manikchand-plaza/12-bg.jpg', thumb: '/img/commercial/manikchand-plaza/12-thumb.jpg', title: 'Perspective Sketch: North West View', description: 'Describe About Image' }
        ],
        relatedProjects: ['suyog-navkaar', 'sky-max', 'sky-station']
    },
    'napier-road-bungalow': {
        id: 'napier-road-bungalow',
        title: 'Napier Road Bungalow',
        subtitle: 'Colonial Grandeur',
        category: 'LUXURY VILLAS',
        heroImage: '/img/villa/napier-road-bungalow/napier-road-bungalow-bg.jpg',
        description: [
            "This regal mansion sits along the posh locales of Napier Road in the camp area of Pune. The regal structure of the home is justified by its rich, colonial style interiors, rendered in a neutral colour palette and complemented by a landscaped front garden.",
            "Within the house, an earthy partition screen composed of concentric rings encircling a brass gong, stands obscuring the edge between the interior and exterior, as it divides the formal and informal living zones. Informal living spaces open out to the central courtyard, flooded with daylight and greenery. Cozy couches and a regal swing mark the extents of the informal living room; enlivened by the colourful beams of daylight filtering through stained glass skylights and openings, simulating a play of shifting lights and shadows. The formal drawing room exudes luxury, furnished in white leather, high curtains and plush carpets. Playful tear drops composed of suspended glass beads, float through the space, delicately partitioning the sophisticated living area.",
            "Art installations composed of framed canvas panels, rendered in muted tones and organic outlines, adorn the drawing room, giving off a classy vibe, while introducing nature-inspired elements into the space. The dining area seats twelve, on a set of sinuous ergonomic chairs arranged gracefully about an elegant oval table. A tall cylindrical chandelier diffuses light onto the marble top, its twisting glass threads chiming a mealtime chorus; while they bridge the exaggerated height of the ceiling and the humble human scale.",
            "The entire built expanse of 7000 sq. ft. of bedrooms, living, dining, kitchen and formal spaces, rendered in minimalistic finishes, creates an apt setting for the family’s treasured collection of artworks and antiques. The introduction of nature and greenery into the living spaces, helps connect the residents to their external environment; while in the broader context, initiates a bond between man and nature, through the medium of spatial design."
        ],
        details: {
            location: 'Camp, Pune',
            status: 'Completed',
            builtUpArea: '2941 Sq mt.',
            carpetArea: '2353 Sq mt.'
        },
        gallery: [
            { src: '/img/villa/napier-road-bungalow/1-bg.jpg', thumb: '/img/villa/napier-road-bungalow/1-thumb.jpg', title: 'Informal Living', description: 'Describe About Image' },
            { src: '/img/villa/napier-road-bungalow/2-bg.jpg', thumb: '/img/villa/napier-road-bungalow/2-thumb.jpg', title: 'Skylit central lobby', description: 'Describe About Image' },
            { src: '/img/villa/napier-road-bungalow/3-bg.jpg', thumb: '/img/villa/napier-road-bungalow/3-thumb.jpg', title: 'Wooden hues and colonial accents', description: 'Describe About Image' },
            { src: '/img/villa/napier-road-bungalow/4-bg.jpg', thumb: '/img/villa/napier-road-bungalow/4-thumb.jpg', title: 'Custom teardrop partition', description: 'Describe About Image' },
            { src: '/img/villa/napier-road-bungalow/5-bg.jpg', thumb: '/img/villa/napier-road-bungalow/5-thumb.jpg', title: 'Formal living', description: 'Describe About Image' },
            { src: '/img/villa/napier-road-bungalow/6-bg.jpg', thumb: '/img/villa/napier-road-bungalow/6-thumb.jpg', title: 'Custom artwork and plush furnishings', description: 'Describe About Image' },
            { src: '/img/villa/napier-road-bungalow/7-bg.jpg', thumb: '/img/villa/napier-road-bungalow/7-thumb.jpg', title: 'Full height paneled artwork adorning the formal area', description: 'Describe About Image' },
            { src: '/img/villa/napier-road-bungalow/8-bg.jpg', thumb: '/img/villa/napier-road-bungalow/8-thumb.jpg', title: 'Partitioned formal living: cozy reading corner', description: 'Describe About Image' },
            { src: '/img/villa/napier-road-bungalow/9-bg.jpg', thumb: '/img/villa/napier-road-bungalow/9-thumb.jpg', title: 'Cozy gathering space', description: 'Describe About Image' },
            { src: '/img/villa/napier-road-bungalow/10-bg.jpg', thumb: '/img/villa/napier-road-bungalow/10-thumb.jpg', title: 'Elegant dining', description: 'Describe About Image' },
            { src: '/img/villa/napier-road-bungalow/11-bg.jpg', thumb: '/img/villa/napier-road-bungalow/11-thumb.jpg', title: 'Exterior view', description: 'Describe About Image' }
        ],
        relatedProjects: ['shunyam-jodhpur', 'paradiso', 'onella']
    },
    'one-suhana': {
        id: 'one-suhana',
        title: 'One Suhana',
        subtitle: 'A tale of the Great Indian Gourmet',
        category: 'CORPORATE',
        heroImage: '/img/corporate/one-suhana/one-suhana-bg.jpg',
        description: [
            "The TAO team engaged in an exciting exercise, while designing the Corporate Headquarters for ‘Suhana Masala’, a premier Indian condiments company. the building captures the essence of Suhana, as an age-old brand producing and promoting Indian spices, and facilitating authentic culinary experiences for the common man’s kitchen. The design theme revolves around a fusion of old and new, modern and contemporary, in a bid to adapt to newer times and technology; while remaining close to the company’s humble roots. The company founder marks his divine presence, blessing the enterprise, while taking the form of a brass sculpture at the entrance of the headquarters. Upon entering the interactive lobby, visitors find themselves facing a 5 storey copper chandelier, composed of brass bowls, dramatically guiding them upward to the main office spaces.",
            "Traditional cooking methods and ingredients are demonstrated in their abstract and literal forms through every design element within the building. The reception table, takes the form of an exaggerated brass bowl, while the Suhana flame rises from above its rim, acting as the main branding element in the lobby, while metaphorically keeping the age-old flame of Suhana alive in its enduring position at the office. Brass and copper accents are integrated with rustic and earthy material tones, depicting ancient cooking and serving methods. Vintage utensils decorate the common spaces, invoking the heritage value of the brand, whie reminding the office staff and visitors alike, of the importance of traditions and their ethnic roots, despite rampant adaptation of modern technology. On the upper floors, open workspaces and private cabins are rendered in fusion finishes, dotted with interactive open breakout balconies.",
            "Branding has played an important role in communicating the owners’ approach of growth while being grounded to their roots. The brand ‘Suhana’ has been adapted on the façade by integrating ‘S’ longitudinally in cross section highlighted usingProdema sheets. Gokak stone cladding on the compound wall and ground floor draws a contrast between contemporary and vernacular finishes. The Suhanicons (motifs) have also been smartly integrated in a mural design on the façade with glass panels continuinginto the interiors, giving the façade a personalized look.",
            "Greenery and daylight interspersed within working and recreational spaces as well as common zones,unifies the Architecture with the interiors and landscape, converting the entire office into one unified entity. The rooftop terrace, with pergolas, jalis and a lawn space, provides a pleasant recreational and multipurpose space for office users."
        ],
        details: {
            location: 'Hadapsar, Pune, Maharashtra',
            status: 'Completed',
            plotArea: '1100 Sq Mt.',
            builtUpArea: '3755 Sq Mt.',
            carpetArea: '2150 Sq Mt.'
        },
        gallery: [
            { src: '/img/corporate/one-suhana/1-bg.jpg', thumb: '/img/corporate/one-suhana/1-thumb.jpg', title: 'Front view', description: 'Describe About Image' },
            { src: '/img/corporate/one-suhana/2-bg.jpg', thumb: '/img/corporate/one-suhana/2-thumb.jpg', title: 'Rear View', description: 'Describe About Image' },
            { src: '/img/corporate/one-suhana/3-bg.jpg', thumb: '/img/corporate/one-suhana/3-thumb.jpg', title: 'Entry porch', description: 'Describe About Image' },
            { src: '/img/corporate/one-suhana/4-bg.jpg', thumb: '/img/corporate/one-suhana/4-thumb.jpg', title: 'Upper lobby', description: 'Describe About Image' },
            { src: '/img/corporate/one-suhana/5-bg.jpg', thumb: '/img/corporate/one-suhana/5-thumb.jpg', title: 'Cabin lobby', description: 'Describe About Image' },
            { src: '/img/corporate/one-suhana/6-bg.jpg', thumb: '/img/corporate/one-suhana/6-thumb.jpg', title: 'Boardroom', description: 'Describe About Image' },
            { src: '/img/corporate/one-suhana/7-bg.jpg', thumb: '/img/corporate/one-suhana/7-thumb.jpg', title: 'MD cabin top view', description: 'Describe About Image' },
            { src: '/img/corporate/one-suhana/8-bg.jpg', thumb: '/img/corporate/one-suhana/8-thumb.jpg', title: 'MD cabin – view of lounge', description: 'Describe About Image' },
            { src: '/img/corporate/one-suhana/9-bg.jpg', thumb: '/img/corporate/one-suhana/9-thumb.jpg', title: 'MD cabin – view of lounge from MD table', description: 'Describe About Image' },
            { src: '/img/corporate/one-suhana/10-bg.jpg', thumb: '/img/corporate/one-suhana/10-thumb.jpg', title: 'MD cabin anteroom', description: 'Describe About Image' },
            { src: '/img/corporate/one-suhana/11-bg.jpg', thumb: '/img/corporate/one-suhana/11-thumb.jpg', title: 'Director Cabin – top view', description: 'Describe About Image' },
            { src: '/img/corporate/one-suhana/12-bg.jpg', thumb: '/img/corporate/one-suhana/12-thumb.jpg', title: 'View of Director table and lounge', description: 'Describe About Image' },
            { src: '/img/corporate/one-suhana/13-bg.jpg', thumb: '/img/corporate/one-suhana/13-thumb.jpg', title: 'Director lounge', description: 'Describe About Image' },
            { src: '/img/corporate/one-suhana/14-bg.jpg', thumb: '/img/corporate/one-suhana/14-thumb.jpg', title: 'Integration of gourmet as décor', description: 'Describe About Image' },
            { src: '/img/corporate/one-suhana/17-bg.jpg', thumb: '/img/corporate/one-suhanaZ/17-thumb.jpg', title: 'Sketch: design approach', description: 'Describe About Image' }
        ],
        relatedProjects: ['suzlon-one-earth', 'nyati-unitree', 'goyal-group']
    },
    'palkhi': {
        id: 'palkhi',
        title: 'Palkhi',
        subtitle: 'Life as an everyday Pilgrimage',
        category: 'APARTMENTS',
        heroImage: '/img/luxuryappartments/palkhi/palkhi-bg.jpg',
        description: [
            "Set amidst the green cover of the Pune University, this duplex apartment is designed to resonate the essence of the ‘Palkhi’, as a cultural symbol of the Maharashtrian festive procession towards the godly destination. The apartment is blessed with green forest views and celebrates the generous daylight streaming through its openings, further enhanced by reflections from the textures and colours of familiar natural materials used to furnish the space. The layout revolves around various interlinked living zones whereas the private rooms are tucked into the corners, visually linked by circulation corridors and open passages. Circles and curves are used in the layout, to assign functional identities to each zone, while highlighting the organic aesthetics of natural materials and traditional crafts.",
            "Upon entering the rustic abode, the entrance foyer invites one to join in the family’s daily pilgrimage, adorning the ambience with the tranquil symphony of a bronze vessel water feature, and the warm material palette of copper, stone, wool and pebbles as a welcome note. The foyer leads into the family living room, flowing fluidly toward the dining and open kitchen, and spreading visually to the recreational lounge and open passage on the upper level. Interactive elements like a traditional salvaged wood jharokha and a sunset gallery protrude into the vertical volume overlooking the family zone below, creating a seamless link between each zone. The Puja alcove appending the living room is a divine source of celebration, facilitating the family’s eternal holy journey. The connected open dining and kitchen act as a bonding space for everyday festivity, unity and reverence.",
            "The floating folded plate staircase leads upward to a woven fabric wall artwork, inspiring the feeling of ascending toward a holy shrine. The recreational lounge is a colourful family den, facilitating entertainment and leisure in its casual seating and warm accents. Open connecting passages link family spaces with the private rooms and suites, facilitating stunning views of the outdoor terrace and greenery beyond. Tucked into the cozy corners of the home, the private bedrooms act as restful refuges accommodating relaxation and retrospection at the end of each day. Customized fixtures and furnishings allow a unique identity to each suite giving it the feeling of a cozy sanctuary in itself.",
            "The home entails diverse spatial, visual, tactile and auditory experiences through an exploration of traditional craftsmanship and natural materials, forming a subtle backdrop for the everyday celebration and festivities on the family’s collective spiritual journey."
        ],
        details: {
            location: 'Pune',
            status: 'Completed',
            carpetArea: '7228 Sq. Ft'
        },
        gallery: [
            { src: '/img/luxuryappartments/palkhi/1-bg.jpg', thumb: '/img/luxuryappartments/palkhi/1-thumb.jpg', title: 'Palkhi, Life as an everyday pilgrimage', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/2-bg.jpg', thumb: '/img/luxuryappartments/palkhi/2-thumb.jpg', title: 'Entrance Foyer: Invitation to daily pilgrimage', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/3-bg.jpg', thumb: '/img/luxuryappartments/palkhi/3-thumb.jpg', title: 'Extended central living area', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/4-bg.jpg', thumb: '/img/luxuryappartments/palkhi/4-thumb.jpg', title: 'Family Living', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/5-bg.jpg', thumb: '/img/luxuryappartments/palkhi/5-thumb.jpg', title: 'Dining area', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/6-bg.jpg', thumb: '/img/luxuryappartments/palkhi/6-thumb.jpg', title: 'Puja Alcove', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/7-bg.jpg', thumb: '/img/luxuryappartments/palkhi/7-thumb.jpg', title: 'Connected kitchen', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/8-bg.jpg', thumb: '/img/luxuryappartments/palkhi/8-thumb.jpg', title: 'Connecting hallway', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/9-bg.jpg', thumb: '/img/luxuryappartments/palkhi/9-thumb.jpg', title: 'Textile art', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/10-bg.jpg', thumb: '/img/luxuryappartments/palkhi/10-thumb.jpg', title: 'Upper Recreational Lounge', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/11-bg.jpg', thumb: '/img/luxuryappartments/palkhi/11-thumb.jpg', title: 'Sunset Gallery', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/12-bg.jpg', thumb: '/img/luxuryappartments/palkhi/12-thumb.jpg', title: 'Master Bedroom', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/13-bg.jpg', thumb: '/img/luxuryappartments/palkhi/13-thumb.jpg', title: 'Master Bedroom 2', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/14-bg.jpg', thumb: '/img/luxuryappartments/palkhi/14-thumb.jpg', title: 'Daughter’s Bedroom', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/15-bg.jpg', thumb: '/img/luxuryappartments/palkhi/15-thumb.jpg', title: 'Guest Bedroom', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/16-bg.jpg', thumb: '/img/luxuryappartments/palkhi/16-thumb.jpg', title: 'Rejoicing Sunset', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/17-bg.jpg', thumb: '/img/luxuryappartments/palkhi/17-thumb.jpg', title: 'Sketch: Curvilinear planning', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/18-bg.jpg', thumb: '/img/luxuryappartments/palkhi/18-thumb.jpg', title: 'Sketch: Puja Alcove', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/19-bg.jpg', thumb: '/img/luxuryappartments/palkhi/19-thumb.jpg', title: 'Sketch: bronze vessel water feature', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/21-bg.jpg', thumb: '/img/luxuryappartments/palkhi/21-thumb.jpg', title: 'Section A-A’', description: 'Describe About Image' },
            { src: '/img/luxuryappartments/palkhi/22-bg.jpg', thumb: '/img/luxuryappartments/palkhi/22-thumb.jpg', title: 'Layout Plan', description: 'Describe About Image' }
        ],
        relatedProjects: ['ajmera-aria', 'gods-blessing', 'konark']
    },
    'pbap-credai-office': {
        id: 'pbap-credai-office',
        title: 'PBAP CREDAI Office',
        subtitle: 'Sense and Synergy',
        category: 'CORPORATE',
        heroImage: '/img/corporate/pbap-credai-office/pbap-credai-office-bg.jpg',
        description: [
            "The office interiors for the Association of Promoters and Builders of Pune, at nexus mall, cater to the clients’ corporate functions, while facilitating convenient interaction between their employees and members of the community. A value addition to the brief came about in the form of interactive spaces, used for the purpose of exhibitions, training courses, interactive meetings and workshops, making the interface between members, citizens and staff, a more interactive one.",
            "The layout of the office allows segregation of functional aspects, with a common passage leading to the main workstation, and extending to link to the conference room. Across the common passage lies a linear breakout seating space, visually linked with the interiors. The main workstation area is composed of a reception desk and waiting area, a set of meeting rooms, 4 work desks and 3 private cabins. Ample daylight illuminates the workstations, while custom artwork, art installations and paintings adorn the various spaces, making a statement. The design provides appropriate glare free lighting and acoustics, while ensuring optimum use and quality of space. A soothing minimalistic colour tone is combined with various colourful graphics and artwork, making the space a pleasant work environment."
        ],
        details: {
            location: 'Camp, Pune, Maharashtra',
            status: 'Completed',
            carpetArea: '3275 ft.'
        },
        gallery: [
            { src: '/img/corporate/pbap-credai-office/01-bg.jpg', thumb: '/img/corporate/pbap-credai-office/01.jpg', title: 'Common Passage', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/02-bg.jpg', thumb: '/img/corporate/pbap-credai-office/02.jpg', title: 'Reception Area', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/03-bg.jpg', thumb: '/img/corporate/pbap-credai-office/03.jpg', title: 'Reception and Waiting Area', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/04-bg.jpg', thumb: '/img/corporate/pbap-credai-office/04.jpg', title: 'Collaborative Workstations', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/05-bg.jpg', thumb: '/img/corporate/pbap-credai-office/05.jpg', title: 'Open workstations', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/06-bg.jpg', thumb: '/img/corporate/pbap-credai-office/06.jpg', title: 'Executive Cabins', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/07-bg.jpg', thumb: '/img/corporate/pbap-credai-office/07.jpg', title: 'Cabin Interior', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/08-bg.jpg', thumb: '/img/corporate/pbap-credai-office/08.jpg', title: 'Meeting Area', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/09-bg.jpg', thumb: '/img/corporate/pbap-credai-office/09.jpg', title: 'Meeting Room', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/10-bg.jpg', thumb: '/img/corporate/pbap-credai-office/10.jpg', title: 'Meeting room', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/11-bg.jpg', thumb: '/img/corporate/pbap-credai-office/11.jpg', title: 'Conference Room', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/12-bg.jpg', thumb: '/img/corporate/pbap-credai-office/12.jpg', title: 'Conference Room', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/13-bg.jpg', thumb: '/img/corporate/pbap-credai-office/13.jpg', title: 'Vibrant Artwork', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/14-bg.jpg', thumb: '/img/corporate/pbap-credai-office/14.jpg', title: 'Art Installation', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/15-bg.jpg', thumb: '/img/corporate/pbap-credai-office/15.jpg', title: 'Decor & Art', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/16-bg.jpg', thumb: '/img/corporate/pbap-credai-office/16.jpg', title: 'Custom Map installation', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/17-bg.jpg', thumb: '/img/corporate/pbap-credai-office/17.jpg', title: 'Colourful Paintings and art', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/18-bg.jpg', thumb: '/img/corporate/pbap-credai-office/18.jpg', title: 'Concept sketch - Common Passage', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/19-bg.jpg', thumb: '/img/corporate/pbap-credai-office/19.jpg', title: 'Concept Sketch - Open workspaces', description: 'Describe About Image' },
            { src: '/img/corporate/pbap-credai-office/20-bg.jpg', thumb: '/img/corporate/pbap-credai-office/20.jpg', title: 'Concept sketch - Reception Desk', description: 'Describe About Image' }
        ],
        relatedProjects: ['suzlon-one-earth', 'manisha-constructions', 'goyal-group']
    },
    'corporate-office-suhana-masala': {
        id: 'corporate-office-suhana-masala',
        title: 'Corporate office for Suhana Masala',
        category: 'corporate',
        heroImage: '/img/corporate/corporate-office-suhana-masala-v2/corporate-office-suhana-masala-bg.jpg',
        description: [
            'The TAO team engaged in an exciting exercise, while designing the Corporate Headquarters for ‘Suhana Masala’, a premier Indian condiments company. the building captures the essence of Suhana, as an age-old brand producing and promoting Indian spices, and facilitating authentic culinary experiences for the common man’s kitchen. The design theme revolves around a fusion of old and new, modern and contemporary, in a bid to adapt to newer times and technology; while remaining close to the company’s humble roots. The company founder marks his divine presence, blessing the enterprise, while taking the form of a brass sculpture at the entrance of the headquarters. Upon entering the interactive lobby, visitors find themselves facing a 5 storey copper chandelier, composed of brass bowls, dramatically guiding them upward to the main office spaces.',
            'Traditional cooking methods and ingredients are demonstrated in their abstract and literal forms through every design element within the building. The reception table, takes the form of an exaggerated brass bowl, while the Suhana flame rises from above its rim, acting as the main branding element in the lobby, while metaphorically keeping the age-old flame of Suhana alive in its enduring position at the office. Brass and copper accents are integrated with rustic and earthy material tones, depicting ancient cooking and serving methods. Vintage utensils decorate the common spaces, invoking the heritage value of the brand, whie reminding the office staff and visitors alike, of the importance of traditions and their ethnic roots, despite rampant adaptation of modern technology. On the upper floors, open workspaces and private cabins are rendered in fusion finishes, dotted with interactive open breakout balconies.',
            'Branding has played an important role in communicating the owners’ approach of growth while being grounded to their roots. The brand ‘Suhana’ has been adapted on the façade by integrating ‘S’ longitudinally in cross section highlighted usingProdema sheets. Gokak stone cladding on the compound wall and ground floor draws a contrast between contemporary and vernacular finishes. The Suhanicons (motifs) have also been smartly integrated in a mural design on the façade with glass panels continuinginto the interiors, giving the façade a personalized look.',
            'Greenery and daylight interspersed within working and recreational spaces as well as common zones,unifies the Architecture with the interiors and landscape, converting the entire office into one unified entity. The rooftop terrace, with pergolas, jalis and a lawn space, provides a pleasant recreational and multipurpose space for office users.'
        ],
        details: {
            location: 'Hadapsar, Pune, Maharashtra',
            status: 'Completed',
            plotArea: '1100 Sq Mt.',
            builtUpArea: '3755 Sq Mt.',
        },
        gallery: [
            { src: '/img/corporate/corporate-office-suhana-masala-v2/1-bg.jpg', thumb: '/img/corporate/corporate-office-suhana-masala-v2/1-thumb.jpg', title: 'Front view', description: 'Describe About Image' },
            { src: '/img/corporate/corporate-office-suhana-masala-v2/2-bg.jpg', thumb: '/img/corporate/corporate-office-suhana-masala-v2/2-thumb.jpg', title: 'Rear View', description: 'Describe About Image' },
            { src: '/img/corporate/corporate-office-suhana-masala-v2/3-bg.jpg', thumb: '/img/corporate/corporate-office-suhana-masala-v2/3-thumb.jpg', title: 'Entry porch', description: 'Describe About Image' },
            { src: '/img/corporate/corporate-office-suhana-masala-v2/4-bg.jpg', thumb: '/img/corporate/corporate-office-suhana-masala-v2/4-thumb.jpg', title: 'Upper lobby', description: 'Describe About Image' },
            { src: '/img/corporate/corporate-office-suhana-masala-v2/5-bg.jpg', thumb: '/img/corporate/corporate-office-suhana-masala-v2/5-thumb.jpg', title: 'Cabin lobby', description: 'Describe About Image' },
            { src: '/img/corporate/corporate-office-suhana-masala-v2/6-bg.jpg', thumb: '/img/corporate/corporate-office-suhana-masala-v2/6-thumb.jpg', title: 'Boardroom', description: 'Describe About Image' },
            { src: '/img/corporate/corporate-office-suhana-masala-v2/7-bg.jpg', thumb: '/img/corporate/corporate-office-suhana-masala-v2/7-thumb.jpg', title: 'MD cabin top view', description: 'Describe About Image' },
            { src: '/img/corporate/corporate-office-suhana-masala-v2/8-bg.jpg', thumb: '/img/corporate/corporate-office-suhana-masala-v2/8-thumb.jpg', title: 'MD cabin – view of lounge', description: 'Describe About Image' },
            { src: '/img/corporate/corporate-office-suhana-masala-v2/9-bg.jpg', thumb: '/img/corporate/corporate-office-suhana-masala-v2/9-thumb.jpg', title: 'MD cabin – view of lounge from MD table', description: 'Describe About Image' },
            { src: '/img/corporate/corporate-office-suhana-masala-v2/10-bg.jpg', thumb: '/img/corporate/corporate-office-suhana-masala-v2/10-thumb.jpg', title: 'MD cabin anteroom', description: 'Describe About Image' },
            { src: '/img/corporate/corporate-office-suhana-masala-v2/11-bg.jpg', thumb: '/img/corporate/corporate-office-suhana-masala-v2/11-thumb.jpg', title: 'Director Cabin – top view', description: 'Describe About Image' },
            { src: '/img/corporate/corporate-office-suhana-masala-v2/12-bg.jpg', thumb: '/img/corporate/corporate-office-suhana-masala-v2/12-thumb.jpg', title: 'View of Director table and lounge', description: 'Describe About Image' },
            { src: '/img/corporate/corporate-office-suhana-masala-v2/13-bg.jpg', thumb: '/img/corporate/corporate-office-suhana-masala-v2/13-thumb.jpg', title: 'Director lounge', description: 'Describe About Image' },
            { src: '/img/corporate/corporate-office-suhana-masala-v2/14-bg.jpg', thumb: '/img/corporate/corporate-office-suhana-masala-v2/14-thumb.jpg', title: 'Integration of gourmet as décor', description: 'Describe About Image' },
            { src: '/img/corporate/corporate-office-suhana-masala-v2/17-bg.jpg', thumb: '/img/corporate/corporate-office-suhana-masala-v2/17-thumb.jpg', title: 'Sketch: design approach', description: 'Describe About Image' },
        ],
        relatedProjects: ['suzlon-one-earth', 'nyati-unitree', 'goyal-group']
    },
    'corporate-office-at-kolhapur': {
        id: 'corporate-office-at-kolhapur',
        title: 'Corporate office at Kolhapur',
        category: 'corporate',
        heroImage: '/img/corporate/corporate-office-at-kolhapur/corporate-office-at-kolhapur-bg.jpg',
        description: [
            'Designed for a well-established conglomerate,this corporate office is situated in a developing suburb of Kolhapur. A landscaped porch creates a welcoming entrance, integrated with corporate branding elements and shaded by a pergola structure. Within the building, a central atrium functions as a grand lobby, as sunrays from the skylight above hit the glistening drops of water within a central fountain.',
            'The interiors are rendered in hues of brown, dotted with splashes of colour in the form of occasional artwork and furnishings. Visual transparency is attained within the work zones, through glass and wooden battens as partition walls. The terrace incorporates a gym and rooftop lawn, functioning as a recreational area for all employees, allowing striking views of the landscape around. Vertical fins give the building façade a dynamic aesthetic, while shading interior spaces and avoiding thermal gains.'
        ],
        details: {
            location: 'Kohlapur, Maharashtra',
            status: 'Completed',
            plotArea: '8870 Sq Mt.',
            builtUpArea: '3967 Sq Mt.',
        },
        gallery: [
             { src: '/img/corporate/corporate-office-at-kolhapur/1-bg.jpg', thumb: '/img/corporate/corporate-office-at-kolhapur/1-thumb.jpg', title: 'View of Entrance Porch', description: 'Describe About Image' },
             { src: '/img/corporate/corporate-office-at-kolhapur/2-bg.jpg', thumb: '/img/corporate/corporate-office-at-kolhapur/2-thumb.jpg', title: 'Front view: visualized building', description: 'Describe About Image' },
             { src: '/img/corporate/corporate-office-at-kolhapur/3-bg.jpg', thumb: '/img/corporate/corporate-office-at-kolhapur/3-thumb.jpg', title: 'Concept Sketch: Building overview', description: 'Describe About Image' },
             { src: '/img/corporate/corporate-office-at-kolhapur/4-bg.jpg', thumb: '/img/corporate/corporate-office-at-kolhapur/4-thumb.jpg', title: 'Concept Sketch: Entrance', description: 'Describe About Image' },
             { src: '/img/corporate/corporate-office-at-kolhapur/5-bg.jpg', thumb: '/img/corporate/corporate-office-at-kolhapur/5-thumb.jpg', title: 'Ground Floor Plan', description: 'Describe About Image' },
             { src: '/img/corporate/corporate-office-at-kolhapur/6-bg.jpg', thumb: '/img/corporate/corporate-office-at-kolhapur/6-thumb.jpg', title: 'Section A-A', description: 'Describe About Image' },
             { src: '/img/corporate/corporate-office-at-kolhapur/7-bg.jpg', thumb: '/img/corporate/corporate-office-at-kolhapur/7-thumb.jpg', title: 'Interior view: Reception', description: 'Describe About Image' },
        ],
        relatedProjects: ['suzlon-one-earth', 'nyati-unitree', 'goyal-group']
    },
    'veerayatan': {
        id: 'veerayatan',
        title: 'Veerayatan',
        category: 'institutional',
        heroImage: '/img/institution/veerayatan/veerayatan-bg.jpg',
        description: [
            'The project utilizes an unfinished site and structure, intended to be developed as a memorial Smarak for Pujya Gurudev Amar Muni. The clients sought a modern structure commemorating the Gurudev and popularizing the traditions of the Jain faith among the youth, through an interactive and minimalistic design.  The proposed design would exude purity of thought, shape and style, keeping with Pujya Amar Muni’s life values.',
            'The design was conceived as the immortalization of the Gurudev in Tapasya: a triangular plan, rising upwards in height towards its ‘head’. A landscaped garden enances the ambience of the religious site. The approach to the Smark is through a paved pathway, leading upto the triangular building, through undulating landscaped mounds, dotted with water bodies and a lotus pond. Set up in Vaibhargiri, itself a memorial of Lord Mahaveer and Pujya Gurudev Amar Muniji, the design of the Smarak celebrates the hills, reflecting their silhouette in the large mirror-like façade on the South East. Inside the Smarak, a streamlined circulation guides the visitors through a landscaped court into the central circular core along the protective envelope of RCC walls. Existing columns, forming a circular sanctum, in the core, enclosing a spectacular laser show on the sanctum ceiling. Post this mesmerizing experience of a holy vision, a similar circulation pattern leads one to the exit.'
        ],
        details: {
            location: 'Rajgir, Nalanda, Bihar',
            status: 'Unbuilt',
            plotArea: '10 Acres',
            builtUpArea: '800 Sq mt.',
        },
        gallery: [
            { src: '/img/institution/veerayatan/1-bg.jpg', thumb: '/img/institution/veerayatan/1-thumb.jpg', title: 'Veerayatan: A contemporary Jain Memorial', description: 'Describe About Image' },
            { src: '/img/institution/veerayatan/2-bg.jpg', thumb: '/img/institution/veerayatan/2-thumb.jpg', title: 'Site Plan', description: 'Describe About Image' },
            { src: '/img/institution/veerayatan/3-bg.jpg', thumb: '/img/institution/veerayatan/3-thumb.jpg', title: 'Concept: Gurudev in Tapasya', description: 'Describe About Image' },
            { src: '/img/institution/veerayatan/10-bg.jpg', thumb: '/img/institution/veerayatan/10-thumb.jpg', title: 'Proposed streamlined circulation', description: 'Describe About Image' },
            { src: '/img/institution/veerayatan/11-bg.jpg', thumb: '/img/institution/veerayatan/11-thumb.jpg', title: '3D model: showing existing columns in the sanctum', description: 'Describe About Image' },
            { src: '/img/institution/veerayatan/12-bg.jpg', thumb: '/img/institution/veerayatan/12-thumb.jpg', title: '3D model: triangular structure', description: 'Describe About Image' },
            { src: '/img/institution/veerayatan/13-bg.jpg', thumb: '/img/institution/veerayatan/13-thumb.jpg', title: 'Mockup: entrance', description: 'Describe About Image' },
            { src: '/img/institution/veerayatan/14-bg.jpg', thumb: '/img/institution/veerayatan/14-thumb.jpg', title: 'View into sanctum', description: 'Describe About Image' },
            { src: '/img/institution/veerayatan/15-bg.jpg', thumb: '/img/institution/veerayatan/15-thumb.jpg', title: 'Bird’s eye view', description: 'Describe About Image' },
            { src: '/img/institution/veerayatan/16-bg.jpg', thumb: '/img/institution/veerayatan/16-thumb.jpg', title: 'Top view', description: 'Describe About Image' },
            { src: '/img/institution/veerayatan/17-bg.jpg', thumb: '/img/institution/veerayatan/17-thumb.jpg', title: 'Sanctum: close up', description: 'Describe About Image' },
            { src: '/img/institution/veerayatan/18-bg.jpg', thumb: '/img/institution/veerayatan/18-thumb.jpg', title: 'Aerial view', description: 'Describe About Image' },
            { src: '/img/institution/veerayatan/19-bg.jpg', thumb: '/img/institution/veerayatan/19-thumb.jpg', title: 'Photographs: Existing columns on site', description: 'Describe About Image' },
            { src: '/img/institution/veerayatan/30-bg.jpg', thumb: '/img/institution/veerayatan/30-thumb.jpg', title: 'Laser show inside sanctum', description: 'Describe About Image' },
            { src: '/img/institution/veerayatan/31-bg.jpg', thumb: '/img/institution/veerayatan/31-thumb.jpg', title: 'Cosmic elements projected on the sanctum ceiling', description: 'Describe About Image' },
        ],
        relatedProjects: ['suzlon-corporate-learning-centre', 'wind-dunes', 'gujarati-bandhu-samaj-campus']
    },
    'mahalaxmi-hospital': {
        id: 'mahalaxmi-hospital',
        title: 'Mahalaxmi Hospital',
        category: 'institutional',
        heroImage: '/img/institution/mahalaxmi-hospital/mahalaxmi-hospital-bg.jpg',
        description: [
            'The project realizes the Urban dream of a healing space nestled amidst greenery and radiating peace and calm. Located on the Mitra Mandal chowk at a prime traffic junction, the design of the hospital curves along the vehicular roads, to enclose an inner zone of quiet healing. Accommodating 100 beds, the Mahalaxmi is supported by modern technology to support functional zones, segregated into diagnosis, therapy, recovery and intensive care. The layout facilitates segregation of patient and visitor circulation, through a sensitive approach toward common and sterile areas. Exploiting the concept of ‘Healing Architecture’, the hospital awaits sanctioning processes before it takes birth.'
        ],
        details: {
            location: 'Pune, Maharashtra',
            status: 'Unbuilt',
            plotArea: '5280 Sq mt.',
            builtUpArea: '11603 Sq mt.',
        },
        gallery: [
            { src: '/img/institution/mahalaxmi-hospital/1-bg.jpg', thumb: '/img/institution/mahalaxmi-hospital/1-thumb.jpg', title: 'Evening View', description: 'Describe About Image' },
            { src: '/img/institution/mahalaxmi-hospital/5-bg.jpg', thumb: '/img/institution/mahalaxmi-hospital/5-thumb.jpg', title: '3D view: entrance foyer', description: 'Describe About Image' },
            { src: '/img/institution/mahalaxmi-hospital/6-bg.jpg', thumb: '/img/institution/mahalaxmi-hospital/6-thumb.jpg', title: 'Green Spaces', description: 'Describe About Image' },
            { src: '/img/institution/mahalaxmi-hospital/7-bg.jpg', thumb: '/img/institution/mahalaxmi-hospital/7-thumb.jpg', title: 'Approach road', description: 'Describe About Image' },
            { src: '/img/institution/mahalaxmi-hospital/8-bg.jpg', thumb: '/img/institution/mahalaxmi-hospital/8-thumb.jpg', title: 'Evening View: Entrance', description: 'Describe About Image' },
            { src: '/img/institution/mahalaxmi-hospital/9-bg.jpg', thumb: '/img/institution/mahalaxmi-hospital/9-thumb.jpg', title: 'Front view depicting security, florist, medical store', description: 'Describe About Image' },
        ],
        relatedProjects: ['suzlon-corporate-learning-centre', 'wind-dunes', 'gujarati-bandhu-samaj-campus']
    },
    'pinewood': {
        id: 'pinewood',
        title: 'Pinewood',
        category: 'housing',
        heroImage: '/img/housing/pinewood/pinewood-bg.jpg',
        description: [
            'This exclusive high-rise housing community was designed to cater to the requirement of luxury apartments in the upcoming posh locales of Kondhwa, capturing views of distant hill ranges. The planning restricts vehicular circulation toward the periphery of the plot, while carving out a large podium level garden for recreation in the center of the site. Two high rise apartment blocks accommodate luxurious 4BHK homes for the resident community along each side of the central garden space. Circular balconies, terraces and glazing, allow views and daylight to every apartment, along with natural cross ventilation. The residential development is supported by common recreational activities in the form of a clubhouse and a swimming pool adjoining the podium garden.'
        ],
        details: {
            location: 'Kondawa, Pune, Maharashtra',
            status: 'Unbuilt',
            plotArea: '15000 Sqmt.',
            builtUpArea: '25907 Sq mt.',
        },
        gallery: [
            { src: '/img/housing/pinewood/1-bg.jpg', thumb: '/img/housing/pinewood/1-thumb.jpg', title: 'Bird’s eye view: Luxurious housing community at Kondhwa', description: 'Describe About Image' },
            { src: '/img/housing/pinewood/2-bg.jpg', thumb: '/img/housing/pinewood/2-thumb.jpg', title: 'Top view: Site planning', description: 'Describe About Image' },
            { src: '/img/housing/pinewood/3-bg.jpg', thumb: '/img/housing/pinewood/3-thumb.jpg', title: 'South Elevation', description: 'Describe About Image' },
            { src: '/img/housing/pinewood/4-bg.jpg', thumb: '/img/housing/pinewood/4-thumb.jpg', title: 'East view', description: 'Describe About Image' },
            { src: '/img/housing/pinewood/5-bg.jpg', thumb: '/img/housing/pinewood/5-thumb.jpg', title: 'Project exterior elevation', description: 'Describe About Image' },
            { src: '/img/housing/pinewood/6-bg.jpg', thumb: '/img/housing/pinewood/6-thumb.jpg', title: 'Clubhouse', description: 'Describe About Image' },
            { src: '/img/housing/pinewood/7-bg.jpg', thumb: '/img/housing/pinewood/7-thumb.jpg', title: 'Shaded swimming pool', description: 'Describe About Image' },
            { src: '/img/housing/pinewood/8-bg.jpg', thumb: '/img/housing/pinewood/8-thumb.jpg', title: 'Typical 4BHK apartment layout', description: 'Describe About Image' },
        ],
        relatedProjects: ['kumar-platinum-housing', 'shiloh', 'kumar-pacific']
    },
    'kumar-pacific': {
        id: 'kumar-pacific',
        title: 'Kumar Pacific',
        category: 'housing',
        heroImage: '/img/housing/kumar-pacific/kumar-pacific-thumb.jpg',
        description: [
            "The Kumar Pacific apartments are planned in 3 almond shaped residential blocks centered around a common clubhouse and open recreational ground.",
            "The master planning of the complex ensures maximum frontage to commercial and retail establishments, placed at the road front; while introverted planning of residential and recreational activities ensures privacy to residents of the community. Within the curvilinear residential blocks, 2 and 3BHK units are arranged to capture views and daylight from staggered balconies and terraces adjoining bedrooms and living spaces. Placement of openings ensures cross ventilation for all living spaces. Services, the backbone of any residential development, are inconspicuously located so as not to disturb the aesthetic appeal of the modern structure. A 4th residential block, proposed as future development, would complete the circular outer frame of the masterplan."
        ],
        details: {
            location: 'Pune, Maharashtra',
            status: 'Unbuilt'
        },
        gallery: [
            { src: '/img/housing/kumar-pacific/1-bg.jpg', thumb: '/img/housing/kumar-pacific/1-thumb.jpg', title: 'Project overview: eye shaped living blocks', description: 'Describe About Image' },
            { src: '/img/housing/kumar-pacific/2-bg.jpg', thumb: '/img/housing/kumar-pacific/2-thumb.jpg', title: 'Site planning', description: 'Describe About Image' },
            { src: '/img/housing/kumar-pacific/5-bg.jpg', thumb: '/img/housing/kumar-pacific/5-thumb.jpg', title: 'Block A1: exterior view', description: 'Describe About Image' },
            { src: '/img/housing/kumar-pacific/6-bg.jpg', thumb: '/img/housing/kumar-pacific/6-thumb.jpg', title: 'Master Plan: top view', description: 'Describe About Image' },
            { src: '/img/housing/kumar-pacific/7-bg.jpg', thumb: '/img/housing/kumar-pacific/7-thumb.jpg', title: 'Viewing balcony', description: 'Describe About Image' },
            { src: '/img/housing/kumar-pacific/8-bg.jpg', thumb: '/img/housing/kumar-pacific/8-thumb.jpg', title: 'Clubhouse and recreational space', description: 'Describe About Image' },
            { src: '/img/housing/kumar-pacific/9-bg.jpg', thumb: '/img/housing/kumar-pacific/9-thumb.jpg', title: 'Swimming pool shaded with pergola structure', description: 'Describe About Image' }
        ],
        relatedProjects: ['kumar-platinum-housing', 'shiloh', 'suyog-navkaar-housing']
    },
    'suzlon-corporate-learning-centre': {
        id: 'suzlon-corporate-learning-centre',
        title: 'Suzlon Corporate Learning Centre',
        category: 'institutional',
        heroImage: '/img/institution/suzlon-corporate-learning-centre/suzlon-corporate-learning-centre-bg.jpg',
        description: [
            "The planning of the campus focusses on the revitalization of the trainees’ mind and body. The entry to the campus is planned through an arched opening along a water body. Learning areas are designed to be informal, encouraging interaction between students and teachers. A central open ground, clubbed with state-of-the-art recreational facilities, allows students a place to unwind, and digest their learnings from classrooms.",
            "Different activities across the campus are bound by a ‘fluid’ landscape. The central plaza, being the culmination point for all recreational nooks across the campus. The central court is designed to accommodate a myriad of activities, including, concerts, annual functions, sports activities and the like. An open-air theatre connects the central plaza with the classrooms on the first level, which, in turn are connected to their own outdoor activity spaces. Nature acts as the binding element, connecting and infusing all habitable spaces with its freshness and light."
        ],
        details: {
            location: 'Hinjewadi, Pune, Maharashtra',
            status: 'Unbuilt',
            plotArea: '15725 Sq mt.',
            totalDevelopmentArea: '6160 Sq mt.'
        },
        gallery: [
            { src: '/img/institution/suzlon-corporate-learning-centre/1-bg.jpg', thumb: '/img/institution/suzlon-corporate-learning-centre/1-thumb.jpg', title: 'Project Overview', description: 'Describe About Image' },
            { src: '/img/institution/suzlon-corporate-learning-centre/2-bg.jpg', thumb: '/img/institution/suzlon-corporate-learning-centre/2-thumb.jpg', title: 'Site Plan: Top View', description: 'Describe About Image' },
            { src: '/img/institution/suzlon-corporate-learning-centre/3-bg.jpg', thumb: '/img/institution/suzlon-corporate-learning-centre/3-thumb.jpg', title: 'View overlooking Central plaza and open air theatre', description: 'Describe About Image' },
            { src: '/img/institution/suzlon-corporate-learning-centre/4-bg.jpg', thumb: '/img/institution/suzlon-corporate-learning-centre/4-thumb.jpg', title: 'Campus: Bird’s eye view', description: 'Describe About Image' },
            { src: '/img/institution/suzlon-corporate-learning-centre/5-bg.jpg', thumb: '/img/institution/suzlon-corporate-learning-centre/5-thumb.jpg', title: 'Central Plaza', description: 'Describe About Image' },
            { src: '/img/institution/suzlon-corporate-learning-centre/6-bg.jpg', thumb: '/img/institution/suzlon-corporate-learning-centre/6-thumb.jpg', title: 'Circulation spaces', description: 'Describe About Image' },
            { src: '/img/institution/suzlon-corporate-learning-centre/7-bg.jpg', thumb: '/img/institution/suzlon-corporate-learning-centre/7-thumb.jpg', title: 'Project elevation', description: 'Describe About Image' }
        ],
        relatedProjects: ['suzlon-excellence-academy', 'wind-dunes', 'gujarati-bandhu-samaj-campus']
    },
    'anandvilla': {
        id: 'anandvilla',
        title: 'Anand Villa',
        category: 'villa',
        heroImage: '/img/villa/anandvilla/anandvilla-bg.jpg',
        description: [
            "The rectangular site is approached by a road towards it’s north side. The design is based on a simple square grid placed at an angle of 45° to plot boundary, thus welcoming the south-west breeze and opening up the view on either side of the house. Adjoining the plot, on the east is the common society space, and to the south is a multistory apartment block. The idea was to open up the view on the north-east and north-west and place the service block towards south. The entrance gate is placed at 45° to the plot boundary, parallel to the building grid, to widen the approach to house, thus giving a welcoming feel. Rooms are oriented in a manner, so as to catch the southwest breeze, This, along with the diagonal grid of the house makes the entrance gate visible from all the rooms, thereby supplementing the function of security.",
            "The semi private spaces are zoned on the ground level, well integrated with the lush garden; with private spaces occupying the first floor, and the terrace housing a silent, contemplative meditation room roofed by an Egyptian style pyramidal canopy, to capture cosmic energy.",
            "The prime consideration for design was to integrate the house with the nature from the inside to the outside. The important aspect was to build a structure, which was rooted and in harmony with nature. The proportions of the building relate to human scale, with the interior spaces and the structural massing in accordance with this proportion.The first impression of the house is that of a floating solid mass! This has been achieved with the use of black painted steel columns and wooden framed tinted glass windows. Natural stone masonry on the lower floor, is used as filler material between the structural and functional requirement; which together gives the illusion of the structure being grounded. The blue and white china mosaic on the roof merges with the sky.",
            "The functions within the spaces in the house are differentiated with the use of furniture and other elements like rocks of various sizes. The elimination of unnecessary wall not only saves spaces but also adds a level of transparency. Cavity walls have been provided on the east and west side, which functions as insulation, tempering the microclimate inside the house.",
            "Free-standing structural columns, built-in furniture, skylights, wind catchers, stone masonry, waterfalls, plants, rockery, bay windows, vibrant & lively colors, white & blue china mosaic pattern on roof top, are a few elements enhancing the design. Large verandas, balconies and terraces are created to enjoy the beautiful view of garden. Continuous windows of tinted glass extend the room beyond the window for view of the abundant greenery outside. The corner windows in the bedroom provide cross ventilation and open the view at various angles to the outside. Walls of exposed stone of different shapes and sizes, and potted plants create a unity and harmony of the ground from within, borrowing the surrounding landscape inside. With the lush, natural greenery outside, the sound of water and breeze, the spontaneous play of natural elements, Anandvilla is a picture of peace and harmony."
        ],
        details: {
            location: 'Kalyani Nagar, Pune',
            status: 'Completed',
            plotArea: '4500 Sq. m.',
            builtUpArea: '3670 Sq. m.'
        },
        gallery: [
            { src: '/img/villa/anandvilla/01.-A-solid-floating-mass-amid-the-neighboring-landscape.jpg', thumb: '/img/villa/anandvilla/1anandvilla.jpg', title: 'A solid floating mass amid the neighboring landscape', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/02.-Living-Lounge-segregated-by-a-lightweight-floating-staircase.jpg', thumb: '/img/villa/anandvilla/2anandvilla.jpg', title: 'Living Lounge segregated by a lightweight floating staircase', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/03.-Dining-nook.jpg', thumb: '/img/villa/anandvilla/3anandvilla.jpg', title: 'Dining Nook', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/04.-Cozy-Living.jpg', thumb: '/img/villa/anandvilla/4anandvill.jpg', title: 'Cozy Living', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/05.-Earthy-Outdoors.jpg', thumb: '/img/villa/anandvilla/5anandvilla.jpg', title: 'Earthy Outdoors', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/06.-Serene-verandah.jpg', thumb: '/img/villa/anandvilla/6anandvilla.jpg', title: 'Serene Verandah', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/07.-Natural-landscape-features.jpg', thumb: '/img/villa/anandvilla/7anandvilla.jpg', title: 'Natural landscape features', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/08.-Natural-landscape-features.jpg', thumb: '/img/villa/anandvilla/8anandvilla.jpg', title: 'Natural landscape features', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/09.-Corner-windows-enhance-views-and-bring-in-daylight.jpg', thumb: '/img/villa/anandvilla/9anandvilla.jpg', title: 'Corner windows enhance views and bring in daylight', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/10.-Material-Palette-of-exposed-rubble-and-wood.jpg', thumb: '/img/villa/anandvilla/10anandvilla.jpg', title: 'Material Palette of exposed rubble and wood', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/11.-Peaceful-meditation-hall-capturing-cosmic-energy.jpg', thumb: '/img/villa/anandvilla/11anandvilla.jpg', title: 'Peaceful meditation hall capturing cosmic energy', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/12.-Faceted-Balconies.jpg', thumb: '/img/villa/anandvilla/12anandvilla.jpg', title: 'Faceted Balconies', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/13.-Pyramid-roof-above-meditation-hall.jpg', thumb: '/img/villa/anandvilla/13anandvilla.jpg', title: 'Pyramid roof above meditation hall', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/14.-Conceptual-planning-Ground-Floor.jpg', thumb: '/img/villa/anandvilla/14anadvilla.jpg', title: 'Conceptual planning Ground Floor', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/15.-Conceptual-planning-First-Floor.jpg', thumb: '/img/villa/anandvilla/15anandvilla.jpg', title: 'Conceptual planning First Floor', description: 'Describe About Image' },
            { src: '/img/villa/anandvilla/16.-Conceptual-planning-Second-Floor.jpg', thumb: '/img/villa/anandvilla/16anandvilla.jpg', title: 'Conceptual planning Second Floor', description: 'Describe About Image' }
        ],
        relatedProjects: ['shunyam-pune', 'aapulki', 'saj']
    },
    'bhansali-landmarks': {
        id: 'bhansali-landmarks',
        title: 'Corporate Office For Bhansali Landmarks',
        category: 'corporate',
        heroImage: '/img/corporate/bhansali-landmarks/bhansali-landmarks-bg.jpg',
        description: [
            "The office is situated on the first floor of a commercial complex, enveloped by clear glazing, maximizing the sense of openness among internal spaces. The office is designed to ensure maximum efficiency in space utilization, apart from flexibility of use. The floorplate is divided into two distinct zones; a corporate office for the clients as well as leasable offices for tenants. Demountable partitions are used to provide for leasable offices to be converted into extended office space for the client.",
            "Visual transparency breaks barriers between office employees, creating an ambience of harmonious collaboration. White ceilings give the office a spacious feel, while furnishings and perforated gypsum ceilings ensure efficient acoustic control. Glass paneling and efficient lighting enhance the ambience of common spaces, while all round glazing lends picturesque views to all working and recreational areas."
        ],
        details: {
            location: 'Sangamwadi, Pune, Maharashtra',
            status: 'Completed',
            carpetArea: '4578 Sq Ft.'
        },
        gallery: [
            { src: '/img/corporate/bhansali-landmarks/1-bg.jpg', thumb: '/img/corporate/bhansali-landmarks/1-thumb.jpg', title: 'Layout Plan', description: 'Describe About Image' },
            { src: '/img/corporate/bhansali-landmarks/2-bg.jpg', thumb: '/img/corporate/bhansali-landmarks/2-thumb.jpg', title: 'Section A-A', description: 'Describe About Image' },
            { src: '/img/corporate/bhansali-landmarks/3-bg.jpg', thumb: '/img/corporate/bhansali-landmarks/3-thumb.jpg', title: 'Section B-B', description: 'Describe About Image' },
            { src: '/img/corporate/bhansali-landmarks/4-bg.jpg', thumb: '/img/corporate/bhansali-landmarks/4-thumb.jpg', title: 'Open plan workspace', description: 'Describe About Image' },
            { src: '/img/corporate/bhansali-landmarks/5-bg.jpg', thumb: '/img/corporate/bhansali-landmarks/5-thumb.jpg', title: 'Workstations overlooking green views below', description: 'Describe About Image' },
            { src: '/img/corporate/bhansali-landmarks/6-bg.jpg', thumb: '/img/corporate/bhansali-landmarks/6-thumb.jpg', title: 'Collaborative work area', description: 'Describe About Image' }
        ],
        relatedProjects: ['suzlon-one-earth', 'nyati-unitree', 'goyal-group']
    },
    'blue-bird': {
        id: 'blue-bird',
        title: 'Blue Bird',
        category: 'cozy-homes',
        heroImage: '/img/cozy_homes/blue-bird/blue-bird-bg.jpg',
        description: [
            "A homely suburban dwelling at Nigdi, Pune; the Blue Bird symbolizes through its form, an azure avian perched peacefully on a hillock in the green environs of a sanctuary; ready to take flight, yet still rooted to the soil.",
            "Approached by a modest sliding gate, the residence is fenced by an exposed brick compound wall, its square openings connecting the site with its surroundings. The massing of the building has been planned along an imposed grid of parallel planes oriented North-South on the ground floor, and from the East to West on the first floor; the criss cross beams supported by concealed columns. The ground floor, comprising the semi-private areas of living, family, dining room and kitchen; is rendered in exposed brick with long span arches punctuating the parallel walls. The entrance to the main lobby is through a series of such arched openings that define pathways, sit outs and utility areas, while further connecting the interior spaces with the private garden.",
            "A double height living room flows into the dining area, delicately demarcated by a metal staircase, further opening out into the private backyard through the verandah. A circular cutout with cylindrical glass tubes castsdynamic light-shadow outlines on the walls of the living area. All the rooms on the ground floor have been furnished in red, yellow, blue and green, adding splashes of colour to the earthy tones of the exposed brickwork.",
            "The parallel walls on the first floor extend into vertical fins along the large windows to the East and West, protecting and shading the private spaces like the bedroom, study, lobby and meditation room. Smaller openings along the north and south provide connection with the outside, as linear skylights at terrace level illuminate the rooms on this first floor. The walls on the first floor are finished in royal blue, complementing the raw brick finish below; while seemingly connecting the upper floor with the sky.",
            "An overhead water tank, enclosed by grey angular walls, forming a rising ‘V’ shape; resembles the wings of a bird preparing for flight. Symbolic and unique, the water tank acts as an elevational feature, complementing the dynamic form of the building below.",
            "The bedrooms are provided with gently sloping roofs while the meditation room has a pyramidal roof profile; both complete with photovoltaic panels for green energy. Bathrooms are visually linked with their respective bedrooms through clear glass partitions, their skylights, naturally illuminating the free-flowing private space.",
            "The Blue Bird encompasses the literal manifestation of the principles of organic architecture, its earthy material palette and perforated built mass promoting the subtle fusion of interior and exterior space. The Landscaping features like the lawn, water body, benches, pathways and planters too, reflect the natural material tones, acting as an extension of the interior spaces. The subtle blend of Architectural and interior elements with the landscape ensures harmony between the inhabitant and his natural environment, promoting the formation of a spiritual bond between man and nature."
        ],
        details: {
            location: 'Nigdi, Pune, Maharashtra',
            status: 'Completed',
            totalPlotArea: '487 Sq mt.',
            builtUpArea: '344 Sq mt.'
        },
        gallery: [
            { src: '/img/cozy_homes/blue-bird/1-bg.jpg', thumb: '/img/cozy_homes/blue-bird/1-thumb.jpg', title: 'Front view: Large windows and vertical fins', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/2-bg.jpg', thumb: '/img/cozy_homes/blue-bird/2-thumb.jpg', title: 'South View: a ‘V’ shaped water tank rises towards the sky like a bird ready for flight', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/3-bg.jpg', thumb: '/img/cozy_homes/blue-bird/3-thumb.jpg', title: 'Living area opens up into a large verandah and private garden', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/4-bg.jpg', thumb: '/img/cozy_homes/blue-bird/4-thumb.jpg', title: 'Arched openings rendered in brick, define pathways', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/5-bg.jpg', thumb: '/img/cozy_homes/blue-bird/5-thumb.jpg', title: 'Arches leading upto a cascading waterfall', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/6-bg.jpg', thumb: '/img/cozy_homes/blue-bird/6-thumb.jpg', title: 'Water feature detail', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/7-bg.jpg', thumb: '/img/cozy_homes/blue-bird/7-thumb.jpg', title: 'Garden Bench', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/8-bg.jpg', thumb: '/img/cozy_homes/blue-bird/8-thumb.jpg', title: 'Grill and gutter detail', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/9-bg.jpg', thumb: '/img/cozy_homes/blue-bird/9-thumb.jpg', title: 'Double height living room with built in furniture', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/10-bg.jpg', thumb: '/img/cozy_homes/blue-bird/10-thumb.jpg', title: 'Staircase partitioning living and dining zones', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/11-bg.jpg', thumb: '/img/cozy_homes/blue-bird/11-thumb.jpg', title: 'Bedroom space extending into the bathroom as a single private space', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/12-bg.jpg', thumb: '/img/cozy_homes/blue-bird/12-thumb.jpg', title: 'Blue Bird: Exterior view', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/13-bg.jpg', thumb: '/img/cozy_homes/blue-bird/13-thumb.jpg', title: 'Floor Plan: Ground Floor', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/14-bg.jpg', thumb: '/img/cozy_homes/blue-bird/14-thumb.jpg', title: 'Floor Plan: First Floor', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/15-bg.jpg', thumb: '/img/cozy_homes/blue-bird/15-thumb.jpg', title: 'Roof Plan', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/16-bg.jpg', thumb: '/img/cozy_homes/blue-bird/16-thumb.jpg', title: 'Section A-A', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/17-bg.jpg', thumb: '/img/cozy_homes/blue-bird/17-thumb.jpg', title: 'Section B-B', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/18-bg.jpg', thumb: '/img/cozy_homes/blue-bird/18-thumb.jpg', title: 'Front Elevation', description: 'Describe About Image' },
            { src: '/img/cozy_homes/blue-bird/19-bg.jpg', thumb: '/img/cozy_homes/blue-bird/19-thumb.jpg', title: 'South Elevation', description: 'Describe About Image' }
        ],
        relatedProjects: ['courtyard-house', 'shunyam-pune', 'aapulki']
    },
  'bungalow-at-national-society': {
    id: 'bungalow-at-national-society',
    title: 'Bungalow at National Society',
    category: 'cozyhomes',
    heroImage: '/img/cozy_homes/bungalow-at-national-society/bungalow-at-national-society-bg.jpg',
    description: [
      'Designed for a family of four, this bungalow captures the elegance and luxury of compact living within its modest footprint. A modern projecting façade shades its front lawn, integrated with a waterfall and a cabana seating, and overlooked by a verandah sitout.',
      'An arched walkway connects the front lawn with a landscaped court to the rear of the house, acting as an alternative guest entry. Inside the house, a double height court acts as a welcoming foyer, leading upto a double height dining and living area.',
      'A formal living room looks over the front lawn and entrance lobby, through 3 glazed walls. The upper floor houses private bedrooms for all family members, arranged around the central court below. The planning ensures private sit-out terraces for all family members, as a means of connecting the residents with their natural surroundings.',
      'A multipurpose family room incorporates various hobby and recreational activities, while looking out to an elongated balcony. A curved roof sits atop the family floor, breaking the monotony of straight lines along the façade. All in all, the house ensures comfort and class, truly justifying the needs of the inhabitant family.'
    ],
    details: {
      location: 'National Society, Pune',
      status: 'Ongoing',
      area: '767 Sq mt. (Plot) / 725 Sq mt. (Built up)'
    },
    gallery: [
      { src: '/img/cozy_homes/bungalow-at-national-society/1-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-national-society/1-thumb.jpg', title: 'South View' },
      { src: '/img/cozy_homes/bungalow-at-national-society/2-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-national-society/2-thumb.jpg', title: 'Entrance Gate' },
      { src: '/img/cozy_homes/bungalow-at-national-society/3-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-national-society/3-thumb.jpg', title: 'Entry Porch' },
      { src: '/img/cozy_homes/bungalow-at-national-society/4-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-national-society/4-thumb.jpg', title: 'Bird’s eye view of front lawn' },
      { src: '/img/cozy_homes/bungalow-at-national-society/5-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-national-society/5-thumb.jpg', title: 'View from North' },
      { src: '/img/cozy_homes/bungalow-at-national-society/6-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-national-society/6-thumb.jpg', title: 'Front Verandah Siteout' },
      { src: '/img/cozy_homes/bungalow-at-national-society/7-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-national-society/7-thumb.jpg', title: 'West View' },
      { src: '/img/cozy_homes/bungalow-at-national-society/8-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-national-society/8-thumb.jpg', title: 'Interior View: dining room' },
      { src: '/img/cozy_homes/bungalow-at-national-society/9-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-national-society/9-thumb.jpg', title: 'Informal living and dining area' },
      { src: '/img/cozy_homes/bungalow-at-national-society/10-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-national-society/10-thumb.jpg', title: 'Family room overlooking dining room' },
      { src: '/img/cozy_homes/bungalow-at-national-society/11-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-national-society/11-thumb.jpg', title: 'Bedroom 1 design' },
      { src: '/img/cozy_homes/bungalow-at-national-society/12-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-national-society/12-thumb.jpg', title: 'Bedroom 1 interior view' },
      { src: '/img/cozy_homes/bungalow-at-national-society/13-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-national-society/13-thumb.jpg', title: 'Ground Floor Plan' },
      { src: '/img/cozy_homes/bungalow-at-national-society/14-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-national-society/14-thumb.jpg', title: 'First Floor Plan' },
      { src: '/img/cozy_homes/bungalow-at-national-society/15-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-national-society/15-thumb.jpg', title: 'Section A-A' }
    ],
    relatedProjects: ['courtyard-house', 'shunyam-pune', 'aapulki']
  },
  'gujarati-bandhu-samaj-campus': {
    id: 'gujarati-bandhu-samaj-campus',
    title: 'Gujarati Bandhu Samaj Campus',
    category: 'institutional',
    heroImage: '/img/institution/gujarati-bandhu-samaj-campus/gujarati-bandhu-samaj-campus-bg.jpg',
    description: [
      'The Gujarati Bandhu Samaj is an ardent promoter of Gujarati culture, its initiatives facilitate the organization of traditional events and community gatherings, while providing a platform for social interaction to students and the Gujarati community residing in Pune.',
      'Designed to sit on a 5.7 acre triangular plot in the Bibewadi suburb of Pune, the Gujarat Bhawan was conceived as an encapsulation of the Gujarati lifestyle and culture in a single unified campus.',
      'The varied functional zones are massed into two blocks, one accommodating the educational and residential facilities; while cultural and community activities are housed in the other. Segregated pedestrian and vehicular circulation patterns allow Independent access for the two buildings, apportioning the site into smaller wedges on the ground level. 3 basement levels provide essential parking space.',
      'The educational building is planned to the South-West of the site, its lower ground floor incorporating a library, conference rooms and administrative offices, along with waiting lounges and meeting rooms. The upper three floors are composed of classrooms arranged at the periphery of the block, cashing in on working daylight, thereby reducing the building’s electrical load by a considerable level.',
      'Upward from the third floor and extending till the eighth, lies the residential wing for boarding students, with 4-bedded dormitories at the peripheries. The community building houses a double height waiting lobby, opening out to a multi-purpose party lawn. Above, a community hall stands on stilts. The first floor accommodates a dining hall, pre-function lobbies and multi-purpose halls. The second floor incorporates a dining hall and kitchen. Above this level lie 5 floors of guest accommodation.'
    ],
    details: {
      location: 'Pune, Maharashtra',
      status: 'Design Proposal selected, sanctioning in progress',
      area: '23,180 Sq mt. (Plot) / 29,591 Sq mt. (Built up)'
    },
    gallery: [
      { src: '/img/institution/gujarati-bandhu-samaj-campus/1-bg.jpg', thumb: '/img/institution/gujarati-bandhu-samaj-campus/1-thumb.jpg', title: 'Project Overview' },
      { src: '/img/institution/gujarati-bandhu-samaj-campus/2-bg.jpg', thumb: '/img/institution/gujarati-bandhu-samaj-campus/2-thumb.jpg', title: '3D: zoning' },
      { src: '/img/institution/gujarati-bandhu-samaj-campus/3-bg.jpg', thumb: '/img/institution/gujarati-bandhu-samaj-campus/3-thumb.jpg', title: 'Sun path' },
      { src: '/img/institution/gujarati-bandhu-samaj-campus/5-bg.jpg', thumb: '/img/institution/gujarati-bandhu-samaj-campus/5-thumb.jpg', title: 'North View' },
      { src: '/img/institution/gujarati-bandhu-samaj-campus/6-bg.jpg', thumb: '/img/institution/gujarati-bandhu-samaj-campus/6-thumb.jpg', title: 'Residential block overlooking recreational court' },
      { src: '/img/institution/gujarati-bandhu-samaj-campus/7-bg.jpg', thumb: '/img/institution/gujarati-bandhu-samaj-campus/7-thumb.jpg', title: 'North-West View' },
      { src: '/img/institution/gujarati-bandhu-samaj-campus/8-bg.jpg', thumb: '/img/institution/gujarati-bandhu-samaj-campus/8-thumb.jpg', title: 'Bird’s eye view: recreational court' },
      { src: '/img/institution/gujarati-bandhu-samaj-campus/9-bg.jpg', thumb: '/img/institution/gujarati-bandhu-samaj-campus/9-thumb.jpg', title: 'Bird’s eye view from North' },
      { src: '/img/institution/gujarati-bandhu-samaj-campus/10-bg.jpg', thumb: '/img/institution/gujarati-bandhu-samaj-campus/10-thumb.jpg', title: '3D visualization' }
    ],
    relatedProjects: ['suzlon-corporate-learning-centre', 'wind-dunes', 'suzlon-excellence-academy']
  },
  'holistik-wellness-retreat': {
    id: 'holistik-wellness-retreat',
    title: 'Holistic Wellness Retreat',
    category: 'hospitality',
    heroImage: '/img/hospitality/holistik-wellness-retreat/holistik-wellness-retreat-bg.jpg',
    description: [
      'It\'s a privilege to contribute to creating an antidote to urban chaos and health issues on many fronts. This Project thrives to provide a touching centre of oneself while being in the lap of nature.'
    ],
    details: {
      location: 'Kudje, Pune',
      status: 'Ongoing',
      area: '55 Acres (Plot) / 16,723 Sq mt. (Built up)'
    },
    gallery: [
      { src: '/img/hospitality/holistik-wellness-retreat/1-bg.jpg', thumb: '/img/hospitality/holistik-wellness-retreat/1-thumb.jpg', title: 'Double Height formal living' },
      { src: '/img/hospitality/holistik-wellness-retreat/2-bg.jpg', thumb: '/img/hospitality/holistik-wellness-retreat/2-thumb.jpg', title: 'Welcoming Entrance Lobby' },
      { src: '/img/hospitality/holistik-wellness-retreat/3-bg.jpg', thumb: '/img/hospitality/holistik-wellness-retreat/3-thumb.jpg', title: 'Transitional Verandah' },
      { src: '/img/hospitality/holistik-wellness-retreat/4-bg.jpg', thumb: '/img/hospitality/holistik-wellness-retreat/4-thumb.jpg', title: 'Cozy low height Dining' },
      { src: '/img/hospitality/holistik-wellness-retreat/5-bg.jpg', thumb: '/img/hospitality/holistik-wellness-retreat/5-thumb.jpg', title: 'Powder room' }
    ],
    relatedProjects: ['aurum', 'gods-blessing', 'konark']
  },
  'kumar-papillon': {
    id: 'kumar-papillon',
    title: 'Kumar Papillon',
    category: 'housing',
    heroImage: '/img/housing/kumar-papillon/kumar-papillon-thumb.jpg',
    description: [
      'Amidst the greenery of Pashan valley, the Kumar Papillon residences sit on a linear site, spread out along 3 eye-shaped blocks.',
      '2 and 3bhk residences laid out on each floor of the curvilinear building blocks capture views of the surrounding greenery, at various angles along the curves.',
      'Ramps and double parking ensure easy circulation along the sloped terrain of the site, while landscaped gardens and a clubhouse accommodate recreational and leisure spaces to the South.'
    ],
    details: {
      location: 'Pashan, Pune',
      status: 'Completed',
      area: '7500 sq mt. (Plot) / 7835.50 sq mt. (Built up)'
    },
    gallery: [
      { src: '/img/housing/kumar-papillon/1-bg.jpg', thumb: '/img/housing/kumar-papillon/1-thumb.jpg', title: 'Site Layout' },
      { src: '/img/housing/kumar-papillon/2-bg.jpg', thumb: '/img/housing/kumar-papillon/2-thumb.jpg', title: 'East Elevation' },
      { src: '/img/housing/kumar-papillon/3-bg.jpg', thumb: '/img/housing/kumar-papillon/3-thumb.jpg', title: 'South View' },
      { src: '/img/housing/kumar-papillon/4-bg.jpg', thumb: '/img/housing/kumar-papillon/4-thumb.jpg', title: 'View: Entry' },
      { src: '/img/housing/kumar-papillon/5-bg.jpg', thumb: '/img/housing/kumar-papillon/5-thumb.jpg', title: 'Visualized clubhouse' },
      { src: '/img/housing/kumar-papillon/6-bg.jpg', thumb: '/img/housing/kumar-papillon/6-thumb.jpg', title: 'Project Overview' }
    ],
    relatedProjects: ['kumar-platinum', 'shiloh', 'kumar-pacific']
  },
  'queens-garden': {
    id: 'queens-garden',
    title: 'Queens Garden Bungalow',
    category: 'luxuryvillas',
    heroImage: '/img/villa/queen-garden/queen-bg.jpg',
    description: [
      '“A royal bungalow takes curvaceous feminine forms as it sits gracefully amidst the greenery of a lush manicured lawn in the prominent Queens Garden locality of Pune.”',
      'The 5-bedroom residence is defined by a curved roof that provides playful volumes to the interior spaces, while imparting an iconic form to the architecture. The entrance porch and parking lot are defined by a sinuous overhang supported on angular perforated walls. Inside the house, hand blown glass pendant lights add a splash of colour to the earthy, minimalist foyer. The central lobby is a bright double height space, daylit by skylights and clearstory windows.',
      'The staircase shaft extends upward to form a water tank, as the landing platform extends sideways to form a connecting bridge between bedrooms on the first floor. Openings in the wave-form of the roof allow passive cross ventilation, apart from admitting plentiful daylight into the living spaces. The building envelope, dotted with circular openings, allows ringed views of the lush lawn beyond.',
      'A minimalistic approach to ornamentation, combined with an earthy colour palette composed of white walls, beige floor tiles and walnut wood finishes allows a neutral canvas for the introduction for colourful artwork, complementing the framed views of greenery surrounding the house. The Queen’s Garden Bungalow is an embodiment of technical expertise and immaculate attention to detail; its luxurious living spaces and sophisticated ornamentation fit for no less than a royal family.'
    ],
    details: {
      location: 'Queens Garden, Pune',
      status: 'Completed',
      area: '1503 Sq. mt. (Plot) / 611 Sq. mt. (Built up)'
    },
    gallery: [
      { src: '/img/villa/queen-garden/1queen.jpg', thumb: '/img/villa/queen-garden/1queen.jpg', title: 'The curving roof' },
      { src: '/img/villa/queen-garden/2queen.jpg', thumb: '/img/villa/queen-garden/2queen.jpg', title: 'Entrance Porch' },
      { src: '/img/villa/queen-garden/3queen.jpg', thumb: '/img/villa/queen-garden/3queen.jpg', title: 'Entrance Foyer' },
      { src: '/img/villa/queen-garden/4queen.jpg', thumb: '/img/villa/queen-garden/4queen.jpg', title: 'Central Lobby' },
      { src: '/img/villa/queen-garden/5queen.jpg', thumb: '/img/villa/queen-garden/5queen.jpg', title: 'Formal Living' },
      { src: '/img/villa/queen-garden/6queen.jpg', thumb: '/img/villa/queen-garden/6queen.jpg', title: 'Dining Room' },
      { src: '/img/villa/queen-garden/7queen.jpg', thumb: '/img/villa/queen-garden/7queen.jpg', title: 'Framed garden views' },
      { src: '/img/villa/queen-garden/8queen.jpg', thumb: '/img/villa/queen-garden/8queen.jpg', title: 'Manicured lawns' },
      { src: '/img/villa/queen-garden/9queen.jpg', thumb: '/img/villa/queen-garden/9queen.jpg', title: 'Flow of Space' },
      { src: '/img/villa/queen-garden/10queen.jpg', thumb: '/img/villa/queen-garden/10queen.jpg', title: 'Monochromes and pastels' },
      { src: '/img/villa/queen-garden/11queen.jpg', thumb: '/img/villa/queen-garden/11queen.jpg', title: 'Vibrant artwork' },
      { src: '/img/villa/queen-garden/12queen.jpg', thumb: '/img/villa/queen-garden/12queen.jpg', title: 'Conceptual Plan' },
      { src: '/img/villa/queen-garden/13queen.jpg', thumb: '/img/villa/queen-garden/13queen.jpg', title: 'Conceptual Section' },
      { src: '/img/villa/queen-garden/14queen.jpg', thumb: '/img/villa/queen-garden/14queen.jpg', title: 'Ground Floor Plan' },
      { src: '/img/villa/queen-garden/15queen.jpg', thumb: '/img/villa/queen-garden/15queen.jpg', title: 'First Floor Plan' },
      { src: '/img/villa/queen-garden/16queen.jpg', thumb: '/img/villa/queen-garden/16queen.jpg', title: 'Section C-C\'' }
    ],
    relatedProjects: ['shunyam-jodhpur', 'paradiso', 'onella']
  },
  'sky-station': {
    id: 'sky-station',
    category: 'commercial',
    title: 'Sky Station',
    heroImage: '/img/commercial/sky-station/sky-station-bg.jpg',
    description: [
      'Multi occupancy commercial offices at Viman Nagar',
      'Location : Viman Nagar, Pune, Maharashtra',
      'Status : Completed',
      'Total Plot Area : 3500 sq mt.',
      'Total Built up Area : 5760 sq mt.',
      'Total Commercial carpet area : 4732 Sq mt.',
      'A multi occupancy development, the Sky Station accommodates commercial offices of different scales, linked with their respective utility spaces through an open street like circulation pattern. A detached staircase and elevator lobby allows interesting views across the shared common zones. The modular offices are laid out row-wise along 3 sides of the central atrium space, allowing maximum daylight and ventilation into the building.',
      'The terrace is designed as an open public space, shaded by a space frame to reduce thermal gains. The terrace is a common zone, to be shared & utilized by the building occupants for various recreational activities. High performance glass cladding along the East, South and West, and clear glass along the North, allow maximum working daylight into the office spaces. A parking podium integrates services and maintenance activities. Universal design principles are utilized in making the entire campus a barrier free zone, with careful consideration to branding, signage and visual and physical access.'
    ],
    details: {
      location: 'Viman Nagar, Pune, Maharashtra',
      status: 'Completed',
      plotArea: '3500 sq mt.',
      builtUpArea: '5760 sq mt.'
    },
    gallery: [
      { src: '/img/commercial/sky-station/1-bg.jpg', thumb: '/img/commercial/sky-station/1-thumb.jpg', title: 'Commercial Spaces linked by a detached circulation core' },
      { src: '/img/commercial/sky-station/2-bg.jpg', thumb: '/img/commercial/sky-station/2-thumb.jpg', title: 'Conceptual Sketch: Plan' },
      { src: '/img/commercial/sky-station/3-bg.jpg', thumb: '/img/commercial/sky-station/3-thumb.jpg', title: 'Conceptual Sketch: Section' },
      { src: '/img/commercial/sky-station/4-bg.jpg', thumb: '/img/commercial/sky-station/4-thumb.jpg', title: 'Conceptual Sketch: Structural Design' },
      { src: '/img/commercial/sky-station/5-bg.jpg', thumb: '/img/commercial/sky-station/5-thumb.jpg', title: 'Project view from North West' },
      { src: '/img/commercial/sky-station/6-bg.jpg', thumb: '/img/commercial/sky-station/6-thumb.jpg', title: 'Entrance Foyer' },
      { src: '/img/commercial/sky-station/7-bg.jpg', thumb: '/img/commercial/sky-station/7-thumb.jpg', title: 'View from South East' },
      { src: '/img/commercial/sky-station/8-bg.jpg', thumb: '/img/commercial/sky-station/8-thumb.jpg', title: 'Atrium upward view' },
      { src: '/img/commercial/sky-station/9-bg.jpg', thumb: '/img/commercial/sky-station/9-thumb.jpg', title: '09.Circulation space' },
      { src: '/img/commercial/sky-station/10-bg.jpg', thumb: '/img/commercial/sky-station/10-thumb.jpg', title: 'Circulation bridges' },
      { src: '/img/commercial/sky-station/11-bg.jpg', thumb: '/img/commercial/sky-station/11-thumb.jpg', title: 'Detached staircase' },
      { src: '/img/commercial/sky-station/15-bg.jpg', thumb: '/img/commercial/sky-station/15-thumb.jpg', title: 'Longitudinal Section' }
    ],
    relatedProjects: ['suyog-navkaar', 'sky-max', 'nyati-unitree-commercial']
  },
  'sujin-bungalow': {
    id: 'sujin-bungalow',
    category: 'cozyhomes',
    title: 'Sujin Bungalow',
    heroImage: '/img/cozy_homes/bungalow-at-baner/bungalow-at-baner-bg.jpg',
    description: [
      'Linear luxury',
      'Location : Abhimanshri Society, Baner, Pune',
      'Status : Ongoing',
      'Total Plot area : 504 Sq mt.',
      'Built up Area : 510 Sq mt.',
      'Carpet Area : 424 Sq mt.',
      'Situated on a linear plot in an upcoming suburb in Pune, this 4 storey bungalow houses a large joint family. A modern vocabulary and efficient planning ensure optimum usage of space and landscape, while ensuring opportunities for indoor-outdoor connection. The ground floor houses family spaces including an informal living, dining and kitchen, apart from two landscaped outdoor sitouts. The staircase has been employed as an architectural feature connecting the floors across the house. Glass partitions act as railings, allowing visual transparency and passive air circulation. On the first floor, the staircase landing acts as a casual lobby, leading upto a large formal living, overlooking the busy front road, bathed in daylight through full height glazing. The master bedroom lies on the same floor, supported by a walk-in wardrobe and toilet. The second floor accommodates a study cum library, along with 3 bedrooms. The terrace features a quaint rooftop garden and jacuzzi overlooking the children’s play area outside, effectively connecting the residents with their surrounding landscape. The interiors reflect tones of white, widening out the linear built mass. Bright accents of colour add vibrance to the furnishings, complementing occasional artwork and decorative elements.'
    ],
    details: {
      location: 'Abhimanshri Society, Baner, Pune',
      status: 'Ongoing',
      plotArea: '504 Sq mt.',
      builtUpArea: '510 Sq mt.'
    },
    gallery: [
      { src: '/img/cozy_homes/bungalow-at-baner/1-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-baner/1-thumb.jpg', title: 'East View across main road' },
      { src: '/img/cozy_homes/bungalow-at-baner/2-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-baner/2-thumb.jpg', title: 'South View' },
      { src: '/img/cozy_homes/bungalow-at-baner/3-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-baner/3-thumb.jpg', title: 'Bird’s eye view' },
      { src: '/img/cozy_homes/bungalow-at-baner/4-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-baner/4-thumb.jpg', title: 'Formal Living' },
      { src: '/img/cozy_homes/bungalow-at-baner/5-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-baner/5-thumb.jpg', title: 'Staircase lobby' },
      { src: '/img/cozy_homes/bungalow-at-baner/6-bg.jpg', thumb: '/img/cozy_homes/bungalow-at-baner/6-thumb.jpg', title: 'Son’s Toilet' }
    ],
    relatedProjects: ['courtyard-house', 'shunyam-pune', 'aapulki']
  },
  'villa-at-forest-trails': {
    id: 'villa-at-forest-trails',
    category: 'luxuryvillas',
    title: 'Villas at Forest Trails',
    heroImage: '/img/villa/villa-at-forest-trails/villa-at-forest-trails-bg.jpg',
    description: [
      'Woodland Estates',
      'Location : Forest Trails, Bhugaon, Pune',
      'Status : Ongoing',
      'Plot area : 7 acres',
      'Built up Area : 4400 Sq mt.',
      'Carpet Area : 3000 Sq mt.',
      'The project is composed of 2 luxury villas for the families of two brothers, on adjoining plots at Forest Trails. The villas sit on a contoured piece of land, rendered in natural stone and hugging the rugged landscape. Both villas are accessed by their own approach road, accommodating independent services and recreational functions.',
      'Villa-1 is a 5-bedroom mansion designed to accommodate a joint family. Slanted stone clad walls punctuated by arched openings lead one into the double height entrance foyer, which opens out into a large skylit central court. A glazed formal living and dining room positioned on two sides of the court capture views both to the interior court and exterior greens. Beyond the central court, lie the common family spaces, including the bar, family living and dining, kitchen and utility spaces. On the first floor, the central court takes an octagonal shape, surrounded by a family room and bedrooms, each connected with their own private terraces. Living spaces capture stunning views of the green environs of the villa, connecting the residents with their natural landscape.',
      'Villa-2 centers all living spaces around a circular double height landscaped court creating a daylit, well ventilated entrance foyer. The open court is flanked by a family living and dining room, overlooking their private verandah courts, and views of the vast green landscape beyond. The family spaces extend into the recreational zone, accommodating a large swimming pool, verandah and party deck. A home theatre and bedrooms, each with their own private sit-outs, are arranged along the central court on the upper floor. The verandahs dotting all sides of the open court allow green views into all living spaces, while connecting them with their natural landscape.'
    ],
    details: {
      location: 'Forest Trails, Bhugaon, Pune',
      status: 'Ongoing',
      plotArea: '7 acres',
      builtUpArea: '4400 Sq mt.'
    },
    gallery: [
      { src: '/img/villa/villa-at-forest-trails/4-bg.jpg', thumb: '/img/villa/villa-at-forest-trails/4-thumb.jpg', title: 'Bird’s Eye View' },
      { src: '/img/villa/villa-at-forest-trails/5-bg.jpg', thumb: '/img/villa/villa-at-forest-trails/5-thumb.jpg', title: 'Entrance Porch' },
      { src: '/img/villa/villa-at-forest-trails/6-bg.jpg', thumb: '/img/villa/villa-at-forest-trails/6-thumb.jpg', title: 'Rear View' },
      { src: '/img/villa/villa-at-forest-trails/7-bg.jpg', thumb: '/img/villa/villa-at-forest-trails/7-thumb.jpg', title: 'Hugging the contours' },
      { src: '/img/villa/villa-at-forest-trails/8-bg.jpg', thumb: '/img/villa/villa-at-forest-trails/8-thumb.jpg', title: 'Arched entrance' },
      { src: '/img/villa/villa-at-forest-trails/9-bg.jpg', thumb: '/img/villa/villa-at-forest-trails/9-thumb.jpg', title: 'Villa 1 front view' },
      { src: '/img/villa/villa-at-forest-trails/13-bg.jpg', thumb: '/img/villa/villa-at-forest-trails/13-thumb.jpg', title: 'Rear recreational deck' },
      { src: '/img/villa/villa-at-forest-trails/14-bg.jpg', thumb: '/img/villa/villa-at-forest-trails/14-thumb.jpg', title: 'Entrance porch' },
      { src: '/img/villa/villa-at-forest-trails/15-bg.jpg', thumb: '/img/villa/villa-at-forest-trails/15-thumb.jpg', title: 'Villa 2: front view' },
      { src: '/img/villa/villa-at-forest-trails/16-bg.jpg', thumb: '/img/villa/villa-at-forest-trails/16-thumb.jpg', title: 'Recreational deck' }
    ],
    relatedProjects: ['shunyam-pune', 'aapulki', 'saj']
  },
  'lighting': {
    id: 'lighting',
    category: 'installations',
    title: 'Lighting',
    heroImage: '/img/installations/lighting/lighting-bg.jpg',
    description: [
      'Charismatic Luminaires',
      'Design has no boundaries, and at Tao, we visualize a space in its entirety, irrespective of scale, domain or detail. With concepts for relevant products developed at TAO Studio, the execution has been a fruit of coordination and collaboration with talented artists, artisans, contractors and agencies from all over India and across the globe.'
    ],
    details: {
      status: 'Completed'
    },
    gallery: [
      { src: '/img/installations/lighting/1-bg.jpg', thumb: '/img/installations/lighting/1-thumb.jpg', title: 'Dining Lights, Nest Bungalow' },
      { src: '/img/installations/lighting/2-bg.jpg', thumb: '/img/installations/lighting/2-thumb.jpg', title: 'Dining Lights, God’s Blessing' },
      { src: '/img/installations/lighting/3-bg.jpg', thumb: '/img/installations/lighting/3-thumb.jpg', title: 'Glass Pendants, O’nella' },
      { src: '/img/installations/lighting/4-bg.jpg', thumb: '/img/installations/lighting/4-thumb.jpg', title: 'Blown Glass chandelier, Queen’s Garden' },
      { src: '/img/installations/lighting/5-bg.jpg', thumb: '/img/installations/lighting/5-thumb.jpg', title: 'Branching Floorlamp, Nyati Unitree' },
      { src: '/img/installations/lighting/6-bg.jpg', thumb: '/img/installations/lighting/6-thumb.jpg', title: 'Teardrops light fixture, Napier Road Bungalow' }
    ],
    relatedProjects: ['entrance-gates', 'staircases', 'sculpture']
  },
  'artwork': {
    id: 'artwork',
    category: 'installations',
    title: 'Artwork',
    heroImage: '/img/installations/artwork/artwork-bg.jpg',
    description: [
      'Connotative Compositions',
      'Design has no boundaries, and at Tao, we visualize a space in its entirety, irrespective of scale, domain or detail. With concepts for relevant products developed at TAO Studio, the execution has been a fruit of coordination and collaboration with talented artists, artisans, contractors and agencies from all over India and across the globe.',
    ],
    details: {
      location: 'Pune, India',
      status: 'Completed',
    },
    gallery: [
      { src: '/img/installations/artwork/1-bg.jpg', thumb: '/img/installations/artwork/1-thumb.jpg', title: 'Maple in Autumn, Suzlon One Earth Corporate Campus' },
      { src: '/img/installations/artwork/2-bg.jpg', thumb: '/img/installations/artwork/2-thumb.jpg', title: 'Tree of Life, O’nella' },
      { src: '/img/installations/artwork/3-bg.jpg', thumb: '/img/installations/artwork/3-thumb.jpg', title: 'World map, Nyati Unitree' },
      { src: '/img/installations/artwork/4-bg.jpg', thumb: '/img/installations/artwork/4-thumb.jpg', title: 'Backlit forest hallway, Nyati Unitree' },
      { src: '/img/installations/artwork/5-bg.jpg', thumb: '/img/installations/artwork/5-thumb.jpg', title: 'Birds in the Sky artwork, Suzlon One Earth Corporate Campus' },
      { src: '/img/installations/artwork/6-bg.jpg', thumb: '/img/installations/artwork/6-thumb.jpg', title: 'Vintage Flora, Queen’s Garden' },
      { src: '/img/installations/artwork/7-bg.jpg', thumb: '/img/installations/artwork/7-thumb.jpg', title: 'Visual Screen, Aurum Penthouse' },
      { src: '/img/installations/artwork/8-bg.jpg', thumb: '/img/installations/artwork/8-thumb.jpg', title: 'Abstract Geometry, O’nella' },
      { src: '/img/installations/artwork/9-bg.jpg', thumb: '/img/installations/artwork/9-thumb.jpg', title: 'Geometric Partition, Napier Road Bungalow' },
      { src: '/img/installations/artwork/10-bg.jpg', thumb: '/img/installations/artwork/10-thumb.jpg', title: 'Canvas Panels, Napier Road Bungalow' },
      { src: '/img/installations/artwork/11-bg.jpg', thumb: '/img/installations/artwork/11-thumb.jpg', title: 'City map, Nyati Unitree' },
    ],
    relatedProjects: ['staircases', 'lighting', 'sculpture'],
  },
  'doors': {
    id: 'doors',
    category: 'products',
    title: 'Doors',
    heroImage: '/img/products/doors/doors-bg.jpg',
    description: [
      'Magnificent portals',
      'Design has no boundaries, and at Tao, we visualize a space in its entirety, irrespective of scale, domain or detail. With concepts for relevant products developed at TAO Studio, the execution has been a fruit of coordination and collaboration with talented artists, artisans, contractors and agencies from all over India and across the globe.',
    ],
    details: {
      location: 'Pune, India',
      status: 'Completed',
    },
    gallery: [
      { src: '/img/products/doors/1-bg.jpg', thumb: '/img/products/doors/1-thumb.jpg', title: 'Onyx Entrance Door, Nest Bungalow' },
      { src: '/img/products/doors/2-bg.jpg', thumb: '/img/products/doors/2-thumb.jpg', title: 'Tree of Life Gym Door, Nest bungalow' },
      { src: '/img/products/doors/3-bg.jpg', thumb: '/img/products/doors/3-thumb.jpg', title: 'Trapezoidal Entry door O’nella' },
    ],
    relatedProjects: ['desking-and-tables', 'wall-unit', 'sleeping-unit'],
  },
  'murals': {
    id: 'murals',
    category: 'installations',
    title: 'Murals',
    heroImage: '/img/installations/murals/murals-bg.jpg',
    description: [
      'Eclectic Creations',
      'Design has no boundaries, and at Tao, we visualize a space in its entirety, irrespective of scale, domain or detail. With concepts for relevant products developed at TAO Studio, the execution has been a fruit of coordination and collaboration with talented artists, artisans, contractors and agencies from all over India and across the globe.',
    ],
    details: {
      location: 'Pune, India',
      status: 'Completed',
    },
    gallery: [
      { src: '/img/installations/murals/1-bg.jpg', thumb: '/img/installations/murals/1-thumb.jpg', title: 'Perennial Blessings, Nyati Unitree' },
      { src: '/img/installations/murals/2-bg.jpg', thumb: '/img/installations/murals/2-thumb.jpg', title: 'Triple height glass mural, Suzlon One Earth Corporate Campus' },
      { src: '/img/installations/murals/3-bg.jpg', thumb: '/img/installations/murals/3-thumb.jpg', title: 'Gazing Beyond the Horizon, Nyati Unitree' },
      { src: '/img/installations/murals/4-bg.jpg', thumb: '/img/installations/murals/4-thumb.jpg', title: 'Autumn Leaves, Nyati Unitree' },
      { src: '/img/installations/murals/5-bg.jpg', thumb: '/img/installations/murals/5-thumb.jpg', title: 'Sunrays floor mosaic, Nest Bungalow' },
      { src: '/img/installations/murals/6-bg.jpg', thumb: '/img/installations/murals/6-thumb.jpg', title: 'Saraswati Backdrop, Suzlon One Earth Excellence Academy' },
    ],
    relatedProjects: ['staircases', 'lighting', 'sculpture'],
  },
  'seating': {
    id: 'seating',
    category: 'installations',
    title: 'Seating',
    heroImage: '/img/installations/seating/seating-bg.jpg',
    description: [
      'Comfy Couches',
      'Design has no boundaries, and at Tao, we visualize a space in its entirety, irrespective of scale, domain or detail. With concepts for relevant products developed at TAO Studio, the execution has been a fruit of coordination and collaboration with talented artists, artisans, contractors and agencies from all over India and across the globe.',
    ],
    details: {
      location: 'Pune, India',
      status: 'Completed',
    },
    gallery: [
      { src: '/img/installations/seating/1-bg.jpg', thumb: '/img/installations/seating/1-thumb.jpg', title: 'Ergonomic Lounge Seating, Nest Bungalow' },
      { src: '/img/installations/seating/2-bg.jpg', thumb: '/img/installations/seating/2-thumb.jpg', title: 'Jhoola Seating, O’nella Bungalow' },
      { src: '/img/installations/seating/3-bg.jpg', thumb: '/img/installations/seating/3-thumb.jpg', title: 'Suspended Skydeck, Paradiso' },
      { src: '/img/installations/seating/4-bg.jpg', thumb: '/img/installations/seating/4-thumb.jpg', title: 'Swastika seating, Suzlon Excellence Academy' },
      { src: '/img/installations/seating/5-bg.jpg', thumb: '/img/installations/seating/5-thumb.jpg', title: 'Interactive stepped seating, Suzlon Excellence Academy' },
      { src: '/img/installations/seating/6-bg.jpg', thumb: '/img/installations/seating/6-thumb.jpg', title: 'Jhoola, Master bedroom, Nest Bungalow' },
      { src: '/img/installations/seating/7-bg.jpg', thumb: '/img/installations/seating/7-thumb.jpg', title: 'Jhoola, Napier Road Bungalow' },
    ],
    relatedProjects: ['staircases', 'lighting', 'artwork'],
  },

  'suyog-navkaar': {
    id: 'suyog-navkaar',
    category: 'commercial',
    title: 'Suyog Navkaar',
    heroImage: '/img/commercial/suyog-navkaar/suyog-navkaar-bg.jpg',
    description: [
      'Mixed-use development at Swargate',
      'This project holds a retail strip creating active engagement on the ground floor, supported by a podium level parking lot, rising to 21 floors to accommodate residential units. The three residential blocks, Agam, Shruta and Kalpa are positioned in ‘C’ shape, housing 3 and 4BHK flats. A sky bridge connects the two arms of the ‘C’, allowing stunning views from the top.',
      'Dotted with leisure spots and amenity spaces, the set of interconnected buildings provides a harmonious living environment to potential inhabitants. Recreational zones are present at the top of the podium both in the interior and exterior drawing interest toward the center as well as on the terrace.',
      'Photovoltaic panels on the terrace, facilitate energy generation for solar water heating; while an on-site STP accommodates flushing and landscape water requirements, resulting in a sustainable and environment responsible design.',
    ],
    details: {
      location: 'Swargate, Pune, Maharashtra',
      status: 'Ongoing',
      area: '59000 sq mt.',
    },
    gallery: [
      { src: '/img/commercial/suyog-navkaar/1-bg.jpg', thumb: '/img/commercial/suyog-navkaar/1-thumb.jpg', title: '3D view: proposed structure' },
      { src: '/img/commercial/suyog-navkaar/2-bg.jpg', thumb: '/img/commercial/suyog-navkaar/2-thumb.jpg', title: 'Conceptual Sketch: massing' },
      { src: '/img/commercial/suyog-navkaar/7-bg.jpg', thumb: '/img/commercial/suyog-navkaar/7-thumb.jpg', title: 'Top view' },
      { src: '/img/commercial/suyog-navkaar/8-bg.jpg', thumb: '/img/commercial/suyog-navkaar/8-thumb.jpg', title: 'Recreational Podium' },
      { src: '/img/commercial/suyog-navkaar/9-bg.jpg', thumb: '/img/commercial/suyog-navkaar/9-thumb.jpg', title: 'Retail Strip' },
      { src: '/img/commercial/suyog-navkaar/10-bg.jpg', thumb: '/img/commercial/suyog-navkaar/10-thumb.jpg', title: 'Evening View' },
      { src: '/img/commercial/suyog-navkaar/11-bg.jpg', thumb: '/img/commercial/suyog-navkaar/11-thumb.jpg', title: 'Recreational Podium' },
      { src: '/img/commercial/suyog-navkaar/12-bg.jpg', thumb: '/img/commercial/suyog-navkaar/12-thumb.jpg', title: 'Birds Eye View' },
    ],
    relatedProjects: ['sky-max', 'sky-station'],
  },

  'suzlon-one-earth': {
    id: 'suzlon-one-earth',
    category: 'corporate',
    title: 'Suzlon One Earth Excellence Academy',
    heroImage: '/img/corporate/suzlon-one-earth/suzlon-one-earth-bg.jpg',
    description: [
      'Green Corporate Campus',
      'Interior design for 6 lac Sq.ft. of office space from macro to micro level in coordination with architecture, landscape & communication design.',
      'A holistic Design Concept was developed, focusing on Human well being, sensitive to the context of the Architecture and extending workzones toward the green exterior.',
      'The interiors are customized to the dynamics of the work culture, while resonating with the Architectural concepts of the campus. Various interesting spaces are generated such as pre-function lobbies, closed offices, open office, interactive bay, and breakout areas which help to segregate the various functional activities without disturbing the other zones.',
      'Being the headquarters of the Suzlon Energy Group, the project was conceived as a sustainable campus, incorporating environment conscious elements at every level. A conscious attempt towards sustainability has resulted in the project being granted the prestigious IGBC LEED Platinum certification and TERI GRIHA 5 Star Rating for Core, shell and interiors.',
      'INTERIOR CONCEPT: ‘OORJA’, releasing the energy accumulated in the architecture and allowing it to burst through the campus for a Synergetic Integration of Architecture, Interiors & Landscape. Incorporating various work patterns and layouts: Hives, Clubs, Dens and Cells – towards establishing a new work culture encouraging both, collaborative teamwork and individual creativity.',
    ],
    details: {
      location: 'Hadapsar, Pune, Maharashtra',
      status: 'Completed',
      area: '7.1 Lac Sq ft.',
    },
    gallery: [
      { src: '/img/corporate/suzlon-one-earth/01-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/01.jpg', title: 'Central Court with Swastika Waterbody' },
      { src: '/img/corporate/suzlon-one-earth/02-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/02.jpg', title: 'Reception Lobby' },
      { src: '/img/corporate/suzlon-one-earth/03-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/03.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/04-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/04.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/05-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/05.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/06-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/06.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/07-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/07.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/08-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/08.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/09-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/09.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/10-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/10.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/11-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/11.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/12-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/12.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/13-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/13.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/14-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/14.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/15-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/15.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/16-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/16.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/17-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/17.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/18-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/18.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/19-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/19.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/20-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/20.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/21-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/21.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/22-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/22.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/23-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/23.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/24-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/24.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/25-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/25.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/26-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/26.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/27-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/27.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/28-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/28.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/29-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/29.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/30-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/30.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/31-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/31.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/32-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/32.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/33-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/33.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/34-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/34.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/35-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/35.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/36-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/36.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/37-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/37.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/38-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/38.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/39-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/39.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/40-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/40.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/41-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/41.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/42-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/42.jpg', title: 'Suzlon One Earth' },
      { src: '/img/corporate/suzlon-one-earth/43-bg.jpg', thumb: '/img/corporate/suzlon-one-earth/43.jpg', title: 'Suzlon One Earth' },
    ],
    relatedProjects: ['corporate-office-suhana-masala', 'nyati-unitree', 'goyal-group'],
  },
  'suyog-navkaar-housing': {
    id: 'suyog-navkaar-housing',
    category: 'housing',
    title: 'Suyog Navkar',
    heroImage: '/img/commercial/suyog-navkaar/suyog-navkaar-bg.jpg',
    description: [
      'Mixed-use development at Swargate',
      'This project holds a retail strip creating active engagement on the ground floor, supported by a podium level parking lot, rising to 21 floors to accommodate residential units. The three residential blocks, Agam, Shruta and Kalpa are positioned in ‘C’ shape, housing 3 and 4BHK flats. A sky bridge connectsthe two arms of the ‘C’, allowing stunning views from the top.',
      'Dotted with leisure spots and amenity spaces, the set of interconnected buildings provides a harmonious living environment to potential inhabitants. Recreational zones are present at the top of the podium both in the interior and exterior drawing interest toward the center as well as on the terrace. A swimming pool and deck at the top of the circular ramp adjacent to the podium parking, provides additional recreational facilities.',
      'Photovoltaic panels on the terrace, facilitate energy generation for solar water heating; while an on-site STP accommodates flushing and landscape water requirements, resulting in a sustainable and environment responsible design.',
    ],
    details: {
      location: 'Swargate, Pune, Maharashtra',
      status: 'Ongoing',
      plotArea: '11600 sq mt.',
      builtUpArea: '59000 sq mt.',
    },
    gallery: [
      { src: '/img/commercial/suyog-navkaar/1-bg.jpg', thumb: '/img/commercial/suyog-navkaar/1-thumb.jpg', title: '3D view: proposed structure' },
      { src: '/img/commercial/suyog-navkaar/2-bg.jpg', thumb: '/img/commercial/suyog-navkaar/2-thumb.jpg', title: 'Conceptual Sketch: massing' },
      { src: '/img/commercial/suyog-navkaar/3-bg.jpg', thumb: '/img/commercial/suyog-navkaar/3-thumb.jpg', title: 'Describe About Image' },
      { src: '/img/commercial/suyog-navkaar/4-bg.jpg', thumb: '/img/commercial/suyog-navkaar/4-thumb.jpg', title: 'Describe About Image' },
      { src: '/img/commercial/suyog-navkaar/5-bg.jpg', thumb: '/img/commercial/suyog-navkaar/5-thumb.jpg', title: 'Describe About Image' },
      { src: '/img/commercial/suyog-navkaar/6-bg.jpg', thumb: '/img/commercial/suyog-navkaar/6-thumb.jpg', title: 'Describe About Image' },
      { src: '/img/commercial/suyog-navkaar/7-bg.jpg', thumb: '/img/commercial/suyog-navkaar/7-thumb.jpg', title: 'Top view' },
      { src: '/img/commercial/suyog-navkaar/8-bg.jpg', thumb: '/img/commercial/suyog-navkaar/8-thumb.jpg', title: 'Recreational Podium' },
      { src: '/img/commercial/suyog-navkaar/9-bg.jpg', thumb: '/img/commercial/suyog-navkaar/9-thumb.jpg', title: 'Retail Strip' },
      { src: '/img/commercial/suyog-navkaar/10-bg.jpg', thumb: '/img/commercial/suyog-navkaar/10-thumb.jpg', title: 'Evening View' },
      { src: '/img/commercial/suyog-navkaar/11-bg.jpg', thumb: '/img/commercial/suyog-navkaar/11-thumb.jpg', title: 'Recreational Podium' },
      { src: '/img/commercial/suyog-navkaar/12-bg.jpg', thumb: '/img/commercial/suyog-navkaar/12-thumb.jpg', title: 'Birds Eye View' },
    ],
    relatedProjects: ['kumar-platinum', 'shiloh', 'kumar-pacific'],
  },
  'kumar-platinum-housing': {
    id: 'kumar-platinum-housing',
    category: 'housing',
    title: 'Kumar Platinum',
    heroImage: '/img/housing/kumar-platinum/kumar-platinum-bg.jpg',
    description: [
      'Living amidst heritage',
      'This project, composed of 2 and 3bhk apartments, sits amidst the strong cultural heritage of the iconic “Lal Dewal” Synagogue. The built mass was conceived, such as not to overshadow, but to complement the stunning piece of Architecture. The building is composed of two blocks, a cylindrical 2BHK apartment block, and a cuboidal 3BHK apartment block, both connected through a central circulation core. To the front of the complex, at the ground level, the recreational areas provide opportunities for sports and social gatherings. A swimming pool, shaded by a red pergola structure, allows leisure space for the families residing in the apartments above, while a party lawn and deck allow a segregated zone for community events and functions. Inside the building, 2 and 3bhk apartments are designed with main living areas overlooking private open terraces. The 2bhk flats are designed to allow conversion into large 4bhk flats when needed.',
      'The building houses two parking floors, providing essential vehicular parking for all inhabitants and visitors, of the complex across the nine residential floors; additionally, supported by all modern amenities and services.',
    ],
    details: {
      location: 'Camp, Pune',
      status: 'Completed',
      plotArea: '16180 sq mt.',
      builtUpArea: '6580 sq mt.',
    },
    gallery: [
      { src: '/img/housing/kumar-platinum/1-bg.jpg', thumb: '/img/housing/kumar-platinum/1-thumb.jpg', title: 'The built project against its strong context' },
      { src: '/img/housing/kumar-platinum/2-bg.jpg', thumb: '/img/housing/kumar-platinum/2-thumb.jpg', title: 'View across recreational deck' },
      { src: '/img/housing/kumar-platinum/3-bg.jpg', thumb: '/img/housing/kumar-platinum/3-thumb.jpg', title: 'Swimming pool shaded by pergola structure' },
      { src: '/img/housing/kumar-platinum/4-bg.jpg', thumb: '/img/housing/kumar-platinum/4-thumb.jpg', title: 'Exterior view of 3BHK habitable units' },
      { src: '/img/housing/kumar-platinum/5-bg.jpg', thumb: '/img/housing/kumar-platinum/5-thumb.jpg', title: 'View of curved 2BHK block' },
      { src: '/img/housing/kumar-platinum/6-bg.jpg', thumb: '/img/housing/kumar-platinum/6-thumb.jpg', title: 'Describe About Image' },
      { src: '/img/housing/kumar-platinum/7-bg.jpg', thumb: '/img/housing/kumar-platinum/7-thumb.jpg', title: 'Describe About Image' },
      { src: '/img/housing/kumar-platinum/8-bg.jpg', thumb: '/img/housing/kumar-platinum/8-thumb.jpg', title: 'Describe About Image' },
      { src: '/img/housing/kumar-platinum/9-bg.jpg', thumb: '/img/housing/kumar-platinum/9-thumb.jpg', title: 'View of 2 residential blocks separated by circulation core' },
      { src: '/img/housing/kumar-platinum/10-bg.jpg', thumb: '/img/housing/kumar-platinum/10-thumb.jpg', title: 'Rooftop landscaped garden – a sensitive response to the iconic Lal Dewal' },
    ],
    relatedProjects: ['suyog-navkaar', 'shiloh', 'kumar-pacific'],
  },
  'water-features': {
    id: 'water-features',
    category: 'installations',
    title: 'Water Features',
    heroImage: '/img/installations/water-features/water-features-bg.jpg',
    description: [
      'Fluid Landscape',
      'Design has no boundaries, and at Tao, we visualize a space in its entirety, irrespective of scale, domain or detail. With concepts for relevant products developed at TAO Studio, the execution has been a fruit of coordination and collaboration with talented artists, artisans, contractors and agencies from all over India and across the globe.',
    ],
    details: {
      location: 'Various Locations',
      status: 'Completed',
    },
    gallery: [
      { src: '/img/installations/water-features/1-bg.jpg', thumb: '/img/installations/water-features/1-thumb.jpg', title: 'Zen Waterfall, Manisha Constructions Corporate Office' },
      { src: '/img/installations/water-features/2-bg.jpg', thumb: '/img/installations/water-features/2-thumb.jpg', title: 'Waterfall in urli, Nest Bungalow' },
      { src: '/img/installations/water-features/3-bg.jpg', thumb: '/img/installations/water-features/3-thumb.jpg', title: 'Peaceful home retreat, Shunyam Pune' },
      { src: '/img/installations/water-features/4-bg.jpg', thumb: '/img/installations/water-features/4-thumb.jpg', title: 'Traditional Cascades, Queen’s Garden' },
      { src: '/img/installations/water-features/5-bg.jpg', thumb: '/img/installations/water-features/5-thumb.jpg', title: 'Melodic entryway, Vitaan' },
    ],
    relatedProjects: ['staircases', 'lighting', 'sculpture'],
  },
  'sculpture': {
    id: 'sculpture',
    category: 'installations',
    title: 'Sculpture',
    heroImage: '/img/installations/sculpture/sculpture-bg.jpg',
    description: [
      'Frozen Symphony',
      'Design has no boundaries, and at Tao, we visualize a space in its entirety, irrespective of scale, domain or detail. With concepts for relevant products developed at TAO Studio, the execution has been a fruit of coordination and collaboration with talented artists, artisans, contractors and agencies from all over India and across the globe.',
    ],
    details: {
      location: 'Various Locations',
      status: 'Completed',
    },
    gallery: [
      { src: '/img/installations/sculpture/1-bg.jpg', thumb: '/img/installations/sculpture/1-thumb.jpg', title: 'Reading Man on Bench, Nyati Unitree' },
      { src: '/img/installations/sculpture/2-bg.jpg', thumb: '/img/installations/sculpture/2-thumb.jpg', title: 'Unity, Suzlon One Earth Corporate Campus' },
      { src: '/img/installations/sculpture/3-bg.jpg', thumb: '/img/installations/sculpture/3-thumb.jpg', title: 'Human Tree, Suzlon One Earth Corporate Campus' },
      { src: '/img/installations/sculpture/4-bg.jpg', thumb: '/img/installations/sculpture/4-thumb.jpg', title: 'Giant Brain, Suzlon One Earth Corporate Campus' },
      { src: '/img/installations/sculpture/5-bg.jpg', thumb: '/img/installations/sculpture/5-thumb.jpg', title: 'Cone, Suzlon One Earth Corporate Campus' },
      { src: '/img/installations/sculpture/6-bg.jpg', thumb: '/img/installations/sculpture/6-thumb.jpg', title: 'Entryway, Paradiso' },
    ],
    relatedProjects: ['staircases', 'lighting', 'entrance-gates'],
  },
  'sujin-residence': {
    id: 'sujin-residence',
    category: 'cozyhomes',
    title: 'Sujin Residence',
    heroImage: '/img/cozy_homes/sujin-residence/sujin-residence-bg.jpg',
    description: [
      'Extraordinary embodiment of opulent living',
      'Introducing “Sujin,” a luxurious residential villa exquisitely crafted for a distinguished Maharashtrian family that traces their ancestry from Pandharpur to Pune.',
      'Elevated to perfection, the house is a designed solution for the family to enjoy the view overlooking 2 acres of society garden. It incorporates a contemporary architectural language and interior design, housing 5 different rooms, both formal and informal halls, including an exclusive gymnasium and a state-of-the-art home theatre, offering the epitome of relaxation and entertainment. These amenities are well supported by necessary service backups, catering to urban scenarios.',
      'Nestled within a secure gated community, the house is surrounded by lush greenery, offering ample light and ventilation on all levels - a true sanctuary of tranquility.',
      'Both architectural and interior designs embody a fascinating symphony of spaces, effortlessly brought together through a captivating interplay of premium materials and textures allowing for the play of ever-changing light and expanding views where elegance meets functionality, setting a new standard for refined living.',
      'Sujin villa is an extraordinary embodiment of opulent living – seamlessly blending tradition with contemporary comfort.',
    ],
    details: {
      location: 'Hadapsar, Pune, Maharashtra',
      status: 'Completed',
      plotArea: '1100 Sq Mt.',
      builtUpArea: '3755 Sq Mt.',
    },
    gallery: [
      { src: '/img/cozy_homes/sujin-residence/1-bg.jpg', thumb: '/img/cozy_homes/sujin-residence/1-thumb.jpg', title: 'Front view' },
      { src: '/img/cozy_homes/sujin-residence/2-bg.jpg', thumb: '/img/cozy_homes/sujin-residence/2-thumb.jpg', title: 'Rear View' },
      { src: '/img/cozy_homes/sujin-residence/3-bg.jpg', thumb: '/img/cozy_homes/sujin-residence/3-thumb.jpg', title: 'Entry porch' },
      { src: '/img/cozy_homes/sujin-residence/4-bg.jpg', thumb: '/img/cozy_homes/sujin-residence/4-thumb.jpg', title: 'Upper lobby' },
      { src: '/img/cozy_homes/sujin-residence/5-bg.jpg', thumb: '/img/cozy_homes/sujin-residence/5-thumb.jpg', title: 'Cabin lobby' },
      { src: '/img/cozy_homes/sujin-residence/6-bg.jpg', thumb: '/img/cozy_homes/sujin-residence/6-thumb.jpg', title: 'Boardroom' },
      { src: '/img/cozy_homes/sujin-residence/7-bg.jpg', thumb: '/img/cozy_homes/sujin-residence/7-thumb.jpg', title: 'MD cabin top view' },
      { src: '/img/cozy_homes/sujin-residence/8-bg.jpg', thumb: '/img/cozy_homes/sujin-residence/8-thumb.jpg', title: 'MD cabin – view of lounge' },
      { src: '/img/cozy_homes/sujin-residence/9-bg.jpg', thumb: '/img/cozy_homes/sujin-residence/9-thumb.jpg', title: 'MD cabin – view of lounge from MD table' },
      { src: '/img/cozy_homes/sujin-residence/10-bg.jpg', thumb: '/img/cozy_homes/sujin-residence/10-thumb.jpg', title: 'MD cabin anteroom' },
      { src: '/img/cozy_homes/sujin-residence/11-bg.jpg', thumb: '/img/cozy_homes/sujin-residence/11-thumb.jpg', title: 'Director Cabin – top view' },
      { src: '/img/cozy_homes/sujin-residence/12-bg.jpg', thumb: '/img/cozy_homes/sujin-residence/12-thumb.jpg', title: 'View of Director table and lounge' },
    ],
    relatedProjects: ['suzlon-one-earth', 'nyati-unitree', 'goyal-group'],
  },
  'wall-unit': {
    id: 'wall-unit',
    category: 'products',
    title: 'Wall Units',
    heroImage: '/img/products/wall-unit/wall-unit-bg.jpg',
    description: [
      'Versatility in verticality',
      'Design has no boundaries, and at Tao, we visualize a space in its entirety, irrespective of scale, domain or detail. With concepts for relevant products developed at TAO Studio, the execution has been a fruit of coordination and collaboration with talented artists, artisans, contractors and agencies from all over India and across the globe.',
    ],
    details: {
      location: 'Various Locations',
      status: 'Completed',
    },
    gallery: [
      { src: '/img/products/wall-unit/1-bg.jpg', thumb: '/img/products/wall-unit/1-thumb.jpg', title: 'Visual Screens, Aurum Penthouse' },
      { src: '/img/products/wall-unit/2-bg.jpg', thumb: '/img/products/wall-unit/2-thumb.jpg', title: 'Spiral Bookcase, Nest Bungalow' },
      { src: '/img/products/wall-unit/3-bg.jpg', thumb: '/img/products/wall-unit/3-thumb.jpg', title: 'Storage cum Study unit, Paradiso' },
      { src: '/img/products/wall-unit/4-bg.jpg', thumb: '/img/products/wall-unit/4-thumb.jpg', title: 'Shelving cum partition, O’nella' },
    ],
    relatedProjects: ['desking-and-tables', 'sleeping-unit', 'doors'],
  },
  'nest-residence': {
    id: 'nest-residence',
    category: 'luxury-villas',
    title: 'Nest Residence, Pune',
    heroImage: '/img/villa/Nest/nest-bg.jpg',
    description: [
      'Crystal waters splatter down a spouted archway, as mystical winged creatures bask in the luxury of warm sunrays and filtered South-Westerly breezes across the grassy front lawn of this fairytale eco-abode; secluded from the hustle-bustle of Koregaon Park.',
      'A long entryway dotted with landscape elements, provides apt appreciation distance as it leads one to the grand onyx foyer door through an entry court. Inside the house, a daylit lobby with a densely vegetated courtyard, integrates an open sitting area. Attached to the foyer is a glazed formal living room encircled by a water channel connecting the building with an elliptical swimming pool. The interconnected water bodies reflect the peaceful earthy aesthetic of the building, being one with its surrounding greenery, along with the dynamism of shifting lights and shadows through the pergolas above the open deck. The plan of the home is set along two perpendicular free standing malad stone walls segregating public and private zones, with their arches allowing continuous flow of space. The entire space is punctuated with courtyards and foliage, creating multiple micro-landscapes; tempering the interior climate through evaporative cooling and passive ventilation.',
      'Nature seems to weave its way through each space, with bedrooms incorporating private sit-outs and bathrooms overlooking the outside environment. The understated transparency of the exterior walls opens up the living spaces to the exterior landscape. A single floating roof unites the entire structure, its punctures acting as lungs that breathe light and air into this snug retreat nestled in the lap of nature.',
    ],
    details: {
      location: 'Koregaon Park, Pune',
      status: 'Completed',
      plotArea: '5300 Sq mt.',
      builtUpArea: '2030 Sq mt.',
    },
    gallery: [
      { src: '/img/villa/Nest/01Nestled-amidst-Greenery.jpg', thumb: '/img/villa/Nest/01Nestled-amidst-Greenery.jpg', title: 'Nestled amidst Greenery' },
      { src: '/img/villa/Nest/02entrance-lobby.jpg', thumb: '/img/villa/Nest/02entrance-lobby.jpg', title: 'Entrance Lobby' },
      { src: '/img/villa/Nest/03entrance-court.jpg', thumb: '/img/villa/Nest/03entrance-court.jpg', title: 'Entrance Court' },
      { src: '/img/villa/Nest/04onyx-door.jpg', thumb: '/img/villa/Nest/04onyx-door.jpg', title: 'Onyx Door' },
      { src: '/img/villa/Nest/05transitional-sit-out.jpg', thumb: '/img/villa/Nest/05transitional-sit-out.jpg', title: 'Transitional Sit Out' },
      { src: '/img/villa/Nest/06gym-door.jpg', thumb: '/img/villa/Nest/06gym-door.jpg', title: 'Gym Door' },
      { src: '/img/villa/Nest/07private-sit.jpg', thumb: '/img/villa/Nest/07private-sit.jpg', title: 'Private Sit' },
      { src: '/img/villa/Nest/08informal-lobby.jpg', thumb: '/img/villa/Nest/08informal-lobby.jpg', title: 'Informal Lobby' },
      { src: '/img/villa/Nest/09glazed-formal-living.jpg', thumb: '/img/villa/Nest/09glazed-formal-living.jpg', title: 'Glazed Formal Living' },
      { src: '/img/villa/Nest/10indoor-dining.jpg', thumb: '/img/villa/Nest/10indoor-dining.jpg', title: 'Indoor Dining' },
      { src: '/img/villa/Nest/11poolside.jpg', thumb: '/img/villa/Nest/11poolside.jpg', title: 'Poolside' },
      { src: '/img/villa/Nest/12verndah-overlooking.jpg', thumb: '/img/villa/Nest/12verndah-overlooking.jpg', title: 'Verandah Overlooking' },
      { src: '/img/villa/Nest/13stepping-stones.jpg', thumb: '/img/villa/Nest/13stepping-stones.jpg', title: 'Stepping Stones' },
      { src: '/img/villa/Nest/14water-feature.jpg', thumb: '/img/villa/Nest/14water-feature.jpg', title: 'Water Feature' },
      { src: '/img/villa/Nest/15pool-overlooking.jpg', thumb: '/img/villa/Nest/15pool-overlooking.jpg', title: 'Pool Overlooking' },
      { src: '/img/villa/Nest/16home-office.jpg', thumb: '/img/villa/Nest/16home-office.jpg', title: 'Home Office' },
      { src: '/img/villa/Nest/17master-bedroom.jpg', thumb: '/img/villa/Nest/17master-bedroom.jpg', title: 'Master Bedroom' },
      { src: '/img/villa/Nest/18private-sit-out.jpg', thumb: '/img/villa/Nest/18private-sit-out.jpg', title: 'Private Sit Out' },
      { src: '/img/villa/Nest/19master-bath.jpg', thumb: '/img/villa/Nest/19master-bath.jpg', title: 'Master Bath' },
      { src: '/img/villa/Nest/20sons-bedroom.jpg', thumb: '/img/villa/Nest/20sons-bedroom.jpg', title: 'Sons Bedroom' },
      { src: '/img/villa/Nest/21sons-bathroom.jpg', thumb: '/img/villa/Nest/21sons-bathroom.jpg', title: 'Sons Bathroom' },
      { src: '/img/villa/Nest/22lounge.jpg', thumb: '/img/villa/Nest/22lounge.jpg', title: 'Lounge' },
      { src: '/img/villa/Nest/23spa.jpg', thumb: '/img/villa/Nest/23spa.jpg', title: 'Spa' },
      { src: '/img/villa/Nest/24saloon.jpg', thumb: '/img/villa/Nest/24saloon.jpg', title: 'Saloon' },
      { src: '/img/villa/Nest/25evening-view.jpg', thumb: '/img/villa/Nest/25evening-view.jpg', title: 'Evening View' },
      { src: '/img/villa/Nest/26design-concept.jpg', thumb: '/img/villa/Nest/26design-concept.jpg', title: 'Design Concept' },
      { src: '/img/villa/Nest/27plan.jpg', thumb: '/img/villa/Nest/27plan.jpg', title: 'Plan' },
    ],
    relatedProjects: ['paradiso', 'onella', 'queen-garden'],
  },
  'paradiso': {
    id: 'paradiso',
    category: 'luxury-villas',
    title: 'Paradiso, Pune',
    heroImage: '/img/villa/paradiso/paradiso-bg.jpg',
    description: [
      'A 2-acre plot in a mushrooming residential suburb of Pune posed a unique challenge for its owners; that of ensuring for their home, visual privacy from the towering high-rise apartments in the neighborhood. The clients expressed their desire to reside in a home, infused with the greenery of vast landscaped lawns and the serenity of calm waters, blending their contemporary functional needs with a regal air of luxury. The design solution for the project proposed an innovative structural design, to be complemented by bright, daylit interiors finished in plush upholstery and muted tones accented by splashes of colour.',
      'Built for a joint family spanning three generations, Paradiso not only success-fully protects its private spaces, but also allows the family to actively engage with nature and landscape through an intelligent form and strategic placement of openings.',
      'The design solution is composed of three tubular structures separated by light filled passages. These \'residential-tubes\' open out to private gardens on the east and west of the plot, their vast overhangs blocking visual access and providing shade to the glazed openings. The overhangs create deep recessed verandahs which act as private sit-outs for bedrooms and living spaces.',
      'Connecting hallways mimic musical flutes, their linear skylights admitting dynamic notes of shifting lights and shadows into the circulation spaces throughout the day. Living areas set along the tubes are zoned into private, semi-private and entertainment areas, each dotted with landscape elements, weaving the interiors gently into their external environment.',
      'The central courtyard, along with air shafts and exhausts, sets up a passive cross ventilation system through the hollow perforated tubes, while water bodies temper the microclimate of living spaces through evaporative cool-ing. Warm sprays of natural light filtering in through the courtyards and sky-lights highlight the geometry of the built form, while complementing the earthy material tones of the interior spaces. The angular forms of the open-ings generate controlled, yet stunning views of the pool and gardens from each living space in the house.',
      'A suspended circular deck acts as an interesting seating element, projecting out toward the pool facing verandah, forming a visual link between the upper hallways and the surrounding greenery of the rear lawn. A floating steel and wood staircase delicately connects the lower courtyard with the upper floor, accented by a water body lined with white pebbles. The formal living room utilizes its expansive vertical volume by the use of murals, decorative lighting features and double height sheer curtains. White Satuario and Mustard Travertino marble flooring exudes an unders-tated elegance, while complementing the earthy theme of natural veneers and laminates used for cladding. Soft furnishings reflect a classy vibe, in-corporating pastel colours into the interiors. Bathrooms are finished in wood veneer, acting as ‘spa’ like spaces for re-laxation and quiet rejuvenation.',
      'A strong structural geometry, combined with the minimalism of built forms and finishes allows architecture and interior to blend with landscape, its living spaces attempting to meet Tao – the union of Yin and Yang. True to its name, the home is a suburban paradise that asserts lavishness and luxury for its occupants through a deep, empathetic connection with nature.',
    ],
    details: {
      location: 'Pashan, Pune',
      status: 'Completed',
      plotArea: '8100 Sq. m.',
      builtUpArea: '1780 Sq. m.',
    },
    gallery: [
      { src: '/img/villa/paradiso/01-East-View.jpg', thumb: '/img/villa/paradiso/01-East-View.jpg', title: 'East View' },
      { src: '/img/villa/paradiso/02-Custom-Designed-Entry-Gate.jpg', thumb: '/img/villa/paradiso/02-Custom-Designed-Entry-Gate.jpg', title: 'Custom Designed Entry Gate' },
      { src: '/img/villa/paradiso/03-Artwork.jpg', thumb: '/img/villa/paradiso/03-Artwork.jpg', title: 'Artwork' },
      { src: '/img/villa/paradiso/04-Tubular-Spa-Block.jpg', thumb: '/img/villa/paradiso/04-Tubular-Spa-Block.jpg', title: 'Tubular Spa Block' },
      { src: '/img/villa/paradiso/05-Gokak-Stone-wall.jpg', thumb: '/img/villa/paradiso/05-Gokak-Stone-wall.jpg', title: 'Gokak Stone Wall' },
      { src: '/img/villa/paradiso/06-View-from-gazebo-across-private-lawn.jpg', thumb: '/img/villa/paradiso/06-View-from-gazebo-across-private-lawn.jpg', title: 'View from Gazebo' },
      { src: '/img/villa/paradiso/07-Poolside-seating.jpg', thumb: '/img/villa/paradiso/07-Poolside-seating.jpg', title: 'Poolside Seating' },
      { src: '/img/villa/paradiso/08-Circular-Disc-seating.jpg', thumb: '/img/villa/paradiso/08-Circular-Disc-seating.jpg', title: 'Circular Disc Seating' },
      { src: '/img/villa/paradiso/09-Evening-view---Composition-of-Tubes.jpg', thumb: '/img/villa/paradiso/09-Evening-view---Composition-of-Tubes.jpg', title: 'Evening View' },
      { src: '/img/villa/paradiso/10-Poolside-deck.jpg', thumb: '/img/villa/paradiso/10-Poolside-deck.jpg', title: 'Poolside Deck' },
      { src: '/img/villa/paradiso/11-Dayview.jpg', thumb: '/img/villa/paradiso/11-Dayview.jpg', title: 'Day View' },
      { src: '/img/villa/paradiso/12-Central-Courtyard-welcomes-the-sky\'s-ever-evolving-existential-energy.jpg', thumb: '/img/villa/paradiso/12-Central-Courtyard-welcomes-the-sky\'s-ever-evolving-existential-energy.jpg', title: 'Central Courtyard' },
      { src: '/img/villa/paradiso/13-Double-Height-living.jpg', thumb: '/img/villa/paradiso/13-Double-Height-living.jpg', title: 'Double Height Living' },
      { src: '/img/villa/paradiso/14-Kitchen.jpg', thumb: '/img/villa/paradiso/14-Kitchen.jpg', title: 'Kitchen' },
      { src: '/img/villa/paradiso/15-Dining.jpg', thumb: '/img/villa/paradiso/15-Dining.jpg', title: 'Dining' },
      { src: '/img/villa/paradiso/16-Daylit-passage.jpg', thumb: '/img/villa/paradiso/16-Daylit-passage.jpg', title: 'Daylit Passage' },
      { src: '/img/villa/paradiso/17-Parents-Bedroom.jpg', thumb: '/img/villa/paradiso/17-Parents-Bedroom.jpg', title: 'Parents Bedroom' },
      { src: '/img/villa/paradiso/18-Sons-Bedroom.jpg', thumb: '/img/villa/paradiso/18-Sons-Bedroom.jpg', title: 'Sons Bedroom' },
      { src: '/img/villa/paradiso/19-Guest-Bedroom.jpg', thumb: '/img/villa/paradiso/19-Guest-Bedroom.jpg', title: 'Guest Bedroom' },
      { src: '/img/villa/paradiso/20-Master-Bathroom.jpg', thumb: '/img/villa/paradiso/20-Master-Bathroom.jpg', title: 'Master Bathroom' },
      { src: '/img/villa/paradiso/21-Cozy-personal-spaces.jpg', thumb: '/img/villa/paradiso/21-Cozy-personal-spaces.jpg', title: 'Cozy Personal Spaces' },
      { src: '/img/villa/paradiso/22-Concept-Sketch-Plan.jpg', thumb: '/img/villa/paradiso/22-Concept-Sketch-Plan.jpg', title: 'Concept Sketch Plan' },
      { src: '/img/villa/paradiso/23-Concept-Sketch-section.jpg', thumb: '/img/villa/paradiso/23-Concept-Sketch-section.jpg', title: 'Concept Sketch Section' },
      { src: '/img/villa/paradiso/24-Ground-Floor-Plan.jpg', thumb: '/img/villa/paradiso/24-Ground-Floor-Plan.jpg', title: 'Ground Floor Plan' },
      { src: '/img/villa/paradiso/25-First-Floor-Plan.jpg', thumb: '/img/villa/paradiso/25-First-Floor-Plan.jpg', title: 'First Floor Plan' },
      { src: '/img/villa/paradiso/26-Terrace-Plan.jpg', thumb: '/img/villa/paradiso/26-Terrace-Plan.jpg', title: 'Terrace Plan' },
      { src: '/img/villa/paradiso/27-North-elevation.jpg', thumb: '/img/villa/paradiso/27-North-elevation.jpg', title: 'North Elevation' },
      { src: '/img/villa/paradiso/28-East-Elevation.jpg', thumb: '/img/villa/paradiso/28-East-Elevation.jpg', title: 'East Elevation' },
      { src: '/img/villa/paradiso/29-Section-CC\'-Daylighting.jpg', thumb: '/img/villa/paradiso/29-Section-CC\'-Daylighting.jpg', title: 'Section Daylighting' },
      { src: '/img/villa/paradiso/30-Section-DD\'.jpg', thumb: '/img/villa/paradiso/30-Section-DD\'.jpg', title: 'Section DD' },
      { src: '/img/villa/paradiso/31.-Nestled-amongst-greenery.jpg', thumb: '/img/villa/paradiso/31.-Nestled-amongst-greenery.jpg', title: 'Nestled Amongst Greenery' },
      { src: '/img/villa/paradiso/32.-Coneptual-Block-Model.jpg', thumb: '/img/villa/paradiso/32.-Coneptual-Block-Model.jpg', title: 'Conceptual Block Model' },
    ],
    relatedProjects: ['nest-residence', 'onella', 'queen-garden'],
  },
  'onella': {
    id: 'onella',
    category: 'luxury-villas',
    title: 'O\'nella Residence, Pune',
    heroImage: '/img/villa/onella/onella-bg.jpg',
    description: [
      '“Can a residence exude the extravagance of a private resort while ensuring a pragmatic spatial layout, sustainable in its upkeep?”',
      'The team at TAO was faced with a challenge, seeking the realization of an extensive brief on a naturally sloping 17000 sq.ft. corner plot in Salisbury Park, Pune. O’nella was conceived as a light-filled is a 4-member family home, effortlessly integrating luxury with sustainability. The lavish layout of expansive volumes embraces the natural contour of the site as a means of segregation between private and service areas. The design aims at reviving traditional joint-family culture of cohesive living, while being conducive to a contemporary lifestyle. This is done by permitting varying degrees of privacy to inhabitants, making the residence a shared living space.',
      'The 2.5m level drop between the North-East and South-West of the site allows a vertical division of zones, with the main entrance foyer placed on the upper ground level, accessed by a flight of rising steps.The service areas and house help accommodation lie on the lower ground floor, level with the entry gate, and accessible through the car parking. Service ramps connect the upper levels with the basement floor for unhindered access.',
      'Inside the house, semi-private areas like the family room, living room, dining, kitchen, staircase, sit-outs, garden court, swimming pool and gymnasium are all interlinked into one homogeneous spatial composition. The layout attempts to dissolve boundaries between the indoor and the outdoor through the effective utilization of the transition space, with its abundance of natural light, ventilation and scenic views. A trapezoidal entry door reflects the angular geometry of the structure as it welcomes one into a mesmerizing double height living space. The family room reflects warm hues of a rustic mélange of materials, flooded with daylight, as it looks out to a garden court through a glazed wall. A transitional verandah and swimming pool connects the main block with the recreational area beyond the courtyard. The artificial waterfall flows into the swimming pool, generating a pleasant microclimate through evaporative cooling, while creating serene views for the living and entertainment spaces. Private spaces extend and blend into the outdoors, with bathrooms integrated with sit outs and courtyards. All artwork and furniture reflects the visual language of angular structural and spatial elements, complementing the earthy whites and greys of the colour scheme.',
      'The building envelope is insulated on the South-west to minimize heat gain. The inverted gable, ‘butterfly’ roof is so designed as to allow working daylight to all interior spaces, barring the high summer sun by virtue of its large overhangs. The central valley acts like a rainwater collection channel, facilitating 100% rain water harvesting. Installation of photovoltaic panels and a wind turbine on the versatile butterfly roof allows effective utilization of solar and wind power. The service core acts as a ventilation shaft, which in conjunction with a turbo exhaust, expels warm air; effectively setting up a passive cross ventilation system for the house. The design is sensitive to the existing environment and vegetation on the site, integrating an existing coconut palm in an interior courtyard. Keeping with the client’s brief, the residence is the literal manifestation of a tranquil haven, allowing efficiency with extravagance, facilitating a spiritual connection of man with his environment.',
    ],
    details: {
      location: 'Salisbury Park, Pune, Maharashtra, India',
      status: 'Completed',
      plotArea: '17,000 Sq. Ft.',
      builtUpArea: '12,000 Sq. Ft.',
    },
    gallery: [
      { src: '/img/villa/onella/01.-Inverted-Gable-Roof-acts-as-a-Rainwater-channel-facilitating-100%-rainwater-harvesting.jpg', thumb: '/img/villa/onella/01.-Inverted-Gable-Roof-acts-as-a-Rainwater-channel-facilitating-100%-rainwater-harvesting.jpg', title: 'Inverted Gable Roof' },
      { src: '/img/villa/onella/02.-Building-view-from-access-road.jpg', thumb: '/img/villa/onella/02.-Building-view-from-access-road.jpg', title: 'Building View' },
      { src: '/img/villa/onella/03.-Welcoming-Entrance-foyer-and-feature-staircase.jpg', thumb: '/img/villa/onella/03.-Welcoming-Entrance-foyer-and-feature-staircase.jpg', title: 'Entrance Foyer' },
      { src: '/img/villa/onella/04.-Entrance-court-accommodates-parking-while-segregating-access-to-services.jpg', thumb: '/img/villa/onella/04.-Entrance-court-accommodates-parking-while-segregating-access-to-services.jpg', title: 'Entrance Court' },
      { src: '/img/villa/onella/05.-Trapezoidal-entry-door.jpg', thumb: '/img/villa/onella/05.-Trapezoidal-entry-door.jpg', title: 'Trapezoidal Entry Door' },
      { src: '/img/villa/onella/06.-Family-room,-flooded-with-daylight.jpg', thumb: '/img/villa/onella/06.-Family-room,-flooded-with-daylight.jpg', title: 'Family Room' },
      { src: '/img/villa/onella/07.-Double-height-living-room-invites-nature-in-through-glazed-walls.jpg', thumb: '/img/villa/onella/07.-Double-height-living-room-invites-nature-in-through-glazed-walls.jpg', title: 'Double Height Living Room' },
      { src: '/img/villa/onella/08.-Connecting-staircase.jpg', thumb: '/img/villa/onella/08.-Connecting-staircase.jpg', title: 'Connecting Staircase' },
      { src: '/img/villa/onella/09.-Dining-room-celebrates-connection-with-pool-and-the-voluminous-living-space.jpg', thumb: '/img/villa/onella/09.-Dining-room-celebrates-connection-with-pool-and-the-voluminous-living-space.jpg', title: 'Dining Room' },
      { src: '/img/villa/onella/10.-Existing-Palm-tree.jpg', thumb: '/img/villa/onella/10.-Existing-Palm-tree.jpg', title: 'Existing Palm Tree' },
      { src: '/img/villa/onella/11.-The-daylit-bedroom-space,-attached-to-its-private-sit-out.jpg', thumb: '/img/villa/onella/11.-The-daylit-bedroom-space,-attached-to-its-private-sit-out.jpg', title: 'Daylit Bedroom' },
      { src: '/img/villa/onella/12.-Private-spaces-extend-and-blend-into-the-outdoors-through-private-sitouts-and-courts.jpg', thumb: '/img/villa/onella/12.-Private-spaces-extend-and-blend-into-the-outdoors-through-private-sitouts-and-courts.jpg', title: 'Private Spaces' },
      { src: '/img/villa/onella/13.-Playful-artwork-adds-a-burst-of-colour-to-the-neutral-rustic-palette.jpg', thumb: '/img/villa/onella/13.-Playful-artwork-adds-a-burst-of-colour-to-the-neutral-rustic-palette.jpg', title: 'Artwork' },
      { src: '/img/villa/onella/14.-Master-Washroom.jpg', thumb: '/img/villa/onella/14.-Master-Washroom.jpg', title: 'Master Washroom' },
      { src: '/img/villa/onella/15.-Transitional-verandah-and-swimming-pool.jpg', thumb: '/img/villa/onella/15.-Transitional-verandah-and-swimming-pool.jpg', title: 'Transitional Verandah' },
      { src: '/img/villa/onella/16.-Water-Feature.jpg', thumb: '/img/villa/onella/16.-Water-Feature.jpg', title: 'Water Feature' },
      { src: '/img/villa/onella/17.-The-swimming-pool-bridges-the-main-house-and-recreational-space.jpg', thumb: '/img/villa/onella/17.-The-swimming-pool-bridges-the-main-house-and-recreational-space.jpg', title: 'Swimming Pool' },
      { src: '/img/villa/onella/18.-Transitional-semi-covered-verandah.jpg', thumb: '/img/villa/onella/18.-Transitional-semi-covered-verandah.jpg', title: 'Transitional Semi Covered Verandah' },
      { src: '/img/villa/onella/19.-Transitional-verandah-space.jpg', thumb: '/img/villa/onella/19.-Transitional-verandah-space.jpg', title: 'Transitional Verandah Space' },
      { src: '/img/villa/onella/20.-Birds-eye-view.jpg', thumb: '/img/villa/onella/20.-Birds-eye-view.jpg', title: 'Birds Eye View' },
      { src: '/img/villa/onella/21.-Conceptual-Section.jpg', thumb: '/img/villa/onella/21.-Conceptual-Section.jpg', title: 'Conceptual Section' },
      { src: '/img/villa/onella/22.-Functional-planning.jpg', thumb: '/img/villa/onella/22.-Functional-planning.jpg', title: 'Functional Planning' },
      { src: '/img/villa/onella/23.-Residential-Zones.jpg', thumb: '/img/villa/onella/23.-Residential-Zones.jpg', title: 'Residential Zones' },
      { src: '/img/villa/onella/24.-Sectional-Zoning.jpg', thumb: '/img/villa/onella/24.-Sectional-Zoning.jpg', title: 'Sectional Zoning' },
      { src: '/img/villa/onella/25.-Site-Section-FF.jpg', thumb: '/img/villa/onella/25.-Site-Section-FF.jpg', title: 'Site Section FF' },
      { src: '/img/villa/onella/26.-Site-Section-HH.jpg', thumb: '/img/villa/onella/26.-Site-Section-HH.jpg', title: 'Site Section HH' },
      { src: '/img/villa/onella/27.-Typical-Private-Space.jpg', thumb: '/img/villa/onella/27.-Typical-Private-Space.jpg', title: 'Typical Private Space' },
      { src: '/img/villa/onella/28.-Lower-Ground-floor-Plan.jpg', thumb: '/img/villa/onella/28.-Lower-Ground-floor-Plan.jpg', title: 'Lower Ground Floor Plan' },
      { src: '/img/villa/onella/29.-Upper-Ground-Floor-plan.jpg', thumb: '/img/villa/onella/29.-Upper-Ground-Floor-plan.jpg', title: 'Upper Ground Floor Plan' },
      { src: '/img/villa/onella/30.-First-Floor-Plan.jpg', thumb: '/img/villa/onella/30.-First-Floor-Plan.jpg', title: 'First Floor Plan' },
      { src: '/img/villa/onella/31.-Second-floor-attic-plan.jpg', thumb: '/img/villa/onella/31.-Second-floor-attic-plan.jpg', title: 'Second Floor Attic Plan' },
      { src: '/img/villa/onella/32.-Terrace-Level-Plan.jpg', thumb: '/img/villa/onella/32.-Terrace-Level-Plan.jpg', title: 'Terrace Level Plan' },
      { src: '/img/villa/onella/33.-Section-HH.jpg', thumb: '/img/villa/onella/33.-Section-HH.jpg', title: 'Section HH' },
      { src: '/img/villa/onella/34.-Section-FF.jpg', thumb: '/img/villa/onella/34.-Section-FF.jpg', title: 'Section FF' },
    ],
    relatedProjects: ['nest-residence', 'paradiso', 'queen-garden'],
  },
  'swastik': {
    id: 'swastik',
    category: 'hospitality',
    title: 'Swastik - Holistic Wellness Center',
    heroImage: '/img/hospitality/swastik/swastik-bg.jpg',
    description: [
      'In the realm of creation, the Swastik emerges as one’s own soul’s canvas, a wellness retreat where the whispers of nature harmonize. It stands as an oasis embracing the tranquillity of Peacock Valley, overlooking the breath-taking backwaters of Khadakwasla.',
      'The whole master plan of the project, designed to experience the gentle rhythm of nature, spans across 50 acres. Inviting one to settle down with oneself.',
      'The project is designed to offer various programs for the holistic growth of participants, carefully crafted to elevate your mind, body, and soul. It beckons individuals to find solace within, to breathe in the essence of true tranquility, and to embark on a journey of self-discovery and inner peace.',
      'The architecture in this project is exquisitely designed, drawing inspiration from the majestic Swastik logo which symbolizes profound dimensions: health, wealth, love, bliss, and spirituality. Every aspect of the design has been meticulously crafted to accentuate the essence of the five primary elements of existence: earth, water, fire, air, and space.',
      'In very subtle ways, the spaces are designed to enhance and evoke the five senses, ensuring a truly immersive experience.',
      'Beyond the aesthetic, this project aims to redefine luxurious living by emphasizing an organic and conscious lifestyle. By seamlessly harmonizing refined luxury with the principles of sustainability and mindfulness, it brings forth a new standard of living in which one can truly flourish. Furthermore, it celebrates life at its highest level, encouraging a deep connection with nature and the embracing of organic living principles.',
      'The holistic centre is designed to facilitate healing through nature, encouraging its self-autonomous processes shedding light on the importance of organic living, including food and sleeping patterns, for physical and mental well-being.',
      'Dhyan Vihar, a transcendent haven within the Centre, stands as an exquisite space where the art of meditation is embraced, granting seekers a transformative journey into the depths of serenity and tranquility. complemented by the Nakshatra garden to connect individuals with cosmic energy.',
      'Ayu Vihar, shaped like a peacock feather, meticulous attention was devoted to its design, reflecting a profoundly organic essence that mirrors the graceful contours of a peacock feather. This intentional design invokes a sense of gentle touch and opulent experience. Within this haven, an extensive array of therapies awaits, ingeniously tailored to holistically embrace and nourish your mind, body, and soul. Our vision for this space was to create a sanctuary conducive to self-reflection and introspection, offering a serene and passive environment where guests are encouraged to surrender to the gentle guidance of nature.',
      'Anand vihar: The layout of the centre was purposefully crafted to create an environment that encourages active participation and accommodates vibrant therapy rooms, interactive galleries, and an auditorium. Its design integrates a spectrum of dynamic therapies such as hydrotherapy, Watsu, and sound therapy. To enhance your experience to its maximum potential, the centre is complemented by a variety of interactive spaces such as auditoriums, gymnasiums, yoga areas, spas, dance, and Zumba studios. Each of these areas is intricately tailored to facilitate a wide array of workshops and seminars that are conducted within its auditoriums and classrooms with the aim to provide you with an immersive and truly transformative experience. The building rises along with the hill, featuring various attached terraces to bring activities closer to the open sky, offering the best views of the water and Sahyadri hills through Peacock Valley. Arrival houses, reception, lounge, restaurant, and various medical guidance checkouts are included.',
      'Cottages: The project is primarily designed around residential programs, envisioning cottages as caves that seamlessly integrate into the natural landscape of the rising hills. The underlying architectural concept aspires to forge a deep bond with the surrounding environment, embracing inhabitants within Mother Nature\'s nurturing embrace. The architecture humbly seeks to merge with the natural surroundings, inviting gardens and creepers to flourish, creating a cohesive, cozy, yet luxurious living experience for participants. The architecture of this project humbly integrates with nature, allowing gardens and creepers to grow over, providing a cohesive, cozy yet luxurious living experience. It serves as an antidote to urban living, reminding us of the inherent, inseparable, and inevitable connection between humans and nature.',
    ],
    details: {
      location: 'Kudje, Pune',
      status: 'Ongoing',
      plotArea: '55 Acres',
      builtUpArea: '16,723 Sq mt.',
    },
    gallery: [
      { src: '/img/hospitality/swastik/1-bg.jpg', thumb: '/img/hospitality/swastik/1-thumb.jpg', title: 'Image 1' },
      { src: '/img/hospitality/swastik/2-bg.jpg', thumb: '/img/hospitality/swastik/2-thumb.jpg', title: 'Image 2' },
      { src: '/img/hospitality/swastik/3-bg.jpg', thumb: '/img/hospitality/swastik/3-thumb.jpg', title: 'Image 3' },
      { src: '/img/hospitality/swastik/4-bg.jpg', thumb: '/img/hospitality/swastik/4-thumb.jpg', title: 'Image 4' },
      { src: '/img/hospitality/swastik/5-bg.jpg', thumb: '/img/hospitality/swastik/5-thumb.jpg', title: 'Image 5' },
      { src: '/img/hospitality/swastik/6-bg.jpg', thumb: '/img/hospitality/swastik/6-thumb.jpg', title: 'Image 6' },
      { src: '/img/hospitality/swastik/7-bg.jpg', thumb: '/img/hospitality/swastik/7-thumb.jpg', title: 'Image 7' },
      { src: '/img/hospitality/swastik/8-bg.jpg', thumb: '/img/hospitality/swastik/8-thumb.jpg', title: 'Image 8' },
      { src: '/img/hospitality/swastik/9-bg.jpg', thumb: '/img/hospitality/swastik/9-thumb.jpg', title: 'Image 9' },
      { src: '/img/hospitality/swastik/10-bg.jpg', thumb: '/img/hospitality/swastik/10-thumb.jpg', title: 'Image 10' },
      { src: '/img/hospitality/swastik/11-bg.jpg', thumb: '/img/hospitality/swastik/11-thumb.jpg', title: 'Image 11' },
      { src: '/img/hospitality/swastik/12-bg.jpg', thumb: '/img/hospitality/swastik/12-thumb.jpg', title: 'Image 12' },
      { src: '/img/hospitality/swastik/13-bg.jpg', thumb: '/img/hospitality/swastik/13-thumb.jpg', title: 'Image 13' },
      { src: '/img/hospitality/swastik/14-bg.jpg', thumb: '/img/hospitality/swastik/14-thumb.jpg', title: 'Image 14' },
    ],
    relatedProjects: ['saj', 'azaan', 'forest-trails'],
  },
  'shiloh': {
    id: 'shiloh',
    category: 'housing',
    title: 'Shiloh',
    heroImage: '/img/housing/shiloh/shiloh-bg.jpg',
    description: [
      'The Shiloh Apartments at Model colony are designed to sit in a 10 storey building, comprising 3 levels of smart parking, a rooftop recreational level and a common amenity space on the ground floor level. The entry drop-off into the building leads one to the common recreational zone, composed of a home theatre, children’s play area, library cum reading lounge, and society office, overlooking a landscaped green strip. The common area also houses the service zones including loading and unloading bays, vertical circulation, pump room etc., supporting the entire inhabitant community. On the upper levels, each flat is a spacious self-contained 4BHK unit, staggered on odd and even levels, so as to allow double height terraces for each apartment. Each floorplate accommodates two apartments, while a central atrium bathes the common foyer in daylight. Within each apartment, family and formal living zones capture views of the green surrounds, through glazed private terraces. All residential requirements are compactly arranged around the living zones, allowing privacy, daylight and views to each of the 4 suites in the home. The terrace level houses common recreational facilities with a pool, deck and sporting activities.',
      'Green double height terraces staggered at odd and even levels, add a dynamic quality to the exterior façade, while an attractive synthetic wood jali pattern adorns its aesthetic appearance. At the ground level, the façade incorporates wooden fins and invites urban interaction, creating an inviting interface with the outside.',
    ],
    details: {
      location: 'Model Colony, Pune, Maharashtra',
      status: 'Ongoing',
      plotArea: '2603 sq mt.',
      builtUpArea: '4560  sq mt.',
    },
    gallery: [
      { src: '/img/housing/shiloh/1-bg.jpg', thumb: '/img/housing/shiloh/1-thumb.jpg', title: 'Image 1' },
      { src: '/img/housing/shiloh/2-bg.jpg', thumb: '/img/housing/shiloh/2-thumb.jpg', title: 'Image 2' },
      { src: '/img/housing/shiloh/3-bg.jpg', thumb: '/img/housing/shiloh/3-thumb.jpg', title: 'Image 3' },
      { src: '/img/housing/shiloh/4-bg.jpg', thumb: '/img/housing/shiloh/4-thumb.jpg', title: 'Image 4' },
      { src: '/img/housing/shiloh/5-bg.jpg', thumb: '/img/housing/shiloh/5-thumb.jpg', title: 'Image 5' },
      { src: '/img/housing/shiloh/6-bg.jpg', thumb: '/img/housing/shiloh/6-thumb.jpg', title: 'Image 6' },
      { src: '/img/housing/shiloh/7-bg.jpg', thumb: '/img/housing/shiloh/7-thumb.jpg', title: 'Image 7' },
      { src: '/img/housing/shiloh/8-bg.jpg', thumb: '/img/housing/shiloh/8-thumb.jpg', title: 'Image 8' },
      { src: '/img/housing/shiloh/9-bg.jpg', thumb: '/img/housing/shiloh/9-thumb.jpg', title: 'Image 9' },
      { src: '/img/housing/shiloh/10-bg.jpg', thumb: '/img/housing/shiloh/10-thumb.jpg', title: 'Image 10' },
      { src: '/img/housing/shiloh/11-bg.jpg', thumb: '/img/housing/shiloh/11-thumb.jpg', title: 'Image 11' },
    ],
    relatedProjects: ['kumar-pacific', 'kumar-papillon', 'kumar-platinum'],
  },
  'desking-and-tables': {
    id: 'desking-and-tables',
    category: 'products',
    title: 'Tables And Counters',
    heroImage: '/img/products/desking-and-tables/desking-and-tables-bg.jpg',
    description: [
      'Productive and social surfaces',
      'Design has no boundaries, and at Tao, we visualize a space in its entirety, irrespective of scale, domain or detail. With concepts for relevant products developed at TAO Studio, the execution has been a fruit of coordination and collaboration with talented artists, artisans, contractors and agencies from all over India and across the globe.',
    ],
    details: {
      location: 'Various Locations',
      status: 'Completed',
    },
    gallery: [
      { src: '/img/products/desking-and-tables/1-bg.jpg', thumb: '/img/products/desking-and-tables/1-thumb.jpg', title: 'MD Cabin Workstation, Nyati Unitree Corporate office' },
      { src: '/img/products/desking-and-tables/2-bg.jpg', thumb: '/img/products/desking-and-tables/2-thumb.jpg', title: 'Staff Workstation, Nyati Unitree Corporate office' },
      { src: '/img/products/desking-and-tables/3-bg.jpg', thumb: '/img/products/desking-and-tables/3-thumb.jpg', title: 'Reception Desk, Nyati Unitree Corporate office' },
      { src: '/img/products/desking-and-tables/4-bg.jpg', thumb: '/img/products/desking-and-tables/4-thumb.jpg', title: 'Office Pantry counter table, Nyati Corporate Office' },
      { src: '/img/products/desking-and-tables/5-bg.jpg', thumb: '/img/products/desking-and-tables/5-thumb.jpg', title: 'Bar counter, Nest Bungalow' },
      { src: '/img/products/desking-and-tables/6-bg.jpg', thumb: '/img/products/desking-and-tables/6-thumb.jpg', title: 'By the Way… An incidental social table' },
      { src: '/img/products/desking-and-tables/7-bg.jpg', thumb: '/img/products/desking-and-tables/7-thumb.jpg', title: 'Basin Counter' },
      { src: '/img/products/desking-and-tables/8-bg.jpg', thumb: '/img/products/desking-and-tables/8-thumb.jpg', title: 'Dining Table, O’nella' },
      { src: '/img/products/desking-and-tables/9-bg.jpg', thumb: '/img/products/desking-and-tables/9-thumb.jpg', title: 'TV Unit, Saj Villa' },
      { src: '/img/products/desking-and-tables/10-bg.jpg', thumb: '/img/products/desking-and-tables/10-thumb.jpg', title: 'Meeting and reception table, Office for Manisha Constructions' },
      { src: '/img/products/desking-and-tables/11-bg.jpg', thumb: '/img/products/desking-and-tables/11-thumb.jpg', title: 'Swivel TV Unit Aurum Penthouse' },
      { src: '/img/products/desking-and-tables/12-bg.jpg', thumb: '/img/products/desking-and-tables/12-thumb.jpg', title: 'Dining Table, Nest Bungalow' },
      { src: '/img/products/desking-and-tables/13-bg.jpg', thumb: '/img/products/desking-and-tables/13-thumb.jpg', title: 'Dining Table, Nest Bungalow' },
    ],
    relatedProjects: ['sleeping-unit', 'wall-unit', 'doors'],
  },
  'sleeping-unit': {
    id: 'sleeping-unit',
    category: 'products',
    title: 'Sleeping Units',
    heroImage: '/img/products/sleeping-unit/sleeping-unit-bg.jpg',
    description: [
      'Restful refuges',
      'Design has no boundaries, and at Tao, we visualize a space in its entirety, irrespective of scale, domain or detail. With concepts for relevant products developed at TAO Studio, the execution has been a fruit of coordination and collaboration with talented artists, artisans, contractors and agencies from all over India and across the globe.',
    ],
    details: {
      location: 'Various Locations',
      status: 'Completed',
    },
    gallery: [
      { src: '/img/products/sleeping-unit/1-bg.jpg', thumb: '/img/products/sleeping-unit/1-thumb.jpg', title: 'Shell bed, Nest Bungalow' },
      { src: '/img/products/sleeping-unit/2-bg.jpg', thumb: '/img/products/sleeping-unit/2-thumb.jpg', title: 'Canopy Bed, Courtyard House' },
      { src: '/img/products/sleeping-unit/3-bg.jpg', thumb: '/img/products/sleeping-unit/3-thumb.jpg', title: 'Fusion Bed, Castel Royale Apartment' },
    ],
    relatedProjects: ['desking-and-tables', 'wall-unit', 'doors'],
  },
  'entrance-gates': {
    id: 'entrance-gates',
    category: 'installations',
    title: 'Entrance Gates',
    heroImage: '/img/installations/entrance-gates/entrance-gates-bg.jpg',
    description: [
      'Artistic Entryways',
      'Design has no boundaries, and at Tao, we visualize a space in its entirety, irrespective of scale, domain or detail. With concepts for relevant products developed at TAO Studio, the execution has been a fruit of coordination and collaboration with talented artists, artisans, contractors and agencies from all over India and across the globe.',
    ],
    details: {
      location: 'Various Locations',
      status: 'Completed',
    },
    gallery: [
      { src: '/img/installations/entrance-gates/1-bg.jpg', thumb: '/img/installations/entrance-gates/1-thumb.jpg', title: 'Bamboo forest entry gate, Nest Bungalow' },
      { src: '/img/installations/entrance-gates/2-bg.jpg', thumb: '/img/installations/entrance-gates/2-thumb.jpg', title: 'Angular Accents entry gate, Paradiso' },
      { src: '/img/installations/entrance-gates/3-bg.jpg', thumb: '/img/installations/entrance-gates/3-thumb.jpg', title: 'Entry Gate, O’nella' },
    ],
    relatedProjects: ['staircases', 'lighting', 'sculpture'],
  },
  'staircases': {
    id: 'staircases',
    category: 'installations',
    title: 'Staircases',
    heroImage: '/img/installations/staircases/staircases-bg.jpg',
    description: [
      'Feature flights',
      'Design has no boundaries, and at Tao, we visualize a space in its entirety, irrespective of scale, domain or detail. With concepts for relevant products developed at TAO Studio, the execution has been a fruit of coordination and collaboration with talented artists, artisans, contractors and agencies from all over India and across the globe.',
    ],
    details: {
      location: 'Various Locations',
      status: 'Completed',
    },
    gallery: [
      { src: '/img/installations/staircases/1-bg.jpg', thumb: '/img/installations/staircases/1-thumb.jpg', title: 'Shunyam, Pune' },
      { src: '/img/installations/staircases/2-bg.jpg', thumb: '/img/installations/staircases/2-thumb.jpg', title: 'Queen’s Garden, Pune' },
      { src: '/img/installations/staircases/3-bg.jpg', thumb: '/img/installations/staircases/3-thumb.jpg', title: 'Spiral staircase, Aurum Pune' },
      { src: '/img/installations/staircases/4-bg.jpg', thumb: '/img/installations/staircases/4-thumb.jpg', title: 'Floating staircase, Paradiso' },
      { src: '/img/installations/staircases/5-bg.jpg', thumb: '/img/installations/staircases/5-thumb.jpg', title: 'Saj Villa, Pune' },
      { src: '/img/installations/staircases/6-bg.jpg', thumb: '/img/installations/staircases/6-thumb.jpg', title: 'Aapulki, Pune' },
      { src: '/img/installations/staircases/7-bg.jpg', thumb: '/img/installations/staircases/7-thumb.jpg', title: 'Sky Station, Pune' },
      { src: '/img/installations/staircases/8-bg.jpg', thumb: '/img/installations/staircases/8-thumb.jpg', title: 'Entrance Steps, Onella, Pune' },
    ],
    relatedProjects: ['entrance-gates', 'lighting', 'sculpture'],
  },
};
