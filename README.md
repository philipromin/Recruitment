** Work in Progress **

## Table of Contents 
* [About the Project](#about)
 * [Built with](#built-with)
* [Getting started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Setup](#setup)

## About

This is a case study application for my bachelor's thesis on microservice architecture at KTH.

### Built With
* Node.js
* NestJS
* MongoDB
* NATS Streaming
* Docker 
* Kubernetes
* Ingress-nginx

## Getting Started

### Prerequisites
* Docker - available at [docker.com](https://www.docker.com/)
* Kubernetes - available at [kubernetes.io](https://kubernetes.io/)
* Skaffold - available at [skaffold.dev](https://skaffold.dev/)

### Setup
1. Clone the repo
```sh
git clone https://github.com/philipromin/Recruitment.git
```
2. Make sure Docker and Kubernetes are running
3. Setup ingress-nginx
```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.40.1/deploy/static/provider/cloud/deploy.yaml
```
4. Setup environment variables (secrets within Kubernetes)
```sh
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=xxxx
kubectl create secret generic hotmail-username --from-literal=HOTMAIL_USERNAME=xxxx
kubectl create secret generic hotmail-password --from-literal=HOTMAIL_PASS=xxxx
```
5. Change the config files to your DockerID, i.e. replace phromin with your id.
6. Run skaffold
```sh
cd skaffold
skaffold dev
```
