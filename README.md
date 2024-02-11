# bidz

**A web application for managing auctions**

## Features

- **Registration and Authorization**: Utilizes email confirmation and JWT for secure user authentication.
- **Auction Management**: Allows users to create, update, and manage auctions.
- **Bid System**: Real-time bid updates through WebSockets enhance the auction experience.
- **Web Chat**: Engage in dynamic web chat using WebSockets.

## Technologies

- **NestJS**
- **React**
- **WebSocket**
- **PostgreSQL**
- **JWT (JSON Web Tokens)**
- **Sequelize ORM**
- **NX**

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Mysterious-Researchers/bidz.git
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

## Usage

1. API Usage

```bash
nx start dev api
   ```

2. WEB

```bash
nx start dev web
```


3. env example 

```bash
DATABASE_URL
PORT
SMTP_HOST
SMTP_USERNAME
SMTP_PASSWORD
SECRET
ACCESS_TTL
FRONT_BASE_URL
```
