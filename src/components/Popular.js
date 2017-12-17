import React from 'react'
import PropTypes from 'prop-types'
import api from '../utils/api'

const SelectLanguage = (props) => {
  const languages = ['All', 'Python', 'JavaScript', 'Java', 'C++', 'Go', 'Ruby', 'HTML']
  return <ul className="languages">
    {languages.map(lang => (
      <li
        style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
        onClick={props.onSelect.bind(null, lang)} 
        key={lang}>
        {lang}
      </li>
    ))}
  </ul>
}

const RepoGrid = (props) => 
  <ul className="popular-list">
    { props.repos.map((repo, index) => (
      <li
        key={repo.name} 
        className="popular-item">
        <div className="popular-rank">#{index + 1}</div>
        <ul className="space-list-items">
          <li>
            <img
              className="avatar"
              src={repo.owner.avatar_url}
              alt={"Avatar for " + repo.owner.login}
            />
          </li>
          <li><a href={repo.html_url}>{repo.name}</a></li>
          <li>@{repo.owner.login}</li>
          <li>{repo.stargazers_count} stars</li>
        </ul>
      </li>
    ))}
  </ul>

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }

  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage (lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null
      }
    })
    api.fetchPopularRepositories(lang)
      .then(list => this.setState(() => {
        return {
          repos: list
        }
      }))

  }

  render () {
    return (
      <div>
        <SelectLanguage 
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage} />
        { !this.state.repos
          ? 'LOADING'
          : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}

export default Popular