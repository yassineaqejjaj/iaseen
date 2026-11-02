# Recording leads and contact messages in a Google Sheet

The site posts each white paper lead and each contact-form message to a small Google Apps Script web app that appends a row to a private sheet (the "Leads" tab for downloads, the "Messages" tab for the contact form). No third-party service, no SDK.

1. Create a Google Sheet (any name, for example "iaseen leads"). Keep it private.
2. Menu **Extensions > Apps Script**. Replace the content with the script below, and change `SECRET` to a long random string.
3. **Deploy > New deployment > Web app**. Execute as: **Me**. Who has access: **Anyone**. Authorise when asked, then copy the web app URL.
4. In the Vercel project settings, add two environment variables, then redeploy:
   - `LEADS_WEBHOOK_URL`: the web app URL;
   - `LEADS_WEBHOOK_SECRET`: the same value as `SECRET` in the script.
5. Test from the site: a row appears in the sheet.

```js
const SECRET = 'CHANGE_ME_TO_A_LONG_RANDOM_STRING';

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (d.secret !== SECRET) return ContentService.createTextOutput('forbidden');
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (d.type === 'contact') {
    const m = ss.getSheetByName('Messages') || ss.insertSheet('Messages');
    if (m.getLastRow() === 0) m.appendRow(['Date', 'Name', 'Email', 'Language', 'Message', 'Consent date']);
    m.appendRow([d.at, d.name, d.email, d.locale, d.message, d.consentAt]);
    return ContentService.createTextOutput('ok');
  }
  const sh = ss.getSheetByName('Leads') || ss.insertSheet('Leads');
  if (sh.getLastRow() === 0) sh.appendRow(['Date', 'Email', 'Language', 'Document', 'Newsletter consent', 'Consent date']);
  sh.appendRow([d.at, d.email, d.locale, d.id, d.newsletter ? 'yes' : 'no', d.consentAt]);
  return ContentService.createTextOutput('ok');
}
```

Without `LEADS_WEBHOOK_URL`, the contact form refuses to send on Vercel (the visitor sees the e-mail address instead), so that no message is ever lost silently. In development it writes `.leads/messages.csv`.

Notes: anyone who knows the web app URL can post to it, which is why the script checks the secret. To delete a contact on request, remove its row. Export the sheet as CSV to import the addresses into a mailing tool later (only those with newsletter consent "yes" may receive newsletters).
