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

### 3. Infrastructure Layer (`src/infra/`)
- Implements repository interfaces
- Handles data persistence using efficient data structures
- Contains concrete implementations of repositories
- Implements optimized vehicle tracking system

### 4. Presentation Layer (`src/presentation/`)
- Handles HTTP requests and responses
- Implements controllers and routes
- Manages API endpoints

## Best Practices Implemented

1. **SOLID Principles**
   - Single Responsibility Principle: Each class has a single responsibility
   - Open/Closed Principle: System is open for extension through interfaces
   - Liskov Substitution Principle: Proper inheritance and interface implementation
   - Interface Segregation: Clean repository interfaces
   - Dependency Inversion: Dependencies are injected through constructors

2. **Clean Code Practices**
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
   - Color-based vehicle search: O(n) with optimized array traversal

3. **Query Operations**
   - Finding slot by registration number: O(1) using Map
   - Finding slots by color: O(n) with optimized array traversal
   - Getting all occupied slots: O(1) using array
   - Getting all available slots: O(1) using heap

4. **Expansion Operations**
   - Adding new slots: O(k) where k is the number of new slots
   - Efficient heap maintenance during expansion

## Assumptions Made

1. **Vehicle Management**
   - Each vehicle must have a unique registration number
   - Vehicles must have a color
   - Only cars are supported (can be extended for other vehicle types)
   - Vehicle tracking uses optimized Map and Array combination

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
