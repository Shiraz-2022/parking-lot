pipeline{
    agent any

    stages {
        stage('Build docker image') {
            steps {
                script {
                    dockerImage = docker.Build("parking-lot-image")
                }
            }
        }
    }
}