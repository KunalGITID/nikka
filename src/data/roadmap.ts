export type Course = {
  id: string;
  title: string;
  provider: string;
  duration: string;
  hours: number;
  category: "coding" | "math" | "dsa" | "fds" | "tool" | "os" | "ai";
  detail: string;
};

export type Week = {
  id: string;
  number: string;
  title: string;
  dates: string;
  theme: string;
  courses: Course[];
};

export const paths = [
  {
    title: "Coding Path",
    icon: "Keyboard",
    accent: "cyan",
    description:
      "Intro to Programming, Python for Data Science, Data Analysis, Git, SQL, Django, and APIs.",
  },
  {
    title: "Math Path",
    icon: "Sigma",
    accent: "magenta",
    description:
      "College Algebra, Calculus 1, then Transforms and BVP, in the dependency order that actually works.",
  },
  {
    title: "AI / Systems Path",
    icon: "Network",
    accent: "yellow",
    description:
      "DSA, Operating Systems, ML foundations, neural networks, and the first GenAI bootcamp block.",
  },
];

export const subjectMap = [
  ["Fundamentals of Data Science", "Python for DS + SQL + Django + Data Analysis"],
  ["Data Structures & Algorithms", "DSA Easy to Advanced"],
  ["Transforms & Boundary Value Problems", "College Algebra + Calculus 1 + Dr. Gajendra Purohit"],
  ["Operating Systems", "Neso Academy OS Course"],
];

