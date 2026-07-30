import { SITE } from "@/lib/site";

// Same branded HTML lead-notification template the old precisewolf.com site
// used for both its contact form and white paper form emails.
export function buildLeadEmailHtml({
  introLine,
  fields,
  embedUrl,
}: {
  introLine: string;
  fields: { label: string; value: string }[];
  embedUrl: string;
}) {
  const fieldsHtml = fields
    .map((f) => `<p><strong>${f.label}:</strong> ${f.value}</p>`)
    .join("\n");

  return `<table style="background-color: #f7f7f7; width: 100%;">
<tbody>
<tr>
<td>
<table style="margin: auto; padding-top:20px;padding-bottom: 20px;">
<tbody>
<tr>
<td style="text-align: center;"><img src="${SITE.url}/logos/logo.png" alt="Logo" width="250px" height="auto" /></td>
</tr>
</tbody>
</table>
<table style="background-color: white; width: 100%; max-width: 600px; margin: auto; border-left: 15px solid #f7f7f7; border-right: 15px solid #f7f7f7;">
<tbody>
<tr>
<td style="padding: 20px 20px;">
<p>${introLine}</p>
${fieldsHtml}
</td>
</tr>
</tbody>
</table>
<table style="margin: auto; padding: 20px; width: 100%; max-width: 600px; text-align: center;">
<tbody>
<tr>
<td><em><small><p><strong>Submitted from:</strong> <a href="${embedUrl}" target="_blank">${embedUrl}</a></p></small></em></td>
</tr>
<tr>
<td>Have questions about the form submission or the website?
Reach out to your web support at <a href="mailto:${SITE.email}">${SITE.email}</a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>`;
}
