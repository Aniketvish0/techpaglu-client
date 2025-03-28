import Twitter from "../icons/Twitter"
import { Button } from "./ui/button"

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-bold">
        </div>
        <div className="flex items-center space-x-4">
          <a 
            href="https://x.com/aniketvish0" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Button variant="ghost" className="flex items-center space-x-2 text-black bg-green-500 hover:bg-green-400">
              <Twitter/>
              <span>Aniketvish0</span>
            </Button>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar