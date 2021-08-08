import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    typography: {
        useNextVariant: true,
        fontFamily: "Noto Sans KR"
    }
})

ReactDOM.render(<MuiThemeProvider theme={theme} ><App /></MuiThemeProvider>, document.getElementById('app'));