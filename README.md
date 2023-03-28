# ChatGPT everywhere

[ChatGPT-Everywhere](https://chrome.google.com/webstore/detail/chatgpt-everywhere/kebfhgodkejbfelbbcekkamfpcichken) is an open-source chrome extension that enhances your writing skills with the power of GPT. It enables you to use GPT on almost any input field on the web, such as writing an email in Gmail, a ticket in Jira, a message on Twitter, or a comment on GitHub.

This extension has a range of features intended for writers to optimize their writing experience:
- Improve your text:  It suggests better word choices and phrasing to make your writing more sophisticated.
- Make it longer: If you're struggling to hit a word count, this option helps you research and add more information.
- Make it shorter: Want to cut down words without compromising the context? This feature provides you with a concise and accurate summary of your content.
- Create summary: It generates a compact summary of your paragraphs with the essential notes.
- Ask question: This feature lets you execute commands such as "write a resignation letter," and GPT will automatically execute the command for you.

ChatGPT-Everywhere is fully open-source, and we encourage Pull Requests to add new functionality or improvements. 

## Usage

Simply install the extension from the [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-everywhere/kebfhgodkejbfelbbcekkamfpcichken). Click on the extension icon to open the settings page and enter your API key. You can now use the extension on any textbox on the web.
Get your OpenAI API key at https://platform.openai.com/account/api-keys. 

### Support us
This extension is free and open-source. If you like the extension, please support us by leaving a short review on the [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-everywhere/kebfhgodkejbfelbbcekkamfpcichken) and star this repository.

## Development 

This extension was created with [Extension CLI](https://oss.mobilefirst.me/extension-cli/).

### Available Commands

| Commands | Description |
| --- | --- |
| `npm run start` | build extension, watch file changes |
| `npm run build` | generate release version |
| `npm run docs` | generate source code docs |
| `npm run clean` | remove temporary files |
| `npm run test` | run unit tests |
| `npm run sync` | update config files |

For CLI instructions see [User Guide &rarr;](https://oss.mobilefirst.me/extension-cli/)

To use locally simply clone this repository and run `npm install` to install the dependencies. Then run `npm run start` to build the extension and watch for file changes. You can now load the extension in Chrome by going to `chrome://extensions` and clicking on `Load unpacked` and selecting the `dist` folder.

## Contributing

We welcome contributions from the community, make a issue to discuss your idea or submit a pull request.
