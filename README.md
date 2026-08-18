# 🌟 One-Stop HR System (Workspace)

A modern, comprehensive Human Resources Management System built with **Next.js (App Router)**. This project features a premium **macOS-inspired Glassmorphism UI**, providing a seamless, responsive, and visually appealing experience for managing organizations, employees, and applicants.

## 🚀 Features

- **📄 Applicant Tracking System (ATS):** Manage job postings, track applicant statuses, and optimize SEO for public job listings.
- **📊 Employee Dashboard:** Employee directory with real-time search, role-based status tracking, and a high-level overview of organization statistics.
- **📝 Onboarding Form:** Streamlined document upload and data collection for new hires (UI ready for Server Actions).
- **🏖️ Leave Management:** Request leave, check remaining quotas, and review approval history with clear status indicators.
- **✨ Glassmorphism Design:** Smooth, responsive animated sidebar navigation with a frosted-glass effect.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Code Formatting:** Prettier (Tab Size: 2) & ESLint
- **Typography:** Inter (English) & Prompt (Thai) via Google Fonts

## 📂 Project Structure

\`\`\`text
hr-system/
├── app/
│ ├── ats/page.tsx # ATS Module
│ ├── dashboard/page.tsx # Employee Dashboard Module
│ ├── leave/page.tsx # Leave Management Module
│ ├── onboarding/page.tsx # Onboarding Module
│ ├── layout.tsx # Root layout with font configuration
│ └── page.tsx # Main Workspace Hub
├── components/
│ ├── Sidebar.tsx # Animated Glassmorphism Sidebar
│ └── UserProfile.tsx # User Profile UI
└── public/ # Static assets
\`\`\`

## 💻 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your system.

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/hr-system.git
   cd hr-system
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open your browser and navigate to `http://localhost:3000`.

## 🔮 Future Roadmap (Upcoming Features)

- [ ] Integrate Database (MySQL / PostgreSQL)
- [ ] Implement Authentication & Role-based Access Control (Middleware)
- [ ] Setup Server Actions for form submissions
- [ ] Cloud Storage integration for Onboarding documents (Resume, ID Cards)

## 👨‍💻 Author

**Sunny (Adipa)**
