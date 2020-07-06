import React from 'react'
import ContentElement from '../component/content-element'
import { useHistory } from 'react-router-dom'

export default class App extends React.Component {
    constructor () {
        super()
        this.state = {
            contents: {}
        }
    }

    updateContentList () {
        fetch('http://localhost:3000/content')
            .then(res => res.json())
            .then((data) => {
                this.setState({ contents: data.contents })
            })
            .catch(console.log)
    }

    componentDidMount () {
        this.updateContentList()
    }

    render () {
        const items = []
        Object.keys(this.state.contents).forEach(key => {
            const content = this.state.contents[key]
            items.push(<ContentElement key={key} content={content} history={this.props.history}/>)
        })
        return (
            <div className="content-container">
                <h1>CMS Demo Site</h1>
                <button className="btn btn-lg btn-success">Add Content</button>
                {items}
            </div>
        )
    }
}
