
export default function Footer({featuresHandleClick,homeHandlClick}){
    return (
        <footer className="bg-gray-500 rounded-3xl md:mt-28 mt-12 mx-6 mb-6 p-6 animate-opacity">
        <div className="container max-w-7xl mx-auto sm:flex-col md:flex-row flex-col flex items-center justify-between gap-y-3 md:gap-y-0">
          <div className="gap-x-8 flex">
          <span  className="transition-all text-lg text-gray-300 hover:text-white cursor-pointer select-none" onClick={homeHandlClick}>Home</span>
          <span  className="transition-all text-lg text-gray-300 hover:text-white cursor-pointer select-none" onClick={featuresHandleClick}>Features</span>
          </div>

          <p className="text-gray-200 text-center">© 2022 imgminify.co. All rights reserved.</p>
        </div>
      </footer>
    )
}