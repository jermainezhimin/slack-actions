# Slack Action
> Lightweight github action for posting to slack (using [node-slack-sdk](https://github.com/slackapi/node-slack-sdk)).

Slack action allows you interact with slack while exposing [Github's payload](https://developer.github.com/webhooks/event-payloads/). Pairing with a slack bot, this action is able to `post`, `update`, `react` and `reply` to messages while customizing the channel and message matcher / template.

The main use cases for using this actions is:
1. To monitor all merges to a master branch for tracking completed work (_closed pull requests_). See our example [here](https://github.com/jermainezhimin/slack-actions/blob/master/.github/workflows/post-prs.yml)
2. To post/update notifications when pull requests are ready for review.

## Usage

You can use this action after any other action. Here is an example setup of this action:

1. Create a `.github/workflows/slack-actions.yml` file in your GitHub repo.
2. Add the following code to the `slack-actions.yml` file. Note that the message is javascript code that get executed and provided the `payload` variable which is [provided by github](https://developer.github.com/webhooks/event-payloads/)

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

3. Create `SLACK_BOT_TOKEN` and `SLACK_CHANNEL_ID` secret using [GitHub Action's Secret](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets-for-a-repository). You will need to [generate a Slack bot token from here](https://api.slack.com/authentication/token-types#bot) and assign it the appropriate authorization(see `Setting up Actions`) and [locate the channel ID](https://stackoverflow.com/a/57246565/9932533).

## Environment Variables

By default, action is designed to run with minimal configuration but you can alter Slack notification using following environment variables:

Variable          | Default                                               | Purpose
------------------|-------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------
action     | -                    | Actions available in slack actions. We currently support `post`, `update`,`reply` and `react`
message    | -                                               | The message template in `Javascript` to post, we expose the payload from github as `payload` variable
slack-bot-token        | - | User/Bot slack authentication token
channel-id  | -                                                     | Slack channel to post to, to get the channel id follow this [guide](https://stackoverflow.com/a/57246565/9932533)

## Setting up Actions

### 1. POST

`post` uses Slack's [`chat.postMessage`](https://api.slack.com/methods/chat.postMessage) API and will require the `chat:write` scope.

Posts the `message` to given channel(_set via `channel_id`_).

Arguments
```
1. action: post
2. message: message in the form of javascript
3. slack-bot-token: Bot token to post as
3. channel-id: Channel to post to
```

### 2. UPDATE

`update` uses Slack's [`chat.postMessage`](https://api.slack.com/methods/chat.postMessage) and [`conversations.history`](https://api.slack.com/methods/conversations.history) API and will require the `chat:write`, `channels:history`,  `groups:history`, `im:history` and `mpim:history` scope.

This action uses the given `string-matcher` and searches the first message (_in the past 100 messages_) and *replaces* it with the given `message`.

Arguments
```
1. action: update
2. message: message in the form of javascript
2. string-matcher: javascript template
3. slack-bot-token: Bot token to post as
3. channel-id: Channel to post to
```

### 3. REPLY

`reply` uses Slack's [`chat.postMessage`](https://api.slack.com/methods/chat.postMessage) and [`conversations.history`](https://api.slack.com/methods/conversations.history) API and will require the `chat:write`, `channels:history`,  `groups:history`, `im:history` and `mpim:history` scope.

This action uses the given `string-matcher` and searches the first message (_in the past 100 messages_) and *replies* to it with the given `message`.

Arguments
```
1. action: reply
2. message: <message in the form of javascript>
2. string-matcher: <string to match against using `includes`>
3. slack-bot-token: <Bot token to post as>
3. channel-id: <Channel to post to>
```

### 4. REACT

`react` uses Slack's [`reactions.add`](https://api.slack.com/methods/reactions.add) and [`conversations.history`](https://api.slack.com/methods/conversations.history) API and will require the `reaction:write`, `channels:history`,  `groups:history`, `im:history` and `mpim:history` scope.

This action uses the given `string-matcher` and searches the first message (_in the past 100 messages_) and *replies* to it with the given `message` as the emoji name.

Arguments
```
1. action: react
2. message: <emoji name>
2. string-matcher: <string to match against using `includes`>
3. slack-bot-token: <Bot token to post as>
3. channel-id: Channel to post to
```

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

### Building / Deploying / Publishing

To publish a new version, we will have to build the project locally with `npm run build` and commit the `dist/` folder to [slack-actions](https://github.com/jermainezhimin/slack-actions).

we will next have to tag the commit by running `git tag -m "<tag message>" <tag name>` (_prefix tags with v and follow [semantic versioning](https://semver.org)_) and `git push --tags` to push the tag to the remote origin.

If all tests pass, we will then manually [create a release](https://docs.github.com/en/enterprise/2.13/user/articles/creating-releases). Please ensure the changelog and release title is approprately filled.

## Links

- Project homepage: https://github.com/jermainezhimin/slack-actions
- Repository: https://github.com/jermainezhimin/slack-actions
- Issue tracker: https://github.com/jermainezhimin/slack-actions/issues
  - In case of sensitive bugs like security vulnerabilities, please contact
    jermaine.zhimin@gmail.com directly instead of using issue tracker. We value your effort
    to improve the security and privacy of this project!

## Licensing

The code in this project is licensed under MIT license.
