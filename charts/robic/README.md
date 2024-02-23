## Running locally

### Setting up minikube

- Install minikube
- Start minikube `minikube start --driver=hyperv`
  - Important to use the `hyperv` flag otherwise it will default to the `docker` driver and external requests to the cluster won't work
- Install ingress on [Minikube](https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/)
  - `minikube addons enable ingress`
  - Verify pods are running via `kubectl get pods -n ingress-nginx`
- Get IP address for Minikube cluster `minikube ip`
- Map IP address to ingress host in host file
  - `C:\Windows\System32\drivers\etc\hosts` on Windows
  - Add entry like `192.168.49.2 www.chart-example.com`
- View dashboard via `minikube dashboard --url`

### Updating deployment

- Ensure you're in the `\charts\robic\` directory
- Set `TokenKey` and `MySQLConnectionString` environment variables
- Run Helm upgrade to reference these environment variables, i.e. for Windows using `$env`: `helm upgrade --install --set tokenKey=$env:TokenKey --set mySQLConnectionString=$env:MySQLConnectionString robic .`
