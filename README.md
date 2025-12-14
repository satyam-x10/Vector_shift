# VectorShift Technical Assessment

This repository contains the submission for the VectorShift Frontend Technical Assessment. It consists of a React-based frontend pipeline builder and a FastAPI backend for pipeline validation.

## Features Implemented

### 1. Node Abstraction
- Created a shared `BaseNode` component to unify styling and functionality across all nodes.
- Implemented 5 new custom nodes demonstrating the abstraction:
  - **API Node**: For external API requests.
  - **Database Node**: For database query operations.
  - **Filter Node**: For data filtering logic.
  - **Transform Node**: For data transformation operations.
  - **Visualization Node**: For data visualization outputs.

### 2. Styling
- Applied a modern, cohesive design system using **Inter** font and a dark theme palette.
- Styled components include:
  - **Toolbar**: Draggable node items.
  - **Canvas Nodes**: Glassmorphism effects, consistent headers, and interactive inputs.
  - **UI Elements**: Primary buttons with hover states and custom modals.

### 3. Text Node Logic
- **Dynamic Resizing**: Text nodes automatically resize their height based on content.
- **Variable Detection**: Supports `{{ variableName }}` syntax. Defining a variable in the text area automatically creates a corresponding input handle on the node.

### 4. Backend Integration
- Integrated with the Python/FastAPI backend.
- **Pipeline Submission**: Clicking "Submit Pipeline" sends the current node/edge configuration to the backend.
- **Validation**: The backend parses the pipeline to:
  - Count nodes and edges.
  - Verify if the pipeline is a Directed Acyclic Graph (DAG).
- **Feedback**: Results are displayed in a polished modal on the frontend.

## Project Structure

```
├── backend/
│   └── main.py              # FastAPI server with /pipelines/parse endpoint
├── frontend/
│   ├── src/
│   │   ├── components/      # Shared components (BaseNode)
│   │   ├── nodes/           # Node implementations (Text, API, etc.)
│   │   ├── ui/              # UI components (Modal)
│   │   ├── submit.js        # Submission logic
│   │   └── index.css        # Global styles
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- Python (3.8+)

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The application will run at `http://localhost:3000`.

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies (if a requirements.txt exists, otherwise install fastapi and uvicorn):
   ```bash
   pip install fastapi uvicorn
   ```
3. Run the server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will run at `http://127.0.0.1:8000`.

## Usage
1. Drag nodes from the toolbar onto the canvas.
2. Connect nodes by dragging from handles.
3. Use the **Text Node** to define variables using `{{ myVar }}` syntax.
4. Click **Submit Pipeline** to validate the graph and check for cycles.
