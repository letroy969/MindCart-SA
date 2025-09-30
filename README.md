<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
<<<<<<< HEAD
# MindCart SA - South African Grocery Price Comparison

A modern React application that compares grocery prices across South African retailers (Checkers, Pick n Pay, Woolworths) to help consumers find the best deals and save money on their shopping.

## 🛒 Features

- **Price Comparison**: Compare prices across multiple South African grocery stores
- **Smart Search**: Advanced search with filters and categories
- **Interactive Cart**: Add products to cart and see total savings
- **Real-time Updates**: Live price updates and deal notifications
- **Responsive Design**: Beautiful, mobile-first UI with Tailwind CSS
- **Store Integration**: Direct integration with store APIs
- **Deal Tracking**: Track price history and savings over time

## 🏗️ Architecture

### Frontend
- **React 18** with functional components and hooks
- **Tailwind CSS** for styling with custom luxury theme
- **React Query** for data fetching and caching
- **React Router** for navigation
- **Heroicons** for beautiful icons

### Backend & Infrastructure
- **AWS ECS Fargate** for containerized deployment
- **DynamoDB** for product and price data storage
- **S3** for static asset hosting
- **Application Load Balancer** for traffic distribution
- **Terraform** for Infrastructure as Code

### CI/CD
- **GitHub Actions** for automated deployment
- **Docker** for containerization
- **AWS ECR** for container registry

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- AWS CLI configured
- Terraform installed

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/MindCart-SA.git
   cd MindCart-SA
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Environment Variables

Create a `.env.local` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development
```

## 🏪 Store Integration

### Supported Stores
- **Checkers** - South Africa's leading grocery retailer
- **Pick n Pay** - Quality products at great prices
- **Woolworths** - Premium quality and fresh produce

### API Integration
The application integrates with store APIs to fetch real-time pricing data:

```javascript
// Example API call
const products = await fetchProductPrices('bananas');
```

### Mock Data
For development, the app includes mock data that simulates real store responses.

## 🎨 Design System

### Color Palette
- **Navy**: Primary brand color (#1e3a8a)
- **Gold**: Accent color (#f59e0b)
- **White**: Background and text (#ffffff)

### Typography
- **Headers**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components
- Reusable React components with consistent styling
- Responsive design patterns
- Accessibility-first approach

## 📁 Project Structure

```
mindcart/
├── public/                 # Static assets
│   ├── logos/             # Store logos
│   └── index.html         # HTML template
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CartSummary.jsx
│   │   ├── SearchBar.jsx
│   │   └── Filters.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Category.jsx
│   │   ├── StoreComparison.jsx
│   │   └── ProductDetail.jsx
│   ├── services/          # API and data services
│   │   ├── api.js
│   │   └── storeData.js
│   ├── styles/            # Styling
│   │   └── tailwind.css
│   ├── App.jsx
│   └── index.jsx
├── terraform/             # Infrastructure as Code
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── iam.tf
├── .github/workflows/     # CI/CD pipelines
│   └── deploy.yml
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Deployment

### AWS Infrastructure

1. **Initialize Terraform**
   ```bash
   cd terraform
   terraform init
   ```

2. **Plan deployment**
   ```bash
   terraform plan -var="aws_account_id=YOUR_ACCOUNT_ID"
   ```

3. **Deploy infrastructure**
   ```bash
   terraform apply -var="aws_account_id=YOUR_ACCOUNT_ID"
   ```

### Application Deployment

The application is automatically deployed via GitHub Actions when code is pushed to the main branch.

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Build and push Docker image**
   ```bash
   docker build -t mindcart .
   docker tag mindcart:latest YOUR_ACCOUNT_ID.dkr.ecr.af-south-1.amazonaws.com/mindcart:latest
   docker push YOUR_ACCOUNT_ID.dkr.ecr.af-south-1.amazonaws.com/mindcart:latest
   ```

3. **Update ECS service**
   ```bash
   aws ecs update-service --cluster mindcart-cluster --service mindcart-service --force-new-deployment
   ```

## 🧪 Testing

### Run Tests
```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Performance tests
npm run test:performance
```

### Test Coverage
```bash
npm run test:coverage
```

## 📊 Monitoring

### CloudWatch Metrics
- Application performance metrics
- Error rates and response times
- Custom business metrics

### Logging
- Structured logging with CloudWatch
- Error tracking and debugging
- Performance monitoring

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_BASE_URL` | API base URL | `http://localhost:3001` |
| `REACT_APP_ENVIRONMENT` | Environment | `development` |
| `REACT_APP_AWS_REGION` | AWS region | `af-south-1` |

### Terraform Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `aws_region` | AWS region | `af-south-1` |
| `environment` | Environment | `dev` |
| `ecs_cpu` | ECS CPU units | `512` |
| `ecs_memory` | ECS memory | `1024` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- South African grocery retailers for providing API access
- React and Tailwind CSS communities
- AWS for cloud infrastructure
- Open source contributors

## 📞 Support

For support, email support@mindcart.co.za or create an issue in this repository.

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Price alerts and notifications
- [ ] User accounts and wishlists
- [ ] AI-powered recommendations
- [ ] Integration with more stores
- [ ] Barcode scanning
- [ ] Shopping list management
- [ ] Social features and sharing

---

**Built with ❤️ for South African consumers**
=======
# MindCart-SA
MindCart SA is a South African grocery price comparison platform that helps users find the cheapest deals across major retailers like Checkers, Pick n Pay, and Woolworths. It features a smart cart calculator, store-to-store price comparisons, and a visual savings dashboard ,all in a clean, mobile-friendly UI.
>>>>>>> c9f570cbdc7583946dc024f2b560889c127a01c5
>>>>>>> 67fc4225eef96736e7f7b6b18720466f372b0830
