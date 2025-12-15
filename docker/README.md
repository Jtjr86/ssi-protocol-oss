# SSI Protocol - Docker Deployment

Run the SSI Protocol using Docker containers for easy deployment and scaling.

## Quick Start

### 1. Using Docker Compose (Recommended)

```bash
# Start full SSI stack (Gateway + Kernel)
cd docker
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Gateway runs on `http://localhost:4040`, Kernel on `http://localhost:5050`.

### 2. Using Docker Hub Images

```bash
# Pull images
docker pull ssiprotocol/gateway:v0.3.0
docker pull ssiprotocol/kernel:v0.3.0

# Create network
docker network create ssi-network

# Run Kernel
docker run -d \
  --name ssi-kernel \
  --network ssi-network \
  -p 5050:5050 \
  ssiprotocol/kernel:v0.3.0

# Run Gateway
docker run -d \
  --name ssi-gateway \
  --network ssi-network \
  -p 4040:4040 \
  -e KERNEL_URL=http://ssi-kernel:5050 \
  ssiprotocol/gateway:v0.3.0
```

### 3. Building Images Locally

```bash
# Build Kernel
docker build -f docker/kernel.Dockerfile -t ssiprotocol/kernel:v0.3.0 .

# Build Gateway
docker build -f docker/gateway.Dockerfile -t ssiprotocol/gateway:v0.3.0 .
```

## Configuration

### Environment Variables

**Gateway**:
- `PORT` - Gateway listen port (default: 4040)
- `KERNEL_URL` - Kernel service URL (default: http://kernel:5050)
- `NODE_ENV` - Node environment (default: production)

**Kernel**:
- `PORT` - Kernel listen port (default: 5050)
- `NODE_ENV` - Node environment (default: production)

### Custom Governance Envelopes

Mount custom envelopes into Kernel:

```yaml
# docker-compose.yml
services:
  kernel:
    volumes:
      - ./my-envelopes:/app/envelopes:ro
```

Or with Docker run:

```bash
docker run -d \
  -v $(pwd)/my-envelopes:/app/envelopes:ro \
  ssiprotocol/kernel:v0.3.0
```

### Persistent RPX Audit Logs

RPX logs are stored in a Docker volume by default. To access:

```bash
# View logs
docker exec ssi-gateway cat /app/rpx/rpx.log

# Copy to host
docker cp ssi-gateway:/app/rpx/rpx.log ./rpx.log
```

## Health Checks

Both services expose `/health` endpoints:

```bash
# Check Gateway
curl http://localhost:4040/health

# Check Kernel
curl http://localhost:5050/health
```

Docker health checks run automatically every 30 seconds.

## Production Deployment

### Resource Limits

```yaml
services:
  gateway:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

### Scaling

Scale Gateway instances for high availability:

```bash
docker-compose up -d --scale gateway=3
```

Add a load balancer (nginx, Traefik) in front of Gateway instances.

### Logging

Configure log drivers in `docker-compose.yml`:

```yaml
services:
  gateway:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## Troubleshooting

### Gateway can't reach Kernel

Check network connectivity:

```bash
docker exec ssi-gateway curl http://kernel:5050/health
```

Ensure both containers are on same network:

```bash
docker network inspect ssi-network
```

### View container logs

```bash
# Gateway logs
docker logs ssi-gateway

# Kernel logs
docker logs ssi-kernel
```

### Restart services

```bash
docker-compose restart
```

## Security

- Containers run as non-root users
- No unnecessary ports exposed
- Health checks enforce service availability
- Read-only volume mounts for envelopes
- Production images use multi-stage builds

## Documentation

Full docs at [ssi-protocol.org](https://ssi-protocol.org)
