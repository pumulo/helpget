# helpget

doctl token:
dop_v1_43eb77e171e6bee4cb7bf46b004f67ec3932e626a15f0a6680d756c197121ca3

// create a node.js repository
create a folder
switch to thet folder
copy contents for entity into the folder and customize package.json to a suitable name, similarly adjust the about router
// this is how to upload changes
npm i to check for errors and correct if found


git commit -a -m 'Entity microservice working'
git push

docker build -t pumulo/entity .
docker push pumulo/entity

// then run 
kubectl delete deployment --all
kubectl apply -f .
