import Container from "../ui/Container";

import contact from "../../utils/contact";


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
                    py-10
                    sm:py-12
                    lg:py-14
                ">


                    {/* =================================
                        Main Footer
                    ================================= */}

                    <div className="
                        grid
                        grid-cols-1

                        sm:grid-cols-2
                        lg:grid-cols-3

                        gap-8
                        lg:gap-12
                    ">


                        {/* =================================
                            Brand
                        ================================= */}

                        <div>

                            <div className="
                                inline-flex
                                flex-col
                            ">

                                <h2 className="
                                    text-xl
                                    sm:text-2xl

                                    font-bold

                                    tracking-tight
                                ">
                                    {contact.brand.name}
                                </h2>


                                <span className="
                                    mt-1

                                    h-1
                                    w-10

                                    rounded-full

                                    bg-[var(--secondary)]"
                                />

                            </div>


                            <p className="
                                mt-4

                                max-w-sm

                                text-sm
                                sm:text-[15px]

                                leading-6

                                text-white/60
                            ">
                                {contact.brand.tagline}
                            </p>

                        </div>


                        {/* =================================
                            Contact
                        ================================= */}

                        <div>

                            <p className="
                                text-xs

                                font-semibold

                                uppercase
                                tracking-[0.12em]

                                text-[var(--secondary)]
                            ">
                                Contact
                            </p>


                            <h3 className="
                                mt-2

                                text-lg

                                font-semibold
                            ">
                                Get in touch
                            </h3>


                            <div className="
                                mt-4

                                flex
                                flex-col

                                gap-3
                            ">


                                {/* Email */}

                                <a
                                    href={
                                        contact.links.email
                                    }

                                    className="
                                        group

                                        flex
                                        items-center

                                        gap-3

                                        text-sm

                                        text-white/65

                                        transition-colors
                                        duration-200

                                        hover:text-[var(--secondary)]
                                    "
                                >

                                    <span className="
                                        w-8
                                        h-8

                                        shrink-0

                                        flex
                                        items-center
                                        justify-center

                                        rounded-lg

                                        bg-white/5

                                        text-[var(--secondary)]"
                                    >
                                        @
                                    </span>


                                    <span className="
                                        break-all
                                    ">
                                        {
                                            contact.contact.email
                                        }
                                    </span>

                                </a>


                                {/* Phone */}

                                <a
                                    href={
                                        contact.links.phone
                                    }

                                    className="
                                        group

                                        flex
                                        items-center

                                        gap-3

                                        text-sm

                                        text-white/65

                                        transition-colors
                                        duration-200

                                        hover:text-[var(--secondary)]
                                    "
                                >

                                    <span className="
                                        w-8
                                        h-8

                                        shrink-0

                                        flex
                                        items-center
                                        justify-center

                                        rounded-lg

                                        bg-white/5

                                        text-[var(--secondary)]
                                    ">
                                        ☎
                                    </span>


                                    <span>
                                        {
                                            contact.contact.phone
                                        }
                                    </span>

                                </a>

                            </div>

                        </div>


                        {/* =================================
                            Address
                        ================================= */}

                        <div>

                            <p className="
                                text-xs

                                font-semibold

                                uppercase
                                tracking-[0.12em]

                                text-[var(--secondary)]
                            ">
                                Visit Us
                            </p>


                            <h3 className="
                                mt-2

                                text-lg

                                font-semibold
                            ">
                                Our Location
                            </h3>


                            <div className="
                                mt-4

                                flex
                                items-start

                                gap-3
                            ">

                                <span className="
                                    w-8
                                    h-8

                                    shrink-0

                                    flex
                                    items-center
                                    justify-center

                                    rounded-lg

                                    bg-white/5

                                    text-[var(--secondary)]
                                ">
                                    ●
                                </span>


                                <div className="
                                    text-sm

                                    leading-6

                                    text-white/60
                                ">

                                    <p>
                                        {
                                            contact.address.line1
                                        }
                                    </p>

                                    <p>
                                        {
                                            contact.address.line2
                                        }
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        Divider
                    ================================= */}

                    <div className="
                        mt-10
                        sm:mt-12

                        h-px
                        w-full

                        bg-white/10
                    " />


                    {/* =================================
                        Bottom
                    ================================= */}

                    <div className="
                        pt-5
                        sm:pt-6

                        flex
                        flex-col
                        sm:flex-row

                        items-center
                        justify-between

                        gap-3
                    ">

                        <p className="
                            text-xs
                            sm:text-sm

                            text-white/40

                            text-center
                            sm:text-left
                        ">
                            {contact.copyright}
                        </p>


                        <p className="
                            text-xs

                            text-white/35
                        ">
                            Built with care by GDS Electronics
                        </p>

                    </div>

                </div>

            </Container>

        </footer>

    );

};


export default Footer;