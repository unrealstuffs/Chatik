import React from "react";

import HomeView from "./views/Home";
import ChatView from "./views/Chat";
import LoginView from "./views/Login";
import RegisterView from "./views/Register";
import SettingsView from "./views/Settings";

import Navbar from "./components/Navbar";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
    return (
        <Router>
            <Navbar />
            <div className="content-wrapper">
                <Switch>
                    <Route path="/settings">
                        <SettingsView />
                    </Route>
                    <Route path="/chat/:id">
                        <ChatView />
                    </Route>
                    <Route path="/login">
                        <LoginView />
                    </Route>
                    <Route path="/register">
                        <RegisterView />
                    </Route>
                    <Route path="/">
                        <HomeView />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
