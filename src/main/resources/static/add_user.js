'use strict';

const e = React.createElement;

class Test extends React.Component {
    render() {
        return e('p', {}, 'Made from scratch with resentment');
    }
}

const domContainer = document.querySelector('#user_form');
const root = ReactDOM.createRoot(domContainer);
root.render(e(Test));