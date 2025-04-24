# Parking Lot System

A robust parking lot management system implemented using Clean Architecture principles in TypeScript.

## Architecture Overview

This project follows Clean Architecture principles with clear separation of concerns across different layers:

### 1. Domain Layer (`src/domain/`)
- Contains core business logic and entities
- Houses domain models: `ParkingLot`, `ParkingSlot`, `Vehicle`
- Defines repository interfaces
- Implements core business rules and validations

### 2. Application Layer (`src/app/`)
- Contains use cases that orchestrate the flow of data
- Implements business operations through use cases:
  - `CreateParkingLotUseCase`
  - `AllocateParkingSlotUseCase`
  - `FreeParkingSlotUseCase`
  - `ExpandParkingLotUseCase`
  - `GetOccupiedSlotsUseCase`
  - `GetAvailableSlotsUseCase`
  - `FindVehicleByRegistrationUseCase`
  - `FindVehiclesByColorUseCase`
  - `GetParkingLotStatusUseCase`
  - `GetParkingSlotDetailsUseCase`
  - `ValidateParkingLotCapacityUseCase`
  - `CheckVehicleRegistrationUseCase`

### 3. Infrastructure Layer (`src/infra/`)
- Implements repository interfaces
- Handles data persistence using efficient data structures
- Contains concrete implementations of repositories

### 4. Presentation Layer (`src/presentation/`)
- Handles HTTP requests and responses
- Implements controllers and routes
- Manages API endpoints

## Best Practices Implemented

1. **Clean Code Practices**
   - Meaningful naming conventions
   - Small, focused classes and methods
   - Clear separation of concerns
   - Proper error handling
   - Comprehensive unit tests

3. **Design Patterns**
   - Repository Pattern for data access
   - Factory Pattern for entity creation
   - DTO Pattern for data transfer
   - Mapper Pattern for entity transformations

## Optimized Data Structures and Time Complexity

The system implements several optimized data structures for efficient operations:

1. **Vehicle Tracking System**
   - Uses a combination of Map and Array for O(1) vehicle lookups
   - Maintains both map and array representations for different query patterns
   - Efficient vehicle registration number tracking
   - Quick color-based vehicle queries

2. **Parking Operations**
   - Finding next available slot: O(1) using MinHeap
   - Parking a vehicle: O(log n) for heap operations
   - Freeing a slot: O(log n) for heap operations
   - Vehicle lookup by registration: O(1) using Map
   - Color-based vehicle search: O(1) using Map

3. **Query Operations**
   - Finding slot by registration number: O(n)
   - Finding slots by color: O(n)
   - Getting all occupied slots: O(1) using array
   - Getting all available slots: O(1) using heap

4. **Expansion Operations**
   - Adding new slots: O(k) where k is the number of new slots
   - Efficient heap maintenance during expansion

## Assumptions Made

1. **Vehicle Management**
   - Each vehicle must have a unique registration number
   - Vehicles must have a color

2. **Parking Rules**
   - First come, first served basis
   - Nearest slot allocation (using MinHeap)
   - No special slots for different vehicle types

3. **System Constraints**
   - In-memory storage with optimized data structures
   - Single parking lot instance (can be extended to multiple lots)
   - No concurrent parking operations (can be added with proper locking)

4. **Technical Assumptions**
   - Node.js runtime environment
   - TypeScript for type safety
   - NestJS framework for API implementation

## Installation and Running Instructions

1. **Prerequisites**
   - Node.js (latest LTS version recommended)
   - npm (comes with Node.js)

2. **Installation**
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd parking-lot

   # Install dependencies
   npm install
   ```

3. **Running the Application**
   ```bash
   # Development mode with hot-reload
   npm run start:dev

   # Production mode
   npm run start:prod

   # Debug mode
   npm run start:debug
   ```

4. **Testing**
   ```bash
   # Run unit tests
   npm test
   ```

5. **Other Available Commands**
   ```bash
   # Build the application
   npm run build

   # Format code
   npm run format

   # Lint code
   npm run lint
   ```

## Docker and Deployment

### Docker Setup
The project includes a Dockerfile for containerization. To build and run the application using Docker:

```bash
# Build the Docker image
docker build -t parking-lot .

# Run the container
docker run -p 3000:3000 parking-lot
```

### Automated Deployment
The project is configured with automated deployment on push to the main branch. The deployment pipeline:
1. Builds the Docker image
3. Deploys the application to the production environment

This ensures consistent and reliable deployments with minimal manual intervention.
