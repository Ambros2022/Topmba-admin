import { useSpring, animated } from 'react-spring';

const AnimatedCounter2 = () => {

    // Define the animation
    const { number } = useSpring({
        number: 100000,
        from: { number: 0 },
        config: { duration: 5000 },
    });

    return (
        <div>
            <animated.div>{number.to((val) => Math.round(val).toLocaleString() + (val >= 0 ? '+' : ''))}</animated.div>
        </div>
    );
};

export default AnimatedCounter2;