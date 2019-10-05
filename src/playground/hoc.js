// Higher order component

/**
 * Component (HOC) that renders another component
 * Reuse code
 * Render hijacking
 * Prop manipulation
 * Abstract state
 */

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
	<div>
		<h1>Info:</h1>
		<p>The info is: {props.info}</p>
	</div>
);

const withAdminWarning = (WrappedComponent) => {
	return (props) => (
		<div>
			{
				props.isAdmin && <p>This is private data.</p>
			}
			<WrappedComponent {...props} />
			
		</div>
	);
};
//Using spread op on props, takes every key-value pairs of props and pass them as props

// requireAuthentication
const requireAuthentication = (WrappedComponent) => {
	return (props) => (
		<div>
			{
				props.isAuthenticated ? (<WrappedComponent {...props} />) : (<p>Please authenticate first.</p>)
			}
		</div>
	);
};

const AdminInfo = withAdminWarning(Info);

const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={false} info="This is the detail" />, document.getElementById('app'))
ReactDOM.render(<AuthInfo isAuthenticated={false} info="This is the detail" />, document.getElementById('app'))