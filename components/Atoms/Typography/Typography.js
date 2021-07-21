const Typography = ({ el = 'h1',classes, children}) => {

    const getTypography = () => {

        const CustomTag = `${el}`
        return(
            <CustomTag className={classes}>{children}</CustomTag>
        )

    }

    return(
        <>{getTypography()}</>
    )
}

export default Typography