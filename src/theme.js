import { createGlobalStyle } from "styled-components";

export const theme = {
  primary: "#ffcd11",
  secondary: "#313945",
  grey: "#ebedef",
  boxShadow: "0 10px 10px rgba(0, 0, 0, 0.08)",
  transition: "all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1)",
};

// "#313945",

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 14px;
  }
  *, *:before, *:after{
    box-sizing: border-box;    
  }
  body {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    line-height: 2;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #ebedef;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  li a {
    color: ${theme.primary};
  }
  a {
    text-decoration: none;
  }
  ul {
    margin: 0;
    padding: 0;
}
ul.pagination-ul {
    display: flex;
    margin: 2px 0;
    white-space: nowrap;
    justify-content: flex-end;
}
.icons {
  margin-right: 10px;
}

.MuiCircularProgress-root {
  margin: 10px auto !important;
}
.MuiOutlinedInput-input {
    padding: 15.5px 14px !important;
}
.MuiInputLabel-outlined {
  z-index: 0 !important;
}
.logoutButton {
  cursor: pointer;
  margin-right: 0 !important;
}
.makeStyles-paper-1 span {
  cursor: pointer;
}
.MuiSelect-select.MuiSelect-select {
    min-width: 100px !important;
}
.leaflet-container {
  height: calc(100vh - 150px);
}
  `;


