import Container from "../ui/Container";

const Footer = () => {

    return (

        <footer className="
            mt-auto

            border-t
            border-white/10

            bg-[var(--sidebar)]
            text-white
        ">

            <Container>

                <div className="
                    min-h-[140px]

                    py-8
                    sm:py-10

                    flex
                    flex-col
                    items-center
                    justify-center

                    gap-3
                ">

                    {/* Brand */}

                    <div className="
                        text-center
                    ">

                        <h2 className="
                            text-base
                            sm:text-lg

                            font-bold

                            tracking-tight
                        ">
                            GDS Electronics
                        </h2>

                        <p className="
                            mt-1

                            text-xs
                            sm:text-sm

                            text-white/60
                        ">
                            Inventory & E-Commerce
                        </p>

                    </div>


                    {/* Divider */}

                    <div className="
                        w-12
                        h-px

                        bg-white/15
                    " />


                    {/* Copyright */}

                    <p className="
                        text-[11px]
                        sm:text-xs

                        text-white/50

                        text-center
                    ">
                        © 2026 GDS Electronics. All rights reserved.
                    </p>

                </div>

            </Container>

        </footer>

    );

};

export default Footer;