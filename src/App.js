import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "fa09720a41a4f39c3a1537dacbc76fc1";

class App extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    };

    getWeather = async e => {
        e.preventDefault();
        const CITY = e.target.elements.city.value;
        const COUNTRY = e.target.elements.country.value;
        if (CITY && COUNTRY) {
            const API_CALL = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&appid=${API_KEY}&units=metric`
            );
            const DATA = await API_CALL.json();

            console.log(DATA);
            this.setState({
                temperature: DATA.main.temp,
                city: DATA.name,
                country: DATA.sys.country,
                humidity: DATA.main.humidity,
                description: DATA.weather[0].description,
                error: ""
            });
        } else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please Enter City and Country"
            });
        }
    };

    render() {
        return (
            <div>
                <Titles />
                <Form getWeather={this.getWeather} />
                <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                />
            </div>
        );
    }
}

export default App;
