import Logo from "./Logo";
import UserMenu from "./UserMenu";

import { customerNavigation } from "../../utils/navigation";
import Container from "../ui/Container";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="bg-white shadow-sm border-b border-[var(--border)]">
            <Container>
                <div className="flex items-center justify-between py-4">
                    <Logo size={45} />
                    <nav className="flex items-center gap-8">
                        {customerNavigation.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <UserMenu />
                </div>
            </Container>
        </header>
    );
};

export default Navbar;