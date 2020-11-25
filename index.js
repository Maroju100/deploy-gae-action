const core = require('@actions/core');
const execSync = require('child_process').execSync;
const fs = require('fs');

async function run() {
  try {
    
    const serviceAccountFile = `/tmp/${(new Date()).getTime()}.json`; // Create temp json
    const projectName = core.getInput('project_id');
    const isDebug = core.getInput('debug');
    const appYamlPath = core.getInput('gae_config_path')
    const noCache = core.getInput('no_cache')

    core.startGroup('Processing service account');
    console.log('Copy service account');
    const b64File = core.getInput('service_account')
    const fileContents = Buffer.from(b64File, 'base64').toString()
    fs.writeFileSync(serviceAccountFile, fileContents);

    console.log('Activate service account');
    execSync(`gcloud auth activate-service-account --key-file ${serviceAccountFile}`, { stdio: 'inherit' });
    core.endGroup();

    core.startGroup('Set Google Cloud project');
    execSync(`gcloud config set project ${projectName}`, {stdio: 'inherit'});
    core.endGroup();

    if (isDebug) {

      core.startGroup('Project info');
      execSync(`gcloud info`, {stdio: 'inherit'});
      core.endGroup();
    } else {

      core.startGroup('Deploy project');
      execSync(`gcloud app deploy --appyaml=${appYamlPath} -q --promote --stop-previous-version ${noCache ? ' --no-cache': ''}`, {stdio: 'inherit'});
      core.endGroup();
    }

    core.startGroup('Remove service account');
    fs.unlinkSync(serviceAccountFile);
    core.endGroup();
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run();