import {Configuration, OpenAIApi} from 'openai-edge'

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: 'chatgpt',
    title: 'ChatGPT',
    contexts: ['selection'],
  })
  chrome.contextMenus.create({
    id: 'improveWriting',
    parentId: 'chatgpt',
    title: 'Improve writing',
    contexts: ['selection'],
  })
  chrome.contextMenus.create({
    id: 'makeLonger',
    parentId: 'chatgpt',
    title: 'Make longer',
    contexts: ['selection'],
  })
  chrome.contextMenus.create({
    id: 'makeShorter',
    parentId: 'chatgpt',
    title: 'Make shorter',
    contexts: ['selection'],
  })
  chrome.contextMenus.create({
    id: 'summarize',
    parentId: 'chatgpt',
    title: 'Make summary',
    contexts: ['selection'],
  })
  chrome.contextMenus.create({
    id: 'command',
    parentId: 'chatgpt',
    title: 'Execute command',
    contexts: ['selection'],
  })
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const {menuItemId, frameId} = info
  const {key} = await chrome.storage.local.get(['key'])

  if (!key) {
    const error = 'Please set your OpenAI API key in the extension options'
    console.error(error)
    chrome.tabs.sendMessage(tab.id, {method: 'alert', data: error})
    return
  }

  const {data: selectedText} = await chrome.tabs.sendMessage(tab.id, {method: 'getSelection'})

  if (selectedText) {
    switch (menuItemId) {
      case 'improveWriting':
        await runCommand(tab, key, `Improve the writing of the following content. \n\n${selectedText}`)
        break
      case 'makeLonger':
        chrome.tabs.sendMessage(tab.id, {method: 'clearSelection'})
        await runCommand(tab, key, `Make the following content longer: \n\n${selectedText}`)
        break
      case 'makeShorter':
        await runCommand(tab, key, `Make the following content shorter: \n\n${selectedText}`)
        break
      case 'summarize':
        await runCommand(tab, key, `Make a summary of the following content: \n\n${selectedText}`)
        break
      case 'command':
        await runCommand(tab, key, selectedText, true)
        break
    }
  } else {
    const error = 'Please select some text'
    console.error(error)
    chrome.tabs.sendMessage(tab.id, {method: 'alert', data: error})
  }
})

const runCommand = async (tab, key, command, commandOnly = false) => {
  const configuration = new Configuration({
    apiKey: key,
  })
  const openai = new OpenAIApi(configuration)
  const messages = []
  if (commandOnly) {
    messages.push({role: 'system', content: 'You are a helpful assistant.'})
  } else {
    messages.push({
      role: 'system',
      content:
        'I want you to act as a professional writer, spelling corrector and improver. I will give you a command to follow and some content. Always reply in the original language the content was written in. I want you to only reply the new content and nothing else, do not write explanations. ',
    })
  }
  messages.push({role: 'user', content: command})

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
    max_tokens: 500,
  })

  const reader = completion.body.getReader()
  const readStream = () => {
    reader
      .read()
      .then(({done, value}) => {
        if (done) {
          return
        }
        let isFinished = false
        const res = new TextDecoder()
          .decode(value)
          .split('data: ')
          .filter((s) => !!s)
        let output = ''
        for (const r of res) {
          if (r.startsWith('[DONE]')) {
            isFinished = true
          } else {
            const parsed = JSON.parse(r)
            if (parsed.error) {
              throw new Error('Problem getting response from OpenAI: ' + parsed.error.message)
            } else {
              output += parsed.choices[0].delta.content || ''
            }
          }
        }

        chrome.tabs.sendMessage(tab.id, {method: 'replaceSelection', data: output})

        if (!isFinished) {
          readStream()
        }
      })
      .catch((error) => {
        console.error(error)
        chrome.tabs.sendMessage(tab.id, {method: 'alert', data: error.toString()})
      })
  }
  readStream()
}
