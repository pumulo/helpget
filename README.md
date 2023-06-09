# helpget

// create a node.js repository
create a folder
switch to thet folder
copy contents for entity into the folder and customize package.json to a suitable name, similarly adjust the about router
// this is how to upload changes
npm i to check for errors and correct if found


git add .
git commit -a -m 'Entity microservice working'
git push

docker build -t pumulo/<microservice-name> .
docker push pumulo/<microservice-name>

// then run 
kubectl delete deployment --all
kubectl apply -f .
