import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from "./Components/Rank/Rank";
import "./App.css";


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                password: '',
                entries: 0,
                joined: ''
            }
        }
        this.initialState = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                password: '',
                entries: 0,
                joined: ''
            }
        }
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                password: data.password,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value })

    }

    onSubmit = () => {
        this.setState({ imageUrl: this.state.input })

        fetch('http://localhost:3000/imageurl', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count.entries }))
                        })
                        .catch(console.log)
                    this.displayFaceBox(this.calculateFaceLocation(data))
                }
            })
    }



    calculateFaceLocation = (data) => {
        const Face = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: Face.left_col * width,
            topRow: Face.top_row * height,
            rightCol: width - (Face.right_col * width),
            bottomRow: height - (Face.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({ box: box })
    }

    onRouteChange = (route) => {
        if (route === 'signin') {
            this.setState(this.initialState)
        } else if (route === "home") {
            this.setState({ isSignedIn: true })
        }
        this.setState({ route: route })
    }

    render() {
        const { isSignedIn, imageUrl, route, box, user } = this.state
        return (
            <div className='App'>
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
                {route === "home"
                    ? <div>
                        <Logo />
                        <Rank name={user.name} entries={user.entries} />
                        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
                        <FaceRecognition box={box} imageUrl={imageUrl} />
                    </div>
                    : (
                        route === "signin"
                            ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                    )
                }
            </div>
        )
    }
}

export default App;