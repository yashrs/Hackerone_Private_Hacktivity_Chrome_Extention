Steps to use:

Install this extension in chrome by following:

- Download the zip using GitHub. Extract it.
- Visit chrome://extensions (via omnibox or menu -> Tools -> Extensions).
- Enable Developer mode by ticking the checkbox in the upper-right corner.
- Click on the "Load unpacked extension..." button.
- Select the directory containing your unpacked extension.

After installation:

- Open Hacktivity(https://hackerone.com/hacktivity).
- Select Type `Disclosed` from the left hand menu. If any other type is selected, it'll give 500 errors on the server side. 
- Sample URL is https://hackerone.com/hacktivity?querystring=&filter=type:public&order_direction=DESC&order_field=latest_disclosable_activity_at&followed_only=false&collaboration_only=false
- Click on the extension icon, a popup will appear, click on yes to enable the extension and reload the page. You should now be seeing only the private reports on the hacktivity.

- To restore, just click on the icon and click on the `No` radio button and refresh the page

How does this work?
- The content-script is injected only on the Hackerone Hacktivity page(you can verify this in the manifest.json file) and the script cannot be injected anywhere else
- Once injected it checks if the extension is enabled or not using the chrome storage API where this setting is being persisted.
- If the extension is enabled, `cs.js` is injected in the browser page, which patches the `fetch` function of this page and enables interception.
- It intercepts only the GraphQL requests with `operationName` equal to `HacktivityPageQuery`. This can be verified in `cs.js`
- The JSON body is parsed and the condition `{"state":{"_eq":"soft_launched"}}` is added to the `team` part in the GraphQL variables.

Just make sure `Type` is selected as `Disclosed` as non-disclosed reports are not working with `soft_launched` option for some reason(gives 500 server error). All other settings should by default work as we are just adding the condition and not removing anything. So for example, sorting should work based on popularity and time as they do normally. I can't provide screenshots for obvious reasons as my private programs would be disclosed :P
