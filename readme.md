# L2Batch-3-assignment-4

### **Submission : (Please check my submissions:)**

- Frontend Live Link: [Live Website](https://zfitx.vercel.app/)
- Backend Live Link: [Backend Link](https://zfit-x-backend.vercel.app/api)
- GitHub Repository URL (Frontend): https://github.com/ashiqee/L2B3-assignment-4-ZFitX-0920
- GitHub Repository URL (Backend): https://github.com/ashiqee/ZfitX-Backend
- Overview Video:


**Overview:** ZFiTX backend utilizes TypeScript with Node.js, Express, Mongoose, CORS, and Zod, providing robust type safety and enhanced code quality. TypeScript ensures maintainability with static typing and advanced type inference. Express builds scalable APIs, Mongoose manages MongoDB schemas, CORS handles secure cross-origin requests, and Zod provides runtime schema validation, ensuring data integrity and consistency across the application.

**Technical Stack**
- Backend: Node.js, Express, Mongoose, CORS, and Zod for schema validation and data integrity.
- Database: MongoDB for storing product and user data.
- TypeScript: Ensures robust type safety and code quality.



- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)


## Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn
- MongoDB (running locally or a connection URI to a remote instance)

## Installation

1. Clone the repository:


 ```bash
   <!-- Backend clone  -->
   git clone https://github.com/ashiqee/ZfitX-Backend.git
```


2. Install dependencies:

### usi npm:

```tsc
npm i
```

## Configuration

1. Create a `.env` file in the root directory of the project and add the following enviroment variables:


Banckend .env
```bash

NODE_ENV = development
PORT=5000
DATABASE_URL = 
STRIPE_SECRET_KEY=
```

### Runnig the Application both

1. To compile and run the TypeScript application in development mode with hot-reloading, use:

```bash
npm run dev
```

2. To build the application for production

```bash
npm run build
```

Visit : http://localhost:5000/