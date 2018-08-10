import adalContext from 'adal-angular/lib/adal.js';

window.AuthenticationContext = adalContext;

// Stubs JSON.stringify in order not ot have circular error parsing while logging 
import 'imports-loader?JSON=>{ stringify: function() { } }!adal-angular/lib/adal-angular';

export default 'AdalAngular';