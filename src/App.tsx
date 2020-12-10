import React from 'react';
import { IonApp, IonButton, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';

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
import App404 from './App404/App404';
import EntryPoint from './Authentication/AuthGui';
import Menu from './components/Menu';
import MainPage from './Main/Main';
import { globalVar } from './Global/GlobalVar';


const App: React.FC = () => {
  return (
    <IonApp>
      <widgets.loadSpinner/>
      <IonReactRouter>
        <IonSplitPane contentId="menu">
          <Menu />
          <IonRouterOutlet id="menu">
            <Switch>
              <Route path={globalVar.route.pagePath} component={MainPage} exact />
              <Redirect from="/" to={globalVar.route.login} exact />
            </Switch>
          </IonRouterOutlet>
        </IonSplitPane>
        <Switch>
          <Route path={globalVar.route.login} component={EntryPoint} exact />
          <Route component={App404} />
          <Redirect from="/" to={globalVar.route.login} exact />
        </Switch>
      </IonReactRouter>
      <IonButton hidden id={globalVar.id.toLogin} routerLink={globalVar.route.login}/>
    </IonApp>
  );
};

export default App;
