import Link from "next/link";
import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";
import brands from "../brandData";

// const brands = {
//   jyoti: {
//     name: "Jyoti CNC",
//     tagline: "Advanced Machining Centers & Turning Solutions",
//     shortDescription:
//       "Explore advanced CNC machining centers and turning solutions designed for precision manufacturing, productivity, and complex machining applications.",
//     description:
//       "Jyoti CNC Automation offers CNC machine tools for a range of manufacturing applications. Its product portfolio includes machining centers and turning solutions designed to support precision, repeatability, and efficient production.",
//     industry: "CNC Machining Technology",
//     website: "https://www.jyoti.co.in/",
//     websiteLabel: "Visit Jyoti CNC Official Website",
//     logo: "/Images/brands/jyoti.webp",
//     heroImage: "/Images/brands/jyoti/hero.jpg",
//     aboutTitle: "Advanced CNC Technology for Modern Manufacturing",
//     about:
//       "CNC machining centers and turning machines support the production of complex components with controlled machining operations. Explore the available categories to identify solutions suited to your manufacturing processes.",
//     expertise: [
//       "CNC Turning Centers",
//       "Vertical Machining Centers",
//       "Horizontal Machining Centers",
//       "Precision Component Manufacturing",
//     ],
//     collaborationTitle: "Jyoti CNC Products at MTAT",
//     collaboration:
//       "Explore Jyoti CNC product categories through the MTAT catalogue. Review the available machine information and contact our team for assistance with your manufacturing requirements.",
//     relationshipLabel: "Brand & Product Portfolio",
//     categories: [
//       {
//         title: "CNC Turning Centers",
//         slug: "cnc-turning-centers",
//         description:
//           "Explore CNC turning solutions for precision component manufacturing and repeatable production operations.",
//         image: "/Images/products/jyoti/cnc-turning-centers.jpg",
//         countLabel: "CNC Turning",
//         href: "/products/tool-room-software/jyoti/cnc-turning-centers",
//       },
//       {
//         title: "Vertical Machining Centers",
//         slug: "vertical-machining-centers",
//         description:
//           "Discover vertical machining solutions for milling, drilling, and precision machining applications.",
//         image: "/Images/products/jyoti/vertical-machining-centers.jpg",
//         countLabel: "Vertical Machining",
//         href: "/products/tool-room-software/jyoti/vertical-machining-centers",
//       },
//       {
//         title: "Horizontal Machining Centers",
//         slug: "horizontal-machining-centers",
//         description:
//           "Explore horizontal machining solutions for component production and multi-operation machining.",
//         image: "/Images/products/jyoti/horizontal-machining-centers.jpg",
//         countLabel: "Horizontal Machining",
//         href: "/products/tool-room-software/jyoti/horizontal-machining-centers",
//       },
//     ],
//     featuredProducts: [
//       {
//         name: "CNC Turning Solutions",
//         category: "CNC Turning Centers",
//         description:
//           "Explore turning machines for precision machining and component production.",
//         image: "/Images/products/jyoti/cnc-turning-centers.jpg",
//         href: "/products/tool-room-software/jyoti/cnc-turning-centers",
//       },
//       {
//         name: "Vertical CNC Machining",
//         category: "Vertical Machining Centers",
//         description:
//           "Machining solutions for milling, drilling, and other precision operations.",
//         image: "/Images/products/jyoti/vertical-machining-centers.jpg",
//         href: "/products/tool-room-software/jyoti/vertical-machining-centers",
//       },
//     ],
//   },

//   eifco: {
//     name: "EIFCO",
//     tagline: "Gear Hobbing Technology for Precision Manufacturing",
//     shortDescription:
//       "Explore vertical and horizontal gear hobbing machines designed for gear production and industrial transmission component manufacturing.",
//     description:
//       "EIFCO is associated with gear hobbing machinery used in gear manufacturing. Machine selection depends on gear geometry, workpiece dimensions, production requirements, and the desired machining configuration.",
//     industry: "Gear Manufacturing Technology",
//     website: "https://www.eifco.com/",
//     websiteLabel: "Visit EIFCO Official Website",
//     logo: "/Images/brands/eifco.webp",
//     heroImage: "/Images/brands/eifco/hero.jpg",
//     aboutTitle: "Gear Cutting Solutions for Industrial Applications",
//     about:
//       "Gear hobbing is a machining process used to manufacture gear teeth on suitable workpieces. Different machine configurations accommodate varying component sizes, gear specifications, and production needs.",
//     expertise: [
//       "Vertical Gear Hobbing",
//       "Horizontal Gear Hobbing",
//       "Gear Tooth Cutting",
//       "Industrial Gear Manufacturing",
//     ],
//     collaborationTitle: "EIFCO Products at MTAT",
//     collaboration:
//       "Explore the listed EIFCO gear hobbing machine categories through the MTAT catalogue. Contact our team for assistance with machine specifications and application requirements.",
//     relationshipLabel: "Brand & Product Portfolio",
//     categories: [
//       {
//         title: "Vertical Gear Hobbers",
//         slug: "vertical-gear-hobbers",
//         description:
//           "Explore vertical gear hobbing machines for suitable gear cutting and production applications.",
//         image: "/Images/products/eifco/vertical-gear-hobbers.jpg",
//         countLabel: "Vertical Hobbing",
//         href: "/products/tool-room-software/eifco/vertical-gear-hobbers",
//       },
//       {
//         title: "Horizontal Gear Hobbers",
//         slug: "horizontal-gear-hobbers",
//         description:
//           "Discover horizontal gear hobbing solutions for applicable gear manufacturing requirements.",
//         image: "/Images/products/eifco/horizontal-gear-hobbers.jpg",
//         countLabel: "Horizontal Hobbing",
//         href: "/products/tool-room-software/eifco/horizontal-gear-hobbers",
//       },
//     ],
//     featuredProducts: [
//       {
//         name: "Vertical Gear Hobbing Machines",
//         category: "Vertical Gear Hobbers",
//         description:
//           "Gear cutting solutions for suitable industrial component geometries.",
//         image: "/Images/products/eifco/vertical-gear-hobbers.jpg",
//         href: "/products/tool-room-software/eifco/vertical-gear-hobbers",
//       },
//       {
//         name: "Horizontal Gear Hobbing Machines",
//         category: "Horizontal Gear Hobbers",
//         description:
//           "Explore horizontal machine configurations for gear manufacturing applications.",
//         image: "/Images/products/eifco/horizontal-gear-hobbers.jpg",
//         href: "/products/tool-room-software/eifco/horizontal-gear-hobbers",
//       },
//     ],
//   },

