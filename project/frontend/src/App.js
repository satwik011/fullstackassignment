import "./App.css";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";
import StreamerRoutes from "./routes/StreamerRoutes";

function App() {
  
  return (
    <Provider store={store}>
      <div className="App">
        <StreamerRoutes />
      </div>
    </Provider>
  );
}

export default App;
