import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div>
      <div className="app-header">
        <PipelineToolbar />
      </div>
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
