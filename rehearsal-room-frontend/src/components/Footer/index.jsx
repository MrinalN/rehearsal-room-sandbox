import gitHubIcon from './githubicon.png'

export default function Footer() {
  return(
    <footer className="footer">
      <div className="footer-section">
        <em>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></em>
      </div>
      <div className="footer-section">
        <em>
          Created by Adele Noronha, Kate Davis, and Paul Ladd for <a href="https://www.lighthouselabs.ca/">Lighthouse Labs</a></em>
        <a href="https://github.com/KateIsabelle/rehearsal-room">
          <img src={gitHubIcon} alt="GitHub"/>
        </a>
      </div>
    </footer>
  )
}