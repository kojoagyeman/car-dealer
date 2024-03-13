# CarDealership.ai

CarDealership.ai is an Angular application designed for managing car dealership data efficiently. This README.md file provides essential information for setting up, running, and understanding the structure of the application.

Site is live on this link: [CarDealership.ai](https://65b57e711cb913e158e8c234--fascinating-cassata-db21d2.netlify.app/)

## Table of Contents
* Features
* Installation
* Usage

## Features

### 1. User Input Form:
*  Page for users to input relevant data for the application.
* Lazy-loaded module: UserInputModule.
* Route: /user-input.

### 2. Dashboards:

* Visualization of user data collected by the CarDealership.ai application.
* Lazy-loaded module: DashboardsModule.
* Route: /dashboards.

### 3. Lazy Loading:
* Implemented lazy loading for optimized performance.

### 4. RxJS for Data Fetching:
* Efficient data retrieval using RxJS.


## Installation

1. Clone the repository:

```bash
git clone https://github.com/ShneorNagar/CarDelearship-ai.git
```

2. Install dependencies:

```bash
cd CarDelearship-ai
npm install
```

## Usage
1. Start the development server:

```bash
ng serve
```
2. Open the application in your browser:
* User Input Form: `http://localhost:4200/user-input`
* Dashboards: `http://localhost:4200/dashboards`
