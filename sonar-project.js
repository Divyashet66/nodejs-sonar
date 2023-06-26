const sonarqubeScanner =  require('sonarqube-scanner');
sonarqubeScanner(
    {
        serverUrl:  'http://35.207.255.130:9000',
        options : {
            'sonar.login': 'admin',
            'sonar.password': 'sonar',
            'sonar.projectKey': 'node',
            'sonar.sources':  'src',
            'sonar.tests':  'src',
            'sonar.inclusions'  :  '**', // Entry point of your code
            'sonar.test.inclusions':  'src/**/*.spec.js,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
            'sonar.javascript.lcov.reportPaths':  'coverage/lcov.info',
            'sonar.testExecutionReportPaths':  'coverage/test-reporter.xml'
        }
    }, () => {});
