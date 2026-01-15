# ByeWind SaaS Dashboard

A pixel-perfect implementation of the ByeWind SaaS dashboard design using React, Tailwind CSS, and Recharts. This project features a modern, responsive dashboard with dark/light theme support, interactive charts, and comprehensive data management capabilities.

![Dashboard Preview](./screenshot-dark.png)

## Features

### Core Features
- **Pixel-Perfect Implementation**: Carefully crafted to match the Figma design specifications
- **Dark/Light Theme Toggle**: Seamless theme switching with localStorage persistence
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Charts**: Built with Recharts for smooth data visualization

### Dashboard Page
- **Metric Cards**: Customers, Orders, Revenue, and Growth with trend indicators
- **Projections vs Actuals**: Bar chart comparing projected vs actual performance
- **Revenue Chart**: Line chart showing current week vs previous week comparison
- **Revenue by Location**: Geographic visualization with city-wise breakdown
- **Top Selling Products**: Sortable table with product details
- **Total Sales**: Donut chart with category breakdown

### Order List Page
- **Full-Featured Data Table**: With avatars, status badges, and action menus
- **Search & Filter**: Real-time filtering by name, project, or address
- **Sorting**: Click column headers to sort ascending/descending
- **Pagination**: Navigate through large datasets efficiently
- **Selection**: Checkbox selection for bulk actions
- **Status Indicators**: Color-coded badges (In Progress, Complete, Pending, Approved, Rejected)

### Layout Components
- **Left Sidebar**: Collapsible navigation with sections (Favorites, Dashboards, Pages)
- **Header**: Breadcrumb navigation, search bar, theme toggle, notifications
- **Right Sidebar**: Notifications, Activities, and Contacts panels

## Tech Stack

- **React 19** - UI Library
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Recharts** - Charting library
- **Framer Motion** - Animation library
- **Shadcn/UI** - Accessible component primitives
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
yarn build
```

The build artifacts will be stored in the `build/` directory.

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── dashboard/        # Dashboard-specific components
│   │   │   ├── MetricCards.jsx
│   │   │   ├── ProjectionsChart.jsx
│   │   │   ├── RevenueChart.jsx
│   │   │   ├── RevenueByLocation.jsx
│   │   │   ├── TopSellingProducts.jsx
│   │   │   └── TotalSalesChart.jsx
│   │   ├── layout/           # Layout components
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── RightSidebar.jsx
│   │   │   └── Sidebar.jsx
│   │   └── ui/               # Shadcn UI components
│   ├── context/              # React Context providers
│   │   ├── DashboardContext.js
│   │   └── ThemeContext.js
│   ├── pages/                # Page components
│   │   ├── DashboardPage.jsx
│   │   └── OrderListPage.jsx
│   ├── lib/
│   │   └── utils.js          # Utility functions
│   ├── App.js                # Root component
│   ├── index.css             # Global styles & design tokens
│   └── index.js              # Entry point
├── tailwind.config.js        # Tailwind configuration
└── package.json
```

## Design Decisions

### Color System
- Implemented a comprehensive HSL-based color system with semantic tokens
- Created separate color schemes for light and dark modes
- Used CSS custom properties for runtime theme switching

### Component Architecture
- Built reusable components following the DRY principle
- Separated layout components from page-specific components
- Used Context API for global state (theme, dashboard data)

### Animation Strategy
- Implemented subtle entrance animations using Framer Motion
- Added micro-interactions for hover states and transitions
- Used staggered animations for lists and cards

### Accessibility
- Used semantic HTML elements throughout
- Implemented keyboard navigation support
- Added ARIA labels where appropriate
- Ensured sufficient color contrast ratios

## Challenges & Solutions

1. **Theme Persistence**: Implemented localStorage-based theme persistence with a custom ThemeContext to maintain user preference across sessions.

2. **Chart Responsiveness**: Used ResponsiveContainer from Recharts to ensure charts adapt to their container size without layout shifts.

3. **Data Table Performance**: Implemented client-side pagination and filtering using useMemo hooks to prevent unnecessary re-renders.

4. **Sidebar Collapse Animation**: Used Framer Motion's AnimatePresence for smooth collapse/expand animations on the sidebar sections.

## Improvements Made

- Added smooth page transitions between routes
- Implemented animated entrance effects for dashboard cards
- Created custom chart tooltips matching the design system
- Added loading states and skeleton screens
- Implemented real-time search filtering with debounce

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for demonstration purposes as part of a UI Developer assignment.

## Acknowledgments

- Design inspiration from the Figma design files provided
- Icons from Lucide React
- UI primitives from Shadcn/UI
