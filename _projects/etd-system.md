---
title: "ETD Knowledge Platform"
excerpt: "Architected a production-grade Electronic Thesis & Dissertation system transforming raw PDFs into a semantically rich, searchable knowledge repository. Led infrastructure team developing 30+ APIs with custom gateway, orchestrating 6 microservices across Kubernetes with event-driven architecture using Kafka, Elasticsearch, and Virtuoso."
date: "2024-01-15"
reading_time: "8 min read"
tags: ["API Gateway", "LLMs", "Kubernetes", "Elasticsearch", "Kafka", "AI/ML"]
category: "Infrastructure"
author: "Adeyemi Aina"
duration: "12 months"
status: "Production"
github_url: "#"
live_url: "#"
image: "images/notion.png"
---

# ETD Knowledge Platform

The ETD (Electronic Thesis & Dissertation) system is a cloud-native, event-driven platform that transforms raw thesis PDFs and metadata into a richly indexed, searchable, and explorable knowledge repository. This production-grade system consists of six specialized teams working in concert to deliver a comprehensive solution for academic research discovery and analysis.

## System Architecture Overview

The ETD system leverages modern microservices architecture with event-driven communication, enabling scalable and maintainable knowledge management at enterprise scale.

### Core Components

1. **Ingestion & Knowledge Graph** – Parses XML/PDF into RDF triples
2. **Search & Recommendation** – Builds hybrid BM25 + vector search index
3. **Topic Modeling & Object Detection** – Extracts latent themes and visual elements
4. **Classification & Summaries** – Labels chapters by subject and generates summaries
5. **Infrastructure & DevOps** – Orchestrates Kubernetes, Kafka, CI/CD, and observability
6. **UI** – Provides secured React SPA with faceted search and real-time notifications

## Technical Implementation

### Infrastructure Team Leadership

As the lead infrastructure engineer, I architected and developed the foundational infrastructure supporting all six microservice teams:

#### API Gateway Development
- **30+ RESTful APIs** with custom gateway implementation
- **GraphQL façade** for unified data access across microservices
- **Authentication & Authorization** via Keycloak OIDC integration
- **Rate limiting and throttling** for production stability
- **API versioning and documentation** with OpenAPI specifications

#### Event-Driven Architecture
- **Apache Kafka** for asynchronous communication between services
- **Event streaming** with topics: `etd.triples`, `objects.out`, `summary.done`
- **Message schemas** and event sourcing for auditability
- **Dead letter queues** for error handling and retry logic

#### Container Orchestration
- **Kubernetes clusters** with Rancher management
- **GitOps workflow** with GitHub Actions → Helm → Argo CD
- **Auto-scaling** based on CPU and memory metrics
- **Resource quotas** and network policies for security

### Microservices Architecture

#### 1. Ingestion & Knowledge Graph Service
**Problem**: Raw ETD packages lack machine-readable structure.

**Solution**:
- Upload API receives PDF + XML bundles
- ETL pipeline parses MODS/METS XML → RDF triples (~600 per ETD)
- Ontology validation ensures data consistency (OWL)
- Bulk-load triples into Virtuoso database
- Publish `etd.triples` Kafka events for downstream processing

#### 2. Search & Recommendation Service
**Problem**: Simple keyword search misses semantic relevance.

**Solution**:
- Nightly ETL reads triples → JSON documents → Elasticsearch
- Hybrid search: BM25 + dense_vector fields with HNSW k-NN
- Content-based recommendations with collaborative filtering
- RESTful APIs: `/search`, `/recs/{uri}` microservices
- GraphQL gateway for unified query interface

#### 3. Topic Modeling & Object Detection Service
**Problem**: Users need thematic grouping and direct access to figures/tables.

**Solution**:
- **Topic Modeling**: SPARQL → chapter text → embeddings (e5-large) → BERTopic
- **Object Detection**: PDF rasterization → YOLOv7 inference → bounding boxes
- Crop and store images in S3 with `etd:hasFigure` triples
- Emit `etd.objects` Kafka events for UI updates

