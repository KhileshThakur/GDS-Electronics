import logo from "../../assets/logo/logo.png";

const Logo = ({
    size = 50,
    showText = true
}) => {
    return (

        <div className="flex items-center gap-3">
            <img
                src={logo}
                alt="GDS Electronics"
                style={{
                    width: size,
                    height: size,
                    objectFit: "contain"
                }}
            />

            {showText && (

                <div>
                    <h2 className="text-xl font-bold text-[var(--text)]">
                        GDS Electronics
                    </h2>

                    <p className="text-sm text-[var(--text-light)]">
                        Inventory & E-Commerce
                    </p>
                </div>
            )}
        </div>
    );
};

export default Logo;