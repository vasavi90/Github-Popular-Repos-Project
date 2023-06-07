// Write your code here

const LanguageFilterItem = props => {
  const {isActive, details, idChanged} = props

  const {id, language} = details

  const buttonStyle = isActive ? 'active' : 'non-active'

  const buttonClick = () => {
    idChanged(id)
  }

  return (
    <li className="each-language">
      <button
        type="button"
        className={`button ${buttonStyle}`}
        onClick={buttonClick}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
