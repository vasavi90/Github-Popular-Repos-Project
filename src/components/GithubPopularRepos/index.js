import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants[0].initial,
    resultData: [],
    activeId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getDataFromServer()
  }

  getDataFromServer = async () => {
    const {activeId} = this.state

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(url)

    const data = await response.json()

    if (response.ok === true) {
      const formattedData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        resultData: formattedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  idChanged = id => {
    this.setState({
      activeId: id,
    })
  }

  renderSuccessView = () => {
    const {resultData} = this.state

    return (
      <ul className="repository-container">
        {resultData.map(eachItem => (
          <RepositoryItem key={eachItem.id} details={eachItem} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="error-text">Something Went Wrong</p>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSpecificView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state
    return (
      <div className="app-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="language-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              isActive={activeId === eachLanguage.id}
              details={eachLanguage}
              idChanged={this.idChanged}
            />
          ))}
        </ul>

        {this.renderSpecificView()}
      </div>
    )
  }
}

export default GithubPopularRepos
