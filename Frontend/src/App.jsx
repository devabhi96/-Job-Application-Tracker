import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ApplicationList from './pages/ApplicationList';
import ApplicationForm from './pages/ApplicationForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ApplicationList />} />
        <Route path="/new" element={<ApplicationForm />} />
        <Route path="/edit/:id" element={<ApplicationForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;