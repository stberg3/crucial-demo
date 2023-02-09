import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  useLoaderData,
} from "react-router-dom";

const User = () => {

	let user = useLoaderData();
	let userObj = JSON.parse(user)
	console.log(userObj.id)

	return(
	  <div>
	      <h1>{userObj.name}</h1>
	      <p><strong>id:</strong> {userObj.id}</p>
	      <p><strong>shoeSize:</strong> {userObj.shoeSize}</p>
	      <p><strong>birthdate:</strong> {userObj.birthdate}</p>
	  </div>
	);
};

export default User;