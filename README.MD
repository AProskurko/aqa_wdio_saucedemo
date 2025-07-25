# Saucedemo Test Automation

🧪 This repository contains the E2E test suite for `saucedemo.com`, built with WebdriverIO and TypeScript.

---

### Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Tech Stack](#tech-stack)

---

### Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Node.js** (v18.x or later is recommended). You can download it [here](https://nodejs.org/).
-   **Git**.

---

### Installation

Follow these steps to set up the project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AProskurko/aqa_wdio_saucedemo.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd aqa_wdio_saucedemo
    ```

3.  **Install all dependencies:**
    ```bash
    npm install
    ```

---

### Running Tests

Use the following commands from the root directory to execute the tests.

▶️ **Run all tests:**

```bash
npx wdio run ./wdio.conf.ts
```
---

### Tech Stack
- **Framework:** WebdriverIO
- **Language:** TypeScript
- **Test Runner:** Mocha 