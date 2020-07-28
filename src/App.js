import React from 'react';
import {
  CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import './scss/style.scss';

function App() {
  return (
    <div className="App">
      <CIcon name="cil-list" size="2xl" />
      <CButton size="sm" className="btn-facebook btn-brand mr-1 mb-1"><CIcon name="cib-facebook" /><span>Facebook</span></CButton>
      <h1>{ process.env.HI }</h1>
    </div>
  );
}

export default App;
