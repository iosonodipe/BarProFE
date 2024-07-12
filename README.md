BarPRO aims to simplify the process of connecting final customers with professional bartenders. Do you want to organize a home party with friends or a private event?
By registering as a user, you can access the list of all bartenders and have the opportunity to contact them directly, communicating all the details of your event, or you can post a global request visible to all professionals, allowing you to evaluate the best offers!
On the other hand, if you are a freelance bartender looking to expand your business, by creating your profile you will exponentially increase your visibility: you will receive requests from all customers and have the opportunity to evaluate all the quotes posted on the portal!

#### The platform utilizes Angular for frontend development and Spring Boot for the backend, with PostgreSQL for data persistence.

🌟 Features
User and barman registration and login
Viewing and filtering registered barmen
Requesting and managing bookings/quotations
Email notifications for bookings/quotations requests and updates
Dashboard for managing personal data, bookings and quotations
Responsive design
RESTful API endpoints

⌛ Prerequisites
Node.js and npm
Angular CLI
Java 17 or higher (for backend)
Maven 3.6.0 or higher (for backend)
PostgreSQL


📄 Clone the Repository
For the Front-end:
git clone https://github.com/iosonodipe/BarProFE

For the Back-end:
git clone https://github.com/iosonodipe/BarProBE


🛠️ Install Dependencies
To install the necessary dependencies for the Angular frontend, run:

npm install
ng s


For the backend run:
mvn clean install
mvn spring-boot:run


📦 Configure PostgreSQL
Create a database named backend and configure your application.properties file in the backend with your PostgreSQL credentials.

spring.datasource.url=jdbc:postgresql://localhost:5432/barpro
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update


🏆 Contact
For any inquiries or questions, please contact lucadipietro18@gmail.com
