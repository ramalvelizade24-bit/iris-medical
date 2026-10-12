# Security maintenance

This is a public static website. HTML, JavaScript, asset URLs and form recipient addresses are visible to visitors. Never place API tokens, private keys or passwords in them. A private GitHub repository does not make browser code secret.

Future secret-bearing integrations must run server-side (for example a Vercel Function) and read secrets from environment variables. Never return those secrets to the browser. If a secret was committed, revoke/rotate it at its provider; merely deleting it from current files or adding .gitignore does not remove it from history.

Enable two-factor authentication on GitHub, Vercel and the receiving mailbox. Use least-privilege deployment tokens. These account settings have not been changed by the code update.

vercel.json adds security headers on deployment. Same-origin frames remain permitted because the homepage embeds the catalog. Inline scripts/styles are currently required by the legacy site; CSP still allows unsafe-inline, so it is a compatibility baseline, not full XSS protection. Migrate inline scripts and handlers before removing that allowance.

Forms use FormSubmit/Formspree. Client-side file validation is not a security boundary; provider-side validation, anti-spam and attachment scanning must be checked with those providers. Do not disable provider CAPTCHA. Treat received CV attachments as untrusted.

After deployment verify headers and test language switching, product search, catalog frames, contact/CV forms and embedded maps. No full penetration test or Git-history secret audit has been performed.
