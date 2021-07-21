import Typography from "../Typography/Typography";

const Badge = ({ classes, children }) => {
    return(
        <Typography el={`span`} classes={`inline-block p-2 rounded-lg uppercase font-medium ${classes}`}>{children}</Typography>
    )
}

export default Badge