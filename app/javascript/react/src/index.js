import { define } from 'remount';
import Hello from './components/Hello';
import Home from './components/Home/Home';

define({ 'hello-component': Hello });
define({ 'home-component': Home });
