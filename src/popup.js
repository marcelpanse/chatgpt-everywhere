document.addEventListener('DOMContentLoaded', async () => {
  console.log('popup')

  chrome.storage.local.get(['key'], (result) => {
    console.log('result', result)
    document.getElementById('openAiKey').value = result.key
  })

  document.getElementById('openAiKey').addEventListener('change', () => {
    console.log('change', document.getElementById('openAiKey').value)
    chrome.storage.local.set({key: document.getElementById('openAiKey').value})
  })
})
