# Priyesh Singh | AI/ML Portfolio

Personal portfolio website: animated 3D neural-network background, skills orbit, rotating certificates wheel, project showcase, scripted chat assistant, and a contact form.

## Project structure

```
portfolio/
├── index.html                     # page markup
├── css/
│   └── style.css                  # all styles
├── js/
│   ├── loader.js                  # intro loader + heading letter animation
│   ├── main.js                    # interactions: nav, skills orbit, certificates, chat, contact form, resume download
│   └── background.js              # 3D neural-network background (three.js)
└── assets/
    ├── Priyesh_Singh_Resume.pdf   # file behind the "Download resume" button
    └── images/                    # profile photo, project screenshots, certificates
```

## Run locally

Just open `index.html` in a browser. For the most accurate behaviour, serve the folder:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

The page loads fonts from Google Fonts and three.js from cdnjs, so it needs an internet connection.

## Deploy on GitHub Pages

1. Create a new repository on GitHub and upload all of these files (keep the folder structure).
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute your site is live at `https://<your-username>.github.io/<repository-name>/`.

## Customize

- **Contact form:** the Web3Forms access key is the `FORM_KEY` variable in `js/main.js`. In your Web3Forms dashboard, restrict the key to your domain.
- **Resume:** replace `assets/Priyesh_Singh_Resume.pdf` with a new PDF (keep the same file name).
- **Certificates and screenshots:** replace the files in `assets/images/`.
- **Text, projects, skills:** edit `index.html`. The skills list and chat answers are in `js/main.js`.
