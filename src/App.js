  import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import RegisterVehicle from './pagesWeb/RegisterVehicle';
    import PageError from './pagesWeb/PageError';
    import Home from './pagesWeb/Home';
    import HistoryVehicle from './pagesWeb/HistoryVehicle';
    
    
    
    function App() {
      return (
    
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />       
            <Route path="/cadastrarCarros" element={<RegisterVehicle />} />  
            <Route path="/historico" element={<HistoryVehicle />} />     
            <Route path="*" element={<PageError />} />  
          </Routes>
        </BrowserRouter>
        );
    
    }
    export default App;
    
