import React from 'react';
import { Helmet } from 'react-helmet-async';
import { GlobalStyle } from './styles/GlobalStyle';
import ToDoList from './ToDoList';

function App() {
  return (
    <>      
      <Helmet>
        {/*<!--글꼴-->*/}
        <link
          type="text/css"
          media="screen"
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&family=Source+Sans+Pro:wght@300&display=swap"
        />
      </Helmet>
      <GlobalStyle />
      <ToDoList />
    </>
  );
}

export default App;