//   "energy-mission": {
//     name: "Energy Mission",
//     tagline: "Industrial Metal Forming & Sheet Metal Machinery",
//     shortDescription:
//       "Explore CNC press brakes, shearing machines, and hydraulic presses for sheet metal fabrication and industrial forming applications.",
//     description:
//       "Energy Mission manufactures industrial machinery for metal forming and sheet metal processing. Its machine categories address applications such as bending, shearing, and pressing across different production environments.",
//     industry: "Metal Forming & Fabrication",
//     website: "https://www.energymission.com/",
//     websiteLabel: "Visit Energy Mission Official Website",
//     logo: "/Images/brands/energymission.webp",
//     heroImage: "/Images/brands/energy-mission/hero.jpg",
//     aboutTitle: "Metal Forming Solutions for Industrial Production",
//     about:
//       "Sheet metal fabrication requires suitable machinery for bending, cutting, and forming operations. Explore the available equipment categories to identify machines that align with material specifications, production volume, and component requirements.",
//     expertise: [
//       "CNC Press Brakes",
//       "Shearing Machines",
//       "Hydraulic Presses",
//       "Sheet Metal Fabrication",
//     ],
//     collaborationTitle: "Energy Mission Products at MTAT",
//     collaboration:
//       "Browse Energy Mission machinery categories through the MTAT catalogue. Review available equipment information and contact our team to discuss your metal forming and fabrication requirements.",
//     relationshipLabel: "Brand & Product Portfolio",
//     categories: [
//       {
//         title: "CNC Press Brake Machines",
//         slug: "cnc-press-brake-machines",
//         description:
//           "Explore CNC press brakes for controlled sheet metal bending and repeatable fabrication operations.",
//         image: "/Images/products/energy-mission/cnc-press-brake-machines.jpg",
//         countLabel: "CNC Bending",
//         href: "/products/tool-room-software/energy-mission/cnc-press-brake-machines",
//       },
//       {
//         title: "Shearing Machines",
//         slug: "shearing-machines",
//         description:
//           "Discover shearing equipment for cutting sheet metal to the required dimensions.",
//         image: "/Images/products/energy-mission/shearing-machines.jpg",
//         countLabel: "Sheet Cutting",
//         href: "/products/tool-room-software/energy-mission/shearing-machines",
//       },
//       {
//         title: "Hydraulic Presses",
//         slug: "hydraulic-presses",
//         description:
//           "Explore hydraulic press solutions for suitable industrial pressing and forming applications.",
//         image: "/Images/products/energy-mission/hydraulic-presses.jpg",
//         countLabel: "Hydraulic Pressing",
//         href: "/products/tool-room-software/energy-mission/hydraulic-presses",
//       },
//     ],
//     featuredProducts: [
//       {
//         name: "CNC Press Brake Solutions",
//         category: "CNC Press Brake Machines",
//         description:
//           "Sheet metal bending solutions for fabrication and manufacturing operations.",
//         image: "/Images/products/energy-mission/cnc-press-brake-machines.jpg",
//         href: "/products/tool-room-software/energy-mission/cnc-press-brake-machines",
//       },
//       {
//         name: "Industrial Shearing Solutions",
//         category: "Shearing Machines",
//         description: "Machinery for sheet metal cutting applications.",
//         image: "/Images/products/energy-mission/shearing-machines.jpg",
//         href: "/products/tool-room-software/energy-mission/shearing-machines",
//       },
//       {
//         name: "Hydraulic Press Solutions",
//         category: "Hydraulic Presses",
//         description:
//           "Pressing and forming equipment for applicable industrial processes.",
//         image: "/Images/products/energy-mission/hydraulic-presses.jpg",
//         href: "/products/tool-room-software/energy-mission/hydraulic-presses",
//       },
//     ],
//   },

