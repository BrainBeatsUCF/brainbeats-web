import * as React from 'react';
import {
    Route, 
    Redirect,
    RouteProps,
    RouteComponentProps
} from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
// Would reccommend this comes from a global state manager
// such as redux, shown using basic props here
}

export class PrivateRoute extends Route<PrivateRouteProps> {
  
  render() {
      console.log("isAuthenticated in PrivateRoute: " + this.props.isAuthenticated);
      return (
          <Route render={(props: RouteComponentProps) => {
              if(!this.props.isAuthenticated) {
                  return <Redirect to='/login' />
              } 

              if(this.props.component) {
                  return React.createElement(this.props.component);
              } 

              if(this.props.render) {
                  return this.props.render(props);
              }
          }} />
      );
  }
}