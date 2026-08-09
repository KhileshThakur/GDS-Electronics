import logo from "../../assets/logo/logo.png";

const Logo = ({
    size = 50,
    showText = true,
    className = ""
}) => {

    return (
        <div
            className={`
                flex
                items-center
                gap-2
                sm:gap-3
                min-w-0
                ${className}
            `}
        >

            {/* Logo Image */}

            <img
                src={logo}
                alt="GDS Electronics"
                width={size}
                height={size}
                className="
                    shrink-0
                    object-contain
                "
                style={{
                    width: size,
                    height: size
                }}
            />


            {/* Logo Text */}

            {showText && (

                <div className="
                    min-w-0
                    overflow-hidden
                ">
                    <h2 className="
                        text-base
                        sm:text-xl
                        font-bold
                        leading-tight
                        text-[var(--text)]
                        truncate
                    ">
                        GDS Electronics
                    </h2>

                    <p className="
                        hidden
                        sm:block
                        mt-0.5
                        text-xs
                        sm:text-sm
                        leading-tight
                        text-[var(--text-light)]
                        truncate
                    ">
                        Inventory & E-Commerce
                    </p>
                </div>
            )}
        </div>
    );
};

export default Logo;