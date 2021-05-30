const validateSession = (req, res, next) => {

    if (req.session.authenticated && (req.session.user === 'user' || req.session.user === 'admin')) {
        next();
    } else {
        res.status(400).json({
            message: 'Error! You are not authenticated!'
        })
    }
}

// validateSessionForUser validates for user
const validateSessionForUser = (req, res, next) => {

    if (req.session.authenticated && req.session.user === 'user') {
        next();
    } else {
        res.status(400).json({
            message: 'Error! You are not authenticated!'
        })
    }
}

// validateSessionForAdmin validates session for admin
const validateSessionForAdmin = (req, res, next) => {

    if (req.session.authenticated && req.session.user === 'admin') {
        next();
    } else {
        res.status(400).json({
            message: 'Error! You are not authenticated!'
        })
    }
}
const validation = {
    validateUser: validateSessionForUser,
    validateAdmin: validateSessionForAdmin,
    validate: validateSession,
}

module.exports = validation;