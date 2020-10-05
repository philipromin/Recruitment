** Work in Progress **

## Table of Contents 
* [About the Project](#about)
 * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Setup](#setup)
  * [Development Environment](#development-environment)

## About

This is a case study application for my bachelor's thesis on microservice architecture at KTH.

### Built With
* Node.js
* NestJS
* MongoDB
* Next.js
* NATS Streaming
* Docker 
* Kubernetes
* Ingress-nginx

## Getting Started

### Prerequisites
* Docker - available at [docker.com](https://www.docker.com/)
* Kubernetes - available at [kubernetes.io](https://kubernetes.io/) (Skip this if you have Docker Desktop, you can turn on Kubernetes from settings instead)
* Skaffold - available at [skaffold.dev](https://skaffold.dev/)

### Setup
1. Clone the repo 
```sh
git clone https://github.com/philipromin/Recruitment.git
```
2. cd into it and checkout dev 
```sh
cd Recruitment
git checkout dev
```
3. Make sure Docker and Kubernetes are running
4. Setup ingress-nginx
```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.40.1/deploy/static/provider/cloud/deploy.yaml
```
5. Set environment variables (secrets within Kubernetes)
```sh
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=xxxx
kubectl create secret generic hotmail-username --from-literal=HOTMAIL_USERNAME=xxxx
kubectl create secret generic hotmail-password --from-literal=HOTMAIL_PASS=xxxx
```
6. Change the config files to your DockerID, i.e. replace "phromin" with your own docker id in the k8s and skaffold files

### Development Environment
Start local development by running Skaffold
```sh
cd skaffold
skaffold dev
```