export const weeks: Week[] = [
  {
    id: "week-1",
    number: "01",
    title: "True Zero Start",
    dates: "May 28 - Jun 03",
    theme:
      "Learn what programming is, get Python running, and rebuild algebra confidence before the heavier subjects arrive.",
    courses: [
      {
        id: "intro-programming",
        title: "Introduction to Programming & Computer Science",
        provider: "freeCodeCamp",
        duration: "1:59",
        hours: 1.98,
        category: "coding",
        detail:
          "Programming logic, variables, loops, data types, memory, and how computers execute instructions.",
      },
      {
        id: "python-ds-1",
        title: "Python for Data Science - Part 1",
        provider: "freeCodeCamp / Kylie Ying",
        duration: "6:00",
        hours: 6,
        category: "coding",
        detail:
          "Python setup, variables, operators, booleans, control flow, loops, and functions.",
      },
      {
        id: "algebra-1",
        title: "College Algebra Full Course - Part 1",
        provider: "freeCodeCamp",
        duration: "6:00",
        hours: 6,
        category: "math",
        detail:
          "Equations, functions, polynomials, rationals, exponentials, and logarithms for calculus readiness.",
      },
    ],
  },
  {
    id: "week-2",
    number: "02",
    title: "Python Complete + Calculus Begins",
    dates: "Jun 04 - Jun 10",
    theme:
      "Finish Python fundamentals, cover NumPy/Pandas/Matplotlib, complete algebra, and begin Calculus 1.",
    courses: [
      {
        id: "python-ds-2",
        title: "Python for Data Science - Part 2",
        provider: "freeCodeCamp",
        duration: "6:19",
        hours: 6.32,
        category: "fds",
        detail:
          "Strings, lists, dictionaries, NumPy, Pandas, Matplotlib, and a small data analysis project.",
      },
      {
        id: "algebra-git",
        title: "College Algebra Finish + Git & GitHub",
        provider: "freeCodeCamp",
        duration: "1:51",
        hours: 1.85,
        category: "tool",
        detail:
          "Finish algebra, then learn init, add, commit, push, pull, branches, and merge conflict basics.",
      },
      {
        id: "calculus-1",
        title: "Calculus 1 Full Course - Part 1",
        provider: "freeCodeCamp",
        duration: "6:00",
        hours: 6,
        category: "math",
        detail:
          "Limits and derivatives, preparing for integration and Fourier coefficient work later.",
      },
    ],
  },
  {
    id: "week-3",
    number: "03",
    title: "Calculus Done + DSA + Data Skills",
    dates: "Jun 11 - Jun 17",
    theme:
      "Finish the math prerequisite chain, start DSA, and strengthen Pandas/visualization skills.",
    courses: [
      {
        id: "calculus-2",
        title: "Calculus 1 Full Course - Part 2",
        provider: "freeCodeCamp",
        duration: "5:53",
        hours: 5.88,
        category: "math",
        detail:
          "Integration, definite integrals, substitution, and the Fundamental Theorem of Calculus.",
      },
      {
        id: "dsa-1",
        title: "Data Structures & Algorithms - Part 1",
        provider: "freeCodeCamp",
        duration: "4:00",
        hours: 4,
        category: "dsa",
        detail:
          "Arrays, linked lists, stacks, queues, and the linear structures used in early DSA labs.",
      },
      {
        id: "data-analysis-1",
        title: "Data Analysis with Python - Part 1",
        provider: "freeCodeCamp",
        duration: "4:00",
        hours: 4,
        category: "fds",
        detail:
          "DataFrames, filtering, groupby, merging, missing values, and common Matplotlib charts.",
      },
    ],
  },
  {
    id: "week-4",
    number: "04",
    title: "FDS Exam Prep - SQL, Django, APIs",
    dates: "Jun 18 - Jun 24",
    theme:
      "Close DSA, finish data analysis, then focus on SQL and Django topics that map directly to FDS exams.",
    courses: [
      {
        id: "dsa-2",
        title: "Data Structures & Algorithms - Part 2",
        provider: "freeCodeCamp",
        duration: "4:03",
        hours: 4.05,
        category: "dsa",
        detail:
          "Trees, graphs, hash tables, heaps, shortest path algorithms, and standard traversal problems.",
      },
      {
        id: "data-analysis-2",
        title: "Data Analysis with Python - Finish",
        provider: "freeCodeCamp",
        duration: "0:22",
        hours: 0.37,
        category: "fds",
        detail: "Final data cleaning, distributions, and statistical summary sections.",
      },
      {
        id: "sql",
        title: "SQL Full Course",
        provider: "freeCodeCamp",
        duration: "4:20",
        hours: 4.33,
        category: "fds",
        detail:
          "CREATE, INSERT, SELECT, WHERE, UPDATE, DELETE, primary keys, constraints, and SQLite basics.",
      },
      {
        id: "django",
        title: "Python Django Web Framework Full Course",
        provider: "freeCodeCamp",
        duration: "3:45",
        hours: 3.75,
        category: "fds",
        detail:
          "MVT architecture, routes, views, templates, forms, models, validation, and SQLite integration.",
      },
    ],
  },
  {
    id: "week-5",
    number: "05",
    title: "APIs + Transforms + OS Begins",
    dates: "Jun 25 - Jul 01",
    theme:
      "Wrap the coding path with APIs, start Transforms and BVP, then begin Operating Systems.",
    courses: [
      {
        id: "apis",
        title: "APIs for Beginners",
        provider: "freeCodeCamp",
        duration: "2:19",
        hours: 2.32,
        category: "tool",
        detail:
          "HTTP methods, JSON, REST endpoints, authentication, and API calls from Python.",
      },
      {
        id: "transforms",
        title: "Transforms & BVP",
        provider: "Dr. Gajendra Purohit",
        duration: "6:00",
        hours: 6,
        category: "math",
        detail:
          "Fourier Series, Fourier Transforms, Z-Transforms, PDEs, heat equation, and wave equation practice.",
      },
      {
        id: "os-1",
        title: "Operating Systems - Part 1",
        provider: "Neso Academy",
        duration: "5:00",
        hours: 5,
        category: "os",
        detail:
          "Processes, threads, process states, context switching, and CPU scheduling algorithms.",
      },
    ],
  },
  {
    id: "week-6",
    number: "06",
    title: "OS Complete + ML Theory + AI Begins",
    dates: "Jul 02 - Jul 08",
    theme:
      "Finish OS, get a conceptual ML foundation, then begin the GenAI bootcamp gently.",
    courses: [
      {
        id: "os-2",
        title: "Operating Systems - Part 2",
        provider: "Neso Academy",
        duration: "5:00",
        hours: 5,
        category: "os",
        detail:
          "Synchronization, deadlocks, paging, segmentation, virtual memory, disk scheduling, and file systems.",
      },
      {
        id: "ml-everybody",
        title: "Machine Learning for Everybody",
        provider: "freeCodeCamp / Kylie Ying",
        duration: "3:53",
        hours: 3.88,
        category: "ai",
        detail:
          "Supervised and unsupervised learning, train/test splits, regression, KNN, SVM, trees, and random forests.",
      },
      {
        id: "deep-nn",
        title: "How Deep Neural Networks Work",
        provider: "freeCodeCamp / Brandon Rohrer",
        duration: "3:50",
        hours: 3.83,
        category: "ai",
        detail:
          "Weights, layers, backpropagation, convolution intuition, and how modern neural systems fit together.",
      },
      {
        id: "genai-preweek",
        title: "GenAI Bootcamp - Preweek Start",
        provider: "freeCodeCamp / Andrew Brown",
        duration: "2:00",
        hours: 2,
        category: "ai",
        detail:
          "Bootcamp setup, tooling overview, architecture concepts, and the start of GenAI workflows.",
      },
    ],
  },
  {
    id: "week-7",
    number: "07",
    title: "GenAI Bootcamp - Week 1 Complete",
    dates: "Jul 09 - Jul 15",
    theme:
      "Complete the first 20 hours of the GenAI bootcamp, stopping before the backend and deployment complexity spike.",
    courses: [
      {
        id: "genai-week-1",
        title: "GenAI Bootcamp - Complete PreWeek + Week 1",
        provider: "freeCodeCamp / Andrew Brown",
        duration: "18:00",
        hours: 18,
        category: "ai",
        detail:
          "GenAI architecture, prompt engineering, sentence constructor project, vocabulary imports, and first-week workflows.",
      },
    ],
  },
];

export const totalHours = weeks.reduce(
  (total, week) => total + week.courses.reduce((weekTotal, course) => weekTotal + course.hours, 0),
  0,
);

export const totalCourses = weeks.reduce((total, week) => total + week.courses.length, 0);
