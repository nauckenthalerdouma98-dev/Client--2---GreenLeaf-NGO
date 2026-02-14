# GreenLeaf NGO Website

A modern, fully responsive website for an environmental NGO focused on forest restoration in Africa. The site features a clean design, interactive elements, and integrates with Google Sheets for newsletter sign‑ups without a backend.

![GreenLeaf NGO screenshot](Images/Img 1.png)  
*Hero section of the website*

---

## Features

- **Fully fluid/responsive layout** – Uses `clamp()` and CSS custom properties; no media queries (except for reduced motion).
- **Mobile‑friendly navigation** – Accessible menu toggle with keyboard support.
- **Smooth scrolling** – All internal anchor links scroll smoothly to their target sections.
- **Active section highlighting** – The current section is automatically highlighted in the main navigation.
- **Key figures display** – Animated metric cards with icons.
- **Program cards** – Cards with background images and semi‑transparent overlays.
- **Partner logos section** – Grayscale logos that become coloured on hover.
- **Newsletter subscription** – Submits to a Google Apps Script endpoint using a hidden iframe and `postMessage` for user feedback.
- **Contact form (demo)** – Client‑side validation and success notification.
- **Donate button (demo)** – Shows a notification message.
- **Accessibility** – Keyboard focus indicators, ARIA attributes, and reduced motion support.
- **Notification system** – Custom toast‑style messages for form submissions and interactions.

---

## Technologies Used

- **HTML5** – Semantic structure
- **CSS3** – Custom properties, CSS Grid, Flexbox, `clamp()` for fluid typography/spacing
- **JavaScript (ES6)** – Interactive features, DOM manipulation, event handling
- **Font Awesome 6** – Icon library
- **Google Apps Script** – Handles newsletter form submissions (no backend required)

---

## Setup & Installation

1. **Clone or download** the repository.
   ```bash
   git clone https://github.com/your-username/greenleaf-ngo.git
```

1. Open index.html in any modern web browser.
2. No build tools, package managers, or server setup are required – the site runs entirely on the client side.

---

## Configuration

Newsletter Form

The newsletter form is configured to submit to a Google Apps Script URL. To use your own endpoint:

1. Open script.js.
2. Locate the constant GOOGLE_SCRIPT_URL (near the top).
3. Replace the existing URL with your deployed Google Apps Script web app URL.
4. Your script should accept POST requests and return a JSON response in one of the following formats:
   · Success: { "result": "success", "message": "Thank you for subscribing!" }
   · Error: { "result": "error", "message": "Something went wrong." }

The script will then display the returned message in the notification.

Images

· Replace placeholder images in the Images/ folder with your own.
· Update the src attributes in index.html accordingly.
· Background images for program cards are currently Unsplash URLs; you can replace them in the CSS (see .card-bg-image rules).

Colors & Fonts

· All theme colors are defined as CSS custom properties in the :root block of style.css.
· The font family uses system defaults; change the --font-family variable to use a custom font.

---

## File Structure

greenleaf-ngo/
├── index.html          # Main HTML document
├── style.css           # All styles (fluid design)
├── script.js           # JavaScript functionality
├── Images/             # Folder for images
│   ├── Img 1.png       # Hero image
│   └── Unuathorized.png # Placeholder for partner logos
└── README.md           # This file

---

## Customization

· Content: Edit the text and HTML structure in index.html to match your organization’s information.
· Key figures: Update the numbers and labels in the .figures-card list.
· Program cards: Modify the titles, descriptions, and links.
· Partner logos: Replace the placeholder images and adjust the alt text.
· Contact information: Update the address, phone number, and email in the contact section and footer.

---

## Browser Support

The site is compatible with all modern browsers:

· Chrome (latest)
· Firefox (latest)
· Safari (latest)
· Edge (latest)

Internet Explorer 11 is not supported due to the use of CSS Grid and clamp().

---

## Contributing

Contributions are welcome! If you find a bug or have a suggestion for improvement:

1. Open an issue to discuss it.
2. Fork the repository and create a feature branch.
3. Submit a pull request with a clear description of your changes.

Please ensure your code follows the existing style and passes accessibility checks.

---

## License

All Rights Reserved.

Copyright © 2026 GreenLeaf NGO. All rights reserved.

No part of this website or its content may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the copyright holder, except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law.

For permission requests, please contact: nauckenthalerdouma@gmail.com

---

## Acknowledgements

· Font Awesome for the comprehensive icon set.
· Unsplash for the placeholder background images.
· Google Apps Script for enabling a backend‑less form solution.
· The open‑source community for inspiration and tools.

---

GreenLeaf NGO – Protecting and restoring African forest ecosystems, one tree at a time.