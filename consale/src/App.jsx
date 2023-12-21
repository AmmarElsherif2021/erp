import React, { useEffect, useState } from 'react';
import { createBrowserRouter, Route, Navigate ,Router} from 'react-router-dom';
import Login from './routes/Login/Login';
import Start from './routes/Start/Start';
import Dashboard from './routes/Dashboard/Dasboard';
import { UserProvider, useUser} from './userContext'; // Import only UserProvider
import { RouterProvider } from 'react-router-dom';

const Routes=()=>{
  const {user,setUser} = useUser();
  useEffect(() => {
    user?console.log(user.isLogged):console.log('there is no user');
  }, [user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Start/>,
      children:[
        {
          path: "Login",
          element: <Login/>,
        },
        {
          path: "Dashboard",
          element: user && user.isLogged ? <Dashboard /> : <Navigate to="/Login" />
        }
      ]}])
      return(
        <RouterProvider router={router} />
      )
}
const App = () => {
  
        
  return(
    <UserProvider>
      <Routes/>
    </UserProvider>
  )
};

export default App;




/*
const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
    <h1>Welcome to Tauri!</h1>

    <div className="row">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" className="logo vite" alt="Vite logo" />
      </a>
      <a href="https://tauri.app" target="_blank">
        <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
      </a>
      <a href="https://reactjs.org" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>

    <p>Click on the Tauri, Vite, and React logos to learn more.</p>

    <form
      className="row"
      onSubmit={(e) => {
        e.preventDefault();
        greet();
      }}
    >
      <input
        id="greet-input"
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="Enter a name..."
      />
      <button type="submit">Greet</button>
    </form>

    <p>{greetMsg}</p>
    </div>
  );
*/
