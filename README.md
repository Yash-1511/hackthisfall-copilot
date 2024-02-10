# Shop Genie✨: AI-Powered E-commerce Platform

Welcome to **Shop Genie** - the future of online shopping where artificial intelligence meets e-commerce to create a personalized shopping experience. Our platform features an AI Copilot that assists users in finding the perfect products through an interactive chat interface. Whether you're searching for wedding attire or casual wear, our AI Copilot understands your needs and dynamically updates the UI with the best recommendations.

For sellers and administrators, Shop Genie offers AI-driven tools to generate product descriptions, manage inventory, and perform other AI-related tasks, making e-commerce management smoother and more efficient.

## Features

- **AI Copilot**: Interact with our AI to find products that match your exact needs. Help to leverage your ecommerce journey.
- **Dynamic UI Updates**: Real-time updates to the UI based on AI recommendations.
- **AI-Driven Administration**: Utilize AI tools for product management and content creation.

## Local Installation guide

### Prerequisites

- Node.js (LTS Version)
- Docker (for Docker installation)
- Git
- Python

### Steps

1. Clone the repository

```bash
git clone https://github.com/Yash-1511/hackthisfall-copilot
```

2. Setup the .env file provided by .env.example

3. Admin Installation

```bash
cd admin
npm install
npx prisma generate
npx prisma db push
npm run dev
```

4. Store Installation

```bash
cd store
npm install
npx prisma generate
npx prisma db push
npm run dev
```

5. Visit the application
- Visit Admin at http://localhost:3000 to view the application.
- Visit Store at http://localhost:3001 to view the application.

## Docke Installation Guide
Ensure Docker is installed and runnning on your machine.

1. Setup the .env file
2. Running containers
```bash
docker-compose up 
```

## Using GitHub Actions for CI/CD

Shop Genie utilizes GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD), automating the process of building Docker images and pushing them to Docker Hub.

Our workflow triggers on every push to the `master` branch, building Docker images for both the admin and store parts of the project, and pushing them to Docker Hub under the `yash1112` namespace.

## Team
Shop Genie is brought to life by the dedication and innovative spirit of our team:

- [Parth Shah](https://github.com/parthshah308)
- [Harsh Parmar](https://github.com/harshp421)
- [Krunal Virugama](https://github.com/virugamacoder)
- [Yash Parmar](https://github.com/Yash-1511)

We're a group of passionate individuals committed to revolutionizing the e-commerce experience through technology and innovation.

## Acknowledgments

- AI technology powered by OpenAI's GPT models.
- UI/UX inspired by modern e-commerce trends.
