import { useContext, createContext, useEffect, useState } from 'react';
import {GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged, GithubAuthProvider} from 'firebase/auth';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { addGoogleUser } from '../store/actions';


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

	const [user, setUser] = useState(null);

	const dispatch = useDispatch();
	
	const googleSignIn = () => {
		const google = new GoogleAuthProvider();
		// si no tengo id entonces hace el pop up
		signInWithPopup(auth, google);
	};

	const gitHubSignIn = () => {	
		const github = new GithubAuthProvider()
		signInWithPopup(auth, github);
	}

	const logOut = () => {
		signOut(auth);
	};
	//cada vez q user sea distinto de null despachar accion
	if(user !== null) { 
		dispatch(addGoogleUser(user))
	}

	
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	});

	

	return (
		<AuthContext.Provider value={{ googleSignIn, logOut, user, gitHubSignIn }}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};

