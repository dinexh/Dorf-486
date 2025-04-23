pipeline {
    agent any
    tools {
        nodejs 'Node20'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-ssh-key',
                    url: 'git@github.com:dinexh/Dorf-486.git'
            }
        }
        stage('Navigate to my-app') {
            steps {
                dir('my-app') {
                    sh 'pwd' // Verify directory
                }
            }
        }
        stage('Install') {
            steps {
                dir('my-app') {
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                dir('my-app') {
                    sh 'npm run build'
                }
            }
        }
        stage('Test Run') {
            steps {
                dir('my-app') {
                    sh 'npm run start &'
                    sh 'sleep 5' // Wait for server to start
                    sh 'curl http://localhost:3000'
                }
            }
        }
    }
}
