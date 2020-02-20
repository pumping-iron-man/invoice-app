import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App/App';

import ContextStore from './components/Context/ContextStore'

const app = <ContextStore>
                <App />
            </ContextStore>

ReactDOM.render(app, document.getElementById('root'));