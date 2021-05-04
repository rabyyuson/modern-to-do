import './index.scss'

const Footer = () => {
  const today = new Date()
  
  return (
    <div className="Footer">
      <a href="https://rabyyuson.dev/">{today.getFullYear()}. Raby Yuson.</a>
    </div>
  )
}

export default Footer