//   "singhal-press": {
//     name: "Singhal Press (SEW)",
//     tagline: "Mechanical Press Technology for Metal Forming",
//     shortDescription:
//       "Explore cross-shaft, two-point, and eccentric-driven press categories for industrial metal forming and press shop applications.",
//     description:
//       "Mechanical presses support a range of metal forming and stamping operations. Their configuration, drive mechanism, capacity, and tooling requirements determine suitability for a particular production process.",
//     industry: "Mechanical Press Technology",
//     website: "https://www.singhalpress.com/",
//     websiteLabel: "Visit Singhal Press Official Website",
//     logo: "/Images/brands/sew.webp",
//     heroImage: "/Images/brands/singhal-press/hero.jpg",
//     aboutTitle: "Mechanical Presses for Metal Forming Applications",
//     about:
//       "Industrial press systems are used for forming, stamping, and other production operations. Selecting an appropriate press requires consideration of material, tonnage, stroke, tooling, and the production process.",
//     expertise: [
//       "Cross-Shaft Presses",
//       "Two-Point Presses",
//       "Eccentric-Driven Presses",
//       "Industrial Metal Forming",
//     ],
//     collaborationTitle: "Singhal Press Products at MTAT",
//     collaboration:
//       "Explore the available Singhal Press machine categories in the MTAT catalogue. Contact our team for help identifying suitable equipment for your press shop and metal forming requirements.",
//     relationshipLabel: "Brand & Product Portfolio",
//     categories: [
//       {
//         title: "Cross-Shaft Presses",
//         slug: "cross-shaft-presses",
//         description:
//           "Explore cross-shaft press configurations for suitable industrial forming applications.",
//         image: "/Images/products/singhal-press/cross-shaft-presses.jpg",
//         countLabel: "Cross-Shaft",
//         href: "/products/tool-room-software/singhal-press/cross-shaft-presses",
//       },
//       {
//         title: "Two-Point Presses",
//         slug: "two-point-presses",
//         description:
//           "Discover two-point press configurations for applicable production and forming requirements.",
//         image: "/Images/products/singhal-press/two-point-presses.jpg",
//         countLabel: "Two-Point",
//         href: "/products/tool-room-software/singhal-press/two-point-presses",
//       },
//       {
//         title: "Eccentric-Driven Presses",
//         slug: "eccentric-driven-presses",
//         description:
//           "Explore eccentric-driven press systems for suitable stamping and metal forming applications.",
//         image: "/Images/products/singhal-press/eccentric-driven-presses.jpg",
//         countLabel: "Eccentric Drive",
//         href: "/products/tool-room-software/singhal-press/eccentric-driven-presses",
//       },
//     ],
//     featuredProducts: [
//       {
//         name: "Cross-Shaft Press Systems",
//         category: "Cross-Shaft Presses",
//         description:
//           "Press configurations for suitable industrial forming operations.",
//         image: "/Images/products/singhal-press/cross-shaft-presses.jpg",
//         href: "/products/tool-room-software/singhal-press/cross-shaft-presses",
//       },
//       {
//         name: "Two-Point Press Systems",
//         category: "Two-Point Presses",
//         description: "Press solutions for applicable production requirements.",
//         image: "/Images/products/singhal-press/two-point-presses.jpg",
//         href: "/products/tool-room-software/singhal-press/two-point-presses",
//       },
//     ],
//   },

//   sukrit: {
//     name: "SUKRIT",
//     tagline: "Specialized Metal Forming & Finishing Systems",
//     shortDescription:
//       "Explore specialized industrial systems for metal forming, processing, and finishing applications.",
//     description:
//       "Industrial metal forming and finishing systems support different manufacturing processes depending on the equipment configuration, material, and production requirements. Consult the manufacturer's product information to confirm specific machine capabilities.",
//     industry: "Metal Forming & Finishing",
//     website: "https://www.sukrit.com/",
//     websiteLabel: "Visit SUKRIT Official Website",
//     logo: "/Images/brands/sukrit.webp",
//     heroImage: "/Images/brands/sukrit/hero.jpg",
//     aboutTitle: "Specialized Systems for Industrial Manufacturing",
//     about:
//       "Metal forming and finishing equipment serves a variety of industrial production needs. Explore the categories listed in the MTAT catalogue and confirm machine specifications for your intended application.",
//     expertise: [
//       "Metal Forming Systems",
//       "Industrial Processing Equipment",
//       "Metal Finishing Applications",
//       "Manufacturing Process Support",
//     ],
//     collaborationTitle: "SUKRIT Products at MTAT",
//     collaboration:
//       "Browse the SUKRIT brand profile and its listed product categories through the MTAT catalogue. Contact our team for further product details and application assistance.",
//     relationshipLabel: "Brand & Product Portfolio",
//     categories: [
//       {
//         title: "Metal Forming Systems",
//         slug: "metal-forming-systems",
//         description:
//           "Explore equipment categories for suitable metal forming and industrial production processes.",
//         image: "/Images/products/sukrit/metal-forming-systems.jpg",
//         countLabel: "Metal Forming",
//         href: "/products/tool-room-software/sukrit/metal-forming-systems",
//       },
//       {
//         title: "Metal Finishing Systems",
//         slug: "metal-finishing-systems",
//         description:
//           "Discover listed equipment categories for applicable metal processing and finishing requirements.",
//         image: "/Images/products/sukrit/metal-finishing-systems.jpg",
//         countLabel: "Metal Finishing",
//         href: "/products/tool-room-software/sukrit/metal-finishing-systems",
//       },
//     ],
//     featuredProducts: [
//       {
//         name: "Metal Forming Equipment",
//         category: "Metal Forming Systems",
//         description:
//           "Explore listed systems for industrial forming applications.",
//         image: "/Images/products/sukrit/metal-forming-systems.jpg",
//         href: "/products/tool-room-software/sukrit/metal-forming-systems",
//       },
//       {
//         name: "Metal Finishing Equipment",
//         category: "Metal Finishing Systems",
//         description:
//           "Explore equipment categories for applicable finishing processes.",
//         image: "/Images/products/sukrit/metal-finishing-systems.jpg",
//         href: "/products/tool-room-software/sukrit/metal-finishing-systems",
//       },
//     ],
//   },

