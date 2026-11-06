// Factual source: MTAT Technologies Private Limited corporate profile.
// Do not add certifications, awards, customer names/numbers, facilities
// or statistics without confirmation.

export const ROUTES = {
  contact: '/contact',
  // Set to '/products' once that route exists. While null, no product links render.
  products: null,
};

export const HERO = {
  company: "MTAT TECHNOLOGIES PRIVATE LIMITED",

  title: "Engineering Precision. Enabling Progress.",

  tagline:
    "Connecting industries with advanced machine tools, trusted technology partners and dependable manufacturing solutions since 1995.",
};


export const INTRO = {
  label: 'OUR STORY',

  heading: 'Building Progress Through Precision Since 1995',

  paragraphs: [
    'MTAT Technologies Private Limited is a Ludhiana-based provider of advanced machine tools, precision machining technologies and industrial manufacturing solutions, serving the evolving needs of the manufacturing sector.',

    'Established in 1995, we have built our journey around connecting industries with reliable machinery, innovative technologies and established Indian and international manufacturing partners.',

    'From our beginnings with a team of two professionals to an organisation of approximately 60 people, our growth reflects a continued commitment to technological advancement, industry knowledge and long-term customer relationships.',

    'Today, with solutions spanning metal cutting, metal forming, precision metrology and tool room machinery, we continue to help manufacturers identify the right technologies, enhance productivity and move towards greater operational precision.'
  ],

  caption: 'THREE DECADES OF INDUSTRIAL EXCELLENCE',
};



export const TIMELINE_SECTION = {
  label: 'OUR JOURNEY',
  heading: 'Three Decades of Progress. A Journey Built on Trust.',
};

export const TIMELINE = [
  {
    year: 1995,
    title: 'Where Our Journey Began',
    text: 'MTAT Technologies was established in Ludhiana, Punjab, with a vision to support industries through dependable machine tool solutions.',
  },
  {
    year: 'Growth',
    title: 'Expanding Our Capabilities',
    text: 'Gradually expanded our product portfolio to address diverse machining, metal processing, tooling and precision measurement requirements.',
  },
  {
    year: 'Partnerships',
    title: 'Building Technology Partnerships',
    text: 'Strengthened our network of Indian and international manufacturing partners, bringing advanced industrial technologies closer to customers.',
  },
  {
    year: 'Evolution',
    title: 'Growing Beyond Machinery Supply',
    text: 'Developed a broader customer support approach encompassing technical consultation, installation coordination, service, maintenance and spare parts.',
  },
  {
    year: 'Today',
    title: 'A Stronger Team. A Broader Vision.',
    text: 'With approximately 60 professionals and four core solution verticals, MTAT continues to support the changing needs of modern manufacturing.',
  },
];



export const EXPERTISE_SECTION = {
  label: 'OUR EXPERTISE',
  heading: 'Advanced Technologies. Comprehensive Manufacturing Solutions.',
  intro:
    'From precision machining to advanced metal processing and dimensional inspection, MTAT brings together a diverse portfolio of industrial technologies. Through our established technology partnerships, we help manufacturers identify machinery and solutions that align with their production requirements, operational goals and quality standards.',
};

export const EXPERTISE = [
  {
    id: 'metal-cutting',
    image: 'cutting',
    title: 'Metal Cutting',
    description:
      'Precision machining solutions designed to deliver accuracy, consistency and productivity across a wide range of industrial manufacturing applications.',
    items: [
      'CNC Turning Centres',
      'Vertical Turning Lathes',
      'Vertical Machining Centres',
      'Horizontal Machining Centres',
      'Turn-Mill Centres',
      'Five-Axis Machining',
      'Gear Hobbing Machines',
      'Double Column Machines',
    ],
  },
  {
    id: 'metal-forming',
    image: 'forming',
    title: 'Metal Forming',
    description:
      'Advanced metal processing and forming technologies that support efficient fabrication, bending, cutting and pressing operations.',
    items: [
      'CNC Press Brakes',
      'Hydraulic Presses',
      'Mechanical Power Presses',
      'Shearing Machines',
      'Laser Cutting Systems',
      'Plate Rolling Machines',
      'Ironworker Machines',
      'V-Grooving Machines',
    ],
  },
  {
    id: 'precision-metrology',
    image: 'metrology',
    title: 'Precision Metrology',
    description:
      'Advanced measurement and inspection technologies that help manufacturers maintain dimensional accuracy, consistency and quality control.',
    items: [
      'Coordinate Measuring Machines',
      'Portable Measuring Arms',
      'Optical Measuring Systems',
      'Multisensor Measurement',
      'Precision Probing Solutions',
      'Dimensional Inspection',
    ],
  },
  {
    id: 'tool-room',
    image: 'toolroom',
    title: 'Tool Room Solutions',
    description:
      'Specialised machinery for tooling, die and mould manufacturing, component finishing and precision engineering applications.',
    items: [
      'Wire-Cut EDM Systems',
      'EDM Machines',
      'Surface Grinding Machines',
      'Cylindrical Grinding Machines',
      'Internal Grinding Solutions',
      'Precision Finishing',
    ],
  },
];



