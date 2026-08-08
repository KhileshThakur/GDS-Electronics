import {
    Link
} from "react-router-dom";

import Container from "../../../components/ui/Container";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";

import {
    homeContent
} from "../../../utils/content.home";

import "./HomePage.css";


const HomePage = () => {

    const {
        hero,
        benefits,
        featured,
        promotions,
        newProducts,
        about,
        cta
    } = homeContent;


    return (

        <main className="home-page">


            {/* =================================
                HERO
            ================================= */}

            <section className="home-hero">

                <Container>

                    <div className="home-hero__content">

                        <div className="home-hero__text">

                            <span className="home-section__eyebrow">
                                {hero.eyebrow}
                            </span>


                            <h1>

                                {hero.title}

                                <span>
                                    {hero.highlight}
                                </span>

                            </h1>


                            <p>
                                {hero.description}
                            </p>


                            <div className="home-hero__actions">

                                <Link
                                    to={
                                        hero.primaryAction.path
                                    }
                                >
                                    <Button>
                                        {
                                            hero.primaryAction.label
                                        }
                                    </Button>
                                </Link>


                                <Link
                                    to={
                                        hero.secondaryAction.path
                                    }
                                    className="
                                        home-button-secondary
                                    "
                                >
                                    {
                                        hero.secondaryAction.label
                                    }
                                </Link>

                            </div>

                        </div>


                        {/* Hero Visual */}

                        <div className="home-hero__visual">

                            {hero.image ? (

                                <img
                                    src={hero.image}
                                    alt={
                                        hero.title
                                    }
                                />

                            ) : (

                                <div className="
                                    home-hero__placeholder
                                ">

                                    <span>
                                        GDS
                                    </span>

                                    <strong>
                                        Electronics
                                    </strong>

                                </div>

                            )}

                        </div>

                    </div>

                </Container>

            </section>



            {/* =================================
                BENEFITS
            ================================= */}

            <section className="home-benefits">

                <Container>

                    <div className="home-benefits__grid">

                        {benefits.map(
                            (item) => (

                                <div
                                    key={item.id}
                                    className="
                                        home-benefit
                                    "
                                >

                                    <div className="
                                        home-benefit__icon
                                    ">
                                        {item.icon}
                                    </div>


                                    <div>

                                        <h3>
                                            {item.title}
                                        </h3>

                                        <p>
                                            {
                                                item.description
                                            }
                                        </p>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </Container>

            </section>



            {/* =================================
                FEATURED PRODUCTS
            ================================= */}

            <section className="
                home-section
                home-featured
            ">

                <Container>

                    <div className="
                        home-section__header
                    ">

                        <div>

                            <span className="
                                home-section__eyebrow
                            ">
                                {
                                    featured.eyebrow
                                }
                            </span>


                            <h2>
                                {
                                    featured.title
                                }
                            </h2>


                            <p>
                                {
                                    featured.description
                                }
                            </p>

                        </div>


                        <Link
                            to={
                                featured.action.path
                            }
                            className="
                                home-section__link
                            "
                        >
                            {
                                featured.action.label
                            }
                        </Link>

                    </div>


                    {/* Empty state for now */}

                    <Card className="
                        home-empty
                    ">

                        <div className="
                            home-empty__icon
                        ">
                            ✦
                        </div>

                        <h3>
                            {
                                featured.emptyTitle
                            }
                        </h3>

                        <p>
                            {
                                featured.emptyDescription
                            }
                        </p>

                    </Card>

                </Container>

            </section>



            {/* =================================
                PROMOTIONS
            ================================= */}

            <section className="
                home-section
                home-promotions
            ">

                <Container>

                    <div className="
                        home-section__header
                    ">

                        <div>

                            <span className="
                                home-section__eyebrow
                            ">
                                {
                                    promotions.eyebrow
                                }
                            </span>

                            <h2>
                                {
                                    promotions.title
                                }
                            </h2>

                        </div>

                    </div>


                    <div className="
                        home-promotions__grid
                    ">

                        {promotions.items.map(
                            (item) => (

                                <Card
                                    key={item.id}
                                    className="
                                        home-promo
                                    "
                                >

                                    <div>

                                        <h3>
                                            {
                                                item.title
                                            }
                                        </h3>

                                        <p>
                                            {
                                                item.description
                                            }
                                        </p>

                                    </div>


                                    <Link
                                        to={
                                            item.action.path
                                        }
                                        className="
                                            home-promo__link
                                        "
                                    >
                                        {
                                            item.action.label
                                        }
                                    </Link>

                                </Card>

                            )
                        )}

                    </div>

                </Container>

            </section>



            {/* =================================
                NEW PRODUCTS
            ================================= */}

            <section className="
                home-section
                home-new-products
            ">

                <Container>

                    <div className="
                        home-section__header
                    ">

                        <div>

                            <span className="
                                home-section__eyebrow
                            ">
                                {
                                    newProducts.eyebrow
                                }
                            </span>

                            <h2>
                                {
                                    newProducts.title
                                }
                            </h2>

                            <p>
                                {
                                    newProducts.description
                                }
                            </p>

                        </div>


                        <Link
                            to={
                                newProducts.action.path
                            }
                            className="
                                home-section__link
                            "
                        >
                            {
                                newProducts.action.label
                            }
                        </Link>

                    </div>


                    <Card className="
                        home-empty
                    ">

                        <div className="
                            home-empty__icon
                        ">
                            +
                        </div>

                        <h3>
                            {
                                newProducts.emptyTitle
                            }
                        </h3>

                        <p>
                            {
                                newProducts.emptyDescription
                            }
                        </p>

                    </Card>

                </Container>

            </section>



            {/* =================================
                ABOUT
            ================================= */}

            <section className="
                home-about
            ">

                <Container>

                    <div className="
                        home-about__content
                    ">

                        <div>

                            <span className="
                                home-section__eyebrow
                            ">
                                {
                                    about.eyebrow
                                }
                            </span>


                            <h2>
                                {
                                    about.title
                                }
                            </h2>


                            <p>
                                {
                                    about.description
                                }
                            </p>


                            <Link
                                to={
                                    about.action.path
                                }
                            >
                                <Button>
                                    {
                                        about.action.label
                                    }
                                </Button>
                            </Link>

                        </div>


                        <div className="
                            home-about__points
                        ">

                            {about.points.map(
                                (point) => (

                                    <div
                                        key={point}
                                        className="
                                            home-about__point
                                        "
                                    >

                                        <span>
                                            ✓
                                        </span>

                                        <p>
                                            {point}
                                        </p>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                </Container>

            </section>



            {/* =================================
                CTA
            ================================= */}

            <section className="
                home-cta
            ">

                <Container>

                    <div className="
                        home-cta__content
                    ">

                        <h2>
                            {cta.title}
                        </h2>

                        <p>
                            {cta.description}
                        </p>


                        <Link
                            to={
                                cta.action.path
                            }
                        >
                            <Button variant="secondary">
                                {cta.action.label}
                            </Button>
                        </Link>

                    </div>

                </Container>

            </section>

        </main>

    );

};


export default HomePage;