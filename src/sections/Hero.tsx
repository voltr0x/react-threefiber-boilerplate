import { PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import DeskObjectComponent from "../components/DeskObjectComponent"
import { Suspense } from "react"
import CanvasLoader from "../components/CanvasLoader"
import { useMediaQuery } from "react-responsive"
import { calculateSizes } from "../constants"

const Hero = () => {

    const isSmall = useMediaQuery({maxWidth: 440});
    const isMobile = useMediaQuery({maxWidth:768});
    const isTablet = useMediaQuery({minWidth: 768, maxWidth:1024});

    const sizes = calculateSizes(isSmall, isMobile, isTablet);

    return (
        <section className="min-h-screen w-full flex flex-col relative">
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
                <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">Hi, I am Viraj <span className="waving-hand">👋</span></p>
                <p className="hero_tag text-gray_gradient">Building React Portfolio</p>
            </div>

            {/* Rendering using ThreeJS */}
            <div className="w-full h-full absolute inset-0 border-2 border-blue-500">
                {/* All rendering in the canvas - from react fiber library */}
                <Canvas className="w-full h-full">
                    <Suspense fallback={<CanvasLoader/>}>
                        {/* Camera */}
                        <PerspectiveCamera makeDefault position={[0,0,30]}/>
                        {/* Objects to render */}
                        <DeskObjectComponent 
                            scale={!isMobile ? [0.08, 0.08, 0.08] : [0.05, 0.05, 0.05]} 
                            position={[0, -10, 5]}
                            rotation={[0, -Math.PI, 0]}

                            // scale={sizes.deskScale} 
                            // position={sizes.deskPosition}
                            // rotation={[0, -Math.PI, 0]}
                            
                            />
                        {/* Lights */}
                        <ambientLight intensity={1}/>
                        <directionalLight position={[10, 10, 10]} intensity={0.5}/>
                    </Suspense>
                </Canvas>
            </div>

        </section>
    )
}

export default Hero