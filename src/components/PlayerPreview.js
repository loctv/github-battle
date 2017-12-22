import React from 'react'
import PropTypes from 'prop-types'
import IronImage from './lib/IronImage'
import placeHolder from './placeholder150x150.jpg'

const PlayerPreview = (props) => (
  <div>
    <div className="column">
      <div className="avatar">
        <IronImage
          srcLoaded={props.image}
          srcPreload={placeHolder}
          alt={'Avatar for ' + props.username}
        />
      </div>
      <h2 className="username">@{props.username}</h2>
    </div>
    {props.children}
  </div>
)

PlayerPreview.propTypes = {
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

export default PlayerPreview