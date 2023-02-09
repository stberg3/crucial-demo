import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  useLoaderData,
} from "react-router-dom";

const User = () => {

	let user = useLoaderData();
	console.log(user)
	console.log(user['id'])

	return(
	  <div>
	      <h1>User</h1>
	      <pre>{user}</pre>
	  </div>
	);
};

export default User;