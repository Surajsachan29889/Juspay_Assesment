# Juspay Assessment - eCommerce Dashboard

A modern, pixel-perfect eCommerce dashboard built with React, featuring comprehensive data visualization, order management, and a beautiful user interface with dark/light theme support.

## 🚀 Features

### Core Functionality
- **Dashboard Analytics**: Comprehensive metrics, charts, and data visualizations
- **Order Management**: Full CRUD operations with filtering, searching, sorting, and pagination
- **Theme Support**: Seamless dark/light mode switching with persistent preferences
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Advanced Features
- **Real-time Search**: Instant filtering across orders by ID, user, project, and address
- **Multi-column Sorting**: Sort by any column with ascending/descending order
- **Status Filtering**: Filter orders by status (In Progress, Complete, Pending, Approved, Rejected)
- **Pagination**: Efficient pagination with page navigation and item count display
- **Smooth Animations**: Framer Motion powered animations for delightful user experience
- **Accessibility**: WCAG compliant with ARIA labels, keyboard navigation, and focus states
- **Performance Optimized**: Lazy loading, memoization, and optimized re-renders

## 📋 Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Juspay-Assesment
```

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

## 🏃 Running the Application

### Development Mode

```bash
npm start
# or
yarn start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `build` folder.

### Running Tests

```bash
npm test
# or
yarn test
```

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── MetricCards.jsx
│   │   │   ├── ProjectionsChart.jsx
│   │   │   ├── RevenueChart.jsx
│   │   │   ├── RevenueByLocation.jsx
│   │   │   ├── TopSellingProducts.jsx
│   │   │   └── TotalSalesChart.jsx
│   │   ├── layout/             # Layout components
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── RightSidebar.jsx
│   │   └── ui/                 # Reusable UI components (shadcn/ui)
│   ├── context/                # React Context providers
│   │   ├── DashboardContext.js
│   │   └── ThemeContext.js
│   ├── pages/                  # Page components
│   │   ├── DashboardPage.jsx
│   │   └── OrderListPage.jsx
│   ├── lib/                    # Utility functions
│   │   └── utils.js
│   ├── hooks/                  # Custom React hooks
│   ├── assets/                 # Static assets
│   ├── App.js                  # Main app component
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Design System

The application uses a comprehensive design system built on Tailwind CSS with:

- **Color Palette**: Semantic color tokens for light and dark themes
- **Typography**: Inter font family with consistent sizing
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI components from shadcn/ui
- **Animations**: Smooth transitions and microinteractions

### Theme Variables

The design system supports both light and dark themes with CSS custom properties:
- Background colors
- Text colors
- Border colors
- Chart colors
- Status colors

## 🔧 Key Components

### Dashboard Components

- **MetricCards**: Displays key metrics (Customers, Orders, Revenue, Growth) with trend indicators
- **ProjectionsChart**: Bar chart comparing projections vs actuals
- **RevenueChart**: Line chart showing current vs previous week revenue
- **RevenueByLocation**: World map visualization with location-based revenue data
- **TopSellingProducts**: Table displaying top-selling products
- **TotalSalesChart**: Donut chart showing sales distribution by channel

### Order Management

- **OrderListPage**: Complete order management interface with:
  - Search functionality
  - Status filtering
  - Multi-column sorting
  - Pagination
  - Bulk selection
  - Responsive table design

## 🎯 Performance Optimizations

1. **Code Splitting**: Lazy loading of heavy chart components
2. **Memoization**: React.memo and useMemo for preventing unnecessary re-renders
3. **Optimized Animations**: Hardware-accelerated animations with Framer Motion
4. **Efficient State Management**: Context API with optimized selectors
5. **Responsive Images**: Optimized asset loading

## ♿ Accessibility Features

- **ARIA Labels**: Comprehensive ARIA labels for screen readers
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Focus Management**: Visible focus indicators for keyboard users
- **Semantic HTML**: Proper use of semantic HTML elements
- **Color Contrast**: WCAG AA compliant color contrast ratios

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

## 🧪 Testing

The project includes:
- Unit tests for components
- Integration tests for user flows
- Accessibility tests

Run tests with:
```bash
npm test
```

## 🚀 Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Netlify Deployment

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=build
```

### GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/juspay-assessment",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy:
```bash
npm run deploy
```

## 🛠️ Technologies Used

- **React 19**: UI library
- **React Router**: Client-side routing
- **Framer Motion**: Animation library
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Chart library
- **shadcn/ui**: Component library
- **Lucide React**: Icon library
- **Context API**: State management

## 📝 Code Quality

- **ESLint**: Code linting
- **Prettier**: Code formatting (recommended)
- **Component Documentation**: JSDoc comments
- **Type Safety**: PropTypes validation (can be upgraded to TypeScript)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of a technical assessment.

## 👤 Author

Built as part of Juspay technical assessment.

## 🙏 Acknowledgments

- shadcn/ui for the excellent component library
- Recharts for beautiful chart components
- Framer Motion for smooth animations
- Tailwind CSS for the utility-first approach
