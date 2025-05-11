# RAG Assistant

https://rag-ui-eight.vercel.app/

A modern React-based chat application powered by Groq AI that enables intelligent document analysis and conversation.

## Features

- 🤖 AI-powered chat interface with multiple model options
- 📄 Document management and analysis
- 🌙 Dark/Light theme support
- 📱 Responsive design
- 🔒 Secure authentication
- 📊 Chat history and analytics
- 🔍 Advanced search capabilities
- ⚡ Real-time responses

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Groq AI API for language model
- React Router for navigation
- Date-fns for date handling

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Groq API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
GROQ_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Configuration

The application supports multiple AI models through Groq:
- Llama 3 8B
- Llama 3 70B
- Mixtral 8x7B
- Gemma 7B

Model settings can be configured in the Settings page or modified in `src/lib/groq.ts`.

## Project Structure

```
src/
├── components/    # Reusable UI components
├── context/      # React context providers
├── lib/          # Utility functions and API clients
├── pages/        # Main application pages
└── types/        # TypeScript type definitions
```

## Features in Detail

### Chat Interface
- Real-time AI responses
- Support for multiple conversation modes
- Code highlighting
- File attachments
- Voice input support

### Document Management
- Drag-and-drop file upload
- Multiple file format support
- Document analysis and embedding
- Search and filtering

### Settings
- Model configuration
- API key management
- Theme preferences
- Privacy controls
- Data retention settings

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Groq AI for providing the language model API
- The React and Vite communities
- All contributors to this project
