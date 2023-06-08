// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {details} = props

  const {name, issuesCount, forksCount, starsCount, avatarUrl} = details

  return (
    <li className="each-repository">
      <img src={avatarUrl} alt={name} className="image" />
      <p className="name">{name}</p>
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="img"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="img"
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="img"
        />
        <p className="count">{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
