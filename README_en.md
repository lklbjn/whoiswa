# WhoisWa

Modern RDAP/WHOIS Lookup Tool built with Next.js 16 and React 19.

[🇺🇸 English](./README_en.md) | [🇨🇳 中文](./README.md)

## 📋 Project Overview

WhoisWa is a fast, modern, and user-friendly web application for querying domain registration information. It utilizes both RDAP (Registration Data Access Protocol) and traditional WHOIS protocols to provide comprehensive domain data.

**Key Features:**
- 🔍 **Universal Domain Lookup**: Support for a wide range of TLDs via RDAP and WHOIS.
- 🌐 **Multi-language Support**: Built-in internationalization (i18n).
- 📜 **Search History**: Automatically tracks your recent queries locally.
- ⚡ **Modern UI/UX**: Clean interface built with Tailwind CSS and Radix UI.
- 📱 **Responsive Design**: Fully optimized for mobile and desktop devices.

## 🚀 Installation Guide

### System Requirements
- **Node.js**: v18.17 or later (Recommended: Latest LTS)
- **Package Manager**: pnpm (Required)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/whoiswa.git
   cd whoiswa
   ```

2. **Install dependencies**
   This project uses `pnpm` for dependency management.
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage Instructions

### Basic Domain Lookup
1. Enter a domain name (e.g., `example.com`) in the search bar.
2. Press Enter or click the "Search" button.
3. View detailed registration information including:
   - Registrar details
   - Registration/Expiration dates
   - Name servers
   - Status codes
   - Contact information (if available)

### Features
- **Language Switching**: Use the language selector in the header to switch between supported languages.
- **History**: Your recent searches are displayed below the search bar for quick access.

## 💻 Development Guide

### Project Structure
```
whoiswa/
├── src/
│   ├── app/              # Next.js App Router pages and API routes
│   ├── components/       # React components (UI, Logic)
│   ├── contexts/         # React Contexts (e.g., Language)
│   ├── lib/              # Utility functions and core logic
│   │   ├── i18n/         # Internationalization resources
│   │   ├── rdap/         # RDAP protocol implementation
│   │   └── whois/        # WHOIS protocol implementation
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── ...config files       # Configuration (Tailwind, Next.js, etc.)
```

### Environment Setup
No special environment variables are required for basic local development. If external APIs are integrated in the future, create a `.env.local` file based on `.env.example`.

### Contribution
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 Other Information

### License
This project is licensed under the **ISC License**.

### Contact
For questions or support, please open an issue in the repository.

### Version History
- **v1.0.0**: Initial release with core RDAP/WHOIS lookup functionality.

---
*Built with ❤️ using Next.js, Tailwind CSS, and TypeScript.*
