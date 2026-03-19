# GFG X RIT — Backend

Backend configuration and server-side assets for the GFG Campus Club RIT website.

## Contents

- **`firestore.rules`** — Firestore security rules for users, events, resources, and blogs. Deploy with Firebase CLI: `firebase deploy --only firestore:rules` (from project root or with `--config` pointing to Firebase config).

## Future

- Firebase Admin / server API can be added here (e.g. Node/Express) for contact form, auth callbacks, or server-side event/resource APIs.
- Keep client-side Firebase init and Firestore usage in the **frontend** app.
