pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
                PROJECT_ID = 'tech-rnd-project'
                CLUSTER_NAME = 'network18-cluster'
                LOCATION = 'us-central1-a'
                CREDENTIALS_ID = 'kubernetes'
    }

    stages {
        stage('Scm Checkout') {
            steps {
                    checkout scm
            }
        }

        stage('build') {
            steps {
                echo 'building the software'
                // sh 'rm package-lock.json'
                sh 'node --version'
                sh 'npm i'
                sh 'npm install jest --global'
            }
        }

        stage('test') {
            steps {
                echo 'testing'
                // sh "npm i"
                // sh "npm i winston"
                // sh "node src/index.js & sleep 3
                sh 'npm run test & sleep 3'
            }
        }

        stage('SonarQube analysis') {
            steps {
                withSonarQubeEnv('sonarqube-9.7.1') {
                    sh 'npm run sonar'
                    sh 'ls'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'whoami'
                sh 'sudo chmod 777 /var/run/docker.sock'
                sh 'sudo apt update'
                sh 'sudo apt install software-properties-common -y'
                sh 'sudo add-apt-repository ppa:cncf-buildpacks/pack-cli'
                sh 'sudo  apt-get update'
                sh 'sudo apt-get install pack-cli'
                sh 'pack build node -t gcr.io/tech-rnd-project/node-sonar --builder paketobuildpacks/builder:full'
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo 'Push Docker Image'
                    sh 'gcloud auth configure-docker'
                    sh 'sudo docker push gcr.io/tech-rnd-project/node-sonar'
                    sh 'curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl'
                    sh 'chmod +x kubectl'
                    sh "sudo mv kubectl \$(which kubectl)"
                }
            }
        }
    }
}
