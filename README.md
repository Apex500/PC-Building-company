# PC-Building-company

A simple static website for a PC building side gig: custom assembly when customers bring their own parts, and build design for a given budget and goal.

Plain HTML, CSS and JavaScript, so it hosts free on GitHub Pages with no build step.

## Fill in your details

Search for these placeholders and replace them:

| Placeholder | Where | What to put |
| --- | --- | --- |
| `Arya` | `index.html` (title, logo, footer) | Your name or business name |
| `Champaign IL` | `index.html` (hero) | Where you work, or remove it |
| `quantara.company` | `index.html` footer and `script.js` | The email that should receive requests |
| `$50` | `index.html` pricing section | Your prices |
| Recent builds | `index.html` builds section | Photos of your builds in an `images/` folder |

## How the request form works

The form opens the visitor's email app with all their answers filled in, addressed to `CONTACT_EMAIL` in `script.js`. No account or server needed.

If you'd rather receive submissions without the visitor's email app opening, sign up for a free form service such as [Formspree](https://formspree.io), set the form's `action` to the URL they give you with `method="POST"`, and remove the submit handler in `script.js`.

## Publishing on GitHub Pages

1. Go to the repository's **Settings > Pages**.
2. Under **Build and deployment**, set Source to **Deploy from a branch**.
3. Pick the `main` branch and the `/ (root)` folder, then **Save**.
4. After a minute the site is live at `https://apex500.github.io/pc-building-company/`.

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.
