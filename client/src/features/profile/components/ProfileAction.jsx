const ProfileAction = ({
    icon,
    title,
    description,
    onClick,
    danger = false
}) => {

    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                profile-action
                ${danger ? "profile-action-danger" : ""}
            `}
        >

            <div className="profile-action-icon">
                {icon}
            </div>

            <div className="profile-action-content">

                <h3>
                    {title}
                </h3>

                <p>
                    {description}
                </p>

            </div>

            <span className="profile-action-arrow">
                →
            </span>

        </button>
    );
};

export default ProfileAction;