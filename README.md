# nconf-cluster-mode


```npm install```
```node index.js```


http://localhost:3000/
```
{"message":"Hello from Worker 1","port":3000,"salt":"!salty","name":"kamote"}
```

http://localhost:3000/update?name=randy
```
{"message":"Done update 3"}
```

http://localhost:3000/

```{"message":"Hello from Worker 2","port":3000,"salt":"!salty","name":"randy"}```
