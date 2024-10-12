import React from 'react' 
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/ui/Header';
import { DirectorView } from './components/director/DirectorView';
import { GeneroView } from './components/genero/GeneroView';
import { MediaView } from './components/media/MediaView';
import { ProductoraView } from './components/productora/ProductoraView';
import { TipoView} from './components/tipo/TipoView';
import { MediaUpdate } from './components/media/MediaUpdate';
import { ProductoraUpdate } from './components/productora/ProductoraUpdate'

const App = () => {
  return <Router>
     <Header/>
      <Switch>
        <Route exact path='/media' component= { MediaView } />
        <Route exact path='/director' component= { DirectorView} />
        <Route exact path='/tipo' component= { TipoView} />
        <Route exact path='/genero' component= { GeneroView } />
        <Route exact path='/productora' component= { ProductoraView } />
        <Route exact path= '/media/edit/:mediaId' component = {MediaUpdate} />
        <Route exact path= '/productora/edit/:productoraId' component = {ProductoraUpdate} />

        <Redirect to='/' />

      </Switch>
    </Router>

    
  
}

export {
    App
}
