import './index.html';
import './index.css';
import { setGA , setDesktopIcon } from './components/ga/ga';
import dva from 'dva';
import './utils/Intl.min.js';

// 1. Initialize
const app = dva();

// 2. Plugins
//app.use({});
setGA();
setDesktopIcon();

// 3. Model
//app.model(require('./models/example'));
//app.model(require('./models/loginmodel'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
