# 🚀 3-Tier Web Application Deployment on AWS EKS with Jenkins & Docker

Welcome to the **3-Tier EKS Practice Project**! This project demonstrates an end-to-end DevOps pipeline for building, containerizing, and deploying a modern 3-tier microservices application (Frontend, Backend API, Database/Persistence layer) on **Amazon Elastic Kubernetes Service (EKS)** using **Jenkins CI/CD** and **Docker**.

---

## 📐 Architecture Overview

```text
  [ Developer ]
        │
        ▼ (Git Push)
  [ GitHub Repository ]
        │
        ▼ (Webhook / Pipeline Trigger)
  [ Jenkins CI/CD Server ]
        │───► Builds Docker Images (Frontend / Backend)
        │───► Pushes Images to Docker Hub / AWS ECR
        └───► Applies Kubernetes Manifests via kubectl
        │
        ▼
  [ AWS EKS Cluster ]
        ├── [ Ingress / LoadBalancer ]
        ├── [ Frontend Pods ]
        ├── [ Backend API Pods ]
        └── [ Database / Storage Layer ]

```

---

## 🛠️ Tech Stack & Prerequisites

### **Technologies Used**

* **Cloud Provider:** AWS (EC2, EKS, IAM)
* **Containerization:** Docker
* **CI/CD Automation:** Jenkins
* **Orchestration:** Kubernetes (AWS EKS)
* **Package/Deployment Tooling:** `kubectl`, `eksctl`, `aws-cli`

### **Prerequisites on local/management instance**

Before running or deploying this project, ensure you have installed and configured:

1. **AWS CLI v2** configured with proper IAM permissions (`aws configure`).
2. **`eksctl`** (AWS EKS CLI).
3. **`kubectl`** matching your Kubernetes cluster version.
4. **Docker Engine** running locally or on your Jenkins instance.
5. **Jenkins Server** running Java 21 with Docker permissions.

---

## 📂 Project Structure

```text
.
├── backend/                  # Backend API source code & Dockerfile
│   ├── Dockerfile
│   └── ...
├── frontend/                 # Frontend UI source code & Dockerfile
│   ├── Dockerfile
│   └── ...
├── k8s/                      # Kubernetes deployment & service manifests
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   └── database-deployment.yaml
├── Jenkinsfile               # Jenkins CI/CD Pipeline definition
└── README.md                 # Project documentation

```

---

## ⚡ Quickstart Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
cd <YOUR_REPO_NAME>

```

---

### 2️⃣ Build and Test Docker Images Locally

Test building the container image manually:

```bash
# Build Backend Image
docker build -t backend-api:latest ./backend

# Build Frontend Image
docker build -t frontend-ui:latest ./frontend

```

---

### 3️⃣ Create the AWS EKS Cluster

Run `eksctl` to provision a managed Kubernetes cluster on AWS:

```bash
eksctl create cluster \
  --name 3tier-eks-cluster \
  --region us-east-1 \
  --nodegroup-name standard-workers \
  --node-type t3.medium \
  --nodes 2 \
  --nodes-min 1 \
  --nodes-max 3 \
  --managed

```

Update your local `kubeconfig` to connect to the cluster:

```bash
aws eks update-kubeconfig --region us-east-1 --name 3tier-eks-cluster
kubectl get nodes

```

---

### 4️⃣ Configure Jenkins CI/CD Server

1. **Install Java 21 & Jenkins**:
```bash
sudo apt-get update
sudo apt-get install -y openjdk-21-jre openjdk-21-jdk jenkins

```


2. **Configure Docker Permissions for Jenkins**:
```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins

```


3. **Configure AWS & Kubectl credentials in Jenkins**:
* Install **Docker Pipeline** and **Kubernetes CLI** plugins in Jenkins.
* Add your Docker Hub credentials (`docker-hub-credentials`) and AWS Credentials in Jenkins Credentials Manager.



---

### 5️⃣ Deploy Manual Manifests to EKS (Optional Verification)

If you wish to deploy the manifests directly using `kubectl`:

```bash
kubectl apply -f k8s/database-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

```

To view running services and public LoadBalancer URLs:

```bash
kubectl get svc -w

```

---

## 🔄 CI/CD Pipeline (Jenkinsfile Breakdown)

The project includes an automated multi-stage Jenkins pipeline:

* **Checkout:** Pulls the latest code from GitHub.
* **Build:** Compiles and constructs Docker images.
* **Push:** Pushes container images to Docker Hub/ECR.
* **Deploy:** Applies Kubernetes configuration to AWS EKS using `kubectl`.

---

## 🧹 Cleanup / Destroy Infrastructure

To prevent unexpected AWS charges, clean up all created resources when finished:

```bash
# 1. Delete Kubernetes Resources
kubectl delete -f k8s/

# 2. Delete EKS Cluster
eksctl delete cluster --name 3tier-eks-cluster --region us-east-1

```

---

## 🤝 Contributing & Practice

Feel free to fork this repository, submit Pull Requests, or use it as a base template for practicing AWS EKS, Helm charts, Ingress Controllers, and Terraform provisioning!

---
