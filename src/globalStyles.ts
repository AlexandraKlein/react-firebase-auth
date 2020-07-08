import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
   *, *:before, *:after {
    box-sizing: border-box;
   }
   
   body {
     font-family: 'Roboto Mono', monospace;
     font-weight: 400;
   }
   
   html,
   body {
     position: relative;
     margin: 0;
     border: 0;
     padding: 0;
     width: 100%;
     height: 100%;
   }

   html,
   body,
   #root {
     display: flex;
     flex-direction: column;
     flex-grow: 1;
   }

   input, select, textarea, button {
     font-family: inherit;
     -webkit-appearance: none;
   }
`;

export default GlobalStyle;