//   hexagon: {
//     name: "Hexagon",
//     tagline: "Metrology, Measurement & Quality Inspection",
//     shortDescription:
//       "Explore coordinate measuring machines and optical measurement systems for precision inspection, dimensional verification, and quality control.",
//     description:
//       "Hexagon provides metrology technologies used in manufacturing inspection and quality assurance. Measurement equipment supports dimensional verification, component inspection, and data-driven quality processes across different industries.",
//     industry: "Metrology & Quality Inspection",
//     website: "https://hexagon.com/",
//     websiteLabel: "Visit Hexagon Official Website",
//     logo: "/Images/brands/hexagon.webp",
//     heroImage: "/Images/brands/hexagon/hero.jpg",
//     aboutTitle: "Precision Measurement for Manufacturing Quality",
//     about:
//       "Metrology equipment helps manufacturers verify dimensions, inspect components, and maintain quality standards. Coordinate measuring machines and optical measurement systems offer different approaches to inspection based on the part geometry and measurement requirements.",
//     expertise: [
//       "Coordinate Measuring Machines",
//       "Optical Measurement Systems",
//       "Dimensional Inspection",
//       "Manufacturing Quality Control",
//     ],
//     collaborationTitle: "Hexagon Products at MTAT",
//     collaboration:
//       "Explore the listed Hexagon metrology categories through the MTAT catalogue. Contact our team to discuss inspection requirements and obtain further product information.",
//     relationshipLabel: "Brand & Product Portfolio",
//     categories: [
//       {
//         title: "Coordinate Measuring Machines",
//         slug: "coordinate-measuring-machines",
//         description:
//           "Explore CMM solutions for dimensional inspection and verification of manufactured components.",
//         image: "/Images/products/hexagon/coordinate-measuring-machines.jpg",
//         countLabel: "CMM",
//         href: "/products/tool-room-software/hexagon/coordinate-measuring-machines",
//       },
//       {
//         title: "Optical Measurement Systems",
//         slug: "optical-measurement-systems",
//         description:
//           "Discover optical measurement technologies for suitable non-contact inspection applications.",
//         image: "/Images/products/hexagon/optical-measurement-systems.jpg",
//         countLabel: "Optical Metrology",
//         href: "/products/tool-room-software/hexagon/optical-measurement-systems",
//       },
//     ],
//     featuredProducts: [
//       {
//         name: "Coordinate Measuring Solutions",
//         category: "Coordinate Measuring Machines",
//         description:
//           "Measurement equipment for dimensional verification and inspection workflows.",
//         image: "/Images/products/hexagon/coordinate-measuring-machines.jpg",
//         href: "/products/tool-room-software/hexagon/coordinate-measuring-machines",
//       },
//       {
//         name: "Optical Measurement Solutions",
//         category: "Optical Measurement Systems",
//         description:
//           "Explore optical systems for suitable component inspection requirements.",
//         image: "/Images/products/hexagon/optical-measurement-systems.jpg",
//         href: "/products/tool-room-software/hexagon/optical-measurement-systems",
//       },
//     ],
//   },
//   sodick: {
//     name: "Sodick",
//     tagline: "Advanced EDM Technology & Precision Machining",

//     shortDescription:
//       "Explore electrical discharge machining (EDM) solutions, including wire EDM machines, for precision machining applications and the production of complex components.",

//     description:
//       "Sodick is known for its electrical discharge machining technologies used in precision manufacturing. EDM processes enable the machining of electrically conductive materials in applications where component geometry, dimensional accuracy, and surface finish are important considerations.",

//     industry: "EDM & Precision Machining",

//     aboutTitle: "Advanced EDM Technology for Precision Manufacturing",

//     about:
//       "Electrical discharge machining removes material through controlled electrical discharges and is used for applications that require intricate profiles and precise machining. Wire EDM systems are particularly useful for producing complex contours in electrically conductive materials. Machine selection depends on workpiece material, geometry, accuracy requirements, and production needs.",

//     expertise: [
//       "Wire EDM Machines",
//       "Electrical Discharge Machining",
//       "Precision Profile Cutting",
//       "Complex Component Machining",
//     ],

//     collaborationTitle: "Precision EDM Solutions at MTAT",

//     collaboration:
//       "MTAT Technologies presents Sodick's listed EDM machine categories within its manufacturing equipment portfolio. Explore the available solutions and contact our team to discuss your machining requirements and enquire about suitable equipment.",

//     relationshipLabel: "Brand & Product Portfolio",
//   },

//   pinnacle: {
//     name: "Pinnacle",
//     tagline: "Precision Grinding & Tool Room Machinery",

//     shortDescription:
//       "Explore surface grinding machines and precision tool room machinery for accurate finishing, dimensional control, and industrial component manufacturing.",

//     description:
//       "Precision grinding plays an important role in manufacturing processes that require controlled material removal, dimensional accuracy, and suitable surface finishes. Pinnacle's listed machinery categories provide options for exploring grinding and tool room applications.",

//     industry: "Precision Grinding & Tool Room Machinery",

//     aboutTitle: "Precision Grinding for Consistent Manufacturing Quality",

//     about:
//       "Grinding machines are used to refine component surfaces and achieve specified dimensions and finishes. Surface grinding is commonly applied to suitable flat surfaces where precision and consistency are required. The appropriate machine depends on workpiece dimensions, material, tolerance requirements, and production conditions.",

//     expertise: [
//       "Surface Grinding Machines",
//       "Precision Grinding",
//       "Tool Room Machinery",
//       "Component Finishing",
//     ],

//     collaborationTitle: "Precision Grinding Solutions at MTAT",

//     collaboration:
//       "MTAT Technologies helps manufacturers explore the listed Pinnacle grinding and tool room machine categories through its product portfolio. Contact our team for product information and assistance in identifying machinery suited to your application.",

