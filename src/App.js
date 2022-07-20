import { DataStore, Predicates } from '@aws-amplify/datastore';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useEffect, useState } from 'react';
import './App.css';
import { Countdown } from './models';

function App({signOut, user}) {

  const [countdowns, setCountdowns] = useState([]);

  const [newCountdownName, setNewCountdownName] = useState("");
  const [newCountdownEndDate, setNewCountdownEndDate] = useState("");

  useEffect(() => {
    const subscription = DataStore.observeQuery(Countdown).subscribe(snapshot => {
      const { items } = snapshot;
      setCountdowns(items);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <p>Welcome, {user.attributes.name}</p>
      <h1>Edit countdowns</h1>
      <form onSubmit={async (e) => {
        e.preventDefault();

        if (newCountdownName) {

          await DataStore.save(
            new Countdown({
              "end_date": newCountdownEndDate,
              "name": newCountdownName
            })
          );
          setNewCountdownName("");
          setNewCountdownEndDate("");
        }
      }}>
        <input type="text" value={newCountdownName} onChange={(e) => setNewCountdownName(e.target.value)} />
        <input type="datetime-local" value={newCountdownEndDate} onChange={(e) => setNewCountdownEndDate(e.target.value)} />

        <button type="submit">Add countdown</button>
      </form>

      <button onClick={async () => {
        DataStore.delete(Countdown, Predicates.ALL);
      }}>Delete all countdowns</button>

      <h1>Auto refreshed countdowns</h1>
      {countdowns.length <= 0
        ? <p>No countdowns</p>
        : <>
          <p>{countdowns.length} countdowns</p>
          <ul style={{ listStyle: 'none', paddingInlineStart: 0 }}>
            {countdowns.map(countdown => <li key={countdown.id}>{countdown.name} @ {countdown.end_date}</li>)}
          </ul>
        </>
      }

      <button type="button" onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default withAuthenticator(App);
