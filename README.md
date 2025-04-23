
# Parking Lot Application

This project is organized into multiple layers, each with a specific responsibility. Below is a breakdown of the layers and their roles:

## Layer Responsibilities

| Layer          | Responsibility                                                                 |
|-----------------|-------------------------------------------------------------------------------|
| **domain**      | Business logic, core rules, abstract repositories (no NestJS or external dependencies). |
| **application** | Use cases, DTOs, and services that coordinate domain logic.                  |
| **infrastructure** | Actual implementations, in-memory data, and adapters.                     |
| **presentation** | NestJS controllers, route handlers, and request mapping.                    |
| **shared**      | Utilities, constants, and custom errors used across layers.                  |
| **test**        | Organized test cases, ideally test-driven from domain/application layers.    |
| **docker/**     | Containerization for local development or production.                        |

## Project Structure

The project follows a clean architecture approach to ensure scalability and maintainability. Each layer is designed to be independent and testable.

- **Domain Layer**: Contains the core business logic and rules.
- **Application Layer**: Coordinates the domain logic and handles use cases.
- **Infrastructure Layer**: Provides implementations for abstract repositories and other dependencies.
- **Presentation Layer**: Handles HTTP requests and responses using NestJS.
- **Shared Layer**: Contains reusable utilities and constants.
- **Test Layer**: Includes unit and integration tests.
- **Docker**: Contains configuration for containerization.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the application using `npm start` or the provided Docker setup.

## Testing

Run the test suite using:

```bash
npm test
```

## License

This project is licensed under the MIT License.
