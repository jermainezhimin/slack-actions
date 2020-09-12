const { WebClient } = require('@slack/web-api');
const github = require('@actions/github');
const core = require('@actions/core');

const POST_ACTION = 'post'
const EDIT_ACTION = 'edit' 
const BUMP_ACTION = 'bump'
const REACT_ACTION = 'react'


const post = async () => {
  const channelId = core.getInput('channel-id');
  const botToken = core.getInput('slack-bot-token');
  const messages = core.getInput('message');
  const payload = github.context.payload

  const client = new WebClient(botToken);
  await client.chat.postMessage({ channel: channelId, text: eval(messages) })
}


const edit = async () => {
  const channelId = core.getInput('channel-id');
  const botToken = core.getInput('slack-bot-token');
  const payload = github.context.payload

  const client = new WebClient(botToken);
  const conversations = await client.conversations.history({ token: botToken, channel: channelId })
  const message = conversations.messages.find((message)=> message.text.includes(payload.pull_request.url))
  
  // We posted about the PR before 
  if (message !== undefined){
    await client.chat.update({ token: botToken, channel: channelId , ts: message.ts, text: `@here ${payload.pull_request.url} ${payload.pull_request.title}`})
    //We have not posted about the PR
  } else {
  await client.chat.postMessage({ channel: channelId, text: `@here ${payload.pull_request.url} ${payload.pull_request.title}` })
  }
}

async function run() {
  const action = core.getInput('action');

  try {
    switch(action) {
      case POST_ACTION:
        await post()
        break;
      case EDIT_ACTION:
        await edit()
        break;
      case BUMP_ACTION:
        console.log("BUMP")
        break;
      case REACT_ACTION:
        console.log("REACT")
        break;
      default:
        core.setFailed('Action does not exist');
        break;
    }
  } catch (error){
    core.setFailed(error.message);
  }
}

run();
