<h1 align="center">
 Deploy app to Google App Engine :rocket:
</h1>

<p align="center">This action allows you to publish an application to <a href="https://cloud.google.com/appengine/">Google App Engine</a></p>

## :ticket: Inputs

### `service_account`

**Required** The service account private key (JSON) encoded as a base64, you can know how to create one [here](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).

The service account needs to have the following permissions:
- App Engine Admin
- Cloud Build service agent 

### `project_id`

**Required** The project-id in service account.

### `gae_config_path`

**Optional** The path to your `app.yaml` file. Defaults to `./app.yaml`. 

### `debug`

To test. Default `''`. PS: If is a truthy value it will debug instead of deploying

## :clipboard: Example usage

```yaml
- name: Deploy to Google App Engine
  uses: etereo-io/deploy-gae-action
  with:
    service_account:  ${{ secrets.SERVICE_ACCOUNT }}
    project_id: ${{ secrets.PROJECT_ID }}
    gae_config_path: './app.yaml'
    no_cache: false

```

## :memo: License

This project is under license from MIT. See the [LICENSE](/LICENSE) file for more details.
