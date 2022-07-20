import { Auth } from '@aws-amplify/auth';
import { useEffect, useState } from 'react';

function Login() {
    const [currentUser, setCurrentUser] = useState();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        async function getCurrentUserInfo() {
            const info = await Auth.currentUserInfo();
            return info;
        }

        getCurrentUserInfo().then(info => setCurrentUser(info));
    }, []);

    return <div>
        <h1>User</h1>
        <p>Status: {JSON.stringify(currentUser)}</p>

        {currentUser == null && <form onSubmit={async (e) => {
            e.preventDefault();

            const user = await Auth.signIn(email, password);

            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                Auth.completeNewPassword(
                    user,               // the Cognito User Object
                    "Password12345!",       // the new password
                    // OPTIONAL, the required attributes
                    {
                        name: 'Kimberly Dauber'
                    }
                ).then(user => {
                    // at this time the user is logged in if no MFA required
                    console.log(user);
                }).catch(e => {
                    console.log(e);
                });
            }

            console.log(user);
            setEmail("");
            setPassword("");
        }}>
            <label>
                Email
                <input id="login-email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>

            <button type="submit">Log In</button>
        </form>}

        {currentUser != null && <form onSubmit={async (e) => {
            e.preventDefault();

            await Auth.signOut();
        }}>
            <button type="submit">Log Out</button>
        </form>}

    </div>
}

export default Login;
