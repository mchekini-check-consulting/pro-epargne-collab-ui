node("ci-node") {

    def GIT_COMMIT_HASH = ""

    stage("Checkout") {
        checkout scmGit(branches: [[name: '*/develop']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/mchekini-check-consulting/pro-epargne-collab-ui']])
        GIT_COMMIT_HASH = sh (script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
    }


    stage("Build") {
        sh "npm install"
        sh "npm run build --prod"
    }

    stage("Build Docker Image") {
        sh "sudo docker build -t pro-epargne-collab-ui ."
    }

    stage("Push Docker Image To Registry") {
        sh "sudo docker tag pro-epargne-collab-ui mchekini/pro-epargne-collab-ui:$GIT_COMMIT_HASH"
        sh "sudo docker tag pro-epargne-collab-ui mchekini/pro-epargne-collab-ui:latest"
        withCredentials([usernamePassword(credentialsId: 'mchekini', passwordVariable: 'password', usernameVariable: 'username')]) {
            sh "sudo docker login -u $username -p $password"
            sh "sudo docker push mchekini/pro-epargne-collab-ui:$GIT_COMMIT_HASH"
            sh "sudo docker push mchekini/pro-epargne-collab-ui:latest"
            sh "sudo docker rmi mchekini/pro-epargne-collab-ui:$GIT_COMMIT_HASH"
            sh "sudo docker rmi mchekini/pro-epargne-collab-ui:latest"
            sh "sudo docker rmi pro-epargne-collab-ui"
            stash include: 'docker-compose.yml', name: 'utils'
        }
    }

}
