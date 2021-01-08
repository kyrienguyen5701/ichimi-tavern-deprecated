import './App.scss';
import React, {useEffect} from 'react';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import './App.scss';

// TODO: Fix non-stop random functions
function App() {

    useEffect(() => {
        const loadingScreen = document.querySelector(".loader-container");
        if (loadingScreen) {
            loadingScreen.classList.add('available');
            setTimeout(() => {loadingScreen.outerHTML = ''}, 1000);
        }
    }, [])

    return (
            <div id="app">
                <NavBar />
                <Footer />
            </div>
    )
}

export default App;
