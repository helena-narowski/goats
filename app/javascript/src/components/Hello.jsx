import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function Hello() {
  return (
    <div>
      <Button variant="contained">Hello World</Button>
    </div>
  );
}

// Use it if you don't plan to use "remount"
// document.addEventListener('DOMContentLoaded', () => {
// ReactDOM.render(<Hello />, document.getElementById('hello'))
// })

export default Hello;