export const PARTNERS_SECTION = {
  label: 'OUR TECHNOLOGY NETWORK',
  heading: 'Strong Partnerships. Advanced Manufacturing Technologies.',
  intro:
    'At MTAT Technologies, we believe that the right technology partnerships create better opportunities for manufacturers. As an authorised channel partner for a diverse portfolio of established machine tool and technology brands, we connect businesses with advanced machinery, specialised engineering solutions and evolving manufacturing technologies.',
};

// `confirmed: false` hides a brand. `logo` (e.g. '/Images/partners/hexagon.svg')
// shows the real logo file instead of the brand name once you have it.
export const PARTNERS = [
  { name: 'Jyoti CNC', logo: null, confirmed: true },
  { name: 'EIFCO', logo: null, confirmed: true },
  { name: 'Energy Mission', logo: null, confirmed: true },
  { name: 'Singhal Press (SEW)', logo: null, confirmed: true },
  { name: 'Sukrit Machine Tools', logo: null, confirmed: true },
  { name: 'Hexagon', logo: null, confirmed: true },
  { name: 'Sodick', logo: null, confirmed: true },
  { name: 'Pinnacle', logo: null, confirmed: true },
  { name: 'Kiya', logo: null, confirmed: true },
];

export const INDUSTRIES_SECTION = {
  label: 'INDUSTRY APPLICATIONS',
  heading: 'Supporting the Industries That Drive Progress',
  intro:
    'Every manufacturing sector has its own production challenges and precision requirements. MTAT brings together advanced machine tools and industrial technologies to support diverse manufacturing applications, helping businesses strengthen their capabilities and move towards greater efficiency.',
};

export const INDUSTRIES = [
  {
    id: 'automotive',
    image: 'automotive',
    title: 'Automotive',
    description:
      'Machining and manufacturing technologies for automotive components and precision production requirements.',
  },
  {
    id: 'agriculture',
    image: 'agriculture',
    title: 'Agriculture',
    description:
      'Industrial machining and forming solutions for agricultural machinery and equipment manufacturing.',
  },
  {
    id: 'aerospace',
    image: 'aerospace',
    title: 'Aerospace',
    description:
      'Advanced machining and precision measurement technologies for complex component manufacturing.',
  },
  {
    id: 'sheet-metal',
    image: 'sheetMetal',
    title: 'Sheet Metal Fabrication',
    description:
      'Advanced cutting, bending, pressing and sheet metal processing solutions for fabrication requirements.',
  },
  {
    id: 'medical',
    image: 'medical',
    title: 'Medical Equipment',
    description:
      'Precision machining and measurement technologies supporting the manufacturing of intricate equipment components.',
  },
];


export const PEOPLE = {
  label: 'OUR PEOPLE',
  heading: '60 Professionals. One Shared Vision.',
  paragraphs: [
    'Behind every successful solution is a team committed to understanding the needs of modern manufacturing. At MTAT Technologies, our people bring together industry knowledge, technical expertise and a customer-focused approach.',
    'What began in 1995 with a team of just two professionals has grown into an organisation of approximately 60 people, reflecting our continued development and commitment to the industry.',
    'From technical consultation and product coordination to service support and customer relationships, every team member contributes to delivering dependable solutions and creating lasting value.',
    'As manufacturing technologies continue to evolve, our team remains focused on learning, adapting and helping customers move forward with confidence.'
  ],
};



export const COMMITMENT = {
  label: 'THE MTAT COMMITMENT',
  heading: 'Beyond Machines. Building Lasting Partnerships.',
  paragraphs: [
    'At MTAT Technologies, our role goes beyond connecting businesses with machinery. We focus on understanding each customer’s manufacturing requirements and helping them identify technologies that align with their production goals.',
    'From initial consultation and technical coordination to installation support, training, maintenance and spare parts assistance, we aim to build relationships that extend well beyond the point of purchase.',
    'With industry experience, established technology partnerships and a dedicated team, we remain committed to supporting our customers at every stage of their manufacturing journey.'
  ],
  tagline: 'Your Partner in Precision. Your Partner in Progress.',
  cta: 'Talk to Our Team',
};
