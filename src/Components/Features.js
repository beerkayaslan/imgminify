import { forwardRef } from 'react';
import BeforeAfterSlider from 'react-before-after-slider';
import BeforeImg from '../Images/before.jpg';
import AfterImg from '../Images/after.jpg';
import DotImg from '../Images/dots.svg';
import WorkImg1 from '../Images/work-01.svg';
import WorkImg2 from '../Images/work-02.svg';
import WorkImg3 from '../Images/work-03.svg';


const Features = forwardRef((props,ref) => {
    return (
        <>
            <div className="container max-w-7xl mt-10 mx-auto flex items-center justify-between animate-opacity sm:flex-col md:flex-row flex-col px-6 md:px-0 md:mb-48 mb-10" ref={ref}>
                <div>
                    <div className="flex mb-11 flex-col md:flex-row">
                        <h3 className="text-4xl font-semibold text-[#0a033c] cards-text-1 mb-4 mr-10">Features</h3>
                        <p className="text-[#0a033ccc] text-lg cards-text-2">Drag. Drop. Compress. File type supported: JPEG PNG SVG GIF WEBP. Reduce the file size of your images by compressing them without losing any quality.</p>
                    </div>
                    <div className="line-border"></div>
                </div>
                <div className="graph-block md:block hidden">
                    <div className="rounded-lg overflow-hidden">
                        <BeforeAfterSlider
                            before={BeforeImg}
                            width={540}
                            height={330}
                            className={"before-after-slider"}
                        />
                        <div className="flex items-center">
                            <div className="bg-gray-500 text-white flex-1 p-3 flex items-center">Size Before: 700KB</div>
                            <div className="bg-[#f83e32] p-3  text-white">After: 250KB</div>
                        </div>
                    </div>
                    <div className="processes-bg-wrap">
                        <img src={DotImg} />
                    </div>
                </div>
            </div>
            <div className="container max-w-7xl md:grid-cols-3 sm:grid-cols-1 gap-y-10 md:gap-y-0 mx-auto grid  gap-x-10 animate-opacity px-6 md:px-0">
                <div className="bg-white flex items-center justify-center flex-col px-8 py-12 text-center rounded-3xl shadow-xl">
                    <div className="bg-[#4c4e8e] w-20 h-20 flex justify-center items-center rounded-lg mb-10">
                        <img src={WorkImg1} />
                    </div>
                    <h3 className="mb-6 text-xl text-[#0a033c]">Smaller images, Faster websites</h3>
                    <p className="text-[#0a033ccc] text-lg">
                        Websites images are usually too big and unoptimized for web purposes. It is easy to save a few megabytes by compressing your assets without noticing any loss in quality.
                    </p>
                </div>
                <div className="bg-white flex items-center  flex-col px-8 py-12 text-center rounded-3xl shadow-xl">
                    <div className="bg-[#4c4e8e] w-20 h-20 flex justify-center items-center rounded-lg mb-10">
                        <img src={WorkImg2} />
                    </div>
                    <h3 className="mb-6 text-xl text-[#0a033c]">SEO and Lighthouse optimized</h3>
                    <p className="text-[#0a033ccc]  text-lg ">
                        Compress your images and improve your SEO ranking. Get a higher Lighthouse score and increase your visibility in search engines.
                    </p>
                </div>
                <div className="bg-white flex items-center  flex-col px-8 py-12 text-center rounded-3xl shadow-xl">
                    <div className="bg-[#4c4e8e] w-20 h-20 flex justify-center items-center rounded-lg mb-10">
                        <img src={WorkImg3} />
                    </div>
                    <h3 className="mb-6 text-xl text-[#0a033c]">High quality image compression</h3>
                    <p className="text-[#0a033ccc] text-lg">
                        Imgminify.co can help you reduce drastically the size of your images and photos whilst maintaining a high quality with almost no difference visible to the eye.
                    </p>
                </div>
            </div>
        </>
    )
})

export default Features;