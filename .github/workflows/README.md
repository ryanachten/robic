# CI/CD Development

Robic's mobile application and API deployments are automated using the following steps using GitHub Actions.

```mermaid
graph TD;
    start[Merge to master]-->changes{Changes in directory}
    
    changes-->|api|loginDocker[Login into Docker Hub]
        -->buildDocker[Build Docker image]
        -->pushDocker[Push Docker image to Hub]
    
    changes-->|app|loginExpo[Login into Expo Application Services]
        -->buildAndroid[Build Android app]
        -->loginEas((Verify build in EAS))
        -->submitAndroid[Manually submit Android app to Google Play]
```