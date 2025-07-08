import "./App.scss";
import AllUrls from "./components/AllUrls/AllUrls";
import LogWindow from "./components/LogWindow/LogWindow";
import MainForm from "./components/MainForm/MainForm";

function App() {
    return (
        <main className="app">
            <h1 className="main-title">
                Make it short<sup>TM</sup>
            </h1>
            <MainForm />
            <section className="main-logs">
                <AllUrls />
                <LogWindow />
            </section>
        </main>
    );
}

export default App;
