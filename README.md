# Demo
- <a href="https://youtu.be/ayvu2b3eBoM" target="_blank">Demo Video</a>
- [Something about the project]()

# Parking App - Back End

The project for our SWD subject

- NodeJS (NestJS)
- TypeORM (MySQL)
- Firebase (Authentication with Google, send notification)
- Twilio
- Redis

## Installation

Use the package manager [YARN] to install [Parking APp - Back End].\
First, setup [.env] file follow below at root source code
```
MYSQL_HOST=<Your host>
MYSQL_PORT=<your port>
MYSQL_USER=<your user>
MYSQL_PASSWORD=<your password>
MYSQL_DB=<your database name>

PATH_OPEN_API=api/v1/
PORT=5000

ACCESS_TOKEN_SECRET=<your key>
REFRESH_TOKEN_SECRET=<your key>

IMAGEBB_API_KEY=<your key in imgbb>

TWILIO_ACCOUNT_SID=<your twilio account sid>
TWILIO_AUTH_TOKEN=<your twilio auth token>

FIREBASE_PROJECT_ID=<your firebase project id>
FIREBASE_PRIVATE_KEY=<your firebase private key>
FIREBASE_CLIENT_EMAIL=<your firebase client email>

VNP_TMN_CODE=<your vnp tmn code>
VNP_HASH_SECRET=<your vnp hash secret>
VNP_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNP_RETURN_URL=<your host>/api/v1/cashTransfers/return
```

## Usage

```bash
yarn start
```
## License
[MIT](https://choosealicense.com/licenses/mit/)