//     relationshipLabel: "Brand & Product Portfolio",
//   },

//   kiya: {
//     name: "Kiya",
//     tagline: "Cylindrical, Internal & External Grinding Solutions",

//     shortDescription:
//       "Explore cylindrical, internal, and external grinding machine categories for precision finishing and dimensional control in component manufacturing.",

//     description:
//       "Grinding is an essential manufacturing process for components that require accurate dimensions and controlled surface finishes. Kiya's listed grinding machine categories cover cylindrical, internal, and external grinding applications, subject to individual machine specifications.",

//     industry: "Grinding & Precision Finishing",

//     aboutTitle: "Grinding Technology for Precision Components",

//     about:
//       "Different grinding processes address different component geometries and finishing requirements. Cylindrical grinding is used for suitable external cylindrical surfaces, while internal grinding addresses internal bores and related features. Machine selection should consider workpiece geometry, material, dimensional tolerances, surface finish, and production volume.",

//     expertise: [
//       "Cylindrical Grinding Machines",
//       "Internal Grinding Machines",
//       "External Grinding Machines",
//       "Precision Component Finishing",
//     ],

//     collaborationTitle: "Grinding Solutions at MTAT",

//     collaboration:
//       "MTAT Technologies presents the listed Kiya grinding machine categories within its manufacturing equipment portfolio. Explore the available product categories and contact our team to discuss your component finishing and grinding requirements.",

//     relationshipLabel: "Brand & Product Portfolio",
//   },
// };

const brandContent = {
  jyoti: {
    name: "Jyoti CNC",
    tagline: "Advanced CNC Machining & Turning Solutions",

    shortDescription:
      "Discover CNC machining centres and turning solutions designed for precision component manufacturing, complex machining operations, and efficient industrial production.",

    description:
      "Jyoti CNC specialises in CNC machine tools for modern manufacturing. Its machining and turning solutions support a variety of component production requirements across industries.",

    industry: "CNC Machining Technology",

    aboutTitle: "Precision Machining for Modern Industry",

    about:
      "Modern manufacturing demands accuracy, repeatability, and efficient production processes. CNC machining centres and turning machines support manufacturers in producing complex components with controlled machining operations. Explore the available categories to identify machinery suited to your application.",

    expertise: [
      "CNC Turning Centres",
      "Vertical Machining Centres",
      "Horizontal Machining Centres",
      "Precision Component Manufacturing",
    ],

    collaborationTitle: "Connecting Manufacturing with CNC Technology",

    collaboration:
      "MTAT Technologies presents Jyoti CNC machinery through its product portfolio, helping manufacturers explore machining and turning categories relevant to their production needs. Contact our team for assistance with product selection and machine enquiries.",

    relationshipLabel: "Brand & Product Portfolio",
  },

  eifco: {
    name: "EIFCO",
    tagline: "Gear Hobbing Solutions for Precision Manufacturing",

    shortDescription:
      "Explore vertical and horizontal gear hobbing machines for gear cutting applications and the production of industrial transmission components.",

    description:
      "Gear hobbing is an important machining process used in the manufacture of gear teeth. EIFCO's listed machine categories focus on vertical and horizontal gear hobbing configurations for different manufacturing requirements.",

    industry: "Gear Manufacturing Technology",

    aboutTitle: "Supporting Precision in Gear Manufacturing",

    about:
      "Gear manufacturing requires appropriate machining equipment to achieve the required tooth geometry and component specifications. Vertical and horizontal gear hobbing machines provide different machine configurations for applicable production processes. The right selection depends on workpiece dimensions, gear specifications, and production requirements.",

    expertise: [
      "Vertical Gear Hobbers",
      "Horizontal Gear Hobbers",
      "Gear Tooth Cutting",
      "Industrial Gear Manufacturing",
    ],

    collaborationTitle: "Gear Manufacturing Solutions at MTAT",

    collaboration:
      "MTAT Technologies helps manufacturers explore the available EIFCO gear hobbing categories through its product portfolio. Our team can assist with initial enquiries and help identify the product information needed to evaluate suitable machinery.",

    relationshipLabel: "Brand & Product Portfolio",
  },

  "energy-mission": {
    name: "Energy Mission",
    tagline: "Metal Forming & Sheet Metal Processing Solutions",

    shortDescription:
      "Explore CNC press brakes, shearing machines, and hydraulic presses for sheet metal fabrication, bending, cutting, and industrial forming applications.",

    description:
      "Energy Mission offers machinery for sheet metal processing and industrial metal forming. Its listed categories cover key manufacturing operations, including bending, shearing, and hydraulic pressing.",

    industry: "Metal Forming & Fabrication",

    aboutTitle: "Practical Solutions for Metal Forming and Fabrication",

    about:
      "Sheet metal fabrication involves multiple processes that transform raw material into finished components. CNC press brakes support bending operations, shearing machines are used for sheet cutting, and hydraulic presses serve suitable pressing and forming applications. Machinery selection depends on material properties, component dimensions, production volume, and process requirements.",

    expertise: [
      "CNC Press Brake Machines",
      "Shearing Machines",
      "Hydraulic Presses",
      "Sheet Metal Fabrication",
    ],

    collaborationTitle: "Sheet Metal Solutions at MTAT",

    collaboration:
      "Through its Energy Mission product portfolio, MTAT Technologies helps manufacturers explore machinery for sheet metal cutting, bending, and forming. Contact our team to discuss your application and enquire about suitable equipment.",

    relationshipLabel: "Brand & Product Portfolio",
  },

  "singhal-press": {
    name: "Singhal Press (SEW)",
    tagline: "Mechanical Power Presses for Industrial Production",

    shortDescription:
      "Explore cross-shaft, two-point, and eccentric-driven press categories for industrial pressing, stamping, and metal forming applications.",

    description:
      "Mechanical power presses are used in manufacturing processes involving metal forming and stamping. The available configurations serve different production and tooling requirements, depending on machine design and application.",

    industry: "Mechanical Press Technology",

    aboutTitle: "Mechanical Press Technology for Production Applications",

    about:
      "Mechanical presses play an important role in manufacturing components through pressing, stamping, and forming operations. Different press configurations accommodate different tooling arrangements and production requirements. Factors such as press capacity, stroke, material, tooling, and required output should be considered when selecting equipment.",

    expertise: [
      "Cross-Shaft Presses",
      "Two-Point Presses",
      "Eccentric-Driven Presses",
      "Industrial Metal Forming",
    ],

    collaborationTitle: "Mechanical Press Solutions at MTAT",

    collaboration:
      "MTAT Technologies provides a portfolio through which manufacturers can explore the listed Singhal Press (SEW) categories. Our team can assist with product enquiries and help identify the machine specifications required for your manufacturing application.",

    relationshipLabel: "Brand & Product Portfolio",
  },

  sukrit: {
    name: "SUKRIT",
    tagline: "Specialised Metal Forming & Finishing Technology",

    shortDescription:
      "Explore specialised machinery categories for metal forming and finishing, with solutions intended for industrial manufacturing and precision processing requirements.",

    description:
      "Metal forming and finishing technologies support different stages of industrial component production. SUKRIT's listed categories provide a starting point for exploring equipment relevant to specific manufacturing processes.",

    industry: "Metal Forming & Finishing",

    aboutTitle: "Specialised Equipment for Manufacturing Processes",

    about:
      "Manufacturing applications often require dedicated equipment to shape, process, or finish components to the required specifications. The appropriate machinery depends on the material, component geometry, production process, and desired finish. Explore the listed categories and confirm individual machine capabilities against the manufacturer's technical information.",

    expertise: [
      "Metal Forming Systems",
      "Industrial Processing Equipment",
      "Metal Finishing Applications",
      "Manufacturing Process Requirements",
    ],

    collaborationTitle: "Specialised Manufacturing Solutions at MTAT",

    collaboration:
      "MTAT Technologies brings SUKRIT's listed product categories into its broader manufacturing equipment portfolio. Explore the available categories or contact our team for assistance with product enquiries and application requirements.",

    relationshipLabel: "Brand & Product Portfolio",
  },

  hexagon: {
    name: "Hexagon",
    tagline: "Metrology, Measurement & Quality Inspection",

    shortDescription:
      "Discover coordinate measuring machines and optical measurement systems for dimensional inspection, component verification, and manufacturing quality control.",

    description:
      "Hexagon provides metrology technologies that support measurement, inspection, and quality assurance in manufacturing environments. Its measurement solutions help manufacturers assess component dimensions and verify compliance with defined specifications.",

    industry: "Metrology & Quality Inspection",

    aboutTitle: "Measurement Accuracy for Manufacturing Quality",

    about:
      "Dimensional measurement is essential for verifying component geometry and maintaining manufacturing quality. Coordinate measuring machines and optical measurement systems offer different approaches to inspection, depending on the part, required tolerances, measurement method, and production environment.",

    expertise: [
      "Coordinate Measuring Machines",
      "Optical Measurement Systems",
      "Dimensional Inspection",
      "Manufacturing Quality Control",
    ],

    collaborationTitle: "Precision Measurement Solutions at MTAT",

    collaboration:
      "MTAT Technologies helps manufacturers explore the listed Hexagon metrology categories through its product portfolio. Contact our team to discuss your measurement requirements and enquire about suitable inspection technologies.",

    relationshipLabel: "Brand & Product Portfolio",
  },
    sodick: {
    name: "Sodick",
    tagline: "Advanced EDM Technology & Precision Machining",

    shortDescription:
      "Explore electrical discharge machining (EDM) solutions, including wire EDM machines, for precision machining applications and the production of complex components.",

    description:
      "Sodick is known for its electrical discharge machining technologies used in precision manufacturing. EDM processes enable the machining of electrically conductive materials in applications where component geometry, dimensional accuracy, and surface finish are important considerations.",

    industry: "EDM & Precision Machining",

    aboutTitle: "Advanced EDM Technology for Precision Manufacturing",

    about:
      "Electrical discharge machining removes material through controlled electrical discharges and is used for applications that require intricate profiles and precise machining. Wire EDM systems are particularly useful for producing complex contours in electrically conductive materials. Machine selection depends on workpiece material, geometry, accuracy requirements, and production needs.",

    expertise: [
      "Wire EDM Machines",
      "Electrical Discharge Machining",
      "Precision Profile Cutting",
      "Complex Component Machining",
    ],

    collaborationTitle: "Precision EDM Solutions at MTAT",

    collaboration:
      "MTAT Technologies presents Sodick's listed EDM machine categories within its manufacturing equipment portfolio. Explore the available solutions and contact our team to discuss your machining requirements and enquire about suitable equipment.",

    relationshipLabel: "Brand & Product Portfolio",
  },

  pinnacle: {
    name: "Pinnacle",
    tagline: "Precision Grinding & Tool Room Machinery",

    shortDescription:
      "Explore surface grinding machines and precision tool room machinery for accurate finishing, dimensional control, and industrial component manufacturing.",

    description:
      "Precision grinding plays an important role in manufacturing processes that require controlled material removal, dimensional accuracy, and suitable surface finishes. Pinnacle's listed machinery categories provide options for exploring grinding and tool room applications.",

    industry: "Precision Grinding & Tool Room Machinery",

    aboutTitle: "Precision Grinding for Consistent Manufacturing Quality",

    about:
      "Grinding machines are used to refine component surfaces and achieve specified dimensions and finishes. Surface grinding is commonly applied to suitable flat surfaces where precision and consistency are required. The appropriate machine depends on workpiece dimensions, material, tolerance requirements, and production conditions.",

    expertise: [
      "Surface Grinding Machines",
      "Precision Grinding",
      "Tool Room Machinery",
      "Component Finishing",
    ],

    collaborationTitle: "Precision Grinding Solutions at MTAT",

    collaboration:
      "MTAT Technologies helps manufacturers explore the listed Pinnacle grinding and tool room machine categories through its product portfolio. Contact our team for product information and assistance in identifying machinery suited to your application.",

    relationshipLabel: "Brand & Product Portfolio",
  },

  kiya: {
    name: "Kiya",
    tagline: "Cylindrical, Internal & External Grinding Solutions",

    shortDescription:
      "Explore cylindrical, internal, and external grinding machine categories for precision finishing and dimensional control in component manufacturing.",

    description:
      "Grinding is an essential manufacturing process for components that require accurate dimensions and controlled surface finishes. Kiya's listed grinding machine categories cover cylindrical, internal, and external grinding applications, subject to individual machine specifications.",

    industry: "Grinding & Precision Finishing",

    aboutTitle: "Grinding Technology for Precision Components",

    about:
      "Different grinding processes address different component geometries and finishing requirements. Cylindrical grinding is used for suitable external cylindrical surfaces, while internal grinding addresses internal bores and related features. Machine selection should consider workpiece geometry, material, dimensional tolerances, surface finish, and production volume.",

    expertise: [
      "Cylindrical Grinding Machines",
      "Internal Grinding Machines",
      "External Grinding Machines",
      "Precision Component Finishing",
    ],

    collaborationTitle: "Grinding Solutions at MTAT",

    collaboration:
      "MTAT Technologies presents the listed Kiya grinding machine categories within its manufacturing equipment portfolio. Explore the available product categories and contact our team to discuss your component finishing and grinding requirements.",

    relationshipLabel: "Brand & Product Portfolio",
  },
};

