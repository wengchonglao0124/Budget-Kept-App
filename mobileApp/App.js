import {AuthenticationProvider} from "./context/authentication";
import MainScreen from "./screens/MainScreen";


export default function App() {
  return (
      <AuthenticationProvider>
        <MainScreen />
      </AuthenticationProvider>
  );
}