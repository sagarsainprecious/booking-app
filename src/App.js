import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Testimonial from "./Components/Testimonial";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import EventForm from "./Components/EventForm";

function App() {
  return (
    <div className="App">
      <Home />
      <section id="about">
      <About />
      </section>
      <section style={{ marginTop: '10%'}} id="booking">
      <EventForm />
      </section>
      <Work />
      <section id="testimonial">
      <Testimonial />
      </section>
      <section id="contact">
      <Contact />
      </section>
      <Footer />
    </div>
  );
}

export default App;
