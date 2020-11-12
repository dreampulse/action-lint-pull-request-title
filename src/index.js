const core = require('@actions/core');
const github = require('@actions/github');
const validatePrTitle = require('./validatePrTitle');

module.exports = async function run() {
  try {
    const client = new github.GitHub(process.env.GITHUB_TOKEN);

    const contextPullRequest = github.context.payload.pull_request;
    if (!contextPullRequest) {
      throw new Error(
        "This action can only be invoked in `pull_request_target` or `pull_request` events. Otherwise the pull request can't be inferred."
      );
    }

    const owner = contextPullRequest.base.user.login;
    const repo = contextPullRequest.base.repo.name;

    // The pull request info on the context isn't up to date. When
    // the user updates the title and re-runs the workflow, it would
    // be outdated. Therefore fetch the pull request via the REST API
    // to ensure we use the current title.
    const {data: pullRequest} = await client.pulls.get({
      owner,
      repo,
      pull_number: contextPullRequest.number
    });

    await validatePrTitle(pullRequest.title);
  } catch (error) {
    core.setFailed(error.message);
  }
};
