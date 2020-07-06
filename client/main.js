import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'

import MainPage from './page/main-page'
import ContentPage from './page/content-page'

const container = document.querySelector('#root')

const App = () => (
    <HashRouter>
        <Route exact path="/" component={MainPage} />
        <Route path="/:contentId" component={ContentPage} />
    </HashRouter>
)

ReactDOM.render(<App />, container)
