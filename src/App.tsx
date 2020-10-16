import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* import widgets */
import widgets from './components/Widgets';

/* Pages */
import EntryPoint from './entry-point/GUI';
import Menu from './components/Menu';
import MainPage from './pages/Main';

const App: React.FC = () => {

  return (
    <IonApp>
      <widgets.loadSpinner/>
      <IonReactRouter>
        <IonSplitPane contentId="menu">
          <Menu />
          <IonRouterOutlet id="menu">
            <Route path="/page/:name" component={MainPage} exact />
            <Redirect from="/" to="/login" exact />
          </IonRouterOutlet>
        </IonSplitPane>
        
        <Route path="/login" component={EntryPoint} exact />
        <Redirect from="/" to="/login" exact />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
