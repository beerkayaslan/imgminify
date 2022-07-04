import { BsGithub } from 'react-icons/bs';

export default function Header({featuresHandleClick}){
    return (
        <header className="container max-w-7xl mx-auto pt-16 flex justify-between items-center animate-opacity px-10 md:px-4" >
            <nav className="flex gap-x-16">
            <span class="transition-all text-lg text-gray-300 hover:text-white cursor-pointer select-none">Home</span>
                <span className="transition-all text-lg text-gray-300 hover:text-white cursor-pointer select-none" onClick={featuresHandleClick}>Features</span>
            </nav>
            <div>
                <a className="text-gray-100 rounded-full block" target="_blank" rel="noreferrer noopener" href="https://github.com/beerkayaslan"><BsGithub size={32} /></a>
            </div>
        </header>
    )
}