export default async function BrandPage({ params }) {
  const { slug } = await params;

  // const updatedBrands = Object.fromEntries(
  //   Object.entries(brandContent).map(([slug, content]) => [
  //     slug,
  //     {
  //       ...(brands[slug] || {}),
  //       ...content,
  //       categories: brands[slug]?.categories || [],
  //       featuredProducts: brands[slug]?.featuredProducts || [],
  //     },
  //   ]),
  // );

  const brand = brands[slug?.toLowerCase()];

  if (!brand) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-slate-200 px-6">
        <div className="max-w-lg text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3]">
            Brand Not Found
          </p>

          <h1 className="mt-4 text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
            Manufacturer not found.
          </h1>

          <p className="mt-4 leading-7 text-slate-600">
            Return to the brands directory to explore our manufacturers and
            their product ranges.
          </p>

          <Link
            href="/brands"
            className="mt-7 inline-flex items-center gap-3 bg-[#004DA3] px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-700"
          >
            Explore All Brands <FaArrowRight />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-hidden bg-slate-200/80 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-200">
        <div className="mx-auto flex flex-wrap py-16 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40  items-center gap-12">
          <div className="relative z-10">
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <div className="flex h-16 w-32 items-center justify-center border border-slate-300 bg-white p-3">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                MTAT Technologies / Brand Profile
              </span>
            </div>

            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3]">
              {brand.industry}
            </p>

            <h1 className="max-w-2xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
              {brand.name}
              <span className="mt-3 block text-slate-500">{brand.tagline}</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              {brand.shortDescription}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[#004DA3] px-6 py-4 text-sm font-medium text-white transition hover:bg-orange-700"
              >
                Official Website
                <FaExternalLinkAlt className="transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#product-categories"
                className="inline-flex items-center gap-3 border border-slate-400 px-6 py-4 text-sm font-medium text-slate-800 transition hover:border-[#004DA3] hover:bg-[#004DA3] hover:text-white"
              >
                Explore Products <FaArrowRight />
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm text-slate-500">
              <FaGlobe className="text-[#004DA3]" />
              <span>Industrial machinery and technology portfolio</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-blue-300/30 blur-3xl" />

            <div className="group relative min-h-[360px] overflow-hidden bg-slate-900 md:min-h-[520px]">
              <img
                src={brand.heroImage}
                alt={`${brand.name} industrial machinery`}
                className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/90" />

              <div className="absolute bottom-0 left-0 right-0 p-7 text-white md:p-9">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
                  Manufacturer Portfolio
                </p>

                <h2 className="mt-3 text-2xl font-medium md:text-3xl">
                  {brand.name} Product Range
                </h2>

                <p className="mt-3 max-w-md text-sm leading-7 text-white/75">
                  Explore industrial machinery and product categories for your
                  manufacturing requirements.
                </p>

                <a
                  href="#product-categories"
                  className="mt-5 inline-flex items-center gap-3 text-sm font-medium text-white transition hover:text-orange-400"
                >
                  Discover the range <FaArrowRight />
                </a>
              </div>

              <div className="absolute right-5 top-5 border border-white/40 px-3 py-2 text-xs uppercase tracking-widest text-white">
                MTAT Technologies
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT THE BRAND */}
      <section className="bg-slate-100 py-20 md:py-28">
        <div className="mx-auto grid px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40  gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3]">
              About the Manufacturer
            </p>

            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-slate-900 md:text-5xl">
              {brand.aboutTitle}
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600">
              {brand.description}
            </p>

            <div className="mt-8 h-1 w-20 bg-[#004DA3]" />
          </div>

          <div>
            <p className="text-base leading-8 text-slate-600">{brand.about}</p>

            <div className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {brand.expertise.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 border-b border-slate-300 py-5"
                >
                  <span className="text-sm font-medium text-[#004DA3]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="mt-1 shrink-0 text-[#004DA3]" />
                    <span className="text-sm leading-6 text-slate-700">
                      {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MTAT AND MANUFACTURER */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto grid py-20 lg:py-28 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40  gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-300">
              MTAT Technologies / {brand.name}
            </p>

            <h2 className="mt-5 text-3xl font-medium leading-tight md:text-5xl">
              {brand.collaborationTitle}
            </h2>

            <div className="mt-7 h-1 w-20 bg-orange-500" />
          </div>

          <div>
            <div className="mb-5 inline-flex border border-white/20 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white/70">
              {brand.relationshipLabel}
            </div>

            <p className="max-w-2xl text-base leading-8 text-white/70">
              {brand.collaboration}
            </p>

            <a
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-3 text-sm font-medium text-white transition hover:text-orange-400"
            >
              Learn more from the manufacturer
              <FaExternalLinkAlt />
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section
        id="product-categories"
        className="scroll-mt-24 bg-slate-200/80"
      >
        <div className="mx-auto  py-16 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 ">
          <div className="grid gap-8 md:grid-cols-2 md:items-end md:gap-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3]">
                Browse by Application
              </p>

              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight md:text-5xl">
                {brand.name} Product Categories
                <span className="mt-2 block text-slate-500">
                  Find the right solution.
                </span>
              </h2>
            </div>

            <p className="text-sm leading-7 text-slate-600 md:text-base">
              Explore the {brand.name} product categories available in the MTAT
              catalogue. Select a category to view its associated products and
              information.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(brand.categories || []).map((category, index) => (
              <Link
                key={category.slug}
                href={category.href}
                className="group relative flex flex-col overflow-hidden bg-slate-900 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-linear-to-b from-slate-950/20 via-transparent to-slate-950/80" />

                  <span className="absolute left-4 top-4 bg-white px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-slate-800">
                    {category.countLabel}
                  </span>

                  <span className="absolute bottom-4 left-4 text-sm font-medium text-white/70">
                    CATEGORY {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col bg-white p-6">
                  <h3 className="text-xl font-medium tracking-tight text-slate-900">
                    {category.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">
                    {category.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
                    <span className="text-sm font-medium text-[#004DA3]">
                      Explore Category
                    </span>

                    <FaArrowRight className="text-sm text-[#004DA3] transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-slate-100 py-20 md:py-28">
        <div className="mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40">
          <div className="grid gap-8 md:grid-cols-2 md:items-end md:gap-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3]">
                Explore the Range
              </p>

              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight md:text-5xl">
                Featured {brand.name} Solutions
              </h2>
            </div>

            <p className="text-sm leading-7 text-slate-600 md:text-base">
              Explore selected machinery and continue to the relevant catalogue
              page for additional product information.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
           {featuredProducts.map((product, index) => (
              <article
                key={product.name}
                className="group overflow-hidden border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />

                  <div className="absolute left-4 top-4 bg-slate-950/80 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#004DA3]">
                    {product.category}
                  </p>

                  <h3 className="mt-3 text-xl font-medium tracking-tight text-slate-900">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {product.description}
                  </p>

                  <Link
                    href={product.href}
                    className="mt-6 inline-flex items-center gap-3 border-b border-slate-300 pb-2 text-sm font-medium text-slate-800 transition hover:border-[#004DA3] hover:text-[#004DA3]"
                  >
                    View Details
                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICIAL WEBSITE */}
      <section className="bg-slate-200/80 py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40">
        <div className="relative mx-auto p-6 md:p-12  overflow-hidden bg-[#004DA3] text-white">
          <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border-[45px] border-white/10" />
          <div className="absolute -bottom-32 right-48 h-64 w-64 rounded-full border-[35px] border-white/10" />

          <div className="relative z-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/70">
                Official Manufacturer Resources
              </p>

              <h2 className="mt-4 text-3xl font-medium leading-tight md:text-5xl">
                Need more technical details?
              </h2>

              <p className="mt-5 text-base leading-8 text-white/80">
                Visit the official {brand.name} website for additional
                manufacturer information, technical specifications,
                documentation, and product resources.
              </p>

              <p className="mt-4 break-all text-sm text-white/70">
                {brand.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </p>
            </div>

            <a
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-medium text-slate-900 transition hover:bg-orange-500 hover:text-white"
            >
              {brand.websiteLabel}
              <FaExternalLinkAlt />
            </a>
          </div>

          <p className="relative z-10 mt-10 border-t border-white/20 pt-5 text-xs leading-6 text-white/60">
            You will be redirected to an external website operated by the
            manufacturer. Confirm product specifications and availability
            directly with the manufacturer.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-slate-300 bg-slate-100">
        <div className="mx-auto flex  py-16 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40  flex-col gap-7 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#004DA3]">
              Need Assistance?
            </p>

            <h2 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
              Looking for the right {brand.name} solution?
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              Contact MTAT Technologies to discuss your application, machinery
              options, and product requirements.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-3 bg-[#004DA3] px-7 py-4 text-sm font-medium text-white transition hover:bg-orange-700"
          >
            Contact MTAT <FaArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
