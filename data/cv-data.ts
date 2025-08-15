export const cvData = {
  basics: {
    name: "Mahmoud Khashaba",
    label: "Software Engineer",
    email: "mahmoud.h.khashaba@gmail.com",
    phone: "+20 102 784 3419",
    url: "https://54ba.net",
    summary: "Experienced Software Engineer with expertise in Python, Node.js, and modern web technologies. Passionate about building scalable applications and AI-powered solutions.",
    location: {
      address: "",
      postalCode: "",
      city: "Cairo",
      region: "Egypt",
      countryCode: "EG"
    },
    profiles: [
      {
        network: "GitHub",
        username: "54ba",
        url: "https://github.com/54ba"
      },
      {
        network: "LinkedIn",
        username: "mahmoud-h-khashaba",
        url: "https://linkedin.com/in/mahmoud-h-khashaba"
      }
    ]
  },

  work: [
    {
      company: "Tasker AI",
      position: "Software Engineer",
      website: "https://taskerai.com",
      startDate: "12/2024",
      endDate: "04/2025",
      location: "Remote - USA",
      highlights: [
        "Developed Python-based AI agent proxies integrating LangSmith with large language models such as DeepSeek and Alibaba's Qwen.",
        "Maintained and extended backend services using Express.js, TypeScript, LangChain, and LangSmith.",
        "Built a custom Next.js logging interface to retrieve and visualize logs from Datadog for debugging and monitoring.",
        "Contributed to the maintenance and development of features in the company's cross-platform Flutter application."
      ],
      keywords: ["Python", "LangSmith", "TypeScript", "LangChain", "Next.js", "Datadog", "Flutter"]
    },
    {
      company: "Safqa",
      position: "Fullstack Developer",
      website: "",
      startDate: "09/2024",
      endDate: "12/2024",
      location: "Remote",
      highlights: [
        "Utilized TanStack and ShadCN to build scalable front-end architecture.",
        "Implemented Cypress tests to ensure code quality and automated testing.",
        "Developed and optimized React pages using NestJS and TypeScript for enhanced user experience.",
        "Integrated OAuth for secure user login functionality.",
        "Employed Axiom and Google Analytics to track and resolve backend errors and monitor event tracking.",
        "Used FastAPI Python and Puppeteer to scrape websites."
      ],
      keywords: ["TanStack", "ShadCN", "Cypress", "React", "NestJS", "TypeScript", "OAuth", "FastAPI", "Python"]
    },
    {
      company: "Midade",
      position: "Web developer",
      website: "",
      startDate: "11/2023",
      endDate: "06/2024",
      location: "Remote, Egypt",
      highlights: [
        "Developed web applications using Node.js, PHP, and Laravel.",
        "Created modular packages for code reusability and maintainability."
      ],
      keywords: ["Node.js", "PHP", "Laravel", "Modular packages"]
    },
    {
      company: "FBN Travel",
      position: "Back-End Web developer",
      website: "",
      startDate: "11/2022",
      endDate: "06/2023",
      location: "Remote, Egypt",
      highlights: [
        "Developed backend systems using PHP and Laravel.",
        "Created responsive user interfaces using Vue.js."
      ],
      keywords: ["PHP", "Laravel", "Vue.js"]
    },
    {
      company: "Soundeals",
      position: "Full stack developer",
      website: "",
      startDate: "01/2021",
      endDate: "08/2022",
      location: "Cairo, Egypt",
      highlights: [
        "Developed cross-platform applications using Flutter and Dart.",
        "Collaborated with design teams using Figma to create user interfaces."
      ],
      keywords: ["Flutter", "Dart", "Figma"]
    },
    {
      company: "Mawad",
      position: "Back-End Web developer",
      website: "",
      startDate: "03/2020",
      endDate: "11/2020",
      location: "Cairo, Egypt",
      highlights: [
        "Developed backend services using Node.js, Express.js, and MongoDB.",
        "Designed database schemas and implemented RESTful APIs."
      ],
      keywords: ["Node.js", "Express.js", "MongoDB"]
    },
    {
      company: "Grafika",
      position: "Web developer",
      website: "",
      startDate: "2019",
      endDate: "2019",
      location: "Cairo, Egypt",
      highlights: [
        "Developed websites using PHP, Laravel, HTML, CSS, and JavaScript.",
        "Optimized build processes using Webpack for better performance."
      ],
      keywords: ["PHP", "Laravel", "HTML", "CSS", "JavaScript", "Webpack"]
    }
  ],

  education: [
    {
      institution: "Faculty of Engineering- Zagazig University",
      area: "Electrical Engineering Computers & Systems",
      studyType: "B.Sc.",
      startDate: "2013",
      endDate: "2019",
      description: "Graduation Project: OLC Developed a Java JSP Online compiler website for managing problem-solving competitions."
    }
  ],

  skills: [
    {
      name: "Programming Languages",
      level: "Advanced",
      keywords: ["Node.js", "Typescript", "Python", "PHP", "Java"]
    },
    {
      name: "Backend Technologies",
      level: "Advanced",
      keywords: ["Express Js", "Django", "FastAPI", "Flask", "Laravel", "JSP"]
    },
    {
      name: "Frontend Technologies",
      level: "Advanced",
      keywords: ["Next js", "Vue js", "React", "TypeScript", "HTML", "CSS"]
    },
    {
      name: "Databases",
      level: "Intermediate",
      keywords: ["MYSQL", "MongoDB", "Neo4j"]
    },
    {
      name: "AI & Machine Learning",
      level: "Intermediate",
      keywords: ["Langchain", "Pytorch", "Pandas", "Scikit-learn", "Numpy", "MLflow"]
    },
    {
      name: "DevOps & Tools",
      level: "Intermediate",
      keywords: ["Nginx", "Docker", "K8s", "Jenkins", "AWS", "Puppeteer", "Cypress"]
    }
  ],

  projects: [
    {
      name: "MusicBud",
      description: "A recommendation system matches users with similar tastes in music.",
      url: "https://github.com/musicbud",
      highlights: [
        "Developed a music recommendation and social platform using Django, integrating Spotify and YouTube Music.",
        "Built the backend with Django and Neo4j to manage complex relationships between users, tracks, and artists.",
        "Implemented a LightFM model for personalized music suggestions through collaborative and content-based filtering.",
        "Created RESTful APIs with pagination and async support.",
        "Developed a cross-platform Flutter app with real-time updates and OAuth login."
      ],
      keywords: ["Python", "Django", "Neo4j", "Neomodel", "LightFM", "PyTorch", "JWT", "Spotify-YouTube Music APIs", "Asyncio", "Flutter"]
    },
    {
      name: "NixOS-Dot-Files",
      description: "Modular NixOS Configuration",
      url: "https://github.com/54ba//nixos-dot-files",
      highlights: [
        "Enables and disables different sets of packages and services.",
        "Minimal by default, with optional components that can be activated as needed."
      ],
      keywords: ["NixOS", "Configuration", "Modular"]
    },
    {
      name: "AI Agent",
      description: "PDF Processing API with LangChain",
      url: "https://github.com/54ba/agent",
      highlights: [
        "Developed a Python-based AI agent that processes PDF files, extracting text with metadata, and integrating with LangChain for advanced NLP tasks.",
        "Built a FastAPI-based REST API with async processing, automatic documentation (Swagger/ReDoc), CORS support, and robust file upload handling.",
        "Created a rich terminal UI with progress bars, tables, colorful output, and interactive commands for user interaction.",
        "Utilized Pytest for API routes and Cypress for end-to-end PDF processing to ensure reliability."
      ],
      keywords: ["FastAPI", "LangChain", "Python", "Docker", "Pytest", "Cypress"]
    },
    {
      name: "News App Microservice",
      description: "microservices-based newsfeed application",
      url: "https://github.com/54ba/newsfeed-app",
      highlights: [
        "Developed a microservices-based newsfeed application using Flask",
        "Designed services for user management, posts, and an API gateway",
        "Implemented database migrations and thorough testing with pytest"
      ],
      keywords: ["Flask", "Microservices", "Python", "pytest"]
    },
    {
      name: "Gemini-Style-CV",
      description: "CV Gemini design template with ATS Compatibility Score",
      url: "https://github.com/54ba/gemini-style-cv",
      highlights: [
        "Designed and developed an innovative CV template inspired by the Gemini design philosophy.",
        "Features responsive layout and ATS compatibility scoring.",
        "Open-sourced to benefit job seekers worldwide."
      ],
      keywords: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
    },
    {
      name: "Reservation System",
      description: "Box Office and Cinema tickets POS sys.",
      url: "https://github.com/54ba/reservation_system",
      highlights: [
        "Built a system to enable receptionists to book seat tickets.",
        "Allows navigation through genres, halls, and times."
      ],
      keywords: ["VueJS", "Laravel", "Nginx/SSL", "Docker"]
    },
    {
      name: "MovieSeeder",
      description: "An api for seeding movies from TMDB",
      url: "https://github.com/54ba/movieseeder",
      highlights: [
        "Created an application to automate discovering, downloading, and organizing movie content.",
        "Implemented advanced filtering based on quality ratings, release dates, and genres.",
        "Developed a user-friendly interface with real-time status updates and intuitive controls.",
        "Integrated multiple APIs to gather metadata for a richer user experience."
      ],
      keywords: ["API", "Movie", "TMDB", "Automation", "Filtering"]
    },
    {
      name: "Parcel Delivery Tracker",
      description: "delivery tracker application using Vue.js 3 and Express.js",
      url: "https://github.com/54ba/parcel_deliver",
      highlights: [
        "Developed a delivery tracker application using Vue.js 3 and Express.js, containerized with Docker.",
        "Implemented a comprehensive set of API endpoints for managing parcels, senders, and bikers.",
        "Features include retrieving parcels by ID, sender, or biker status, with robust API endpoint testing.",
        "Designed for future integration of a drag-and-drop SPA, JWT authentication, and cloud deployment with Nginx."
      ],
      keywords: ["Vue.js", "Express.js", "Docker", "API", "JWT", "Nginx"]
    },
    {
      name: "Resume Scraper",
      description: "Java | RPA For extracting useful information from CVs",
      highlights: [
        "Utilizes contact information, skills, and location to generate CVs.",
        "Built with the Stanford NTLK (Natural Language) Java library and UiPath Studio."
      ],
      keywords: ["Java", "RPA", "NTLK", "UiPath", "CV Processing"]
    },
    {
      name: "Indexer",
      description: "POS System for small businesses",
      highlights: [
        "Developed a scalable software solution suitable for small businesses.",
        "Utilized Electron and MongoDB to build the application, allowing for easy upgrades and future scaling."
      ],
      keywords: ["Electron", "MongoDB", "POS", "Scalable"]
    }
  ]
};