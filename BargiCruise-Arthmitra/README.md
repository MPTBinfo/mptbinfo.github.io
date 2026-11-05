# Narmada Cruise Circuit — Interactive Atlas

**Published URL:** https://mptb.in/BargiCruise-Arthmitra

**Cloudflare Worker:** `narmada-cruise-atlas` in the Cloudflare account managing `mptb.in`.

**Backup URL:** https://narmada-cruise-atlas.mptb.workers.dev

## Deployment

The public meeting atlas is deployed as a self-contained Cloudflare Worker. `worker.js` is the deployed source retrieved from the Cloudflare API, including HTML, CSS, JavaScript, SVG map and route-animation logic. The route `mptb.in/BargiCruise-Arthmitra*` forwards only this requested path; the other existing domain routes remain unchanged.

## Scope

This is an interactive simplified geographic route atlas, not a satellite map or verified nautical navigation dataset. Route indications: water 71.1 km, road 57.8 km; final alignment and length must be technically verified. The separate larger Next.js source package with PDFs and graphics has not been deployed to this Worker.

Meeting project: Proposed Narmada Cruise Circuit, Jabalpur / Bargi – Payli – Tintni – Sarhi / Kanha, 05 November 2026, Madhya Pradesh Tourism Board.