#### 4. Classification & Summaries Service
**Problem**: Long chapters are hard to skim; manual subject tagging is laborious.

**Solution**:
- **Classification**: Fine-tune SciBERT for ProQuest subject codes
- **Summarization**: TextRank (extractive) + BigBird-Pegasus (abstractive)
- Store summaries as RDF triples and Elasticsearch fields
- Publish `summary.done` Kafka events for real-time updates

#### 5. Infrastructure & DevOps Service
**Problem**: Coordinating six rapidly-evolving microservices at scale.

**Solution**:
- **GitOps Pipeline**: GitHub Actions → Helm → Argo CD → Kubernetes
- **Observability**: Prometheus Operator + Grafana + Alertmanager
- **Security**: Keycloak OIDC for SSO/RBAC + network policies
- **Backup**: Hourly snapshots of ES & Virtuoso to S3

#### 6. UI Service
**Problem**: Hiding complexity while surfacing relevant insights.

**Solution**:
- React SPA with GraphQL client
- Global search with hybrid results
- Faceted search for subjects, topics, and visual elements
- Real-time notifications via WebSocket connections
- Admin dashboard with cluster monitoring

## Technology Stack

### Backend Infrastructure
- **Container Orchestration**: Kubernetes with Rancher
- **Message Queue**: Apache Kafka
- **Databases**: Virtuoso (RDF), Elasticsearch (search), Neo4j (graph analytics)
- **Storage**: Amazon S3 for static assets
- **Authentication**: Keycloak OIDC
- **Monitoring**: Prometheus, Grafana, Alertmanager

### AI/ML Components
- **Language Models**: e5-large, SciBERT, BigBird-Pegasus
- **Computer Vision**: YOLOv7 for object detection
- **Topic Modeling**: BERTopic with HDBSCAN clustering
- **Search**: Hybrid BM25 + vector search with HNSW indexing

### Development & Deployment
- **API Gateway**: Custom implementation with 30+ endpoints
- **CI/CD**: GitHub Actions with Helm charts
- **GitOps**: Argo CD for automated deployments
- **Documentation**: OpenAPI specifications
- **Testing**: Unit, integration, and end-to-end test suites

## Key Achievements

### Scalability & Performance
- **Event-driven architecture** enables independent service scaling
- **Kubernetes auto-scaling** handles varying workloads
- **Caching strategies** with Redis for improved response times
- **Database optimization** with proper indexing and query optimization

### Data Processing Pipeline
- **600+ RDF triples** generated per thesis document
- **Real-time processing** of PDF uploads and metadata extraction
- **Batch processing** for topic modeling and object detection
- **Incremental updates** for search index maintenance

### Security & Compliance
- **OIDC authentication** with role-based access control
- **Network policies** for service-to-service communication
- **Data encryption** in transit and at rest
- **Audit logging** for all API interactions

## Impact & Results

### Technical Impact
- **Production-grade platform** serving academic researchers
- **30+ APIs** enabling comprehensive data access
- **6 microservices** working in concert for complex workflows
- **Event-driven architecture** supporting real-time updates

### Research Enablement
- **Semantic search** capabilities for thesis discovery
- **Topic modeling** for research trend analysis
- **Visual element extraction** for figure and table discovery
- **Automated summarization** for quick content overview

### Infrastructure Excellence
- **GitOps workflow** for reliable deployments
- **Comprehensive monitoring** with alerting
- **Automated backups** ensuring data durability
- **Scalable architecture** supporting future growth

## Future Considerations

The ETD system demonstrates best practices in modern AI-powered knowledge management, with potential for commercialization and expansion to other academic institutions. The modular architecture allows for easy integration of new AI models and processing capabilities as the field evolves.

## Conclusion

This project showcases advanced skills in cloud-native architecture, microservices development, API design, and AI/ML integration. The successful delivery of a production-grade system with 30+ APIs and 6 microservices demonstrates expertise in large-scale software engineering and infrastructure leadership.
