** Work in Progress **

## Table of Contents 
* [About the Project](#about)
 * [Built with](#built-with)
* [Getting started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Setup](#setup)
   * [Environment variables]()

## About

This is a case study application for my bachelor's thesis on microservice architecture at KTH.

### Built With
* Node.js
* NestJS
* MongoDB
* Docker 
* Kubernetes

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
2. Make sure Docker and Kubernetes are running.
3. Setup ingress-nginx
```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.40.1/deploy/static/provider/cloud/deploy.yaml
```
