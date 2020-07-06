import React from 'react'

export default class ContentPage extends React.Component {
    constructor () {
        super()
        this.state = {
            content: {}
        }
    }

    backToMainPage (contentId) {
        this.props.history.push('/')
    }

    componentDidMount () {
        fetch(`http://localhost:3000/content/${this.props.match.params.contentId}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ content: data.content })
            })
            .catch(console.log)
    }

    render () {
        const backgroundImage = { backgroundImage: `url(${this.state.content.BackgroundUrl || ''}` }
        return (
            <div className="contentpage-container">
                <button className="btn btn-lg btn-primary" onClick={() => this.backToMainPage()}>Back</button>
                <div className="contentpage-banner" style={backgroundImage}></div>
                <p>Name: {this.state.content.Name}</p>
                <p>ProductionYear: {this.state.content.ProductionYear}</p>
                <p>Description: {this.state.content.Abstract}</p>
                <p>Age Rating: {this.state.content.AgeRating}</p>
                <p>Cast: {this.state.content.Cast}</p>
                <p>Category: {this.state.content.Category}</p>
                <p>Director: {this.state.content.Director}</p>

            </div>
        )
    }
}
