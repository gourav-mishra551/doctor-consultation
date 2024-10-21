import TopHeader from "../Components/TopHeader"
import Navbar from "../Components/Navbar"
import Headers from "../Components/Headers"
import Footer from "../Components/Footer"
const Home = () => {
  return (
    <div>
      <header className="App-header">
        <TopHeader />
        <Navbar />
        <Headers />
        <div className="mt-20">
          <Footer />
        </div>
      </header>
    </div>
  )
}

export default Home