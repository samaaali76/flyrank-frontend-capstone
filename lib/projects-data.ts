// Real portfolio project data, sourced from Samaa's resume. Powers both
// the /projects page and the chat assistant's getProjectInfo tool, so
// updating a project here updates both surfaces at once.
export type Project = {
  slug: string;
  name: string;
  description: string;
  stack: string[];
  link?: string;
  /** Shown instead of a link when there's no live repo (hardware builds, unpublished code). */
  note?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: 'flyrank-capstone',
    name: 'FlyRank Frontend Capstone',
    description:
      'A Next.js portfolio site with a streaming AI chat assistant that calls a real tool to look up project details, built for the FlyRank AI front-end engineering internship.',
    stack: ['Next.js', 'TypeScript', 'AI SDK', 'Tailwind CSS'],
    link: 'https://flyrank-frontend-capstone-tau.vercel.app',
  },
  {
    slug: 'nutriplan',
    name: 'NutriPlan – Food & Nutrition Planner',
    description:
      'A food and fitness planning app integrating three external APIs (TheMealDB, USDA, Open Food Facts) for meal browsing, nutrition facts, and barcode lookup, plus a localStorage-based food log tracking daily macros.',
    stack: ['JavaScript (ES6 Modules)', 'REST APIs', 'LocalStorage'],
    link: 'https://github.com/samaaali76/NutriPlan',
  },
  {
    slug: 'portfolio-route',
    name: 'Portfolio Website',
    description:
      'A fully responsive, RTL Arabic portfolio site built as a Route Academy assignment, with a dark/light theme toggle, a settings sidebar, and custom JavaScript-only tabs and carousel components.',
    stack: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript'],
    link: 'https://github.com/samaaali76/portfolio-ROUTE',
  },
  {
    slug: 'cosmos-space-dashboard',
    name: 'Cosmos Space Dashboard',
    description:
      "A 3-section space dashboard integrating NASA's APOD API, the SpaceDevs Launch Library, and the Solar System OpenData API for daily space imagery, upcoming launches, and planetary data.",
    stack: ['JavaScript', 'NASA API', 'SpaceDevs API', 'Solar System OpenData API'],
    link: 'https://github.com/samaaali76/cosmos-space-dashboard-v2',
  },
  {
    slug: 'gdg-task-manager',
    name: 'GDG App – Task Management System',
    description:
      'The complete Flutter frontend for a task management system built for student organizations, with a 4-level role hierarchy, role-based dashboards, and a SQL Server backend handling real-time updates.',
    stack: ['Flutter', 'Dart', 'Microsoft SQL Server'],
    link: 'https://github.com/samaaali76/gdg_task_manager',
  },
  {
    slug: 'vital-touch',
    name: 'Vital Touch – Smart Health Monitoring',
    description:
      'A mobile app for a smart wearable that monitors biometrics in real time via Bluetooth BLE (FSR and heart-rate sensors), with live charting and emergency alerts.',
    stack: ['Flutter', 'Dart', 'Bluetooth BLE', 'IoT Sensors'],
    link: 'https://github.com/samaaali76/VitalTouch-Qt-Frontend',
  },
  {
    slug: 'connect-4-robot',
    name: 'Connect 4 – Physical Robot',
    description:
      'A fully autonomous Connect 4 robot on an ESP32 that plays against a human using servo-controlled chip dropping and IR column detection, with Minimax + alpha-beta pruning at three difficulty levels.',
    stack: ['C++', 'ESP32', 'Servos', 'IR Sensors', 'Minimax AI'],
    note: 'Hardware build — no software repo',
  },
  {
    slug: 'azan-sync-system',
    name: 'Unified Azan Synchronization System',
    description:
      'A smart IoT system synchronizing the Islamic call to prayer across multiple mosques by fetching prayer times over WiFi and automating Azan audio playback.',
    stack: ['C', 'C++', 'Arduino Mega', 'ESP-01', 'RTC DS1307'],
    note: 'Hardware build — no software repo',
  },
  {
    slug: 'n-puzzle-solver',
    name: 'N-Puzzle Solver (AI)',
    description:
      'A 4×4 sliding puzzle solver with manual and automatic AI-solving modes using A* search with the Manhattan Distance heuristic, visualized step-by-step in an animated Tkinter GUI.',
    stack: ['Python', 'Tkinter', 'A* Search', 'NumPy'],
    note: 'Not yet published on GitHub',
  },
  {
    slug: 'capital-way',
    name: 'Capital Way – Metro Ticket Booking App',
    description:
      'A cross-platform metro ticket booking app with user authentication, seat selection, and real-time tracking via Firebase, optimized for consistent performance on Android and iOS.',
    stack: ['Flutter', 'Dart', 'Firebase'],
    note: 'Not yet published on GitHub',
  },
];