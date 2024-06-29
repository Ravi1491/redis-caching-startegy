# Caching Strategies

This repository demonstrates the implementation of various caching strategies in a Node.js server using Redis. The caching strategies covered include:

1. Cache-Aside
2. Write-Through
3. Write-Behind (Write-Back)
4. Read-Through

## Prerequisites

- Node.js
- Redis

## Usage

1. Start the server:

   ```sh
   node server.js
   ```

2. The server will be running on `http://localhost:3000`.

### Endpoints

- **GET /data/:key**

  - Retrieves data for the specified key.
  - Implements Cache-Aside and Read-Through strategies.

- **POST /data/:key**
  - Writes data for the specified key.
  - Implements Write-Through and Write-Behind strategies.

### Example Requests

- Retrieve data (Cache-Aside and Read-Through):

  ```sh
  curl http://localhost:3000/data/myKey
  ```

- Write data (Write-Through and Write-Behind):
  ```sh
  curl -X POST http://localhost:3000/data/myKey -H "Content-Type: application/json" -d '{"value":"myValue"}'
  ```

## Caching Strategies

### Cache-Aside

- **Description**: The application is responsible for reading from and writing to the cache as needed. Data is loaded into the cache only when there is a cache miss.
- **Implementation**:
  - Check the cache for data.
  - If the data is not in the cache, load it from the database and store it in the cache.

### Write-Through

- **Description**: Every write operation goes through the cache. The cache is updated first, followed by the database.
- **Implementation**:
  - Write data to the cache.
  - Immediately write data to the database.

### Write-Behind (Write-Back)

- **Description**: Writes are done to the cache first, and the cache asynchronously writes the data to the database.
- **Implementation**:
  - Write data to the cache.
  - Schedule an asynchronous operation to write data to the database.

### Read-Through

- **Description**: The cache itself is responsible for loading data from the database on a cache miss.
- **Implementation**:
  - Check the cache for data.
  - If the data is not in the cache, the cache retrieves data from the database and stores it in the cache.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes or improvements.
