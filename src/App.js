import logo from './logo.svg';
import './App.css';
import { MemoryRouter, Route, Switch, useParams, withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// No hagas esto de declarar muchos componentes en el mismo fichero,
// te lo hago así para que no te vuelvas loco y lo veas todo de una
// Pero cada componente en un fichero distinto

// Ejemplo de componente que siemplemente tiene enlaces a las distintas urls de tu web
const Nav = () => (
  <nav>
    <Link to="/">Go to Home Link</Link>
    <Link to="/about">Go to About Link</Link>
    <Link to={() => `/contact/${Math.random()}`}>Go to Contact Link</Link>
  </nav>
)

// Desde el componente Nav de arriba no puedes acceder a las props de la ruta ya que
// No se renderiza dentro del componente Route que tienes en el Switch de App
// Si te pasa esto y necesitas acceder a dichas rutas para navegar desde un botón
// puedes usar el hook withRouter
const NavRoute = (props) => (
  <nav>
    <button 
      onClick={() => props.history.push("/")}
    >
      Go to Home with a Button
    </button>
    <button 
      onClick={() => props.history.push("/about")}
    >
      Go to About with a Button
    </button>
    <button 
      onClick={() => props.history.push(`/contact/${Math.random()}`)}
    >
      Go to Contact with a Button
    </button>
  </nav>
)
const NavWithRoute = withRouter(NavRoute);

const Home = () => (
  <h1>Home</h1>
);

// Desde los componentes que se renderizan dentro una "ruta" no hace falta
// que utilices el hook de withRouter ya que por defecto vas a tener acceso a las props de ruta
const About = (props) => (
  <>
    <h1>About</h1>
    <Link to="/">Go to Home Link</Link>
    <button 
      onClick={() => props.history.push("/")}
    >
      Go to Home with a Button
    </button>
  </>
);

const Contact = () => {
  let { randomParam } = useParams();
  return (
  <>
    <h1>Contact</h1>
    <p>Hola soy una ruta con un parámetro, el valor actual de mi parametro es:</p>
    <p>{randomParam}</p>
  </>
)};



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <MemoryRouter>
        <Nav />
        <NavWithRoute />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact/:randomParam" component={Contact} />
        </Switch>
      </MemoryRouter>
    </div>
  );
}

export default App;
