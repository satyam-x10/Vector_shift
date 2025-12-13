import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { LandingPage } from './components/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/pipeline"
          element={
            <div>
              <PipelineToolbar />
              <PipelineUI />
              <SubmitButton />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
