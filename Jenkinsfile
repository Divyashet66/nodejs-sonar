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
		      sh "node --version"
		      sh "npm i"
		      sh "npm install jest --global"
		      sh "npm run test & sleep 3" 
              }
      }
      
       stage('SonarQube analysis') {
        	steps{
        		withSonarQubeEnv('sonarqube-9.7.1') { 
              		sh "npm run sonar"
			sh "ls"
    			  }
        	}
        }
       
       stage('Quality'){
            steps{
                script{
                    sleep(10)
                    //qualitygate = waitForQualityGate()
                    //if (qualitygate.status != "OK") {
                      //  currentBuild.result = "FAILURE"
                        //slackSend (channel: '****', color: '#F01717', message: "*$JOB_NAME*, <$BUILD_URL|Build #$BUILD_NUMBER>: Code coverage threshold was not met! <http://****.com:9000/sonarqube/projects|Review in SonarQube>.")
                    //}
                
                    waitForQualityGate abortPipeline: true, credentialsId:'sonarqube'
                }
            }
       }
      
      
    }
}
