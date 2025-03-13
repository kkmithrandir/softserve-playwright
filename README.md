# SoftServe Playwright 🚀

A comprehensive **Playwright** test automation suite for the SoftServe website, built with maintainability and scalability in mind using the **Page Object Model (POM)**.

---

## 📋 Table of Contents
- [✨ Overview](#-overview)
- [🔥 Features](#-features)
- [🏗 Project Structure](#-project-structure)
- [💻 Installation](#-installation)
- [🧪 Running the Tests](#-running-the-tests)
- [⚙ CI/CD Integration](#-cicd-integration)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Overview
This project provides automated end-to-end tests for the **SoftServe** website using [Playwright](https://playwright.dev/). The tests focus on key user flows such as:
- Verifying homepage elements
- Navigating to the Careers page
- Using search functionality

It is designed with the **Page Object Model (POM)** to keep your code clean, maintainable, and scalable.

---

## 🔥 Features
- **Page Object Model (POM):**  
  Encapsulate page interactions into reusable classes (`HomePage`, `CareersPage`).

- **Cross-Browser Testing:**  
  Run tests across modern browsers supported by Playwright.

- **Robust Error Handling:**  
  Graceful handling of network or UI issues (e.g., Incapsula blocks, privacy policy modals).

- **CI/CD Integration:**  
  Automated testing via GitHub Actions.

- **Dynamic Content Validation:**  
  Assert dynamic elements (e.g., job counts, banners) with resilient locators.

---

## 🏗 Project Structure

softserve-playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions workflow for CI/CD
├── src/
│   ├── pages/
│   │   ├── HomePage.ts            # Homepage page object
│   │   └── CareersPage.ts         # Careers page page object
│   └── tests/
│       ├── homepage.spec.ts       # Homepage tests
│       └── careerspage.spec.ts    # Careers page tests
├── package.json
└── README.md

1. **`.github/workflows/playwright.yml`** – Defines the GitHub Actions pipeline.  
2. **`src/pages/`** – Contains Page Object classes.  
3. **`src/tests/`** – Contains the Playwright test spec files.  

---

## 💻 Installation
1. **Clone the Repository**  
   ```
   git clone https://github.com/kkmithrandir/softserve-playwright.git
   cd softserve-playwright
   ```
2. **Install Dependencies**   
  ```
  npm install
  ```
3. **Install Playwright Browsers and Dependencies**
  ```
  npx playwright install --with-deps
  ```

🧪 Running the Tests
1.Run all tests
```
npx playwright test
```
2.Run a specific test file
```
npx playwright test src/tests/homepage.spec.ts
```
3.Debug mode (headed)
```
npx playwright test --headed
```
⚙ CI/CD Integration
This project uses GitHub Actions for continuous integration. The workflow is defined in .github/workflows/playwright.yml and runs automatically on:

Every push
Pull requests to the main branch
How to check the workflow:

Go to your repository on GitHub.
Click on the Actions tab.
Select the latest workflow run for detailed logs.
