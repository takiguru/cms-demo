import React from 'react'

export default class ContentElement extends React.Component {
    openContentPage (contentId) {
        this.props.history.push(`/${contentId}`)
    }

    render () {
        const backgroundImage = { backgroundImage: `url(${this.props.content.BackgroundUrl}` }
        return (
            <div className="content" style={backgroundImage} onClick={() => this.openContentPage(this.props.content.Id)}>
                <div className="content-footer">
                    <div className="content-info">
                        <p className="content-text content-name">{`${this.props.content.Name}`}</p>
                        <p className="content-text">{`${this.props.content.ProductionYear} | ${this.props.content.Genre} | ${this.props.content.AgeRating}`}</p>

                    </div>
                    <div className="content-buttons">
                        <button className="btn btn-default btn-danger" onClick={() => this.removeContent}>Delete</button>
                        <button className="btn btn-default btn-warning">Edit</button>
                    </div>
                </div>
            </div>
        )
    }
}
