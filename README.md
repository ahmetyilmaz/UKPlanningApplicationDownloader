# 🏗️ UK Planning Application Downloader

A clean, fast, and modern web extension allowing you to bulk-download all files and documents from UK local council planning applications with a single click. No more downloading hundreds of PDF files manually!

## ✨ Features

- **One-click bulk downloads**: Instantly grab every asset attached to a planning application.
- **Intelligent Organization**: Automatically organizes downloads into subfolders named `[Reference] [Address]` (Chrome and Edge).
- **Universal Compatibility**: Works in all major browsers (Safari, Chrome, Edge, Firefox).
- **Sanitized Naming**: Downloads the application summary as a clean `[Reference] [Address].json` file.
- **Manifest V3 compliant**: Modern, secure, and performant.
- **Zero dependencies**: Built with pure, 100% Vanilla JavaScript.

## 🌍 Supported Planning Portals

Our extension supports the planning portals of the following UK councils and authorities:

- [Barking and Dagenham](http://paplan.lbbd.gov.uk/online-applications/)
- [Barnet](https://publicaccess.barnet.gov.uk/online-applications/)
- [Bexley](http://pa.bexley.gov.uk/online-applications/)
- [Bracknell Forest](https://planapp.bracknell-forest.gov.uk/online-applications/)
- [Brent](https://pa.brent.gov.uk/online-applications/)
- [Bromley](https://searchapplications.bromley.gov.uk/online-applications/)
- [Cornwall](http://planning.cornwall.gov.uk/online-applications/)
- [Croydon](https://publicaccess3.croydon.gov.uk/online-applications/)
- [Ealing](https://pam.ealing.gov.uk/online-applications/)
- [Ebbsfleet](http://applications.ebbsfleetdc.org.uk/online-applications/)
- [Edinburgh](https://citydev-portal.edinburgh.gov.uk/idoxpa-web/)
- [Enfield](https://planningandbuildingcontrol.enfield.gov.uk/online-applications/)
- [Greenwich](https://planning.royalgreenwich.gov.uk/online-applications/)
- [Hammersmith and Fulham](http://public-access.lbhf.gov.uk/online-applications/)
- [Lambeth](https://planning.lambeth.gov.uk/online-applications/)
- [Lewisham](https://planning.lewisham.gov.uk/online-applications/)
- [Manchester](https://pa.manchester.gov.uk/online-applications/)
- [Newcastle City](https://publicaccessapplications.newcastle.gov.uk/online-applications/)
- [Newham](https://pa.newham.gov.uk/online-applications/)
- [Norwich City](https://planning.norwich.gov.uk/online-applications/)
- [Southwark](https://planning.southwark.gov.uk/online-applications/)
- [Sutton](http://planningregister.sutton.gov.uk/online-applications/)
- [Tower Hamlets](https://development.towerhamlets.gov.uk/online-applications/)
- [Wakefield](https://planning.wakefield.gov.uk/online-applications/)
- [Westminster](https://idoxpa.westminster.gov.uk/online-applications/)

*If your local council isn't listed, feel free to open an issue or submit a Pull Request!*

## 🚀 Installation & Developer Guide

### Getting Started

Since the extension relies on zero build tools or external dependencies, getting started locally is incredibly simple:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmetyilmaz/UKPlanningApplicationDownloader.git
   cd UKPlanningApplicationDownloader
   ```

### Chrome, Brave, Edge

1. Open your browser's extension management page (e.g., `chrome://extensions/`).
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the `src/` directory from the cloned repository.

### Safari

Safari requires a different setup process:

1. Open **Safari > Settings > Extensions**
2. Click **Allow Extension**
3. Click **Load Unpacked** and select the `src/` directory from the cloned repository
4. Grant necessary permissions when prompted

### Development Flow

- Any changes you make to the source files will reflect immediately after clicking the reload button (🔄) on the extension card.

### Browser Compatibility

| Browser | Support | Method | Features |
|---------|---------|--------|----------|
| Chrome  | Full    | API/Blob | Subfolders Supported |
| Edge    | Full    | API/Blob | Subfolders Supported |
| Firefox | Full    | Blob     | Universal Compatibility |
| Safari  | Full    | Blob     | Universal Compatibility |

## 🤝 Contributing

Contributions are always welcome! If you want to add support for a new planning portal:
1. Fork the repository.
2. Add the portal's target URL pattern to the `matches` array in `manifest.json`.
3. Add the council to the supported list in this `README.md`.
4. Open a Pull Request!

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
**Acknowledgements**:
- This project is a fork of [StudioLE/PlanningApplicationDownloader](https://github.com/StudioLE/PlanningApplicationDownloader). Huge kudos to them for the original implementation!
- Construction Icon from the Noun Project under a Creative Commons license.