# Send Callback Informations to MS Teams Incomming Webhook (Channel)

이 프로젝트는 CallbackURL로 전달되는 정보를 검증하기 위해 http 혹은 https 로 들어오는 데이터의 Header, Parameter, Body의 정보를 Microsoft Teams Cannel의 Incoming Webhook으로 전달을 한다. 

## References
[Create Incoming Webhooks]{https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook?tabs=dotnet}


## Run on local 
Local 환경에서 구동하기 

```
npm install
export WEBHOOK_URL=https://WEBHOOK_URL
npm start 
```

### Test
테스트해 보기

```
curl localhost:8080
```

## Docker 
Docker 이미지로 빌드하여 어디서든 사용할 수 있게 합니다.

### build docker image
docker로 이미지르 빌드하기 

```
docker build -t IMAGE_NAME:TAG .
```

### Start server on docker form local repository
Docker로 구동하기 

WEBHOOK_URL: webhook url (MS teams Incomming webhook)
IMAGE_NAME:TAG : docker image name and tag

```
docker run -it -d --name callback_to_webhook -e WEBHOOK_URL=WEBHOOK_URL IMAGE_NAME:TAG
```



