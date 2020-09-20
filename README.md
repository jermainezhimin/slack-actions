# Slack Action
> Lightweight github action for posting to slack.

Slack action allows you interact with slack while exposing [Github's payload](https://developer.github.com/webhooks/event-payloads/). Pairing with a slack bot, this action is able to `post`, `update`, `react` and `reply` to messages while customizing the channel and message matcher / template.

The main use cases for using this actions is:
1. To monitor all merges to a master branch for tracking completed work (_closed pull requests_). See our example [here](https://github.com/jermainezhimin/slack-actions/blob/master/.github/workflows/post-prs.yml)
2. [WIP] To post/update notifications when pull requests are ready for review.

## Usage

You can use this action after any other action. Here is an example setup of this action:

1. Create a `.github/workflows/slack-actions.yml` file in your GitHub repo.
2. Add the following code to the `slack-actions.yml` file.

```yml
on: push

name: Posting to slack
  steps:
  - name: Posting to slack
    uses: jermainezhimin/slack-actions@v0.1
    with:
      slack-bot-token: ${{ secrets.SLACK_BOT_TOKEN }}
      channel-id: ${{ secrets.SLACK_CHANNEL_ID }}
      action: post
      message: | 
        `:star-struck: New commits in _*dev*_!\n
        ${payload.commits.map((commit)=>`• [_${commit.author.name}_] <${commit.url}|${commit.message}>\n`)}
        `
```

3. Create `SLACK_BOT_TOKEN` and `SLACK_CHANNEL_ID` secret using [GitHub Action's Secret](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets-for-a-repository). You can [generate a Slack incoming webhook token from here](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks).

## Environment Variables

By default, action is designed to run with minimal configuration but you can alter Slack notification using following environment variables:

Variable          | Default                                               | Purpose
------------------|-------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------
action     | -                    | Actions available in slack actions. We currently only support `post`
message    | -                                               | The message template in `Javascript` to post, we expose the payload from github as `payload` variableß
slack-bot-token        | - | User/Bot slack authentication token
channel-id  | -                                                     | Slack to post to, to get the channel id follow this [guide](https://stackoverflow.com/a/57246565/9932533) 

### Building / Deploying / Publishing

To publish a new version, we will have to build the project locally with `npm run build` and commit the `dist/` folder to [slack-actions](https://github.com/jermainezhimin/slack-actions). 

we will next have to tag the commit by running `git tag -m "<tag message>" <tag name>` (_prefix tags with v and follow [semantic versioning](https://semver.org)_) and `git push --tags` to push the tag to the remote origin.

If all tests pass, we will then manually [create a release](https://docs.github.com/en/enterprise/2.13/user/articles/creating-releases). Please ensure the changelog and release title is approprately filled.

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Links

- Project homepage: https://github.com/jermainezhimin/slack-actions
- Repository: https://github.com/jermainezhimin/slack-actions
- Issue tracker: https://github.com/jermainezhimin/slack-actions/issues
  - In case of sensitive bugs like security vulnerabilities, please contact
    jermaine.zhimin@gmail.com directly instead of using issue tracker. We value your effort
    to improve the security and privacy of this project!

## Licensing

The code in this project is licensed under MIT license.
