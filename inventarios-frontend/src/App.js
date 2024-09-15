import React from 'react' 
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/ui/Header';
import { DirectorView } from './components/director/DirectorView';
import { generoViewView } from './components/genero/GeneroView';
import { MediaView } from './components/media/MediaView';
import { ProductoraView } from './components/productora/ProductoraView';
import { TipoView} from './components/tipo/TipoView';

const App = () => {
  return <Router>
    <Header/>

    </Router>

    
  
}

export {
    App
}
